// File: pages/api/blogs/index.js
import dbConnect from '../../../lib/dbConnect';
import Post from '../../../models/Post';

export default async function handler(req, res) {
  const { method } = req;
  const { page = 1, limit = 10, search = '' } = req.query;

  await dbConnect();

  if (method === 'GET') {
    try {
      const query = search ? { title: { $regex: search, $options: 'i' } } : {};
      const posts = await Post.find(query)
        .sort({ createdAt: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .select('title slug description createdAt tags');

      const count = await Post.countDocuments(query);

      res.status(200).json({
        success: true,
        data: posts,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}