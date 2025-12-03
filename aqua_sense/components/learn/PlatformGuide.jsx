"use client";

import { motion } from 'framer-motion';
import { 
  Monitor, Gauge, Brain, TrendingUp, Settings, Bell, 
  FileText, Users, Zap, CheckCircle, ArrowRight, Play,
  BarChart3, Droplets, Activity, AlertTriangle
} from 'lucide-react';

const guideSteps = [
  {
    id: 'dashboard',
    icon: Monitor,
    title: 'Monitor Your Dashboard',
    description: 'Real-time overview of all water quality parameters',
    color: 'from-royal-blue to-aqua-teal',
    steps: [
      'View live TDS, turbidity, pH, and DO readings',
      'Check treatment plant performance metrics',
      'Monitor water flow rates and volumes',
      'Track reuse water quality scores'
    ],
    visual: '📊'
  },
  {
    id: 'sensors',
    icon: Gauge,
    title: 'Read Sensor Data',
    description: 'Understand IoT sensor readings and what they mean',
    color: 'from-shakespeare-500 to-shakespeare-700',
    steps: [
      'TDS (Total Dissolved Solids): Should be <500 ppm for reuse',
      'Turbidity: Cloudiness level, aim for <5 NTU',
      'pH Level: Keep between 6.5-8.5 for safe water',
      'DO (Dissolved Oxygen): Important for biological treatment'
    ],
    visual: '📡'
  },
  {
    id: 'ai-agents',
    icon: Brain,
    title: 'Work with AI Agents',
    description: 'Get intelligent recommendations from AquaSense AI',
    color: 'from-orange-accent to-royal-blue',
    steps: [
      'Ask the Decision Agent for routing recommendations',
      'Use Simulation Agent to predict treatment outcomes',
      'Check Quality Insights for water safety analysis',
      'Consult Routing Advisor for optimal water distribution'
    ],
    visual: '🤖'
  },
  {
    id: 'predictions',
    icon: TrendingUp,
    title: 'Understand ML Predictions',
    description: 'Machine learning forecasts help you plan ahead',
    color: 'from-aqua-teal to-shakespeare-600',
    steps: [
      'View 24-hour quality predictions for each treatment stage',
      'Check suitability scores for different reuse applications',
      'Review predicted maintenance needs before failures occur',
      'Plan water routing based on forecasted quality'
    ],
    visual: '📈'
  },
  {
    id: 'alerts',
    icon: Bell,
    title: 'Respond to Alerts',
    description: 'Handle warnings and take corrective actions',
    color: 'from-red-500 to-orange-600',
    steps: [
      'Red Alert: Immediate action needed (contamination detected)',
      'Yellow Warning: Monitor closely (parameter trending outside range)',
      'Blue Info: Routine notification (maintenance scheduled)',
      'Acknowledge alerts and log your actions'
    ],
    visual: '🔔'
  },
  {
    id: 'reports',
    icon: FileText,
    title: 'Generate Reports',
    description: 'Create compliance and performance reports',
    color: 'from-shakespeare-600 to-shakespeare-800',
    steps: [
      'Daily water quality summary reports',
      'Weekly treatment plant efficiency reports',
      'Monthly reuse volume and savings reports',
      'Export data for regulatory compliance'
    ],
    visual: '📋'
  }
];

const quickActions = [
  { icon: Play, label: 'Start Monitoring', color: 'bg-royal-blue' },
  { icon: Brain, label: 'Ask AI Agent', color: 'bg-orange-accent' },
  { icon: Settings, label: 'Configure Alerts', color: 'bg-shakespeare-600' },
  { icon: BarChart3, label: 'View Reports', color: 'bg-aqua-teal' }
];

const keyMetrics = [
  { icon: Droplets, label: 'Water Quality', value: 'TDS, pH, Turbidity', color: 'text-shakespeare-600' },
  { icon: Activity, label: 'Plant Performance', value: 'Efficiency, Flow Rate', color: 'text-aqua-teal' },
  { icon: AlertTriangle, label: 'Alert Status', value: 'Active Warnings', color: 'text-orange-accent' },
  { icon: CheckCircle, label: 'Reuse Ready', value: 'Volume & Quality', color: 'text-green-600' }
];

