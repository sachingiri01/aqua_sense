"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { HelpCircle, CheckCircle, XCircle, Award } from 'lucide-react';

const quizQuestions = [
  {
    id: 1,
    question: 'What is the safe TDS range for drinking water in India?',
    options: ['0-50 ppm', '50-200 ppm', '200-500 ppm', '500-1000 ppm'],
    correct: 2,
    fact: 'According to BIS standards, TDS below 500 ppm is acceptable for drinking water in India.',
    icon: '💧'
  },
  {
    id: 2,
    question: 'Which state in India faces the most severe groundwater depletion?',
    options: ['Kerala', 'Rajasthan', 'Punjab', 'Tamil Nadu'],
    correct: 2,
    fact: 'Punjab\'s groundwater is depleting at an alarming rate due to intensive rice-wheat farming.',
    icon: '🌾'
  },
  {
    id: 3,
    question: 'What percentage of India\'s wastewater is currently treated?',
    options: ['10%', '30%', '50%', '70%'],
    correct: 1,
    fact: 'Only about 30% of India\'s wastewater is treated, leaving massive reuse potential.',
    icon: '♻️'
  },
  {
    id: 4,
    question: 'What does BOD stand for in water quality?',
    options: ['Biochemical Oxygen Demand', 'Biological Oxygen Density', 'Basic Oxygen Distribution', 'Bacterial Oxygen Demand'],
    correct: 0,
    fact: 'BOD measures how much oxygen is needed by bacteria to decompose organic matter in water.',
    icon: '🧪'
  },
  {
    id: 5,
    question: 'How much water can be saved daily by reusing industrial wastewater?',
    options: ['1 million liters', '10 million liters', '50 million liters', '100 million liters'],
    correct: 2,
    fact: 'India has potential to save 50M+ liters daily through industrial wastewater reuse!',
    icon: '🏭'
  },
  {
    id: 6,
    question: 'Which treatment removes dissolved salts from water?',
    options: ['Sand filtration', 'UV treatment', 'Reverse Osmosis', 'Aeration'],
    correct: 2,
    fact: 'RO membranes can remove 95%+ of dissolved salts and reduce TDS significantly.',
    icon: '⚡'
  }
];

