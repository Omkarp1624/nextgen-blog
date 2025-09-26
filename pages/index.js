// File: pages/index.js
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { format } from 'date-fns';
import dbConnect from '../lib/dbConnect';
import Post from '../models/Post';

export default function Home({ initialPosts }) {
  const [posts, setPosts] = useState(initialPosts);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      if (searchTerm) {
        const res = await fetch(`/api/blogs?search=${searchTerm}`);
        const data = await res.json();
        setPosts(data.data);
      } else {
        setPosts(initialPosts);
      }
    };
    const delayDebounceFn = setTimeout(() => {
        // Only search if the user has typed something
        if (searchTerm) {
            fetchPosts();
        } else {
            setPosts(initialPosts); // Reset to all posts if search is cleared
        }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, initialPosts]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Head>
          <title>NextGen Blog</title>
          <meta name="description" content="A blog built with Next.js and MongoDB" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-8 text-gray-800">
            Welcome to NextGen Blog
          </h1>

          {/* START: This is the new button we added */}
          <div className="text-center mb-8">
            <Link href="/admin/create" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300">
              + Create New Post
            </Link>
          </div>
          {/* END: This is the new button we added */}
          
          <input
            type="text"
            placeholder="Search posts by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 mb-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="space-y-8">
            {posts && posts.length > 0 ? (
              posts.map((post) => (
                <div key={post._id} className="bg-white p-6 border rounded-lg hover:shadow-xl transition-shadow duration-300">
                  <h2 className="text-2xl font-bold mb-2">
                    <Link href={`/posts/${post.slug}`} className="text-blue-600 hover:underline">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-gray-500 text-sm mb-3">
                    {format(new Date(post.createdAt), 'MMMM d, yyyy')}
                  </p>
                  <p className="text-gray-700">{post.description}</p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No posts found.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  await dbConnect();
  
  const result = await Post.find({})
    .sort({ createdAt: -1 })
    .select('title slug description createdAt tags')
    .limit(10);
    
  const posts = result.map((doc) => {
    const post = doc.toObject();
    post._id = post._id.toString();
    post.createdAt = post.createdAt.toISOString();
    return post;
  });

  return {
    props: {
      initialPosts: posts,
    },
    revalidate: 60,
  };
}