import requests
import sys
import json
import time
from datetime import datetime

class JunoAPITester:
    def __init__(self, base_url="https://multi-agent-research.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.session_id = None

    def run_test(self, name, method, endpoint, expected_status, data=None, timeout=30):
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}" if endpoint else f"{self.api_url}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=timeout)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=timeout)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"   Response keys: {list(response_data.keys()) if isinstance(response_data, dict) else 'Non-dict response'}")
                    return True, response_data
                except:
                    return True, response.text
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    error_data = response.json()
                    print(f"   Error: {error_data}")
                except:
                    print(f"   Error text: {response.text}")
                return False, {}

        except requests.exceptions.Timeout:
            print(f"❌ Failed - Request timed out after {timeout} seconds")
            return False, {}
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_root_endpoint(self):
        """Test GET /api/ endpoint"""
        success, response = self.run_test(
            "Root API Endpoint",
            "GET",
            "",
            200
        )
        if success and isinstance(response, dict):
            expected_message = "Juno Research API"
            actual_message = response.get('message', '')
            if expected_message in actual_message:
                print(f"   ✅ Correct message: {actual_message}")
                return True
            else:
                print(f"   ❌ Unexpected message: {actual_message}")
                return False
        return success

    def test_research_endpoint_btc(self):
        """Test POST /api/research endpoint with BTC query"""
        success, response = self.run_test(
            "Research Endpoint - BTC Analysis",
            "POST",
            "research",
            200,
            data={
                "query": "Analyze Bitcoin market conditions",
                "asset": "BTC",
                "timeframe": "1d"
            },
            timeout=60  # Longer timeout for AI processing
        )
        
        if success and isinstance(response, dict):
            # Check required fields in response
            required_fields = ['summary', 'market_view', 'recommendations', 'agent_evidence', 'disclosures']
            missing_fields = [field for field in required_fields if field not in response]
            
            if not missing_fields:
                print(f"   ✅ All required fields present")
                
                # Check agent evidence
                agents = [agent['agent'] for agent in response.get('agent_evidence', [])]
                expected_agents = ['Sentiment', 'Technical', 'Macro', 'On-Chain']
                found_agents = [agent for agent in expected_agents if agent in agents]
                print(f"   Agents found: {found_agents}")
                
                # Check market view
                market_view = response.get('market_view', {})
                if market_view.get('asset') == 'BTC':
                    print(f"   ✅ Market view for BTC: {market_view.get('bias')} bias")
                
                return True
            else:
                print(f"   ❌ Missing fields: {missing_fields}")
                return False
        return success

    def test_research_endpoint_eth(self):
        """Test POST /api/research endpoint with ETH query"""
        success, response = self.run_test(
            "Research Endpoint - ETH Analysis",
            "POST",
            "research",
            200,
            data={
                "query": "Analyze Ethereum market trends",
                "asset": "ETH",
                "timeframe": "1d"
            },
            timeout=60
        )
        
        if success and isinstance(response, dict):
            market_view = response.get('market_view', {})
            if market_view.get('asset') == 'ETH':
                print(f"   ✅ Market view for ETH: {market_view.get('bias')} bias")
                return True
        return success

    def test_chat_endpoint(self):
        """Test POST /api/chat endpoint"""
        success, response = self.run_test(
            "Chat Endpoint - BTC Query",
            "POST",
            "chat",
            200,
            data={
                "message": "Analyze BTC",
                "session_id": None
            },
            timeout=60
        )
        
        if success and isinstance(response, dict):
            # Store session ID for future tests
            self.session_id = response.get('session_id')
            print(f"   Session ID: {self.session_id}")
            
            # Check response structure
            research_response = response.get('response')
            if research_response and isinstance(research_response, dict):
                print(f"   ✅ Research response received")
                summary = research_response.get('summary', '')
                if 'BTC' in summary or 'Bitcoin' in summary:
                    print(f"   ✅ Summary mentions BTC: {summary[:100]}...")
                    return True
        return success

    def test_chat_follow_up(self):
        """Test follow-up chat message with existing session"""
        if not self.session_id:
            print("   ⚠️  Skipping - No session ID from previous test")
            return False
            
        success, response = self.run_test(
            "Chat Follow-up - ETH Query",
            "POST",
            "chat",
            200,
            data={
                "message": "Now analyze ETH",
                "session_id": self.session_id
            },
            timeout=60
        )
        
        if success and isinstance(response, dict):
            research_response = response.get('response')
            if research_response:
                market_view = research_response.get('market_view', {})
                if market_view.get('asset') == 'ETH':
                    print(f"   ✅ Follow-up query processed for ETH")
                    return True
        return success

    def test_market_data_btc(self):
        """Test GET /api/market/BTC endpoint"""
        success, response = self.run_test(
            "Market Data - BTC",
            "GET",
            "market/BTC",
            200
        )
        
        if success and isinstance(response, dict):
            # Check for price data
            if 'usd' in response:
                price = response.get('usd')
                print(f"   ✅ BTC Price: ${price}")
                return True
            else:
                print(f"   ❌ No USD price in response: {response}")
        return success

    def test_market_data_eth(self):
        """Test GET /api/market/ETH endpoint"""
        success, response = self.run_test(
            "Market Data - ETH",
            "GET",
            "market/ETH",
            200
        )
        
        if success and isinstance(response, dict):
            if 'usd' in response:
                price = response.get('usd')
                print(f"   ✅ ETH Price: ${price}")
                return True
        return success

    def test_chat_history(self):
        """Test GET /api/chat/history/{session_id} endpoint"""
        if not self.session_id:
            print("   ⚠️  Skipping - No session ID available")
            return False
            
        success, response = self.run_test(
            "Chat History",
            "GET",
            f"chat/history/{self.session_id}",
            200
        )
        
        if success and isinstance(response, list):
            print(f"   ✅ Chat history retrieved: {len(response)} messages")
            return True
        return success

    def test_invalid_endpoint(self):
        """Test invalid endpoint for error handling"""
        success, response = self.run_test(
            "Invalid Endpoint (Error Handling)",
            "GET",
            "invalid/endpoint",
            404
        )
        return success

    def test_agent_evidence_structure(self):
        """Test that agent evidence has proper structure"""
        print(f"\n🔍 Testing Agent Evidence Structure...")
        
        success, response = self.run_test(
            "Agent Evidence Structure",
            "POST",
            "research",
            200,
            data={
                "query": "Quick BTC analysis for testing",
                "asset": "BTC"
            },
            timeout=60
        )
        
        if success and isinstance(response, dict):
            agent_evidence = response.get('agent_evidence', [])
            if not agent_evidence:
                print(f"   ❌ No agent evidence found")
                return False
                
            print(f"   Found {len(agent_evidence)} agents")
            
            for agent in agent_evidence:
                agent_name = agent.get('agent', 'Unknown')
                score = agent.get('score', 0)
                confidence = agent.get('confidence', 0)
                highlights = agent.get('highlights', [])
                sources = agent.get('sources', [])
                
                print(f"   Agent: {agent_name}")
                print(f"     Score: {score} (-2 to +2)")
                print(f"     Confidence: {confidence}% (0-100)")
                print(f"     Highlights: {len(highlights)} items")
                print(f"     Sources: {len(sources)} items")
                
                # Validate score range
                if not (-2 <= score <= 2):
                    print(f"     ❌ Score out of range: {score}")
                    return False
                    
                # Validate confidence range
                if not (0 <= confidence <= 100):
                    print(f"     ❌ Confidence out of range: {confidence}")
                    return False
                    
            print(f"   ✅ All agent evidence properly structured")
            return True
        return success