export default function QuizSection() {
  const [selectedBubble, setSelectedBubble] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set());

  const handleBubbleClick = (question) => {
    if (answeredQuestions.has(question.id)) return;
    setSelectedBubble(question);
    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  const handleAnswer = (optionIndex) => {
    if (isCorrect !== null) return; // Already answered
    
    setSelectedAnswer(optionIndex);
    const correct = optionIndex === selectedBubble.correct;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(score + 1);
    }
    
    setAnsweredQuestions(new Set([...answeredQuestions, selectedBubble.id]));
  };

  const closeModal = () => {
    setSelectedBubble(null);
    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  return (
    <section className="relative py-32 bg-gradient-to-br from-shakespeare-800 via-shakespeare-700 to-shakespeare-900 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 water-texture opacity-20"></div>
      <div className="caustic-overlay"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-shakespeare-50 mb-6">
            Water Knowledge <span className="text-gradient">Quiz</span>
          </h2>
          <p className="text-xl text-shakespeare-200 max-w-3xl mx-auto mb-8">
            Click on bubbles to test your water sustainability knowledge!
          </p>
          
          {/* Score Display */}
          <div className="inline-flex items-center space-x-3 glassmorphism-strong px-6 py-3 rounded-full border border-shakespeare-300/30">
            <Award className="w-6 h-6 text-orange-accent" />
            <span className="text-2xl font-bold text-shakespeare-50">
              Score: {score}/{quizQuestions.length}
            </span>
          </div>
        </motion.div>

        {/* Interactive Bubble Field */}
        <div className="relative max-w-6xl mx-auto h-[600px]">
          {quizQuestions.map((question, index) => {
            const isAnswered = answeredQuestions.has(question.id);
            const angle = (index / quizQuestions.length) * Math.PI * 2;
            const radius = 200 + Math.random() * 80;
            const x = 50 + Math.cos(angle) * (radius / 10);
            const y = 50 + Math.sin(angle) * (radius / 10);

            return (
              <motion.div
                key={question.id}
                className="absolute cursor-pointer"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: isAnswered ? 1 : 1.15 }}
                animate={{
                  y: [0, -15, 0],
                }}
                transition={{
                  y: {
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: index * 0.4
                  }
                }}
                onClick={() => handleBubbleClick(question)}
              >
                <div className={`relative w-32 h-32 rounded-full flex items-center justify-center ${
                  isAnswered 
                    ? 'bg-gradient-to-br from-green-500 to-aqua-teal' 
                    : 'bg-gradient-to-br from-shakespeare-400 to-shakespeare-600'
                } shadow-2xl border-4 border-white/30 backdrop-blur-sm animate-liquid-morph ${
                  isAnswered ? 'opacity-70' : ''
                }`}
                  style={{ animationDuration: '8s', animationDelay: `${index * 0.5}s` }}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-1">{question.icon}</div>
                    <div className="text-white font-bold text-sm">
                      {isAnswered ? <CheckCircle className="w-6 h-6 mx-auto" /> : `Q${question.id}`}
                    </div>
                  </div>

                  {/* Ripple effect */}
                  {!isAnswered && (
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-shakespeare-300"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.7, 0, 0.7]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.3
                      }}
                    />
                  )}
                </div>
              </motion.div>
            );
          })}

          {/* Connecting lines between bubbles */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
            <defs>
              <linearGradient id="lineGradient">
                <stop offset="0%" stopColor="#4ac0e6" />
                <stop offset="100%" stopColor="#1488b5" />
              </linearGradient>
            </defs>
            {quizQuestions.map((_, index) => {
              if (index === quizQuestions.length - 1) return null;
              const angle1 = (index / quizQuestions.length) * Math.PI * 2;
              const angle2 = ((index + 1) / quizQuestions.length) * Math.PI * 2;
              const radius = 200;
              const x1 = 50 + Math.cos(angle1) * (radius / 10);
              const y1 = 50 + Math.sin(angle1) * (radius / 10);
              const x2 = 50 + Math.cos(angle2) * (radius / 10);
              const y2 = 50 + Math.sin(angle2) * (radius / 10);
              
              return (
                <line
                  key={index}
                  x1={`${x1}%`}
                  y1={`${y1}%`}
                  x2={`${x2}%`}
                  y2={`${y2}%`}
                  stroke="url(#lineGradient)"
                  strokeWidth="2"
                />
              );
            })}
          </svg>
        </div>

        {/* Question Modal */}
        <AnimatePresence>
          {selectedBubble && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
                onClick={closeModal}
              />

              {/* Modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 50 }}
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl z-50 p-4"
              >
                <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
                  {/* Header */}
                  <div className="relative p-8 bg-gradient-to-br from-shakespeare-500 to-royal-blue">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-5xl">{selectedBubble.icon}</div>
                        <div>
                          <div className="text-sm text-shakespeare-100 font-semibold">Question {selectedBubble.id}</div>
                          <h3 className="text-2xl font-bold text-white">Water Quiz</h3>
                        </div>
                      </div>
                      <button
                        onClick={closeModal}
                        className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
                      >
                        <XCircle className="w-6 h-6" />
                      </button>
                    </div>
                  </div>

                  {/* Question */}
                  <div className="p-8 space-y-6">
                    <div className="flex items-start space-x-3">
                      <HelpCircle className="w-6 h-6 text-shakespeare-600 flex-shrink-0 mt-1" />
                      <h4 className="text-xl font-bold text-shakespeare-900">
                        {selectedBubble.question}
                      </h4>
                    </div>

                    {/* Options */}
                    <div className="space-y-3">
                      {selectedBubble.options.map((option, index) => {
                        const isSelected = selectedAnswer === index;
                        const isCorrectAnswer = index === selectedBubble.correct;
                        const showResult = isCorrect !== null;

                        return (
                          <motion.button
                            key={index}
                            onClick={() => handleAnswer(index)}
                            disabled={showResult}
                            whileHover={!showResult ? { scale: 1.02 } : {}}
                            whileTap={!showResult ? { scale: 0.98 } : {}}
                            className={`w-full p-4 rounded-xl text-left font-semibold transition-all ${
                              showResult
                                ? isCorrectAnswer
                                  ? 'bg-green-100 border-2 border-green-500 text-green-900'
                                  : isSelected
                                  ? 'bg-red-100 border-2 border-red-500 text-red-900'
                                  : 'bg-gray-100 border-2 border-gray-300 text-gray-600'
                                : 'bg-shakespeare-50 border-2 border-shakespeare-300 text-shakespeare-900 hover:bg-shakespeare-100 hover:border-shakespeare-400'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span>{option}</span>
                              {showResult && isCorrectAnswer && (
                                <CheckCircle className="w-5 h-5 text-green-600" />
                              )}
                              {showResult && isSelected && !isCorrectAnswer && (
                                <XCircle className="w-5 h-5 text-red-600" />
                              )}
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>

                    {/* Result & Fact */}
                    {isCorrect !== null && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-6 rounded-2xl ${
                          isCorrect 
                            ? 'bg-gradient-to-br from-green-500 to-aqua-teal' 
                            : 'bg-gradient-to-br from-red-500 to-orange-accent'
                        } text-white`}
                      >
                        <div className="flex items-start space-x-3 mb-3">
                          {isCorrect ? (
                            <CheckCircle className="w-6 h-6 flex-shrink-0" />
                          ) : (
                            <XCircle className="w-6 h-6 flex-shrink-0" />
                          )}
                          <div>
                            <h5 className="font-bold text-lg mb-2">
                              {isCorrect ? '🎉 Correct!' : '❌ Incorrect'}
                            </h5>
                            <p className="text-white/90 leading-relaxed">
                              {selectedBubble.fact}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Continue Button */}
                    {isCorrect !== null && (
                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onClick={closeModal}
                        className="w-full py-4 bg-gradient-to-r from-shakespeare-500 to-royal-blue text-white font-bold rounded-full hover:shadow-lg transition-all"
                      >
                        Continue Learning
                      </motion.button>
                    )}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
