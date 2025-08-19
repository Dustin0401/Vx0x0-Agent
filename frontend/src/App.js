import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import axios from "axios";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { Separator } from "./components/ui/separator";
import { ScrollArea } from "./components/ui/scroll-area";
import { 
  TrendingUp, 
  TrendingDown, 
  Brain, 
  BarChart3, 
  Globe, 
  Activity,
  MessageSquare,
  Zap,
  ArrowRight,
  Coins,
  Shield,
  Users,
  Bot
} from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Homepage Component
const Homepage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-charcoal-950 via-charcoal-900 to-charcoal-950">
      {/* Header */}
      <header className="border-b border-charcoal-800 bg-charcoal-950/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-lime-400 rounded-lg flex items-center justify-center">
              <Bot className="w-5 h-5 text-charcoal-950" />
            </div>
            <span className="text-2xl font-bold text-charcoal-100">Juno</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#agents" className="text-charcoal-300 hover:text-lime-400 transition-colors">Agents</a>
            <a href="#features" className="text-charcoal-300 hover:text-lime-400 transition-colors">Features</a>
            <a href="#tokenomics" className="text-charcoal-300 hover:text-lime-400 transition-colors">Tokenomics</a>
            <Link to="/chat" className="bg-lime-400 text-charcoal-950 px-4 py-2 rounded-lg font-medium hover:bg-lime-300 transition-colors">
              Open Web App
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h1 className="text-6xl font-bold text-charcoal-100 mb-6 leading-tight">
              Your Crypto AI
            </h1>
            <p className="text-xl text-charcoal-300 mb-8 leading-relaxed">
              Meet Juno, the AI-native crypto research platform. Trade smarter, invest confidently, 
              and master the market with personalized insights—live and research-grade.
            </p>
            <div className="flex gap-4">
              <Link to="/chat">
                <Button className="bg-lime-400 text-charcoal-950 hover:bg-lime-300 px-8 py-6 text-lg">
                  Open Web App
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button variant="outline" className="border-charcoal-600 text-charcoal-300 hover:bg-charcoal-800 px-8 py-6 text-lg">
                Get the App
              </Button>
            </div>
          </div>
          <div className="bg-charcoal-900 rounded-2xl p-8 border border-charcoal-800">
            <div className="font-mono text-sm">
              <div className="text-lime-400 mb-4">$ juno.research()</div>
              <div className="text-charcoal-400 mb-2">// Multi-agent analysis running...</div>
              <div className="text-charcoal-300 mb-1">✓ SentimentAgent: +0.8 (85% confidence)</div>
              <div className="text-charcoal-300 mb-1">✓ TechnicalAgent: +1.2 (92% confidence)</div>
              <div className="text-charcoal-300 mb-1">✓ MacroAgent: +0.3 (67% confidence)</div>
              <div className="text-charcoal-300 mb-4">✓ OnChainAgent: +0.6 (78% confidence)</div>
              <div className="text-lime-400">→ Bullish bias | 83% conviction</div>
              <div className="w-3 h-5 bg-lime-400 animate-pulse mt-2"></div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Agents Section */}
      <section id="agents" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-charcoal-100 mb-4">
            Your AI Agents, Built for Smarter Crypto Investing
          </h2>
          <p className="text-xl text-charcoal-400">
            Five specialized agents working together to deliver institutional-grade insights
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="bg-charcoal-900 border-charcoal-800">
            <CardHeader>
              <div className="w-12 h-12 bg-lime-400/20 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-lime-400" />
              </div>
              <CardTitle className="text-charcoal-100">Sentiment Agent</CardTitle>
              <CardDescription className="text-charcoal-400">
                Real-time sentiment analysis across social media, news, and funding data
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-charcoal-900 border-charcoal-800">
            <CardHeader>
              <div className="w-12 h-12 bg-lime-400/20 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-lime-400" />
              </div>
              <CardTitle className="text-charcoal-100">Technical Agent</CardTitle>
              <CardDescription className="text-charcoal-400">
                Advanced chart analysis, support/resistance levels, and pattern recognition
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-charcoal-900 border-charcoal-800">
            <CardHeader>
              <div className="w-12 h-12 bg-lime-400/20 rounded-lg flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-lime-400" />
              </div>
              <CardTitle className="text-charcoal-100">Macro Agent</CardTitle>
              <CardDescription className="text-charcoal-400">
                Global economic factors, DXY movements, and institutional flows
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-charcoal-900 border-charcoal-800">
            <CardHeader>
              <div className="w-12 h-12 bg-lime-400/20 rounded-lg flex items-center justify-center mb-4">
                <Activity className="w-6 h-6 text-lime-400" />
              </div>
              <CardTitle className="text-charcoal-100">On-Chain Agent</CardTitle>
              <CardDescription className="text-charcoal-400">
                Blockchain metrics, whale movements, and network activity analysis
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-charcoal-900 border-charcoal-800 md:col-span-2 lg:col-span-1">
            <CardHeader>
              <div className="w-12 h-12 bg-lime-400/20 rounded-lg flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-lime-400" />
              </div>
              <CardTitle className="text-charcoal-100">Juno Advisor</CardTitle>
              <CardDescription className="text-charcoal-400">
                Synthesizes all agent insights into personalized, actionable recommendations
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-charcoal-100 mb-4">Powerful Features</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-lime-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Brain className="w-8 h-8 text-charcoal-950" />
            </div>
            <h3 className="text-xl font-semibold text-charcoal-100 mb-2">AI Portfolio Assistant</h3>
            <p className="text-charcoal-400">Smart portfolio analysis and rebalancing suggestions</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-lime-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-charcoal-950" />
            </div>
            <h3 className="text-xl font-semibold text-charcoal-100 mb-2">Multi-Agent Intelligence</h3>
            <p className="text-charcoal-400">Five specialized agents working in perfect harmony</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-lime-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-charcoal-950" />
            </div>
            <h3 className="text-xl font-semibold text-charcoal-100 mb-2">One-Click Execution</h3>
            <p className="text-charcoal-400">Paper trading and strategy simulation built-in</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-lime-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-8 h-8 text-charcoal-950" />
            </div>
            <h3 className="text-xl font-semibold text-charcoal-100 mb-2">Mobile-First Simplicity</h3>
            <p className="text-charcoal-400">Clean, intuitive interface optimized for all devices</p>
          </div>
        </div>
      </section>

      {/* Tokenomics Section */}
      <section id="tokenomics" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-charcoal-100 mb-4">Fuel the Research with $JNO</h2>
          <p className="text-xl text-charcoal-400">Stake to unlock deeper insights and premium features</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-lime-400 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <Coins className="w-4 h-4 text-charcoal-950" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-charcoal-100 mb-2">Stake → Research Credits</h3>
                <p className="text-charcoal-400">Daily research credits for agent calls, backtests, and analysis</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-lime-400 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <Zap className="w-4 h-4 text-charcoal-950" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-charcoal-100 mb-2">Priority Access</h3>
                <p className="text-charcoal-400">Early access to new agents and faster query processing</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-lime-400 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <BarChart3 className="w-4 h-4 text-charcoal-950" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-charcoal-100 mb-2">Vision & Backtests</h3>
                <p className="text-charcoal-400">Chart analysis and historical strategy testing</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-lime-400 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <Users className="w-4 h-4 text-charcoal-950" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-charcoal-100 mb-2">Governance</h3>
                <p className="text-charcoal-400">Vote on agent parameters, features, and platform direction</p>
              </div>
            </div>
          </div>

          <div className="bg-charcoal-900 rounded-2xl p-8 border border-charcoal-800">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-charcoal-100">Token Pipeline</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-charcoal-800 rounded-lg">
                <span className="text-charcoal-300">Stake $JNO</span>
                <ArrowRight className="w-4 h-4 text-lime-400" />
              </div>
              <div className="flex items-center justify-between p-4 bg-charcoal-800 rounded-lg">
                <span className="text-charcoal-300">Earn Credits</span>
                <ArrowRight className="w-4 h-4 text-lime-400" />
              </div>
              <div className="flex items-center justify-between p-4 bg-charcoal-800 rounded-lg">
                <span className="text-charcoal-300">Use Research</span>
                <ArrowRight className="w-4 h-4 text-lime-400" />
              </div>
              <div className="p-4 bg-lime-400/10 rounded-lg border border-lime-400/20">
                <div className="text-lime-400 font-semibold mb-2">Fee Distribution</div>
                <div className="text-sm text-charcoal-300 space-y-1">
                  <div>• 30% Buy & Burn</div>
                  <div>• 50% Operator Rewards</div>
                  <div>• 20% Treasury</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-charcoal-800 bg-charcoal-950">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-8 bg-lime-400 rounded-lg flex items-center justify-center">
                <Bot className="w-5 h-5 text-charcoal-950" />
              </div>
              <span className="text-2xl font-bold text-charcoal-100">Juno</span>
            </div>
            <p className="text-charcoal-400 mb-6">AI-native crypto research platform</p>
            <div className="text-xs text-charcoal-500">
              <p>$JNO is a utility token for access and governance. Not investment advice.</p>
              <p className="mt-2">This is research, not financial advice. Markets are risky.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Chat Component
