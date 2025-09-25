// File: pages/api/admin/posts.js
import dbConnect from '../../../lib/dbConnect';
import Post from '../../../models/Post';
import slugify from 'slugify';

export default async function handler(req, res) {
  const { method } = req;

  if (req.headers.authorization !== `Bearer ${process.env.ADMIN_SECRET_KEY}`) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }

  await dbConnect();

  if (method === 'POST') {
    try {
      const { title, description, content, tags } = req.body;
      const slug = slugify(title, { lower: true, strict: true });

      const post = await Post.create({
        title,
        slug,
        description,
        content,
        tags: tags.split(',').map(tag => tag.trim()),
      });
      res.status(201).json({ success: true, data: post });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}