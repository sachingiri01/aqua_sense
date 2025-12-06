'use client';

import { motion } from 'framer-motion';
import { Trophy, Award, Star, TrendingUp, Droplet, Settings, Beaker, Sprout } from 'lucide-react';

const badges = [
  { id: 'water-warrior', name: 'Water Warrior', icon: Droplet, color: 'from-shakespeare-400 to-shakespeare-600' },
  { id: 'plant-pro', name: 'Plant Pro', icon: Settings, color: 'from-shakespeare-600 to-shakespeare-800' },
  { id: 'lab-expert', name: 'Lab Expert', icon: Beaker, color: 'from-aqua-teal to-shakespeare-500' },
  { id: 'irrigation-mentor', name: 'Irrigation Mentor', icon: Sprout, color: 'from-emerald-500 to-emerald-700' },
];

const leaderboards = [
  {
    id: 'contributors',
    title: 'Top Contributors',
    icon: Trophy,
    color: 'from-amber-500 to-amber-600',
    members: [
      { rank: 1, name: 'Rajesh Kumar', location: 'Mumbai', points: 2847, badge: 'water-warrior', avatar: '👷' },
      { rank: 2, name: 'Priya Sharma', location: 'Delhi', points: 2634, badge: 'lab-expert', avatar: '👩‍🔬' },
      { rank: 3, name: 'Amit Patel', location: 'Ahmedabad', points: 2521, badge: 'irrigation-mentor', avatar: '🧑‍🌾' },
      { rank: 4, name: 'Sunita Rao', location: 'Chennai', points: 2398, badge: 'plant-pro', avatar: '👩‍⚕️' },
      { rank: 5, name: 'Vikram Singh', location: 'Bangalore', points: 2287, badge: 'water-warrior', avatar: '👨‍🔧' },
    ],
  },
  {
    id: 'troubleshooters',
    title: 'Best Troubleshooters',
    icon: Award,
    color: 'from-shakespeare-500 to-shakespeare-700',
    members: [
      { rank: 1, name: 'Dr. Anil Mehta', location: 'Pune', points: 1876, badge: 'lab-expert', avatar: '👨‍🔬' },
      { rank: 2, name: 'Kavita Nair', location: 'Kochi', points: 1654, badge: 'plant-pro', avatar: '👩‍💼' },
      { rank: 3, name: 'Ravi Shankar', location: 'Hyderabad', points: 1543, badge: 'water-warrior', avatar: '👨‍🏭' },
      { rank: 4, name: 'Anjali Desai', location: 'Surat', points: 1432, badge: 'lab-expert', avatar: '👩‍🔬' },
      { rank: 5, name: 'Manoj Kumar', location: 'Jaipur', points: 1321, badge: 'plant-pro', avatar: '👨‍💼' },
    ],
  },
  {
    id: 'local-heroes',
    title: 'Local Heroes (Region-wise)',
    icon: Star,
    color: 'from-aqua-teal to-shakespeare-400',
    members: [
      { rank: 1, name: 'Lakshmi Iyer', location: 'Tamil Nadu', points: 987, badge: 'irrigation-mentor', avatar: '👩‍🌾' },
      { rank: 2, name: 'Harpreet Singh', location: 'Punjab', points: 876, badge: 'water-warrior', avatar: '👨‍🌾' },
      { rank: 3, name: 'Deepak Joshi', location: 'Uttarakhand', points: 765, badge: 'plant-pro', avatar: '👨‍🔧' },
      { rank: 4, name: 'Meera Reddy', location: 'Telangana', points: 654, badge: 'irrigation-mentor', avatar: '👩‍🌾' },
      { rank: 5, name: 'Suresh Yadav', location: 'Uttar Pradesh', points: 543, badge: 'water-warrior', avatar: '👨‍🏭' },
    ],
  },
];

export default function Leaderboard() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-shakespeare-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-shakespeare-950 mb-3">
            Community <span className="text-gradient">Leaderboard</span>
          </h2>
          <p className="text-lg text-shakespeare-600">
            Celebrating water workers making the biggest impact
          </p>
        </motion.div>

        {/* Badges Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="flex flex-wrap items-center justify-center gap-4">
            {badges.map((badge) => {
              const Icon = badge.icon;
              return (
                <div
                  key={badge.id}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-md border border-shakespeare-200"
                >
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${badge.color} flex items-center justify-center`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-semibold text-shakespeare-900 text-sm">{badge.name}</span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Leaderboards */}
        <div className="grid lg:grid-cols-3 gap-8">
          {leaderboards.map((board, boardIndex) => {
            const BoardIcon = board.icon;
            return (
              <motion.div
                key={board.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: boardIndex * 0.1 }}
                className="bg-white rounded-3xl p-6 shadow-xl border border-shakespeare-200 overflow-hidden relative"
              >
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                  <BoardIcon className="w-full h-full text-shakespeare-600" />
                </div>

                {/* Header */}
                <div className="flex items-center gap-3 mb-6 relative z-10">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${board.color} flex items-center justify-center shadow-lg`}>
                    <BoardIcon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-shakespeare-950 text-lg">{board.title}</h3>
                </div>

                {/* Members List */}
                <div className="space-y-3">
                  {board.members.map((member, index) => {
                    const memberBadge = badges.find(b => b.id === member.badge);
                    const BadgeIcon = memberBadge?.icon;
                    const isTopThree = member.rank <= 3;

                    return (
                      <motion.div
                        key={member.rank}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: boardIndex * 0.1 + index * 0.05 }}
                        className={`flex items-center gap-3 p-3 rounded-2xl transition-all hover:shadow-md ${
                          isTopThree
                            ? 'bg-gradient-to-r from-shakespeare-50 to-aqua-teal/10 border border-shakespeare-300'
                            : 'bg-shakespeare-50/50 hover:bg-shakespeare-100/50'
                        }`}
                      >
                        {/* Rank Badge */}
                        <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg ${
                          member.rank === 1
                            ? 'bg-gradient-to-br from-amber-400 to-amber-600 text-white shadow-lg'
                            : member.rank === 2
                            ? 'bg-gradient-to-br from-gray-300 to-gray-500 text-white shadow-md'
                            : member.rank === 3
                            ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow-md'
                            : 'bg-shakespeare-200 text-shakespeare-700'
                        }`}>
                          {member.rank}
                        </div>

                        {/* Avatar */}
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-shakespeare-400 to-shakespeare-600 flex items-center justify-center text-xl">
                          {member.avatar}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-shakespeare-950 text-sm truncate">
                              {member.name}
                            </h4>
                            {memberBadge && BadgeIcon && (
                              <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${memberBadge.color} flex items-center justify-center`}>
                                <BadgeIcon className="w-3 h-3 text-white" />
                              </div>
                            )}
                          </div>
                          <p className="text-xs text-shakespeare-600">{member.location}</p>
                        </div>

                        {/* Points */}
                        <div className="flex items-center gap-1 text-shakespeare-700">
                          <TrendingUp className="w-4 h-4" />
                          <span className="font-bold text-sm">{member.points}</span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* View All Button */}
                <button className="w-full mt-4 py-3 rounded-xl bg-shakespeare-100 hover:bg-shakespeare-200 text-shakespeare-700 font-semibold transition-colors">
                  View Full Leaderboard
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