export default function PlatformGuide() {
  return (
    <section className="relative py-32 bg-gradient-to-b from-shakespeare-100 via-shakespeare-50 to-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 water-texture opacity-20"></div>
      <div className="caustic-overlay"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-royal-blue/10 border border-royal-blue/30 mb-6"
          >
            <Users className="w-5 h-5 text-royal-blue" />
            <span className="text-sm font-bold text-royal-blue uppercase tracking-wide">For Employees</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-7xl font-display font-black text-shakespeare-900 mb-6">
            How to Use{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal-blue via-aqua-teal to-orange-accent">
              AquaSense Platform
            </span>
          </h2>
          <p className="text-xl text-shakespeare-700 max-w-3xl mx-auto leading-relaxed">
            A complete guide for plant operators, engineers, and water management teams
          </p>
        </motion.div>

        {/* Key Metrics Overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {keyMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glassmorphism-strong p-6 rounded-2xl border-2 border-shakespeare-300/30 shadow-xl text-center"
            >
              <metric.icon className={`w-10 h-10 ${metric.color} mx-auto mb-3`} />
              <h3 className="font-bold text-shakespeare-900 mb-2">{metric.label}</h3>
              <p className="text-sm text-shakespeare-600">{metric.value}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Guide Steps */}
        <div className="max-w-7xl mx-auto space-y-16 mb-20">
          {guideSteps.map((step, index) => {
            const isEven = index % 2 === 0;
            
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6 }}
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center`}
              >
                {/* Visual/Icon Side */}
                <div className="flex-1">
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    className={`relative glassmorphism-strong p-12 rounded-3xl border-2 border-shakespeare-400/30 shadow-2xl bg-gradient-to-br ${step.color}`}
                  >
                    <div className="relative z-10">
                      <div className="w-32 h-32 mx-auto bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-6 shadow-xl">
                        <step.icon className="w-16 h-16 text-white" />
                      </div>
                      <div className="text-center">
                        <span className="text-8xl">{step.visual}</span>
                      </div>
                    </div>
                    
                    {/* Floating particles */}
                    <div className="absolute inset-0 overflow-hidden rounded-3xl">
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-3 h-3 bg-white/30 rounded-full"
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                          }}
                          animate={{
                            y: [0, -30, 0],
                            opacity: [0.3, 0.8, 0.3],
                          }}
                          transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: i * 0.5,
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Content Side */}
                <div className="flex-1">
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="glassmorphism p-10 rounded-3xl border-2 border-shakespeare-300/30 shadow-xl"
                  >
                    {/* Step Number */}
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} text-white font-bold text-xl mb-6 shadow-lg`}>
                      {index + 1}
                    </div>

                    {/* Title */}
                    <h3 className="text-3xl font-display font-black text-shakespeare-900 mb-4">
                      {step.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-lg text-shakespeare-700 mb-6 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Steps List */}
                    <ul className="space-y-4">
                      {step.steps.map((substep, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex items-start gap-3 group"
                        >
                          <div className={`mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                            <CheckCircle className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-shakespeare-800 font-medium leading-relaxed">
                            {substep}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Actions CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative glassmorphism-strong p-12 rounded-3xl border-2 border-shakespeare-400/30 shadow-2xl text-center overflow-hidden"
        >
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-royal-blue/5 via-aqua-teal/5 to-orange-accent/5 animate-water-flow"></div>
          
          <div className="relative z-10">
            <h3 className="text-4xl font-display font-black text-shakespeare-900 mb-6">
              Ready to Get Started?
            </h3>
            <p className="text-xl text-shakespeare-700 mb-10 max-w-2xl mx-auto">
              Choose a quick action to begin working with AquaSense
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap justify-center gap-6">
              {quickActions.map((action, index) => (
                <motion.button
                  key={action.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className={`group ${action.color} text-white px-8 py-5 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all`}
                >
                  <span className="flex items-center gap-3">
                    <action.icon className="w-6 h-6" />
                    {action.label}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-royal-blue/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-aqua-teal/10 rounded-full blur-3xl"></div>
        </motion.div>

        {/* Support Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-shakespeare-600 mb-4">Need help? Our support team is here for you.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="#" className="text-royal-blue font-semibold hover:underline">📖 View Documentation</a>
            <a href="#" className="text-royal-blue font-semibold hover:underline">💬 Contact Support</a>
            <a href="#" className="text-royal-blue font-semibold hover:underline">🎥 Watch Video Tutorials</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
