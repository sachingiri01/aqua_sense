'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

import { MessageSquare, AlertCircle, TrendingUp } from 'lucide-react';

export default function CommunityHero() {
  const router = useRouter();
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* HD Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ef711400-4759-4522-a94e-77bc1b479bba/generated_images/wide-cinematic-photograph-of-diverse-ind-ba18242e-20251206072323.jpg"
        >
          <source src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ef711400-4759-4522-a94e-77bc1b479bba/generated_videos/cinematic-wide-shot-of-indian-water-trea-897121ab-20251206072341.mp4" type="video/mp4" />
        </video>
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-shakespeare-950/70 via-shakespeare-800/60 to-shakespeare-600/50" />
      </div>

      {/* Floating bubbles */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-white/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: -20,
            }}
            animate={{
              y: [-20, -700],
              x: [0, Math.random() * 100 - 50],
              scale: [0, 1, 0.8, 0],
              opacity: [0, 0.6, 0.4, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Community illustration backdrop */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-shakespeare-300 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-aqua-teal rounded-full blur-3xl animate-float-3d" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight drop-shadow-2xl">
            AquaSense Community
            <br />
            <span className="bg-gradient-to-r from-shakespeare-300 via-aqua-teal to-shakespeare-400 bg-clip-text text-transparent">
              Powered by People
            </span>
          </h1>

          {/* Tagline */}
          <p className="text-xl md:text-2xl text-shakespeare-100 max-w-3xl mx-auto font-medium drop-shadow-lg">
            Learn. Share. Solve India's Water Challenges Together.
          </p>

          {/* CTA Buttons with bubble effect */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <motion.a
  href="#"
  onClick={(e) => {
    e.preventDefault();
    router.push('/ai-chat');
  }}
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="group relative px-8 py-4 bg-gradient-to-r from-shakespeare-500 to-shakespeare-600 text-white font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all overflow-hidden"
  role="link"
  aria-label="Go to AI Chat"
>
  <span className="relative z-10 flex items-center gap-2">
    <MessageSquare className="w-5 h-5" />
    Ask a Question
  </span>
  <div className="absolute inset-0 bg-gradient-to-r from-royal-blue to-shakespeare-500 opacity-0 group-hover:opacity-100 transition-opacity" />
</motion.a>


            <motion.a
              href="#share-issue"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 bg-white/90 backdrop-blur-md border-2 border-white text-shakespeare-900 font-semibold rounded-full shadow-lg hover:shadow-xl transition-all overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Share an Issue
              </span>
              <div className="absolute inset-0 bg-shakespeare-100 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.a>

            {/* <motion.a
              href="#trending"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 bg-gradient-to-r from-aqua-teal to-shakespeare-400 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Trending Topics
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-shakespeare-500 to-aqua-teal opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.a> */}
          </div>

          {/* Community stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-8 mt-12"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-white drop-shadow-lg">5,000+</div>
              <div className="text-sm font-medium text-shakespeare-200">Water Workers</div>
            </div>
            <div className="w-px h-12 bg-white/30" />
            <div className="text-center">
              <div className="text-3xl font-bold text-white drop-shadow-lg">12,000+</div>
              <div className="text-sm font-medium text-shakespeare-200">Problems Solved</div>
            </div>
            <div className="w-px h-12 bg-white/30" />
            <div className="text-center">
              <div className="text-3xl font-bold text-white drop-shadow-lg">150+</div>
              <div className="text-sm font-medium text-shakespeare-200">Active Plants</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Wave divider at bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" className="w-full h-24 fill-white">
          <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z">
            <animate
              attributeName="d"
              dur="10s"
              repeatCount="indefinite"
              values="
                M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z;
                M0,32L48,42.7C96,53,192,75,288,80C384,85,480,75,576,64C672,53,768,43,864,48C960,53,1056,75,1152,80C1248,85,1344,75,1392,69.3L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z;
                M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            />
          </path>
        </svg>
      </div>
    </section>
  );
}