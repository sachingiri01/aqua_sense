'use client';

import { motion } from 'framer-motion';
import { Droplet, Settings, Beaker, Wrench, Sprout, Sparkles, Scale, GraduationCap } from 'lucide-react';

const categories = [
  {
    id: 'water-quality',
    name: 'Water Quality Issues',
    icon: Droplet,
    color: 'from-shakespeare-400 to-shakespeare-600',
    bgColor: 'bg-shakespeare-50',
    count: 234,
  },
  {
    id: 'plant-ops',
    name: 'Plant Operations',
    icon: Settings,
    color: 'from-shakespeare-600 to-shakespeare-800',
    bgColor: 'bg-shakespeare-100',
    count: 189,
  },
  {
    id: 'treatment',
    name: 'Treatment Stages',
    icon: Beaker,
    color: 'from-aqua-teal to-shakespeare-500',
    bgColor: 'bg-aqua-teal/10',
    count: 156,
  },
  {
    id: 'troubleshooting',
    name: 'Troubleshooting',
    icon: Wrench,
    color: 'from-orange-accent to-orange-600',
    bgColor: 'bg-orange-50',
    count: 298,
  },
  {
    id: 'agriculture',
    name: 'Agriculture & Irrigation',
    icon: Sprout,
    color: 'from-emerald-500 to-emerald-700',
    bgColor: 'bg-emerald-50',
    count: 167,
  },
  {
    id: 'ai-tech',
    name: 'AI, ML & Tech',
    icon: Sparkles,
    color: 'from-royal-blue to-shakespeare-600',
    bgColor: 'bg-blue-50',
    count: 142,
  },
  {
    id: 'policy',
    name: 'Policy & Regulations',
    icon: Scale,
    color: 'from-shakespeare-700 to-shakespeare-900',
    bgColor: 'bg-shakespeare-200',
    count: 98,
  },
  {
    id: 'student',
    name: 'Student Zone',
    icon: GraduationCap,
    color: 'from-aqua-teal to-shakespeare-400',
    bgColor: 'bg-shakespeare-50',
    count: 215,
  },
];

export default function CategoryFilters() {
  return (
    <section className="py-12 bg-gradient-to-b from-white to-shakespeare-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl font-bold text-shakespeare-950 mb-3">
            Explore by <span className="text-gradient">Category</span>
          </h2>
          <p className="text-lg text-shakespeare-600">
            Find discussions and solutions specific to your expertise
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all overflow-hidden border border-shakespeare-200"
              >
                {/* Animated bubble background */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-5`} />
                  <motion.div
                    className="absolute w-32 h-32 rounded-full bg-shakespeare-400/10 -top-16 -right-16"
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 90, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                    }}
                  />
                </div>

                <div className="relative z-10 flex flex-col items-center text-center space-y-3">
                  {/* Icon with floating animation */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow group-hover:animate-float`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Category name */}
                  <h3 className="font-bold text-shakespeare-900 text-base leading-tight">
                    {category.name}
                  </h3>

                  {/* Count badge */}
                  <div className={`px-3 py-1 rounded-full ${category.bgColor} text-shakespeare-700 text-sm font-semibold`}>
                    {category.count} posts
                  </div>
                </div>

                {/* Ripple effect on click */}
                <motion.div
                  className="absolute inset-0 rounded-3xl"
                  initial={{ scale: 0, opacity: 0.5 }}
                  whileTap={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  style={{
                    background: `linear-gradient(135deg, ${category.color})`,
                  }}
                />
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
