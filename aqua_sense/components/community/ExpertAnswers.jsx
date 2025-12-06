'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, CheckCircle2, ThumbsUp, Copy, Sparkles, MessageSquare } from 'lucide-react';

const aiAnswers = [
  {
    question: 'Why is my treated water showing high TDS even after RO treatment?',
    answer: 'Based on analysis of 2,847 similar cases in Indian water treatment facilities:\n\n**Most Probable Causes:**\n• Membrane integrity compromise (67% of cases)\n• Inadequate pre-filtration (23% of cases)\n• High feed water TDS exceeding membrane capacity (10%)\n\n**Recommended Actions:**\n1. Conduct membrane integrity test using dye method\n2. Check feed water TDS - should be < 2000 ppm for standard RO\n3. Inspect pre-filters for breakthrough\n4. Monitor pressure gauges - 15-20 PSI drop indicates fouling\n\n**ML Prediction Confidence:** 94%\n**Similar resolved cases:** 312 in Maharashtra, Gujarat, and Tamil Nadu',
    confidence: 94,
    helpful: 156,
  },
  {
    question: 'How to reduce chlorine consumption in our municipal water treatment plant?',
    answer: 'Analysis from 1,234 Indian municipal plants shows optimal chlorine reduction strategies:\n\n**Key Recommendations:**\n• Implement UV pre-treatment (reduces chlorine need by 30-40%)\n• Optimize contact time - extend to 30 minutes minimum\n• Use breakpoint chlorination method for ammonia removal\n• Monitor free chlorine residual continuously (target: 0.5-1.0 mg/L)\n\n**Cost Savings:**\nAverage reduction: 35% chlorine usage\nPayback period: 8-12 months with UV installation\n\n**ML Prediction Confidence:** 89%\n**Implemented successfully in:** 89 plants across Karnataka, UP, and Rajasthan',
    confidence: 89,
    helpful: 203,
  },
  {
    question: 'Best way to handle high turbidity during monsoon season?',
    answer: 'Monsoon turbidity management based on 456 plant case studies:\n\n**Immediate Actions:**\n• Increase coagulant dosing by 20-30% (use alum or PAC)\n• Add polymer for better floc formation\n• Reduce filtration rate to 4-5 m/hr\n• Increase backwash frequency to every 8-10 hours\n\n**Preventive Measures:**\n• Install pre-sedimentation basin\n• Use dissolved air flotation (DAF) for high turbidity (>500 NTU)\n• Maintain buffer stock of coagulants during monsoon\n\n**ML Prediction Confidence:** 92%\n**Seasonal pattern identified in:** Assam, Bihar, Kerala, Goa, Konkan region',
    confidence: 92,
    helpful: 178,
  },
];

export default function ExpertAnswers() {
  const [copied, setCopied] = useState(null);
  const [helpfulClicked, setHelpfulClicked] = useState({});

  const handleCopy = (index, text) => {
    navigator.clipboard.writeText(text);
    setCopied(index);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleHelpful = (index) => {
    setHelpfulClicked({ ...helpfulClicked, [index]: true });
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-shakespeare-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className="w-10 h-10 text-royal-blue" />
            <Sparkles className="w-8 h-8 text-shakespeare-400" />
          </div>
          <h2 className="text-4xl font-bold text-shakespeare-950 mb-3">
            <span className="text-gradient">AI-Powered Answers</span>
          </h2>
          <p className="text-lg text-shakespeare-600 max-w-2xl mx-auto">
            Get intelligent solutions from our ML models trained on thousands of Indian water treatment cases
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-6">
          {aiAnswers.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-royal-blue/5 to-shakespeare-100/50 rounded-3xl p-8 shadow-xl border-2 border-royal-blue/30 overflow-hidden">
                {/* Glowing border effect */}
                <div className="absolute inset-0 rounded-3xl">
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-royal-blue/20 to-shakespeare-400/20 animate-pulse" />
                </div>

                <div className="relative z-10">
                  {/* Question */}
                  <div className="flex items-start gap-3 mb-6">
                    <MessageSquare className="w-6 h-6 text-shakespeare-600 flex-shrink-0 mt-1" />
                    <h3 className="text-xl font-bold text-shakespeare-950">
                      {item.question}
                    </h3>
                  </div>

                  {/* AI Badge */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-royal-blue to-shakespeare-600 flex items-center justify-center shadow-lg animate-float">
                      <Brain className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-shakespeare-950 text-lg">
                          AquaSense AI
                        </h4>
                        <Sparkles className="w-5 h-5 text-royal-blue" />
                      </div>
                      <p className="text-sm text-shakespeare-600 font-medium">
                        Machine Learning Analysis
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex-1 h-2 bg-shakespeare-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-royal-blue to-shakespeare-500 rounded-full transition-all duration-1000"
                            style={{ width: `${item.confidence}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold text-royal-blue">
                          {item.confidence}% Confidence
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* AI Answer Content */}
                  <div className="mb-6 pl-2">
                    <div className="prose prose-sm max-w-none text-shakespeare-700 leading-relaxed whitespace-pre-line">
                      {item.answer}
                    </div>
                  </div>

                  {/* AI Indicator */}
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-royal-blue/10 border border-royal-blue/20 mb-4">
                    <Sparkles className="w-5 h-5 text-royal-blue flex-shrink-0" />
                    <p className="text-xs text-shakespeare-700">
                      AI answer generated from analyzing similar cases across India's water treatment facilities
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-4 pt-4 border-t border-royal-blue/20">
                    <button
                      onClick={() => handleHelpful(index)}
                      className={`flex items-center gap-2 transition-colors ${
                        helpfulClicked[index]
                          ? 'text-royal-blue'
                          : 'text-shakespeare-600 hover:text-shakespeare-700'
                      }`}
                    >
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                        helpfulClicked[index]
                          ? 'bg-royal-blue/20'
                          : 'bg-royal-blue/10 hover:bg-royal-blue/20'
                      }`}>
                        <ThumbsUp className={`w-4 h-4 ${helpfulClicked[index] ? 'fill-current' : ''}`} />
                      </div>
                      <span className="font-semibold text-sm">
                        {helpfulClicked[index] ? item.helpful + 1 : item.helpful}
                      </span>
                    </button>

                    <button
                      onClick={() => handleCopy(index, item.answer)}
                      className="ml-auto flex items-center gap-2 px-4 py-2 rounded-full bg-royal-blue/10 hover:bg-royal-blue/20 text-shakespeare-700 font-medium transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                      {copied === index ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}