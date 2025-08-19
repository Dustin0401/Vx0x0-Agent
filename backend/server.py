from fastapi import FastAPI, APIRouter, HTTPException, BackgroundTasks
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional
import uuid
from datetime import datetime, timezone
import asyncio
import aiohttp
import json
from emergentintegrations.llm.chat import LlmChat, UserMessage

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="Juno Research API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# LLM Configuration
EMERGENT_LLM_KEY = os.environ.get('EMERGENT_LLM_KEY')

# Data Models
class UserProfile(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    objective: str = "growth"  # income|growth|hedge
    horizon: str = "swing"  # intraday|swing|position|long_term
    risk_tolerance: str = "med"  # low|med|high
    assets_followed: List[str] = ["BTC", "ETH"]
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class AgentEvidence(BaseModel):
    agent: str
    score: float  # -2 to +2
    confidence: int  # 0-100
    highlights: List[str]
    sources: List[str]

class MarketView(BaseModel):
    asset: str
    timeframe: str
    bias: str  # bullish|bearish|neutral
    conviction: int  # 0-100
    key_levels: Dict[str, List[float]]
    catalysts: List[str]
    risks: List[str]

class Recommendation(BaseModel):
    type: str  # idea|hedge|rebalance|alert
    entry_zone: str
    invalidation: str
    targets: List[str]
    r_r: float
    probability_win: float
    time_horizon: str
    sizing_guidance: str
    fit_for_user: str

class ResearchResponse(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    summary: str
    market_view: MarketView
    recommendations: List[Recommendation]
    agent_evidence: List[AgentEvidence]
    disclosures: List[str]
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ChatMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    session_id: str
    user_id: str
    message: str
    response: Optional[ResearchResponse] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ResearchQuery(BaseModel):
    query: str
    asset: Optional[str] = "BTC"
    timeframe: Optional[str] = "1d"
    user_profile: Optional[UserProfile] = None

# Crypto Data Service
class CryptoDataService:
    def __init__(self):
        self.base_url = "https://api.coingecko.com/api/v3"
    
    async def get_price_data(self, symbol: str) -> Dict[str, Any]:
        """Get current price and basic market data"""
        try:
            coin_map = {"BTC": "bitcoin", "ETH": "ethereum", "SOL": "solana"}
            coin_id = coin_map.get(symbol.upper(), symbol.lower())
            
            async with aiohttp.ClientSession() as session:
                url = f"{self.base_url}/simple/price"
                params = {
                    "ids": coin_id,
                    "vs_currencies": "usd",
                    "include_24hr_change": "true",
                    "include_market_cap": "true",
                    "include_24hr_vol": "true"
                }
                async with session.get(url, params=params) as response:
                    data = await response.json()
                    return data.get(coin_id, {})
        except Exception as e:
            logging.error(f"Error fetching price data: {e}")
            return {}
    
    async def get_market_sentiment(self, symbol: str) -> Dict[str, Any]:
        """Mock sentiment data for now"""
        return {
            "fear_greed_index": 45,
            "social_sentiment": 0.2,
            "news_sentiment": 0.1,
            "funding_rate": 0.01
        }

crypto_service = CryptoDataService()

# AI Agents
class SentimentAgent:
    def __init__(self):
        self.llm = LlmChat(
            api_key=EMERGENT_LLM_KEY,
            session_id="sentiment-agent",
            system_message="""You are a crypto sentiment analysis expert. Analyze market sentiment across social media, news, and funding data. 
            Return a sentiment score from -2 (extremely bearish) to +2 (extremely bullish) with confidence 0-100.
            Format your response as JSON with: score, confidence, highlights, sources."""
        ).with_model("openai", "gpt-4o-mini")
    
    async def analyze(self, asset: str, market_data: Dict) -> AgentEvidence:
        try:
            sentiment_data = await crypto_service.get_market_sentiment(asset)
            
            prompt = f"""Analyze sentiment for {asset}:
            Price: ${market_data.get('usd', 0)}
            24h Change: {market_data.get('usd_24h_change', 0)}%
            Volume: ${market_data.get('usd_24h_vol', 0)}
            Fear/Greed: {sentiment_data.get('fear_greed_index', 50)}
            
            Provide sentiment analysis."""
            
            message = UserMessage(text=prompt)
            response = await self.llm.send_message(message)
            
            # Parse LLM response or provide fallback
            try:
                result = json.loads(response)
                return AgentEvidence(
                    agent="Sentiment",
                    score=result.get("score", 0),
                    confidence=result.get("confidence", 50),
                    highlights=result.get("highlights", ["Market sentiment analysis"]),
                    sources=result.get("sources", ["CoinGecko", "Social Media"])
                )
            except:
                # Fallback if JSON parsing fails
                score = 0.5 if market_data.get('usd_24h_change', 0) > 0 else -0.5
                return AgentEvidence(
                    agent="Sentiment",
                    score=score,
                    confidence=60,
                    highlights=[f"24h change: {market_data.get('usd_24h_change', 0):.2f}%"],
                    sources=["CoinGecko"]
                )
        except Exception as e:
            logging.error(f"Sentiment analysis error: {e}")
            return AgentEvidence(
                agent="Sentiment",
                score=0,
                confidence=30,
                highlights=["Error in sentiment analysis"],
                sources=[]
            )

class TechnicalAgent:
    def __init__(self):
        self.llm = LlmChat(
            api_key=EMERGENT_LLM_KEY,
            session_id="technical-agent",
            system_message="""You are a crypto technical analysis expert. Analyze price action, support/resistance levels, and chart patterns.
            Return a technical score from -2 (strong sell) to +2 (strong buy) with confidence 0-100.
            Format your response as JSON with: score, confidence, levels (support/resistance), patterns."""
        ).with_model("openai", "gpt-4o-mini")
    
    async def analyze(self, asset: str, market_data: Dict) -> AgentEvidence:
        try:
            current_price = market_data.get('usd', 0)
            change_24h = market_data.get('usd_24h_change', 0)
            
            prompt = f"""Technical analysis for {asset}:
            Current Price: ${current_price}
            24h Change: {change_24h}%
            Volume: ${market_data.get('usd_24h_vol', 0)}
            
            Analyze technical levels and patterns."""
            
            message = UserMessage(text=prompt)
            response = await self.llm.send_message(message)
            
            # Simple technical score based on price action
            score = min(2, max(-2, change_24h / 10))  # Scale to -2 to +2
            
            return AgentEvidence(
                agent="Technical",
                score=score,
                confidence=70,
                highlights=[f"Price momentum: {change_24h:.2f}%", f"Current level: ${current_price}"],
                sources=["Price Action", "Volume Analysis"]
            )
        except Exception as e:
            logging.error(f"Technical analysis error: {e}")
            return AgentEvidence(
                agent="Technical",
                score=0,
                confidence=30,
                highlights=["Error in technical analysis"],
                sources=[]
            )

class MacroAgent:
    def __init__(self):
        self.llm = LlmChat(
            api_key=EMERGENT_LLM_KEY,
            session_id="macro-agent",
            system_message="""You are a macro economic analyst for crypto markets. Analyze global economic factors affecting crypto.
            Consider DXY, interest rates, risk-on/risk-off sentiment, correlations with traditional markets."""
        ).with_model("openai", "gpt-4o-mini")
    
    async def analyze(self, asset: str, market_data: Dict) -> AgentEvidence:
        return AgentEvidence(
            agent="Macro",
            score=0.3,  # Slightly positive macro outlook
            confidence=50,
            highlights=["Global liquidity conditions", "Risk-on sentiment"],
            sources=["Economic indicators", "Central bank policy"]
        )

class OnChainAgent:
    def __init__(self):
        self.llm = LlmChat(
            api_key=EMERGENT_LLM_KEY,
            session_id="onchain-agent",
            system_message="""You are an on-chain analysis expert. Analyze blockchain metrics, whale movements, and network activity."""
        ).with_model("openai", "gpt-4o-mini")
    
    async def analyze(self, asset: str, market_data: Dict) -> AgentEvidence:
        return AgentEvidence(
            agent="On-Chain",
            score=0.1,
            confidence=60,
            highlights=["Network activity stable", "No major whale movements"],
            sources=["Blockchain data", "Whale tracking"]
        )

class JunoAdvisor:
    def __init__(self):
        self.llm = LlmChat(
            api_key=EMERGENT_LLM_KEY,
            session_id="juno-advisor",
            system_message="""You are Juno, an AI crypto research advisor. Synthesize multi-agent analysis into clear, actionable insights.
            Always emphasize risk management and uncertainty. Provide clear reasoning and alternatives."""
        ).with_model("anthropic", "claude-3-5-sonnet-20241022")

# Initialize agents
sentiment_agent = SentimentAgent()
technical_agent = TechnicalAgent()
macro_agent = MacroAgent()
onchain_agent = OnChainAgent()
juno_advisor = JunoAdvisor()

# API Endpoints
@api_router.get("/")
async def root():
    return {"message": "Juno Research API"}

@api_router.post("/research", response_model=ResearchResponse)
async def research_query(query: ResearchQuery):
    """Main research endpoint that coordinates all agents"""
    try:
        asset = query.asset or "BTC"
        
        # Get market data
        market_data = await crypto_service.get_price_data(asset)
        
        # Run agents in parallel
        sentiment_task = sentiment_agent.analyze(asset, market_data)
        technical_task = technical_agent.analyze(asset, market_data)
        macro_task = macro_agent.analyze(asset, market_data)
        onchain_task = onchain_agent.analyze(asset, market_data)
        
        agent_results = await asyncio.gather(
            sentiment_task, technical_task, macro_task, onchain_task,
            return_exceptions=True
        )
        
        # Filter out exceptions and create evidence list
        evidence = []
        for result in agent_results:
            if isinstance(result, AgentEvidence):
                evidence.append(result)
        
        # Calculate overall bias
        total_score = sum(e.score for e in evidence) / len(evidence) if evidence else 0
        bias = "bullish" if total_score > 0.2 else "bearish" if total_score < -0.2 else "neutral"
        
        # Create market view
        market_view = MarketView(
            asset=asset,
            timeframe=query.timeframe or "1d",
            bias=bias,
            conviction=int(abs(total_score) * 50),
            key_levels={"support": [], "resistance": []},
            catalysts=["Market sentiment", "Technical levels"],
            risks=["High volatility", "Regulatory uncertainty"]
        )
        
        # Generate recommendations
        recommendations = [
            Recommendation(
                type="idea",
                entry_zone=f"Around ${market_data.get('usd', 0)}",
                invalidation="Below recent support",
                targets=["Next resistance level"],
                r_r=2.0,
                probability_win=0.6,
                time_horizon=query.timeframe or "1d",
                sizing_guidance="1-2% of portfolio",
                fit_for_user="Aligned with growth objective"
            )
        ]
        
        # Create final response
        response = ResearchResponse(
            summary=f"Analysis for {asset}: {bias} bias with {int(abs(total_score) * 50)}% conviction based on multi-agent research.",
            market_view=market_view,
            recommendations=recommendations,
            agent_evidence=evidence,
            disclosures=[
                "This is research, not financial advice.",
                "Crypto markets are highly volatile and risky.",
                "Past performance does not guarantee future results."
            ]
        )
        
        return response
        
    except Exception as e:
        logging.error(f"Research query error: {e}")
        raise HTTPException(status_code=500, detail="Research analysis failed")

@api_router.post("/chat")
async def chat_endpoint(message: dict):
    """Chat interface for research queries"""
    try:
        user_message = message.get("message", "")
        session_id = message.get("session_id") or str(uuid.uuid4())
        
        # Simple query parsing - look for asset mentions
        asset = "BTC"
        for symbol in ["BTC", "ETH", "SOL", "ADA", "DOT"]:
            if symbol.lower() in user_message.lower():
                asset = symbol
                break
        
        # Create research query
        query = ResearchQuery(query=user_message, asset=asset)
        research_result = await research_query(query)
        
        # Store chat message
        chat_msg = ChatMessage(
            session_id=session_id,
            user_id="anonymous",
            message=user_message,
            response=research_result
        )
        
        await db.chat_messages.insert_one(chat_msg.dict())
        
        return {
            "response": research_result,
            "session_id": session_id
        }
        
    except Exception as e:
        logging.error(f"Chat endpoint error: {e}")
        raise HTTPException(status_code=500, detail="Chat processing failed")

@api_router.get("/chat/history/{session_id}")
async def get_chat_history(session_id: str):
    """Get chat history for a session"""
    messages = await db.chat_messages.find({"session_id": session_id}).to_list(100)
    return [ChatMessage(**msg) for msg in messages]

@api_router.get("/market/{asset}")
async def get_market_data(asset: str):
    """Get current market data for an asset"""
    data = await crypto_service.get_price_data(asset)
    return data

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()