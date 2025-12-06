'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThumbsUp, MessageCircle, Share2, Bookmark, MapPin, Paperclip, Send, ChevronDown, ChevronUp } from 'lucide-react';

const feedPosts = [
  {
    id: 1,
    author: {
      name: 'Rajesh Kumar',
      role: 'Plant Operator',
      location: 'Indore Water Treatment Plant',
      avatar: '👷',
    },
    title: 'High sludge accumulation in secondary clarifier',
    description: 'Noticing unusual sludge buildup in the last 48 hours. Daily operations affected. Anyone faced similar issues? Need urgent advice on cleaning procedures.',
    attachments: 2,
    upvotes: 42,
    comments: 18,
    timestamp: '2 hours ago',
    tags: ['Plant Operations', 'Troubleshooting'],
    replies: [
      {
        id: 101,
        author: { name: 'Suresh Mehta', role: 'Senior Operator', avatar: '👨‍🔧' },
        message: 'I faced this last month. Check your RAS (Return Activated Sludge) pumps. Often it\'s a flow rate issue. Try increasing the wastage rate temporarily.',
        timestamp: '1 hour ago',
        upvotes: 12,
      },
      {
        id: 102,
        author: { name: 'Dr. Anjali Reddy', role: 'Process Engineer', avatar: '👩‍🔬' },
        message: 'Also verify your MLSS (Mixed Liquor Suspended Solids) levels. If above 4000 mg/L, you need to increase wasting. Temperature drop can also cause settling issues.',
        timestamp: '45 mins ago',
        upvotes: 18,
      }
    ]
  },
  {
    id: 2,
    author: {
      name: 'Priya Sharma',
      role: 'Water Quality Technician',
      location: 'Chennai Facility',
      avatar: '👩‍🔬',
    },
    title: 'pH fluctuation in effluent water - Need recommendations',
    description: 'Our treated water pH varies between 6.2 to 8.9 throughout the day. Regulatory standard is 6.5-8.5. What could be causing this variation? Chemical dosing seems fine.',
    attachments: 1,
    upvotes: 38,
    comments: 25,
    timestamp: '5 hours ago',
    tags: ['Water Quality', 'Treatment Stages'],
  },
  {
    id: 3,
    author: {
      name: 'Amit Patel',
      role: 'Irrigation Farmer',
      location: 'Gujarat Rural Area',
      avatar: '🧑‍🌾',
    },
    title: 'Best practices for drip irrigation using recycled water',
    description: 'Successfully using treated wastewater for cotton crops. Yield increased by 25%. Sharing my setup details and water quality requirements. Happy to help fellow farmers.',
    attachments: 3,
    upvotes: 156,
    comments: 64,
    timestamp: '1 day ago',
    tags: ['Agriculture', 'Success Story'],
  },
  {
    id: 4,
    author: {
      name: 'Dr. Sunita Rao',
      role: 'Environmental Researcher',
      location: 'Mumbai Research Center',
      avatar: '👩‍⚕️',
    },
    title: 'New membrane filtration study results for Indian conditions',
    description: 'Published findings on cost-effective membrane solutions suitable for Indian water quality. 40% reduction in operational costs possible. Full report attached.',
    attachments: 1,
    upvotes: 89,
    comments: 31,
    timestamp: '3 days ago',
    tags: ['Research', 'Technology'],
  },
  {
    id: 5,
    author: {
      name: 'Vikram Singh',
      role: 'Maintenance Engineer',
      location: 'Delhi Treatment Plant',
      avatar: '👨‍🔧',
    },
    title: 'Pump failure prevention tips from 15 years experience',
    description: 'After maintaining 50+ pumps across different plants, here are my top 10 preventive maintenance tips that can save lakhs in repair costs. Thread 🧵',
    attachments: 0,
    upvotes: 203,
    comments: 47,
    timestamp: '1 week ago',
    tags: ['Maintenance', 'Best Practices'],
  },
];