def main():
    print("🚀 Starting Juno API Testing Suite")
    print("=" * 50)
    
    tester = JunoAPITester()
    
    # Run all tests
    test_results = []
    
    # Basic API tests
    test_results.append(tester.test_root_endpoint())
    test_results.append(tester.test_market_data_btc())
    test_results.append(tester.test_market_data_eth())
    
    # Research endpoint tests
    test_results.append(tester.test_research_endpoint_btc())
    test_results.append(tester.test_research_endpoint_eth())
    
    # Chat functionality tests
    test_results.append(tester.test_chat_endpoint())
    test_results.append(tester.test_chat_follow_up())
    test_results.append(tester.test_chat_history())
    
    # Agent structure validation
    test_results.append(tester.test_agent_evidence_structure())
    
    # Error handling test
    test_results.append(tester.test_invalid_endpoint())
    
    # Print final results
    print("\n" + "=" * 50)
    print("📊 FINAL TEST RESULTS")
    print("=" * 50)
    print(f"Tests Run: {tester.tests_run}")
    print(f"Tests Passed: {tester.tests_passed}")
    print(f"Success Rate: {(tester.tests_passed/tester.tests_run*100):.1f}%")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 ALL TESTS PASSED!")
        return 0
    else:
        failed_tests = tester.tests_run - tester.tests_passed
        print(f"❌ {failed_tests} TESTS FAILED")
        return 1

if __name__ == "__main__":
    sys.exit(main())