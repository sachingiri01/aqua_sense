'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import ChatWindow from '@/components/ChatWindow';
import RightPanel from '@/components/RightPanel';
import Header from '@/components/Header';
import ClientAuth from "@/components/auth/ClientAuth";

export default function AIChatPage() {
  // Available AI agents with Indian context
  const [agents] = useState([
    {
      id: 1,
      name: 'Decision Agent',
      type: 'decision',
      icon: '🧠',
      shortDesc: 'Clear ML-driven water routing decisions',
      description: 'Provides clear, confident, data-driven decisions for water routing',
      status: 'active',
      personality: 'Clear, confident, to the point'
    },
    {
      id: 2,
      name: 'Simulation Agent',
      type: 'simulation',
      icon: '🌊',
      shortDesc: 'Visual water flow simulations',
      description: 'Creates detailed simulations of water treatment outcomes',
      status: 'active',
      personality: 'Visual, descriptive, explains outcomes in detail'
    },
    {
      id: 3,
      name: 'Quality Insights Agent',
      type: 'quality',
      icon: '🌀',
      shortDesc: 'Scientific water quality analysis',
      description: 'Analyzes water quality with scientific precision',
      status: 'active',
      personality: 'Scientific, analytical tone'
    },
    {
      id: 4,
      name: 'Routing Advisor',
      type: 'routing',
      icon: '⚙️',
      shortDesc: 'Operational plant routing guidance',
      description: 'Provides operational guidance for water plant operators',
      status: 'active',
      personality: 'Operational, plant-operator-friendly tone'
    },
    {
      id: 5,
      name: 'Prediction Agent',
      type: 'prediction',
      icon: '🔮',
      shortDesc: 'Forecast water conditions',
      description: 'Predicts future water conditions and treatment needs',
      status: 'active',
      personality: 'Forward-thinking, data-driven forecasting'
    },
    {
      id: 6,
      name: 'Optimization Agent',
      type: 'optimization',
      icon: '💡',
      shortDesc: 'Maximize water reuse efficiency',
      description: 'Optimizes water reuse for Indian agriculture and industries',
      status: 'active',
      personality: 'Efficiency-focused, practical solutions'
    },
  ]);

  const [activeAgent, setActiveAgent] = useState(agents[0]);
  const [messages, setMessages] = useState([]);
  const [rightPanelOpen, setRightPanelOpen] = useState(false);

  // Sample responses based on agent personality
  const getAgentResponse = (userMessage, agent) => {
    const responses = {
      decision: [
        'Based on current water quality parameters (pH: 7.2, TDS: 450 ppm), I recommend routing to agricultural reuse. This decision optimizes water conservation for Indian farming needs.',
        'Analysis complete: The ML model suggests primary filtration path with 94% confidence. This route minimizes treatment costs while maintaining quality standards.',
        'Decision: Redirect flow to cooling system. Current turbidity (12 NTU) is within acceptable range for industrial cooling applications in Indian climate.',
      ],
      simulation: [
        'Running simulation... The water flow through secondary treatment shows 85% pollutant removal. Visual model indicates optimal performance at current flow rate of 150 L/min.',
        'Simulation results: If we increase pressure by 15%, we can improve filtration efficiency by 22%. The 3D model shows reduced backwash frequency, saving 2000L daily.',
        'Analyzing treatment stages... The simulation predicts excellent reuse potential for irrigation. Flow visualization shows uniform distribution across all zones.',
      ],
      quality: [
        'Water quality analysis: pH 7.4 (optimal), TDS 380 ppm (acceptable), Turbidity 8 NTU (good). Dissolved Oxygen at 6.2 mg/L indicates healthy water for agricultural reuse.',
        'Scientific assessment: BOD levels at 15 mg/L meet Indian standards for industrial reuse. Chemical composition suggests suitability for textile industry applications.',
        'Quality parameters indicate Grade-A reuse water. Microbial analysis shows 99.5% pathogen removal. Safe for irrigation of food crops per Indian agricultural guidelines.',
      ],
      routing: [
        'For operators: Open valve V-203, maintain pressure at 3.5 bar. Expected flow to irrigation sector will be 180 L/min. Monitor TDS at checkpoint C-4.',
        'Operational guidance: Switch to auto-mode for next 6 hours. The system will optimize routing based on real-time demand from connected industries and farms.',
        'Plant status: All systems normal. Recommendation: Perform backwash on Filter-2 in next 2 hours. Current loading is at 78% capacity, well within safe operating limits.',
      ],
      prediction: [
        'Forecast for next 6 hours: Inlet TDS will increase by 12% due to industrial discharge upstream. Recommend activating secondary treatment by 2 PM.',
        'Predictive analysis: Rainfall expected in 4 hours will reduce inlet turbidity by 40%. Adjust filtration parameters accordingly to maintain efficiency.',
        'Based on historical patterns, water demand from agricultural sector will peak at 6 AM tomorrow. Pre-treat 5000L additional capacity for optimal supply.',
      ],
      optimization: [
        'Optimization complete: By adjusting routing schedule, we can save 3200L daily. Suggest reusing 60% for agriculture and 40% for industrial cooling.',
        'Efficiency improvement identified: Reduce treatment chemical usage by 18% through better pH control. Annual cost savings estimated at ₹2.5 lakhs.',
        'Smart routing activated: Prioritizing water reuse for nearby farms during irrigation season. This maximizes social impact and reduces freshwater withdrawal by 45%.',
      ],
    };

    const agentResponses = responses[agent.type] || responses.decision;
    return agentResponses[Math.floor(Math.random() * agentResponses.length)];
  };

  const handleAgentSelect = (agent) => {
    setActiveAgent(agent);
    setMessages([
      {
        text: `Hello! I'm ${agent.name}. ${agent.description} How can I help you optimize India's water resources today?`,
        isUser: false,
        timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        agentIcon: agent.icon,
      }
    ]);
  };

  const handleSendMessage = (text) => {
    // Add user message
    const userMessage = {
      text,
      isUser: true,
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);

    // Simulate agent response
    setTimeout(() => {
      const agentMessage = {
        text: getAgentResponse(text, activeAgent),
        isUser: false,
        timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        agentIcon: activeAgent.icon,
      };
      setMessages((prev) => [...prev, agentMessage]);
    }, 1000);
  };

  const handleClearConversation = () => {
    setMessages([]);
  };

  const handleAddCustomAgent = () => {
    alert('Custom agent creation coming soon! This feature will allow you to train specialized agents for specific water treatment scenarios.');
  };

  return (
    <ClientAuth>
    //  <main className="flex flex-col min-h-screen">
    //   <Header/>
    <div className="flex flex-1 h-screen overflow-hidden bg-shakespeare-50 ">
      {/* Left Sidebar */}
      <Sidebar
        agents={agents}
        activeAgent={activeAgent}
        onAgentSelect={handleAgentSelect}
        onAddCustomAgent={handleAddCustomAgent}
      />

      {/* Main Chat Area */}
      <ChatWindow
        activeAgent={activeAgent}
        messages={messages}
        onSendMessage={handleSendMessage}
        onClearConversation={handleClearConversation}
      />

      {/* Right Info Panel */}
      <RightPanel
        isOpen={rightPanelOpen}
        onToggle={() => setRightPanelOpen(!rightPanelOpen)}
        activeAgent={activeAgent}
      />
    </div>
    // </main>
    </ClientAuth>
  );
}
