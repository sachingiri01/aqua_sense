import { adminDb } from '@/lib/firebaseAdmin';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const { title, content, userId, userName } = await req.json();

    if (!title || !content) {
      return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 });
    }

    // Add message to Firestore
    const docRef = await adminDb.collection('community_messages').add({
      title,
      content,
      userId,
      userName,
      category: 'general',
      likes: 0,
      replies: 0,
      created_at: new Date(),
      updated_at: new Date(),
    });

    return new Response(JSON.stringify({ id: docRef.id, success: true }), { status: 201 });
  } catch (error) {
    console.error('Error creating message:', error);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
}

export async function GET(req) {
  try {
    const snapshot = await adminDb
      .collection('community_messages')
      .orderBy('created_at', 'desc')
      .limit(50)
      .get();

    const messages = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return new Response(JSON.stringify(messages), { status: 200 });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
}