const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initialize with welcome message
    setMessages([{
      id: 1,
      type: 'assistant',
      content: 'Welcome to Juno! I\'m your AI crypto research assistant. Ask me about any cryptocurrency, market trends, or get technical analysis. Try asking: "Analyze BTC" or "What\'s the sentiment on Ethereum?"'
    }]);
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: input
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(`${API}/chat`, {
        message: input,
        session_id: sessionId
      });

      if (!sessionId) {
        setSessionId(response.data.session_id);
      }

      const research = response.data.response;
      
      const assistantMessage = {
        id: Date.now() + 1,
        type: 'assistant',
        content: research.summary,
        research: research
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = {
        id: Date.now() + 1,
        type: 'assistant',
        content: 'Sorry, I encountered an error processing your request. Please try again.'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-charcoal-950 flex flex-col">
      {/* Header */}
      <header className="border-b border-charcoal-800 bg-charcoal-900/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-lime-400 rounded-lg flex items-center justify-center">
              <Bot className="w-5 h-5 text-charcoal-950" />
            </div>
            <span className="text-2xl font-bold text-charcoal-100">Juno</span>
          </Link>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="border-lime-400/50 text-lime-400">
              Free Tier
            </Badge>
            <Button variant="outline" size="sm" className="border-charcoal-600 text-charcoal-300">
              Connect Wallet
            </Button>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 max-w-4xl mx-auto w-full px-6 py-8">
        <ScrollArea className="h-[calc(100vh-200px)] mb-6">
          <div className="space-y-6">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-2xl ${message.type === 'user' ? 'bg-lime-400 text-charcoal-950' : 'bg-charcoal-900 text-charcoal-100'} rounded-2xl px-6 py-4`}>
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  
                  {message.research && (
                    <div className="mt-4 space-y-4">
                      <Separator className="bg-charcoal-700" />
                      
                      {/* Market View */}
                      <div>
                        <h4 className="font-semibold text-charcoal-200 mb-2">Market Analysis</h4>
                        <div className="flex items-center gap-4 text-sm">
                          <Badge className={`${message.research.market_view.bias === 'bullish' ? 'bg-green-500' : message.research.market_view.bias === 'bearish' ? 'bg-red-500' : 'bg-gray-500'}`}>
                            {message.research.market_view.bias} {message.research.market_view.conviction}%
                          </Badge>
                          <span className="text-charcoal-400">{message.research.market_view.asset} • {message.research.market_view.timeframe}</span>
                        </div>
                      </div>

                      {/* Agent Evidence */}
                      <div>
                        <h4 className="font-semibold text-charcoal-200 mb-2">Agent Analysis</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {message.research.agent_evidence.map((agent, index) => (
                            <div key={index} className="bg-charcoal-800 rounded-lg p-3">
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-sm font-medium text-charcoal-300">{agent.agent}</span>
                                <Badge variant="outline" className="text-xs">
                                  {agent.confidence}%
                                </Badge>
                              </div>
                              <div className="flex items-center gap-2">
                                {agent.score > 0 ? (
                                  <TrendingUp className="w-4 h-4 text-green-400" />
                                ) : (
                                  <TrendingDown className="w-4 h-4 text-red-400" />
                                )}
                                <span className="text-sm text-charcoal-400">
                                  {agent.score > 0 ? '+' : ''}{agent.score.toFixed(1)}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Recommendations */}
                      {message.research.recommendations.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-charcoal-200 mb-2">Recommendations</h4>
                          <div className="bg-charcoal-800 rounded-lg p-4">
                            <div className="text-sm text-charcoal-300">
                              <p><strong>Entry:</strong> {message.research.recommendations[0].entry_zone}</p>
                              <p><strong>Risk/Reward:</strong> {message.research.recommendations[0].r_r}:1</p>
                              <p><strong>Probability:</strong> {(message.research.recommendations[0].probability_win * 100).toFixed(0)}%</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex justify-start">
                <div className="bg-charcoal-900 text-charcoal-100 rounded-2xl px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="animate-spin w-4 h-4 border-2 border-lime-400 border-t-transparent rounded-full"></div>
                    <span>Analyzing with multi-agent system...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="flex gap-3">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about crypto markets, get analysis, or try: 'Analyze BTC'"
            className="flex-1 bg-charcoal-900 border-charcoal-700 text-charcoal-100 placeholder-charcoal-500"
            disabled={loading}
          />
          <Button 
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="bg-lime-400 text-charcoal-950 hover:bg-lime-300"
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

// Main App Component
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/chat" element={<ChatApp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;