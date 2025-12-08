// This route is kept for reference but messages are handled client-side via Firebase SDK
// ShareMessage component writes directly to Firestore using client-side addDoc()

export async function POST(req) {
  return new Response(
    JSON.stringify({ 
      message: 'Use client-side Firebase SDK to post messages. See ShareMessage.jsx for implementation.' 
    }), 
    { status: 200 }
  );
}

export async function GET(req) {
  return new Response(
    JSON.stringify({ 
      message: 'Use client-side Firebase SDK to fetch messages. See CommunityFeed.jsx for implementation.' 
    }), 
    { status: 200 }
  );
}