// app/api/feed/route.js
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route.js';
import cloudinary from 'cloudinary';

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadToCloudinary(file, folder = 'aqua_sense_feed') {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.v2.uploader.upload_stream(
      { folder, resource_type: 'auto' },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );
    uploadStream.end(buffer);
  });
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const form = await req.formData();

    const title = form.get('title');
    const category = form.get('category');
    const plantType = form.get('plantType');
    const location = form.get('location');
    const description = form.get('description');
    const urgency = Number(form.get('urgency'));

    const photos = form.getAll('photos');
    const MAX_FILES = 6;
    const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;
    const ALLOWED_MIMES = ['image/', 'video/'];

    if (photos.length > MAX_FILES) {
      return NextResponse.json(
        { error: `Too many files. Max allowed is ${MAX_FILES}` },
        { status: 400 }
      );
    }

    for (const f of photos) {
      if (!f?.name) continue;
      const okMime = ALLOWED_MIMES.some((p) => f.type.startsWith(p));
      if (!okMime) {
        return NextResponse.json({ error: `Unsupported file type: ${f.type}` }, { status: 400 });
      }
      if (f.size > MAX_FILE_SIZE_BYTES) {
        return NextResponse.json({ error: `File too large: ${f.name}` }, { status: 400 });
      }
    }

    const uploadPromises = photos.map((file) =>
      file?.name ? uploadToCloudinary(file, 'aqua_sense_feed') : null
    );

    const uploadedImageUrls = (await Promise.all(uploadPromises)).filter(Boolean);

    return NextResponse.json(
      {
        success: true,
        uploadedImageUrls,
        echo: {
          title,
          category,
          plantType,
          location,
          description,
          urgency,
          userId: session.user.id,
          userName: session.user.name || session.user.email,
        },
      },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: 'Server error', detail: err.message },
      { status: 500 }
    );
  }
}
