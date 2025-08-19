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
      <section id="features" className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold text-charcoal-100 mb-6">
            Enterprise-Grade <span className="text-lime-400">Features</span>
          </h2>
          <p className="text-xl text-charcoal-400 max-w-3xl mx-auto">
            Built for professionals who demand precision, speed, and reliability in their crypto research workflow.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Feature 1 */}
          <div className="bg-gradient-to-br from-charcoal-900 to-charcoal-800 rounded-3xl p-8 border border-charcoal-700 hover:border-lime-400/30 transition-all duration-300 hover:shadow-xl hover:shadow-lime-400/10">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-lime-400 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-lime-400/20">
                <Brain className="w-8 h-8 text-charcoal-950" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-charcoal-100 mb-4">AI Portfolio Assistant</h3>
                <p className="text-charcoal-400 mb-6 leading-relaxed">
                  Advanced portfolio analysis with risk assessment, correlation matrices, and intelligent rebalancing suggestions. 
                  Our AI understands your investment goals and risk tolerance.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Shield className="w-4 h-4 text-lime-400" />
                    <span className="text-charcoal-300 text-sm">Risk-adjusted position sizing</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-4 h-4 text-lime-400" />
                    <span className="text-charcoal-300 text-sm">Performance optimization</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Activity className="w-4 h-4 text-lime-400" />
                    <span className="text-charcoal-300 text-sm">Real-time alerts</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="bg-gradient-to-br from-charcoal-900 to-charcoal-800 rounded-3xl p-8 border border-charcoal-700 hover:border-lime-400/30 transition-all duration-300 hover:shadow-xl hover:shadow-lime-400/10">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-lime-400 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-lime-400/20">
                <Zap className="w-8 h-8 text-charcoal-950" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-charcoal-100 mb-4">Multi-Agent Intelligence</h3>
                <p className="text-charcoal-400 mb-6 leading-relaxed">
                  Our five specialized agents work in perfect harmony, processing thousands of data points 
                  across sentiment, technical, macro, and on-chain dimensions in real-time.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Globe className="w-4 h-4 text-lime-400" />
                    <span className="text-charcoal-300 text-sm">50+ data sources</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Brain className="w-4 h-4 text-lime-400" />
                    <span className="text-charcoal-300 text-sm">Advanced AI models</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Zap className="w-4 h-4 text-lime-400" />
                    <span className="text-charcoal-300 text-sm">Sub-second processing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="bg-gradient-to-br from-charcoal-900 to-charcoal-800 rounded-3xl p-8 border border-charcoal-700 hover:border-lime-400/30 transition-all duration-300 hover:shadow-xl hover:shadow-lime-400/10">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-lime-400 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-lime-400/20">
                <BarChart3 className="w-8 h-8 text-charcoal-950" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-charcoal-100 mb-4">Advanced Analytics</h3>
                <p className="text-charcoal-400 mb-6 leading-relaxed">
                  Professional-grade charting tools, backtesting capabilities, and strategy simulation. 
                  Test your theories before risking capital with our comprehensive analytics suite.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <BarChart3 className="w-4 h-4 text-lime-400" />
                    <span className="text-charcoal-300 text-sm">Advanced charting</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-4 h-4 text-lime-400" />
                    <span className="text-charcoal-300 text-sm">Strategy backtesting</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="w-4 h-4 text-lime-400" />
                    <span className="text-charcoal-300 text-sm">Risk modeling</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="bg-gradient-to-br from-charcoal-900 to-charcoal-800 rounded-3xl p-8 border border-charcoal-700 hover:border-lime-400/30 transition-all duration-300 hover:shadow-xl hover:shadow-lime-400/10">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-lime-400 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-lime-400/20">
                <MessageSquare className="w-8 h-8 text-charcoal-950" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-charcoal-100 mb-4">Intelligent Chat Interface</h3>
                <p className="text-charcoal-400 mb-6 leading-relaxed">
                  Natural language queries get instant, comprehensive responses. Ask complex questions 
                  and receive structured analysis with confidence scores and actionable insights.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-4 h-4 text-lime-400" />
                    <span className="text-charcoal-300 text-sm">Natural language processing</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Brain className="w-4 h-4 text-lime-400" />
                    <span className="text-charcoal-300 text-sm">Context-aware responses</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Zap className="w-4 h-4 text-lime-400" />
                    <span className="text-charcoal-300 text-sm">Instant analysis</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Features Showcase */}
        <div className="bg-gradient-to-r from-charcoal-900 via-charcoal-800 to-charcoal-900 rounded-3xl p-12 border border-charcoal-700">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwzfHxkYXRhJTIwdmlzdWFsaXphdGlvbnxlbnwwfHx8fDE3NTU1ODc2MDl8MA&ixlib=rb-4.1.0&q=85" 
                alt="Advanced Trading Dashboard" 
                className="rounded-2xl shadow-2xl w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/50 to-transparent rounded-2xl"></div>
              
              {/* Floating UI Elements */}
              <div className="absolute top-4 right-4 bg-charcoal-900/90 backdrop-blur-sm rounded-lg p-3 border border-lime-400/20">
                <div className="text-lime-400 text-sm font-semibold">Live Data</div>
                <div className="text-charcoal-300 text-xs">Real-time analysis</div>
              </div>
              
              <div className="absolute bottom-4 left-4 bg-charcoal-900/90 backdrop-blur-sm rounded-lg p-3 border border-lime-400/20">
                <div className="text-lime-400 text-sm font-semibold">95%</div>
                <div className="text-charcoal-300 text-xs">Accuracy rate</div>
              </div>
            </div>
            
            <div>
              <h3 className="text-3xl font-bold text-charcoal-100 mb-6">
                Professional Trading <span className="text-lime-400">Dashboard</span>
              </h3>
              <p className="text-charcoal-300 mb-8 leading-relaxed">
                Access institutional-grade tools and insights through our intuitive interface. 
                Monitor multiple assets, track your strategies, and receive real-time alerts 
                all in one powerful platform.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-lime-400 mb-2">∞</div>
                  <div className="text-charcoal-400 text-sm">Data Points</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-lime-400 mb-2">5ms</div>
                  <div className="text-charcoal-400 text-sm">Response Time</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-lime-400 mb-2">24/7</div>
                  <div className="text-charcoal-400 text-sm">Monitoring</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-lime-400 mb-2">99.9%</div>
                  <div className="text-charcoal-400 text-sm">Uptime</div>
                </div>
              </div>
              
              <Link to="/chat">
                <Button className="bg-lime-400 text-charcoal-950 hover:bg-lime-300 px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-lime-400/20">
                  Try Live Demo
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tokenomics Section */}
      <section id="tokenomics" className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold text-charcoal-100 mb-6">
            Powered by <span className="text-lime-400">$JNO</span> Tokenomics
          </h2>
          <p className="text-xl text-charcoal-400 max-w-3xl mx-auto">
            Stake $JNO to unlock deeper research capabilities, priority access, and governance rights. 
            A utility-first economy that rewards active participation.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="space-y-8">
            <div className="flex items-start gap-6 group">
              <div className="w-16 h-16 bg-gradient-to-br from-lime-400 to-lime-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-lime-400/20 group-hover:shadow-lime-400/40 transition-all duration-300">
                <Coins className="w-8 h-8 text-charcoal-950" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-charcoal-100 mb-3">Stake → Research Credits</h3>
                <p className="text-charcoal-400 leading-relaxed">
                  Stake $JNO tokens to receive daily Research Credits (RC). More stake means more credits 
                  for advanced AI analysis, backtesting, and premium features.
                </p>
                <div className="mt-4 text-sm text-lime-400 font-mono bg-charcoal-800 rounded p-2 inline-block">
                  RC/day = base × log₂(1 + stake/S₀) × tier_multiplier
                </div>
              </div>
            </div>

            <div className="flex items-start gap-6 group">
              <div className="w-16 h-16 bg-gradient-to-br from-lime-400 to-lime-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-lime-400/20 group-hover:shadow-lime-400/40 transition-all duration-300">
                <Zap className="w-8 h-8 text-charcoal-950" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-charcoal-100 mb-3">Priority Access</h3>
                <p className="text-charcoal-400 leading-relaxed">
                  Higher tier stakers get priority processing, early access to new AI agents, 
                  faster response times, and exclusive beta features before general release.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6 group">
              <div className="w-16 h-16 bg-gradient-to-br from-lime-400 to-lime-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-lime-400/20 group-hover:shadow-lime-400/40 transition-all duration-300">
                <BarChart3 className="w-8 h-8 text-charcoal-950" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-charcoal-100 mb-3">Advanced Analytics</h3>
                <p className="text-charcoal-400 leading-relaxed">
                  Unlock chart vision analysis, portfolio risk modeling, custom alerts, 
                  and comprehensive backtesting capabilities with higher stake tiers.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6 group">
              <div className="w-16 h-16 bg-gradient-to-br from-lime-400 to-lime-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-lime-400/20 group-hover:shadow-lime-400/40 transition-all duration-300">
                <Users className="w-8 h-8 text-charcoal-950" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-charcoal-100 mb-3">Governance & Rewards</h3>
                <p className="text-charcoal-400 leading-relaxed">
                  Vote on agent parameters, new features, and platform direction. 
                  Earn rewards by participating in the data operator economy.
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            {/* Blockchain visualization */}
            <div className="relative bg-gradient-to-br from-charcoal-900/80 to-charcoal-800/80 backdrop-blur-sm rounded-3xl p-8 border border-charcoal-700">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-charcoal-100 mb-2">Token Flow Pipeline</h3>
                <p className="text-charcoal-400">Sustainable tokenomics driving platform growth</p>
              </div>
              
              {/* Animated Flow */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-charcoal-800 to-charcoal-700 rounded-xl border border-charcoal-600 hover:border-lime-400/30 transition-all duration-300">
                  <span className="text-charcoal-300 font-medium">Stake $JNO</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse"></div>
                    <ArrowRight className="w-4 h-4 text-lime-400" />
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-charcoal-800 to-charcoal-700 rounded-xl border border-charcoal-600 hover:border-lime-400/30 transition-all duration-300">
                  <span className="text-charcoal-300 font-medium">Earn RC Daily</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                    <ArrowRight className="w-4 h-4 text-lime-400" />
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-charcoal-800 to-charcoal-700 rounded-xl border border-charcoal-600 hover:border-lime-400/30 transition-all duration-300">
                  <span className="text-charcoal-300 font-medium">Use AI Research</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                    <ArrowRight className="w-4 h-4 text-lime-400" />
                  </div>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-lime-400/10 to-lime-400/5 rounded-xl border border-lime-400/20">
                  <div className="text-lime-400 font-semibold mb-3 text-center">Fee Distribution</div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-lime-400 font-bold text-lg">30%</div>
                      <div className="text-charcoal-400 text-xs">Buy & Burn</div>
                    </div>
                    <div>
                      <div className="text-lime-400 font-bold text-lg">50%</div>
                      <div className="text-charcoal-400 text-xs">Operators</div>
                    </div>
                    <div>
                      <div className="text-lime-400 font-bold text-lg">20%</div>
                      <div className="text-charcoal-400 text-xs">Treasury</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating blockchain elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 opacity-20">
              <img 
                src="https://images.unsplash.com/photo-1639322537228-f710d846310a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwxfHxibG9ja2NoYWlufGVufDB8fHx8MTc1NTU4NzU3NHww&ixlib=rb-4.1.0&q=85" 
                alt="Blockchain cubes" 
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-16 h-16 opacity-10">
              <img 
                src="https://images.unsplash.com/photo-1639815188546-c43c240ff4df?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHw0fHxibG9ja2NoYWlufGVufDB8fHx8MTc1NTU4NzU3NHww&ixlib=rb-4.1.0&q=85" 
                alt="Blockchain structure" 
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Tier Comparison */}
        <div className="bg-gradient-to-r from-charcoal-900/50 via-charcoal-800/50 to-charcoal-900/50 rounded-3xl p-12 border border-charcoal-700/50 backdrop-blur-sm">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-charcoal-100 mb-4">Staking Tiers</h3>
            <p className="text-charcoal-400">Choose your tier and unlock progressive benefits</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-charcoal-900 rounded-2xl p-6 border border-charcoal-700 text-center">
              <div className="text-charcoal-300 font-semibold mb-2">Free</div>
              <div className="text-3xl font-bold text-lime-400 mb-4">0 $JNO</div>
              <div className="space-y-2 text-sm text-charcoal-400">
                <div>10 RC/day</div>
                <div>Basic analysis</div>
                <div>Standard latency</div>
              </div>
            </div>
            
            <div className="bg-charcoal-900 rounded-2xl p-6 border border-charcoal-700 text-center">
              <div className="text-charcoal-300 font-semibold mb-2">Analyst</div>
              <div className="text-3xl font-bold text-lime-400 mb-4">1K $JNO</div>
              <div className="space-y-2 text-sm text-charcoal-400">
                <div>100 RC/day</div>
                <div>Multi-chart analysis</div>
                <div>Priority processing</div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-lime-400/10 to-lime-400/5 rounded-2xl p-6 border border-lime-400/30 text-center">
              <div className="text-lime-400 font-semibold mb-2">Pro</div>
              <div className="text-3xl font-bold text-lime-400 mb-4">10K $JNO</div>
              <div className="space-y-2 text-sm text-charcoal-300">
                <div>500 RC/day</div>
                <div>Advanced backtesting</div>
                <div>API access</div>
              </div>
            </div>
            
            <div className="bg-charcoal-900 rounded-2xl p-6 border border-charcoal-700 text-center">
              <div className="text-charcoal-300 font-semibold mb-2">Fund</div>
              <div className="text-3xl font-bold text-lime-400 mb-4">100K $JNO</div>
              <div className="space-y-2 text-sm text-charcoal-400">
                <div>Unlimited RC</div>
                <div>Dedicated agents</div>
                <div>Custom SLA</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="bg-gradient-to-br from-lime-400/10 via-lime-400/5 to-transparent rounded-3xl p-12 lg:p-20 border border-lime-400/20 text-center relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <img 
              src="https://images.unsplash.com/photo-1645839078449-124db8a049fd?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwyfHxBSSUyMG5ldXJhbCUyMG5ldHdvcmt8ZW58MHx8fHwxNzU1NTg3NjA2fDA&ixlib=rb-4.1.0&q=85" 
              alt="Neural network background" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="relative z-10">
            <h2 className="text-5xl lg:text-6xl font-bold text-charcoal-100 mb-6">
              Ready to Trade <span className="text-lime-400">Smarter?</span>
            </h2>
            <p className="text-xl text-charcoal-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join thousands of traders and investors who are already using Juno's AI-powered insights 
              to make better decisions in the crypto markets. Start your journey today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <Link to="/chat">
                <Button className="bg-lime-400 text-charcoal-950 hover:bg-lime-300 px-10 py-6 text-xl font-bold rounded-2xl shadow-lg shadow-lime-400/20 hover:shadow-lime-400/40 hover:-translate-y-1 transition-all duration-300">
                  Launch Juno Platform
                  <ArrowRight className="ml-3 w-6 h-6" />
                </Button>
              </Link>
              <Button variant="outline" className="border-charcoal-600 text-charcoal-300 hover:bg-charcoal-800 hover:border-lime-400/50 px-10 py-6 text-xl font-semibold rounded-2xl transition-all duration-300">
                Book a Demo
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-charcoal-700">
              <div className="text-center">
                <div className="text-3xl font-bold text-lime-400 mb-2">99.9%</div>
                <div className="text-charcoal-400">Platform Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-lime-400 mb-2">10K+</div>
                <div className="text-charcoal-400">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-lime-400 mb-2">$2B+</div>
                <div className="text-charcoal-400">Assets Analyzed</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-charcoal-800 bg-gradient-to-br from-charcoal-950 to-charcoal-900">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-lime-400 rounded-xl flex items-center justify-center shadow-lg shadow-lime-400/20">
                  <Bot className="w-6 h-6 text-charcoal-950" />
                </div>
                <span className="text-3xl font-bold text-charcoal-100">Juno</span>
              </div>
              <p className="text-charcoal-400 leading-relaxed mb-6">
                The next-generation AI-native crypto research platform. Institutional-grade insights 
                powered by multi-agent intelligence.
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-charcoal-800 rounded-lg flex items-center justify-center hover:bg-lime-400/20 transition-colors cursor-pointer">
                  <span className="text-charcoal-400 hover:text-lime-400 transition-colors">𝕏</span>
                </div>
                <div className="w-10 h-10 bg-charcoal-800 rounded-lg flex items-center justify-center hover:bg-lime-400/20 transition-colors cursor-pointer">
                  <span className="text-charcoal-400 hover:text-lime-400 transition-colors">📧</span>
                </div>
                <div className="w-10 h-10 bg-charcoal-800 rounded-lg flex items-center justify-center hover:bg-lime-400/20 transition-colors cursor-pointer">
                  <span className="text-charcoal-400 hover:text-lime-400 transition-colors">💬</span>
                </div>
              </div>
            </div>
            
            {/* Product */}
            <div>
              <h4 className="text-lg font-semibold text-charcoal-100 mb-6">Product</h4>
              <div className="space-y-4">
                <Link to="/chat" className="block text-charcoal-400 hover:text-lime-400 transition-colors">AI Agents</Link>
                <a href="#features" className="block text-charcoal-400 hover:text-lime-400 transition-colors">Features</a>
                <a href="#tokenomics" className="block text-charcoal-400 hover:text-lime-400 transition-colors">Tokenomics</a>
                <a href="#" className="block text-charcoal-400 hover:text-lime-400 transition-colors">API</a>
                <a href="#" className="block text-charcoal-400 hover:text-lime-400 transition-colors">Integrations</a>
              </div>
            </div>
            
            {/* Resources */}
            <div>
              <h4 className="text-lg font-semibold text-charcoal-100 mb-6">Resources</h4>
              <div className="space-y-4">
                <a href="#" className="block text-charcoal-400 hover:text-lime-400 transition-colors">Documentation</a>
                <a href="#" className="block text-charcoal-400 hover:text-lime-400 transition-colors">Tutorials</a>
                <a href="#" className="block text-charcoal-400 hover:text-lime-400 transition-colors">Blog</a>
                <a href="#" className="block text-charcoal-400 hover:text-lime-400 transition-colors">Research Papers</a>
                <a href="#" className="block text-charcoal-400 hover:text-lime-400 transition-colors">Community</a>
              </div>
            </div>
            
            {/* Company */}
            <div>
              <h4 className="text-lg font-semibold text-charcoal-100 mb-6">Company</h4>
              <div className="space-y-4">
                <a href="#" className="block text-charcoal-400 hover:text-lime-400 transition-colors">About</a>
                <a href="#" className="block text-charcoal-400 hover:text-lime-400 transition-colors">Careers</a>
                <a href="#" className="block text-charcoal-400 hover:text-lime-400 transition-colors">Press</a>
                <a href="#" className="block text-charcoal-400 hover:text-lime-400 transition-colors">Security</a>
                <a href="#" className="block text-charcoal-400 hover:text-lime-400 transition-colors">Contact</a>
              </div>
            </div>
          </div>
          
          <Separator className="bg-charcoal-800 mb-8" />
          
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-charcoal-500 text-sm mb-4 md:mb-0">
              <p>© 2025 Juno. All rights reserved.</p>
            </div>
            <div className="text-xs text-charcoal-500 text-center md:text-right max-w-md">
              <p className="mb-2">$JNO is a utility token for access and governance. Not investment advice.</p>
              <p>This is research, not financial advice. Crypto markets are highly volatile and risky.</p>
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
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentAsset, setCurrentAsset] = useState("BTC");
  const [marketData, setMarketData] = useState({});
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
      content: 'Welcome to Juno! I\'m your AI crypto research assistant powered by five specialized agents. I can analyze any cryptocurrency, provide market insights, technical analysis, sentiment data, and on-chain metrics. Try asking: "Analyze BTC" or "What\'s the sentiment on Ethereum?"',
      timestamp: new Date(),
    }]);

    // Fetch initial market data
    fetchMarketData();
  }, []);

  const fetchMarketData = async () => {
    try {
      const btcResponse = await axios.get(`${API}/market/BTC`);
      const ethResponse = await axios.get(`${API}/market/ETH`);
      setMarketData({
        BTC: btcResponse.data,
        ETH: ethResponse.data
      });
    } catch (error) {
      console.error('Market data fetch error:', error);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: input,
      timestamp: new Date(),
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
        research: research,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = {
        id: Date.now() + 1,
        type: 'assistant',
        content: 'Sorry, I encountered an error processing your request. Please try again.',
        timestamp: new Date(),
        isError: true
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

  const quickActions = [
    { label: "Analyze BTC", query: "Analyze Bitcoin market conditions and sentiment" },
    { label: "ETH Technical", query: "Provide technical analysis for Ethereum" },
    { label: "Market Overview", query: "Give me an overview of crypto markets today" },
    { label: "On-Chain Data", query: "Show me on-chain metrics for major cryptocurrencies" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-charcoal-950 via-charcoal-900 to-charcoal-950 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-80' : 'w-16'} transition-all duration-300 bg-gradient-to-b from-charcoal-900 to-charcoal-800 border-r border-charcoal-700 flex flex-col`}>
        {/* Sidebar Header */}
        <div className="p-6 border-b border-charcoal-700">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-lime-400 rounded-xl flex items-center justify-center shadow-lg shadow-lime-400/20">
                <Bot className="w-6 h-6 text-charcoal-950" />
              </div>
              {sidebarOpen && <span className="text-2xl font-bold text-charcoal-100">Juno</span>}
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-charcoal-400 hover:text-lime-400"
            >
              <MessageSquare className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {sidebarOpen && (
          <>
            {/* Market Data */}
            <div className="p-6 border-b border-charcoal-700">
              <h3 className="text-lg font-semibold text-charcoal-100 mb-4">Live Markets</h3>
              <div className="space-y-3">
                {Object.entries(marketData).map(([symbol, data]) => (
                  <div key={symbol} className="bg-charcoal-800 rounded-lg p-3 hover:bg-charcoal-750 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-lime-400/20 rounded-full flex items-center justify-center">
                          <Coins className="w-4 h-4 text-lime-400" />
                        </div>
                        <span className="font-medium text-charcoal-100">{symbol}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-charcoal-100 font-semibold">
                          ${data.usd?.toLocaleString()}
                        </div>
                        <div className={`text-xs ${data.usd_24h_change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {data.usd_24h_change >= 0 ? '+' : ''}{data.usd_24h_change?.toFixed(2)}%
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Agents Status */}
            <div className="p-6 border-b border-charcoal-700">
              <h3 className="text-lg font-semibold text-charcoal-100 mb-4">AI Agents</h3>
              <div className="space-y-3">
                {[
                  { name: "Sentiment", icon: TrendingUp, status: "active", color: "text-green-400" },
                  { name: "Technical", icon: BarChart3, status: "active", color: "text-green-400" },
                  { name: "Macro", icon: Globe, status: "active", color: "text-green-400" },
                  { name: "On-Chain", icon: Activity, status: "active", color: "text-green-400" },
                  { name: "Advisor", icon: Brain, status: "active", color: "text-lime-400" }
                ].map((agent) => (
                  <div key={agent.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-charcoal-800 rounded-lg flex items-center justify-center">
                        <agent.icon className="w-4 h-4 text-charcoal-300" />
                      </div>
                      <span className="text-charcoal-300 text-sm">{agent.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${agent.color} animate-pulse`}></div>
                      <span className={`text-xs ${agent.color}`}>Online</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="p-6 flex-1">
              <h3 className="text-lg font-semibold text-charcoal-100 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full justify-start text-charcoal-400 hover:text-lime-400 hover:bg-charcoal-800 text-sm"
                    onClick={() => setInput(action.query)}
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    {action.label}
                  </Button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b border-charcoal-800 bg-charcoal-950/50 backdrop-blur-sm">
          <div className="px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-charcoal-100">AI Research Console</h1>
                <p className="text-charcoal-400 text-sm">Multi-agent crypto analysis powered by advanced AI</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-charcoal-800 rounded-lg px-3 py-1.5">
                <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse"></div>
                <span className="text-charcoal-300 text-sm">5 Agents Online</span>
              </div>
              <Badge variant="outline" className="border-lime-400/50 text-lime-400 bg-lime-400/10">
                Free Tier
              </Badge>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-charcoal-600 text-charcoal-300 hover:border-lime-400/50 hover:text-lime-400"
              >
                <Users className="w-4 h-4 mr-2" />
                Connect Wallet
              </Button>
            </div>
          </div>
        </header>

        {/* Chat Messages Area */}
        <div className="flex-1 flex">
          {/* Messages */}
          <div className="flex-1 flex flex-col">
            <ScrollArea className="flex-1 px-8 py-6">
              <div className="max-w-4xl mx-auto space-y-8">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-3xl ${message.type === 'user' ? 'bg-lime-400 text-charcoal-950' : message.isError ? 'bg-red-900/50 border border-red-800 text-red-100' : 'bg-gradient-to-br from-charcoal-900 to-charcoal-800 text-charcoal-100 border border-charcoal-700'} rounded-2xl p-6 shadow-lg`}>
                      {/* Message Header */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-8 h-8 ${message.type === 'user' ? 'bg-charcoal-950/20' : 'bg-lime-400'} rounded-lg flex items-center justify-center`}>
                          {message.type === 'user' ? (
                            <Users className="w-4 h-4" />
                          ) : (
                            <Bot className="w-4 h-4 text-charcoal-950" />
                          )}
                        </div>
                        <div>
                          <div className="font-semibold">
                            {message.type === 'user' ? 'You' : 'Juno AI'}
                          </div>
                          <div className={`text-xs ${message.type === 'user' ? 'text-charcoal-700' : 'text-charcoal-500'}`}>
                            {message.timestamp.toLocaleTimeString()}
                          </div>
                        </div>
                      </div>

                      {/* Message Content */}
                      <div className="whitespace-pre-wrap leading-relaxed">{message.content}</div>
                      
                      {/* Research Data Visualization */}
                      {message.research && (
                        <div className="mt-6 space-y-6">
                          <Separator className="bg-charcoal-600" />
                          
                          {/* Market Analysis Summary */}
                          <div className="bg-charcoal-800/50 rounded-xl p-4 border border-charcoal-600">
                            <div className="flex items-center gap-3 mb-3">
                              <TrendingUp className="w-5 h-5 text-lime-400" />
                              <h4 className="font-semibold text-charcoal-200">Market Analysis</h4>
                            </div>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                              <div className="text-center">
                                <div className="text-charcoal-400 mb-1">Asset</div>
                                <div className="font-semibold text-charcoal-200">{message.research.market_view.asset}</div>
                              </div>
                              <div className="text-center">
                                <div className="text-charcoal-400 mb-1">Timeframe</div>
                                <div className="font-semibold text-charcoal-200">{message.research.market_view.timeframe}</div>
                              </div>
                              <div className="text-center">
                                <div className="text-charcoal-400 mb-1">Bias</div>
                                <Badge className={`${message.research.market_view.bias === 'bullish' ? 'bg-green-500' : message.research.market_view.bias === 'bearish' ? 'bg-red-500' : 'bg-gray-500'} text-white`}>
                                  {message.research.market_view.bias}
                                </Badge>
                              </div>
                              <div className="text-center">
                                <div className="text-charcoal-400 mb-1">Conviction</div>
                                <div className="font-semibold text-lime-400">{message.research.market_view.conviction}%</div>
                              </div>
                            </div>
                          </div>

                          {/* Agent Analysis Grid */}
                          <div>
                            <div className="flex items-center gap-3 mb-4">
                              <Brain className="w-5 h-5 text-lime-400" />
                              <h4 className="font-semibold text-charcoal-200">Multi-Agent Analysis</h4>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {message.research.agent_evidence.map((agent, index) => (
                                <div key={index} className="bg-charcoal-800/30 rounded-xl p-4 border border-charcoal-600/50">
                                  <div className="flex justify-between items-start mb-3">
                                    <div className="flex items-center gap-2">
                                      <div className="w-8 h-8 bg-lime-400/20 rounded-lg flex items-center justify-center">
                                        {agent.agent === 'Sentiment' && <TrendingUp className="w-4 h-4 text-lime-400" />}
                                        {agent.agent === 'Technical' && <BarChart3 className="w-4 h-4 text-lime-400" />}
                                        {agent.agent === 'Macro' && <Globe className="w-4 h-4 text-lime-400" />}
                                        {agent.agent === 'On-Chain' && <Activity className="w-4 h-4 text-lime-400" />}
                                      </div>
                                      <span className="font-medium text-charcoal-200">{agent.agent}</span>
                                    </div>
                                    <Badge variant="outline" className="text-xs border-charcoal-600 text-charcoal-400">
                                      {agent.confidence}% confidence
                                    </Badge>
                                  </div>
                                  
                                  <div className="flex items-center gap-3 mb-3">
                                    <div className="flex items-center gap-2">
                                      {agent.score > 0 ? (
                                        <TrendingUp className="w-4 h-4 text-green-400" />
                                      ) : agent.score < 0 ? (
                                        <TrendingDown className="w-4 h-4 text-red-400" />
                                      ) : (
                                        <Activity className="w-4 h-4 text-gray-400" />
                                      )}
                                      <span className={`font-semibold ${agent.score > 0 ? 'text-green-400' : agent.score < 0 ? 'text-red-400' : 'text-gray-400'}`}>
                                        {agent.score > 0 ? '+' : ''}{agent.score.toFixed(1)}
                                      </span>
                                    </div>
                                    
                                    {/* Score visualization bar */}
                                    <div className="flex-1 bg-charcoal-700 rounded-full h-2">
                                      <div 
                                        className={`h-2 rounded-full ${agent.score > 0 ? 'bg-green-400' : agent.score < 0 ? 'bg-red-400' : 'bg-gray-400'}`}
                                        style={{ width: `${Math.abs(agent.score) * 25}%` }}
                                      ></div>
                                    </div>
                                  </div>
                                  
                                  {agent.highlights.length > 0 && (
                                    <div className="text-xs text-charcoal-400">
                                      {agent.highlights[0]}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Recommendations */}
                          {message.research.recommendations.length > 0 && (
                            <div>
                              <div className="flex items-center gap-3 mb-4">
                                <Shield className="w-5 h-5 text-lime-400" />
                                <h4 className="font-semibold text-charcoal-200">Recommendations</h4>
                              </div>
                              <div className="bg-gradient-to-r from-lime-400/10 to-lime-400/5 rounded-xl p-4 border border-lime-400/20">
                                <div className="grid md:grid-cols-3 gap-4 text-sm">
                                  <div>
                                    <div className="text-charcoal-400 mb-1">Entry Zone</div>
                                    <div className="font-semibold text-charcoal-200">{message.research.recommendations[0].entry_zone}</div>
                                  </div>
                                  <div>
                                    <div className="text-charcoal-400 mb-1">Risk/Reward</div>
                                    <div className="font-semibold text-lime-400">{message.research.recommendations[0].r_r}:1</div>
                                  </div>
                                  <div>
                                    <div className="text-charcoal-400 mb-1">Win Probability</div>
                                    <div className="font-semibold text-lime-400">{(message.research.recommendations[0].probability_win * 100).toFixed(0)}%</div>
                                  </div>
                                </div>
                                <div className="mt-3 text-xs text-charcoal-400">
                                  {message.research.recommendations[0].fit_for_user}
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Action Buttons */}
                          <div className="flex gap-3 pt-2">
                            <Button size="sm" variant="outline" className="border-charcoal-600 text-charcoal-300 hover:border-lime-400/50">
                              <BarChart3 className="w-4 h-4 mr-2" />
                              View Chart
                            </Button>
                            <Button size="sm" variant="outline" className="border-charcoal-600 text-charcoal-300 hover:border-lime-400/50">
                              <TrendingUp className="w-4 h-4 mr-2" />
                              Backtest
                            </Button>
                            <Button size="sm" variant="outline" className="border-charcoal-600 text-charcoal-300 hover:border-lime-400/50">
                              <Activity className="w-4 h-4 mr-2" />
                              Set Alert
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-gradient-to-br from-charcoal-900 to-charcoal-800 text-charcoal-100 rounded-2xl p-6 border border-charcoal-700 shadow-lg max-w-lg">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 bg-lime-400 rounded-lg flex items-center justify-center">
                          <Bot className="w-4 h-4 text-charcoal-950" />
                        </div>
                        <div>
                          <div className="font-semibold">Juno AI</div>
                          <div className="text-xs text-charcoal-500">Processing...</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-lime-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                          <div className="w-2 h-2 bg-lime-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                          <div className="w-2 h-2 bg-lime-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                        </div>
                        <span className="text-charcoal-400">Coordinating multi-agent analysis...</span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="border-t border-charcoal-800 bg-charcoal-950/50 backdrop-blur-sm p-6">
              <div className="max-w-4xl mx-auto">
                <div className="relative">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about crypto markets, technical analysis, sentiment, or on-chain data..."
                    className="flex-1 bg-charcoal-900 border-charcoal-700 text-charcoal-100 placeholder-charcoal-500 pr-20 py-4 text-base rounded-xl focus:border-lime-400/50 focus:ring-lime-400/20"
                    disabled={loading}
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <Button 
                      size="sm"
                      variant="ghost"
                      className="text-charcoal-500 hover:text-lime-400"
                      onClick={() => setInput("/help")}
                    >
                      <MessageSquare className="w-4 h-4" />
                    </Button>
                    <Button 
                      onClick={sendMessage}
                      disabled={loading || !input.trim()}
                      className="bg-lime-400 text-charcoal-950 hover:bg-lime-300 disabled:bg-charcoal-700 disabled:text-charcoal-500 px-4 py-2 rounded-lg"
                    >
                      {loading ? (
                        <div className="w-4 h-4 border-2 border-charcoal-950 border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <ArrowRight className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
                
                {/* Quick suggestions */}
                <div className="flex gap-2 mt-3 flex-wrap">
                  {quickActions.slice(0, 3).map((action, index) => (
                    <Button
                      key={index}
                      size="sm"
                      variant="ghost"
                      className="text-charcoal-400 hover:text-lime-400 hover:bg-charcoal-800 text-xs"
                      onClick={() => setInput(action.query)}
                      disabled={loading}
                    >
                      {action.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Tech Visualization */}
          <div className="w-80 border-l border-charcoal-800 bg-gradient-to-b from-charcoal-900 to-charcoal-800 p-6">
            <h3 className="text-lg font-semibold text-charcoal-100 mb-6">AI Network Status</h3>
            
            {/* Neural Network Visualization */}
            <div className="mb-6">
              <img 
                src="https://images.unsplash.com/photo-1645839057098-5ea8761a6b09?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwxfHxBSSUyMG5ldXJhbCUyMG5ldHdvcmt8ZW58MHx8fHwxNzU1NTg3NjA2fDA&ixlib=rb-4.1.0&q=85" 
                alt="AI Neural Network" 
                className="rounded-xl w-full h-40 object-cover opacity-80"
              />
              <div className="mt-3 text-center">
                <div className="text-lime-400 font-semibold">Network Active</div>
                <div className="text-charcoal-400 text-sm">Processing 1,247 data points/sec</div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="space-y-4 mb-6">
              <div className="bg-charcoal-800 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-charcoal-300 text-sm">Response Time</span>
                  <span className="text-lime-400 font-semibold">2.3s</span>
                </div>
                <div className="bg-charcoal-700 rounded-full h-2">
                  <div className="bg-lime-400 rounded-full h-2" style={{width: '85%'}}></div>
                </div>
              </div>

              <div className="bg-charcoal-800 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-charcoal-300 text-sm">Accuracy Score</span>
                  <span className="text-lime-400 font-semibold">94.2%</span>
                </div>
                <div className="bg-charcoal-700 rounded-full h-2">
                  <div className="bg-lime-400 rounded-full h-2" style={{width: '94%'}}></div>
                </div>
              </div>

              <div className="bg-charcoal-800 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-charcoal-300 text-sm">Data Coverage</span>
                  <span className="text-lime-400 font-semibold">98.7%</span>
                </div>
                <div className="bg-charcoal-700 rounded-full h-2">
                  <div className="bg-lime-400 rounded-full h-2" style={{width: '98%'}}></div>
                </div>
              </div>
            </div>

            {/* Recent Insights */}
            <div>
              <h4 className="text-charcoal-100 font-semibold mb-3">Recent Insights</h4>
              <div className="space-y-3 text-xs">
                <div className="bg-charcoal-800/50 rounded-lg p-3">
                  <div className="text-lime-400 font-medium mb-1">BTC Sentiment Shift</div>
                  <div className="text-charcoal-400">Detected 15% increase in positive sentiment over 4h</div>
                </div>
                <div className="bg-charcoal-800/50 rounded-lg p-3">
                  <div className="text-lime-400 font-medium mb-1">ETH On-Chain Activity</div>
                  <div className="text-charcoal-400">Whale accumulation pattern identified</div>
                </div>
                <div className="bg-charcoal-800/50 rounded-lg p-3">
                  <div className="text-lime-400 font-medium mb-1">Macro Alert</div>
                  <div className="text-charcoal-400">Fed policy expectations shifting</div>
                </div>
              </div>
            </div>
          </div>
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