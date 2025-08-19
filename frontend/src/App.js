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
      <header className="border-b border-charcoal-800 bg-charcoal-950/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-lime-400 rounded-lg flex items-center justify-center shadow-lg shadow-lime-400/20">
              <Bot className="w-5 h-5 text-charcoal-950" />
            </div>
            <span className="text-2xl font-bold text-charcoal-100">Juno</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#agents" className="text-charcoal-300 hover:text-lime-400 transition-colors duration-200">Agents</a>
            <a href="#how-it-works" className="text-charcoal-300 hover:text-lime-400 transition-colors duration-200">How It Works</a>
            <a href="#features" className="text-charcoal-300 hover:text-lime-400 transition-colors duration-200">Features</a>
            <a href="#tokenomics" className="text-charcoal-300 hover:text-lime-400 transition-colors duration-200">Tokenomics</a>
            <Link to="/chat" className="bg-lime-400 text-charcoal-950 px-6 py-3 rounded-xl font-semibold hover:bg-lime-300 transition-all duration-200 hover:shadow-lg hover:shadow-lime-400/20 hover:-translate-y-0.5">
              Launch App
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-lime-400/10 border border-lime-400/20 rounded-full px-4 py-2 mb-8">
              <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse"></div>
              <span className="text-lime-400 text-sm font-medium">AI-Native Crypto Research</span>
            </div>
            <h1 className="text-7xl font-bold text-charcoal-100 mb-6 leading-tight">
              Your Crypto 
              <span className="text-lime-400"> AI</span>
            </h1>
            <p className="text-xl text-charcoal-300 mb-8 leading-relaxed">
              Meet Juno, the next-generation AI-native crypto research platform. Harness the power of 
              <span className="text-lime-400 font-semibold"> five specialized agents</span> working in perfect harmony 
              to deliver institutional-grade insights and data-driven strategies.
            </p>
            <div className="flex gap-4 mb-12">
              <Link to="/chat">
                <Button className="bg-lime-400 text-charcoal-950 hover:bg-lime-300 px-8 py-6 text-lg font-semibold rounded-xl hover:shadow-lg hover:shadow-lime-400/20 hover:-translate-y-0.5 transition-all duration-200">
                  Launch Platform
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button variant="outline" className="border-charcoal-600 text-charcoal-300 hover:bg-charcoal-800 hover:border-lime-400/50 px-8 py-6 text-lg font-semibold rounded-xl transition-all duration-200">
                Watch Demo
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-charcoal-800">
              <div>
                <div className="text-3xl font-bold text-lime-400 mb-1">5</div>
                <div className="text-charcoal-400 text-sm">AI Agents</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-lime-400 mb-1">24/7</div>
                <div className="text-charcoal-400 text-sm">Market Analysis</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-lime-400 mb-1">∞</div>
                <div className="text-charcoal-400 text-sm">Data Sources</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            {/* Neural Network Background */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-lime-400/5 via-transparent to-charcoal-900/50"></div>
            <div className="relative bg-charcoal-900/80 backdrop-blur-sm rounded-3xl p-8 border border-charcoal-800/50 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-charcoal-400 text-sm ml-4">Terminal</span>
              </div>
              <div className="font-mono text-sm space-y-2">
                <div className="text-lime-400">$ juno.research("BTC")</div>
                <div className="text-charcoal-400">// Initializing multi-agent analysis...</div>
                <div className="text-charcoal-300">⚡ SentimentAgent: <span className="text-green-400">+0.8</span> (85% confidence)</div>
                <div className="text-charcoal-300">📊 TechnicalAgent: <span className="text-green-400">+1.2</span> (92% confidence)</div>
                <div className="text-charcoal-300">🌍 MacroAgent: <span className="text-green-400">+0.3</span> (67% confidence)</div>
                <div className="text-charcoal-300">⛓️ OnChainAgent: <span className="text-green-400">+0.6</span> (78% confidence)</div>
                <div className="text-lime-400 font-semibold mt-4">→ Consensus: BULLISH | 83% conviction</div>
                <div className="text-charcoal-400">→ Recommendation: Long position entry zone</div>
                <div className="flex items-center gap-2 mt-4">
                  <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse"></div>
                  <span className="text-lime-400 text-xs">Analysis complete</span>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 w-16 h-16 bg-lime-400/20 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-lime-400/10 rounded-full blur-lg animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold text-charcoal-100 mb-6">
            How <span className="text-lime-400">Juno</span> Works
          </h2>
          <p className="text-xl text-charcoal-400 max-w-3xl mx-auto">
            Our sophisticated multi-agent architecture processes vast amounts of market data to deliver 
            precise, actionable crypto insights in real-time.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 mb-20">
          {/* Step 1 */}
          <div className="relative">
            <div className="bg-charcoal-900 rounded-2xl p-8 border border-charcoal-800 hover:border-lime-400/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-lime-400/10">
              <div className="w-16 h-16 bg-lime-400 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-lime-400/20">
                <MessageSquare className="w-8 h-8 text-charcoal-950" />
              </div>
              <h3 className="text-2xl font-bold text-charcoal-100 mb-4">1. Query Input</h3>
              <p className="text-charcoal-400 mb-4">
                Simply ask Juno about any cryptocurrency. Our natural language processing understands 
                complex market questions and trading scenarios.
              </p>
              <div className="text-lime-400 text-sm font-mono bg-charcoal-800 rounded p-2">
                "Analyze BTC sentiment"
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative">
            <div className="bg-charcoal-900 rounded-2xl p-8 border border-charcoal-800 hover:border-lime-400/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-lime-400/10">
              <div className="w-16 h-16 bg-lime-400 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-lime-400/20">
                <Brain className="w-8 h-8 text-charcoal-950" />
              </div>
              <h3 className="text-2xl font-bold text-charcoal-100 mb-4">2. Agent Processing</h3>
              <p className="text-charcoal-400 mb-4">
                Five specialized AI agents analyze different market dimensions simultaneously: 
                sentiment, technical patterns, macro factors, and on-chain metrics.
              </p>
              <div className="flex gap-2 flex-wrap">
                <span className="text-xs bg-charcoal-800 text-lime-400 px-2 py-1 rounded">Sentiment</span>
                <span className="text-xs bg-charcoal-800 text-lime-400 px-2 py-1 rounded">Technical</span>
                <span className="text-xs bg-charcoal-800 text-lime-400 px-2 py-1 rounded">Macro</span>
                <span className="text-xs bg-charcoal-800 text-lime-400 px-2 py-1 rounded">On-Chain</span>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative">
            <div className="bg-charcoal-900 rounded-2xl p-8 border border-charcoal-800 hover:border-lime-400/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-lime-400/10">
              <div className="w-16 h-16 bg-lime-400 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-lime-400/20">
                <TrendingUp className="w-8 h-8 text-charcoal-950" />
              </div>
              <h3 className="text-2xl font-bold text-charcoal-100 mb-4">3. Intelligent Synthesis</h3>
              <p className="text-charcoal-400 mb-4">
                JunoAdvisor synthesizes all agent insights into clear, actionable recommendations 
                with risk assessments and confidence scores.
              </p>
              <div className="text-lime-400 text-sm font-mono bg-charcoal-800 rounded p-2">
                Bullish | 85% confidence
              </div>
            </div>
          </div>
        </div>

        {/* Tech Illustration */}
        <div className="bg-gradient-to-r from-charcoal-900 via-charcoal-800 to-charcoal-900 rounded-3xl p-12 border border-charcoal-700">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-charcoal-100 mb-6">
                Powered by Advanced <span className="text-lime-400">Neural Networks</span>
              </h3>
              <p className="text-charcoal-300 mb-8">
                Our multi-agent system leverages cutting-edge AI models to process and analyze 
                thousands of data points across multiple blockchains, social platforms, and market indicators.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-lime-400 rounded-full"></div>
                  <span className="text-charcoal-300">Real-time blockchain data ingestion</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-lime-400 rounded-full"></div>
                  <span className="text-charcoal-300">Advanced sentiment analysis across 50+ sources</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-lime-400 rounded-full"></div>
                  <span className="text-charcoal-300">Technical pattern recognition with 95% accuracy</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-lime-400 rounded-full"></div>
                  <span className="text-charcoal-300">Macro economic correlation modeling</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1645839057098-5ea8761a6b09?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwxfHxBSSUyMG5ldXJhbCUyMG5ldHdvcmt8ZW58MHx8fHwxNzU1NTg3NjA2fDA&ixlib=rb-4.1.0&q=85" 
                alt="Neural Network Visualization" 
                className="rounded-2xl shadow-2xl w-full h-80 object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/50 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Agents Section */}
      <section id="agents" className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold text-charcoal-100 mb-6">
            Meet Your <span className="text-lime-400">AI Agents</span>
          </h2>
          <p className="text-xl text-charcoal-400 max-w-3xl mx-auto">
            Five specialized agents working in perfect harmony to deliver institutional-grade crypto insights. 
            Each agent brings unique expertise to create a comprehensive market view.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="bg-gradient-to-br from-charcoal-900 to-charcoal-800 border-charcoal-700 hover:border-lime-400/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-lime-400/10 group">
            <CardHeader className="pb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-lime-400 to-lime-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-lime-400/20 group-hover:shadow-lime-400/40 transition-all duration-300">
                <TrendingUp className="w-8 h-8 text-charcoal-950" />
              </div>
              <CardTitle className="text-charcoal-100 text-2xl mb-2">Sentiment Agent</CardTitle>
              <CardDescription className="text-charcoal-400 text-base leading-relaxed">
                Advanced NLP analysis of social media, news sentiment, and market psychology across 50+ sources
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-charcoal-300">
                  <div className="w-1.5 h-1.5 bg-lime-400 rounded-full"></div>
                  <span>Real-time sentiment scoring</span>
                </div>
                <div className="flex items-center gap-2 text-charcoal-300">
                  <div className="w-1.5 h-1.5 bg-lime-400 rounded-full"></div>
                  <span>Influencer impact tracking</span>
                </div>
                <div className="flex items-center gap-2 text-charcoal-300">
                  <div className="w-1.5 h-1.5 bg-lime-400 rounded-full"></div>
                  <span>Fear & greed analysis</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-charcoal-900 to-charcoal-800 border-charcoal-700 hover:border-lime-400/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-lime-400/10 group">
            <CardHeader className="pb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-lime-400 to-lime-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-lime-400/20 group-hover:shadow-lime-400/40 transition-all duration-300">
                <BarChart3 className="w-8 h-8 text-charcoal-950" />
              </div>
              <CardTitle className="text-charcoal-100 text-2xl mb-2">Technical Agent</CardTitle>
              <CardDescription className="text-charcoal-400 text-base leading-relaxed">
                Advanced chart analysis, pattern recognition, and technical indicators with 95% accuracy
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-charcoal-300">
                  <div className="w-1.5 h-1.5 bg-lime-400 rounded-full"></div>
                  <span>Support/resistance levels</span>
                </div>
                <div className="flex items-center gap-2 text-charcoal-300">
                  <div className="w-1.5 h-1.5 bg-lime-400 rounded-full"></div>
                  <span>Pattern recognition</span>
                </div>
                <div className="flex items-center gap-2 text-charcoal-300">
                  <div className="w-1.5 h-1.5 bg-lime-400 rounded-full"></div>
                  <span>Volume analysis</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-charcoal-900 to-charcoal-800 border-charcoal-700 hover:border-lime-400/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-lime-400/10 group">
            <CardHeader className="pb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-lime-400 to-lime-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-lime-400/20 group-hover:shadow-lime-400/40 transition-all duration-300">
                <Globe className="w-8 h-8 text-charcoal-950" />
              </div>
              <CardTitle className="text-charcoal-100 text-2xl mb-2">Macro Agent</CardTitle>
              <CardDescription className="text-charcoal-400 text-base leading-relaxed">
                Global economic factors, central bank policies, and institutional flow analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-charcoal-300">
                  <div className="w-1.5 h-1.5 bg-lime-400 rounded-full"></div>
                  <span>Fed policy tracking</span>
                </div>
                <div className="flex items-center gap-2 text-charcoal-300">
                  <div className="w-1.5 h-1.5 bg-lime-400 rounded-full"></div>
                  <span>DXY correlation analysis</span>
                </div>
                <div className="flex items-center gap-2 text-charcoal-300">
                  <div className="w-1.5 h-1.5 bg-lime-400 rounded-full"></div>
                  <span>Risk-on/off sentiment</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-charcoal-900 to-charcoal-800 border-charcoal-700 hover:border-lime-400/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-lime-400/10 group">
            <CardHeader className="pb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-lime-400 to-lime-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-lime-400/20 group-hover:shadow-lime-400/40 transition-all duration-300">
                <Activity className="w-8 h-8 text-charcoal-950" />
              </div>
              <CardTitle className="text-charcoal-100 text-2xl mb-2">On-Chain Agent</CardTitle>
              <CardDescription className="text-charcoal-400 text-base leading-relaxed">
                Blockchain metrics, whale movements, and network activity across multiple chains
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-charcoal-300">
                  <div className="w-1.5 h-1.5 bg-lime-400 rounded-full"></div>
                  <span>Whale wallet tracking</span>
                </div>
                <div className="flex items-center gap-2 text-charcoal-300">
                  <div className="w-1.5 h-1.5 bg-lime-400 rounded-full"></div>
                  <span>Network health metrics</span>
                </div>
                <div className="flex items-center gap-2 text-charcoal-300">
                  <div className="w-1.5 h-1.5 bg-lime-400 rounded-full"></div>
                  <span>DeFi protocol flows</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-lime-400/10 to-charcoal-800 border-lime-400/30 md:col-span-2 lg:col-span-1 shadow-xl shadow-lime-400/10">
            <CardHeader className="pb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-lime-400 to-lime-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-lime-400/30">
                <Brain className="w-8 h-8 text-charcoal-950" />
              </div>
              <CardTitle className="text-charcoal-100 text-2xl mb-2">Juno Advisor</CardTitle>
              <CardDescription className="text-charcoal-400 text-base leading-relaxed">
                Master coordinator that synthesizes all agent insights into personalized, actionable strategies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-charcoal-300">
                  <div className="w-1.5 h-1.5 bg-lime-400 rounded-full"></div>
                  <span>Multi-agent synthesis</span>
                </div>
                <div className="flex items-center gap-2 text-charcoal-300">
                  <div className="w-1.5 h-1.5 bg-lime-400 rounded-full"></div>
                  <span>Risk-adjusted recommendations</span>
                </div>
                <div className="flex items-center gap-2 text-charcoal-300">
                  <div className="w-1.5 h-1.5 bg-lime-400 rounded-full"></div>
                  <span>Personalized insights</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Agent Workflow Visualization */}
        <div className="bg-gradient-to-r from-charcoal-900/50 via-charcoal-800/50 to-charcoal-900/50 rounded-3xl p-12 border border-charcoal-700/50 backdrop-blur-sm">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-charcoal-100 mb-4">Multi-Agent Workflow</h3>
            <p className="text-charcoal-400">See how our agents collaborate to deliver comprehensive market analysis</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwyfHxkYXRhJTIwdmlzdWFsaXphdGlvbnxlbnwwfHx8fDE3NTU1ODc2MDl8MA&ixlib=rb-4.1.0&q=85" 
                alt="Data Analytics Dashboard" 
                className="rounded-2xl shadow-2xl w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 to-transparent rounded-2xl"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-charcoal-900/80 backdrop-blur-sm rounded-lg p-4 border border-lime-400/20">
                  <div className="text-lime-400 text-sm font-semibold mb-1">Live Analysis Dashboard</div>
                  <div className="text-charcoal-300 text-xs">Real-time agent coordination</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-lime-400 rounded-full flex items-center justify-center text-charcoal-950 font-bold text-sm flex-shrink-0">1</div>
                <div>
                  <h4 className="text-lg font-semibold text-charcoal-100 mb-2">Data Ingestion</h4>
                  <p className="text-charcoal-400 text-sm">Agents simultaneously collect data from their specialized sources</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-lime-400 rounded-full flex items-center justify-center text-charcoal-950 font-bold text-sm flex-shrink-0">2</div>
                <div>
                  <h4 className="text-lg font-semibold text-charcoal-100 mb-2">Parallel Analysis</h4>
                  <p className="text-charcoal-400 text-sm">Each agent processes data using advanced AI models and algorithms</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-lime-400 rounded-full flex items-center justify-center text-charcoal-950 font-bold text-sm flex-shrink-0">3</div>
                <div>
                  <h4 className="text-lg font-semibold text-charcoal-100 mb-2">Consensus Building</h4>
                  <p className="text-charcoal-400 text-sm">JunoAdvisor weighs and synthesizes all agent insights</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-lime-400 rounded-full flex items-center justify-center text-charcoal-950 font-bold text-sm flex-shrink-0">4</div>
                <div>
                  <h4 className="text-lg font-semibold text-charcoal-100 mb-2">Actionable Output</h4>
                  <p className="text-charcoal-400 text-sm">Delivers clear recommendations with confidence scores and risk assessment</p>
                </div>
              </div>
            </div>
          </div>
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