export default function CommunityFeed() {
  const [savedPosts, setSavedPosts] = useState(new Set());
  const [expandedReplies, setExpandedReplies] = useState(new Set());
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [filter, setFilter] = useState('all');

  const handleSave = (postId) => {
    setSavedPosts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const toggleReplies = (postId) => {
    setExpandedReplies((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const handleReply = (postId) => {
    if (replyText.trim()) {
      // In real app, this would call an API
      console.log('Reply submitted:', { postId, replyText });
      setReplyText('');
      setReplyingTo(null);
    }
  };

  const filters = [
    { id: 'all', label: 'All Posts', icon: '📋' },
    { id: 'questions', label: 'Questions', icon: '❓' },
    { id: 'issues', label: 'Issues', icon: '⚠️' },
    { id: 'success', label: 'Success Stories', icon: '🎉' },
    { id: 'tips', label: 'Tips & Tricks', icon: '💡' },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-shakespeare-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl font-bold text-shakespeare-950 mb-3">
            Community <span className="text-gradient">Feed</span>
          </h2>
          <p className="text-lg text-shakespeare-600">
            Real problems, real solutions from water workers across India
          </p>
        </motion.div>

        {/* Quick Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                filter === f.id
                  ? 'bg-gradient-to-r from-shakespeare-500 to-shakespeare-600 text-white shadow-lg scale-105'
                  : 'bg-white text-shakespeare-700 border border-shakespeare-300 hover:border-shakespeare-500'
              }`}
            >
              <span className="mr-2">{f.icon}</span>
              {f.label}
            </button>
          ))}
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {feedPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white rounded-3xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all border border-shakespeare-200 overflow-hidden relative"
            >
              {/* Hover water ripple effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-shakespeare-50/50 to-transparent" />
              </div>

              <div className="relative z-10">
                {/* Author Info */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-shakespeare-400 to-shakespeare-600 flex items-center justify-center text-3xl shadow-md">
                    {post.author.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-shakespeare-950 text-lg">{post.author.name}</h3>
                    <p className="text-sm text-shakespeare-600 font-medium">{post.author.role}</p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-shakespeare-500">
                      <MapPin className="w-3 h-3" />
                      {post.author.location}
                    </div>
                  </div>
                  <span className="text-sm text-shakespeare-500">{post.timestamp}</span>
                </div>

                {/* Post Content */}
                <div className="mb-4">
                  <h4 className="text-xl font-bold text-shakespeare-950 mb-2 hover:text-shakespeare-600 transition-colors cursor-pointer">
                    {post.title}
                  </h4>
                  <p className="text-shakespeare-700 leading-relaxed">{post.description}</p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-shakespeare-100 text-shakespeare-700 text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Attachments */}
                {post.attachments > 0 && (
                  <div className="flex items-center gap-2 mb-4 text-shakespeare-600">
                    <Paperclip className="w-4 h-4" />
                    <span className="text-sm font-medium">{post.attachments} attachments</span>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-6 pt-4 border-t border-shakespeare-200">
                  <button className="flex items-center gap-2 text-shakespeare-600 hover:text-shakespeare-700 transition-colors group/btn">
                    <div className="w-9 h-9 rounded-full bg-shakespeare-100 group-hover/btn:bg-shakespeare-200 flex items-center justify-center transition-colors">
                      <ThumbsUp className="w-4 h-4" />
                    </div>
                    <span className="font-semibold">{post.upvotes}</span>
                  </button>

                  <button 
                    onClick={() => toggleReplies(post.id)}
                    className="flex items-center gap-2 text-shakespeare-600 hover:text-shakespeare-700 transition-colors group/btn"
                  >
                    <div className="w-9 h-9 rounded-full bg-shakespeare-100 group-hover/btn:bg-shakespeare-200 flex items-center justify-center transition-colors">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    <span className="font-semibold">{post.comments} Replies</span>
                    {expandedReplies.has(post.id) ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>

                  <button className="flex items-center gap-2 text-shakespeare-600 hover:text-shakespeare-700 transition-colors group/btn">
                    <div className="w-9 h-9 rounded-full bg-shakespeare-100 group-hover/btn:bg-shakespeare-200 flex items-center justify-center transition-colors">
                      <Share2 className="w-4 h-4" />
                    </div>
                    <span className="font-semibold text-sm">Share</span>
                  </button>

                  <button
                    onClick={() => handleSave(post.id)}
                    className={`ml-auto flex items-center gap-2 transition-colors group/btn ${
                      savedPosts.has(post.id)
                        ? 'text-orange-accent'
                        : 'text-shakespeare-600 hover:text-orange-accent'
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                      savedPosts.has(post.id)
                        ? 'bg-orange-100'
                        : 'bg-shakespeare-100 group-hover/btn:bg-orange-100'
                    }`}>
                      <Bookmark className={`w-4 h-4 ${savedPosts.has(post.id) ? 'fill-current' : ''}`} />
                    </div>
                  </button>
                </div>

                {/* Threaded Replies Section */}
                <AnimatePresence>
                  {expandedReplies.has(post.id) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-6 pt-6 border-t border-shakespeare-200 space-y-4"
                    >
                      {post.replies?.map((reply) => (
                        <div key={reply.id} className="flex gap-3 bg-shakespeare-50/50 rounded-2xl p-4">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-shakespeare-300 to-shakespeare-500 flex items-center justify-center text-xl flex-shrink-0">
                            {reply.author.avatar}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-bold text-shakespeare-950 text-sm">{reply.author.name}</span>
                              <span className="text-xs text-shakespeare-500">• {reply.author.role}</span>
                              <span className="text-xs text-shakespeare-400 ml-auto">{reply.timestamp}</span>
                            </div>
                            <p className="text-shakespeare-700 text-sm leading-relaxed mb-2">{reply.message}</p>
                            <button className="flex items-center gap-1 text-xs text-shakespeare-600 hover:text-shakespeare-700">
                              <ThumbsUp className="w-3 h-3" />
                              <span className="font-semibold">{reply.upvotes}</span>
                            </button>
                          </div>
                        </div>
                      ))}

                      {/* Reply Input */}
                      <div className="flex gap-3 mt-4">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-shakespeare-400 to-shakespeare-600 flex items-center justify-center text-xl flex-shrink-0">
                          👤
                        </div>
                        <div className="flex-1 flex gap-2">
                          <input
                            type="text"
                            placeholder="Write a reply..."
                            value={replyingTo === post.id ? replyText : ''}
                            onChange={(e) => {
                              setReplyingTo(post.id);
                              setReplyText(e.target.value);
                            }}
                            className="flex-1 px-4 py-2 rounded-xl bg-white border border-shakespeare-300 focus:border-shakespeare-500 focus:ring-2 focus:ring-shakespeare-200 outline-none text-sm"
                          />
                          <button
                            onClick={() => handleReply(post.id)}
                            disabled={!replyText.trim()}
                            className="px-4 py-2 rounded-xl bg-gradient-to-r from-shakespeare-500 to-shakespeare-600 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
                          >
                            <Send className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="px-8 py-4 bg-gradient-to-r from-shakespeare-500 to-shakespeare-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all">
            Load More Posts
          </button>
        </div>
      </div>
    </section>
  );
}