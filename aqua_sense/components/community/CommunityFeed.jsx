'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, MapPin, Send } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { db } from '@/lib/firebaseClient';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
  increment
} from 'firebase/firestore';

export default function CommunityFeed() {
  const [messages, setMessages] = useState([]);
  const [expandedReplies, setExpandedReplies] = useState(new Set());
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [repliesMap, setRepliesMap] = useState({});
  const [loading, setLoading] = useState(true);
  const replyListeners = useRef(new Map());
  const { data: session } = useSession();

  useEffect(() => {
    const q = query(collection(db, 'community_messages'), orderBy('created_at', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMessages(msgs);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    return () => {
      for (const unsub of replyListeners.current.values()) {
        try { unsub(); } catch {}
      }
      replyListeners.current.clear();
    };
  }, []);

  const toggleRepliesListener = (messageId) => {
    if (replyListeners.current.has(messageId)) {
      const unsub = replyListeners.current.get(messageId);
      unsub();
      replyListeners.current.delete(messageId);

      setRepliesMap(prev => {
        const next = { ...prev };
        delete next[messageId];
        return next;
      });

      setExpandedReplies(prev => {
        const s = new Set(prev);
        s.delete(messageId);
        return s;
      });

      setReplyingTo(prev => (prev === messageId ? null : prev));
      return;
    }

    const repliesQuery = query(
      collection(db, 'community_messages', messageId, 'replies'),
      orderBy('created_at', 'asc')
    );

    const unsub = onSnapshot(repliesQuery, (snap) => {
      const rs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setRepliesMap(prev => ({ ...prev, [messageId]: rs }));
    });

    replyListeners.current.set(messageId, unsub);
    setExpandedReplies(prev => new Set(prev).add(messageId));
  };

  const startReply = (messageId) => {
    setReplyingTo(messageId);
    setReplyText('');

    if (!replyListeners.current.has(messageId)) toggleRepliesListener(messageId);
  };

  const sendReply = async (messageId) => {
    const text = replyText?.trim();
    if (!text) return;

    try {
      await addDoc(collection(db, 'community_messages', messageId, 'replies'), {
        content: text,
        userId: session?.user?.id || null,
        userName: session?.user?.name || 'Anonymous',
        created_at: serverTimestamp(),
      });

      const parentRef = doc(db, 'community_messages', messageId);
      await updateDoc(parentRef, { replies: increment(1), updated_at: serverTimestamp() });

      setReplyText('');
      setReplyingTo(null);
    } catch (err) {
      console.error('Failed to send reply', err);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-shakespeare-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-shakespeare-950 mb-4">Community Feed</h2>
          <p className="text-lg text-shakespeare-600">Connect with experts and share solutions</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {loading && <p className="text-center text-shakespeare-600">Loading messages...</p>}
          {!loading && messages.length === 0 && <p className="text-center text-shakespeare-600">No messages yet. Be the first to share!</p>}

          {messages.map((msg) => (
            <div key={msg.id} className="bg-white rounded-3xl p-6 md:p-8 shadow-lg border border-shakespeare-200">
              
              {/* USER INFO */}
              <div className="flex gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-shakespeare-400 to-shakespeare-600 flex items-center justify-center text-3xl">
                  {msg.userName?.charAt(0).toUpperCase() || '👤'}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-shakespeare-950 text-lg">{msg.userName || 'Anonymous'}</h3>
                 
                </div>
              </div>

              {/* TITLE + CONTENT */}
              
              <p className="text-shakespeare-700 leading-relaxed mb-4">{msg.content}</p>

              {/* IMAGE SECTION */}
              {Array.isArray(msg.imageUrls) && msg.imageUrls.length > 0 && (
                <div className="mt-4 mb-4 grid grid-cols-2 md:grid-cols-3 gap-3">
                  {msg.imageUrls.map((url, idx) => (
                    <div key={idx} className="w-full h-40 rounded-lg overflow-hidden bg-shakespeare-100 border">
                      <img src={url} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}

              {/* TAGS */}
              <div className="flex flex-wrap gap-2 mb-4">
                {msg.category && (
                  <span className="px-3 py-1 rounded-full bg-shakespeare-100 text-shakespeare-700 text-sm font-medium">
                    {msg.category}
                  </span>
                )}
                {msg.plantType && (
                  <span className="px-3 py-1 rounded-full bg-aqua-teal-100 text-aqua-teal-700 text-sm font-medium">
                    {msg.plantType}
                  </span>
                )}
                {msg.urgencyLevel > 0 && (
                  <span
                    className={`px-3 py-1 rounded-full text-white text-sm font-medium ${
                      msg.urgencyLevel >= 70 ? 'bg-red-500' :
                      msg.urgencyLevel >= 50 ? 'bg-amber-500' :
                      'bg-emerald-500'
                    }`}
                  >
                    {msg.urgencyLabel || 'Normal'}
                  </span>
                )}
              </div>

              {/* ONLY REPLY BUTTON LEFT */}
              <div className="flex items-center gap-6 pt-4 border-t border-shakespeare-200">
                <button
                  onClick={() => {
                    if (replyListeners.current.has(msg.id)) {
                      toggleRepliesListener(msg.id);
                    } else {
                      startReply(msg.id);
                    }
                  }}
                  className="flex items-center gap-2 text-shakespeare-600"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span className="font-semibold">{msg.replies || 0} Replies</span>
                </button>
              </div>

              {/* REPLIES */}
              <AnimatePresence>
                {expandedReplies.has(msg.id) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t border-shakespeare-100"
                  >
                    {/* Reply List */}
                    <div className="space-y-3 mb-3">
                      {(repliesMap[msg.id] || []).map((r) => (
                        <div key={r.id} className="flex gap-3 items-start bg-shakespeare-50 rounded-xl p-3">
                          <div className="w-9 h-9 rounded-lg bg-shakespeare-200 flex items-center justify-center text-sm font-bold">
                            {r.userName?.charAt(0)?.toUpperCase()}
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-semibold text-shakespeare-900">{r.userName}</div>
                            <div className="text-sm text-shakespeare-700">{r.content}</div>
                          </div>
                        </div>
                      ))}

                      {(repliesMap[msg.id] || []).length === 0 && (
                        <p className="text-sm text-shakespeare-500">No replies yet. Be the first to respond.</p>
                      )}
                    </div>

                    {/* Reply Input */}
                    {replyingTo === msg.id && (
                      <div className="flex gap-3 items-start">
                        <textarea
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          rows={2}
                          placeholder="Write a reply..."
                          className="flex-1 px-4 py-3 rounded-2xl bg-white/70 backdrop-blur-sm border border-shakespeare-300"
                        />
                        <button
                          onClick={() => sendReply(msg.id)}
                          className="px-4 py-3 rounded-full bg-gradient-to-r from-shakespeare-500 to-shakespeare-600 text-white font-bold"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                    {replyingTo !== msg.id && (
                      <div className="mt-3">
                        <button
                          onClick={() => startReply(msg.id)}
                          className="text-sm font-semibold text-shakespeare-600"
                        >
                          Reply
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
