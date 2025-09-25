// File: pages/admin/create.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title || !description || !content) {
      setError('Title, description, and content are required.');
      return;
    }
    
    // This is where you use the key from your .env.local file
    const secretKey = process.env.NEXT_PUBLIC_ADMIN_SECRET_KEY;

    const res = await fetch('/api/admin/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${secretKey}`
      },
      body: JSON.stringify({ title, description, content, tags }),
    });

    if (res.ok) {
      alert('Post created successfully!');
      router.push('/');
    } else {
      const data = await res.json();
      setError(data.error || 'Something went wrong.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Create New Post</h1>
      {error && <p className="text-red-500 mb-4 p-3 bg-red-100 rounded-md">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Short Description (for homepage preview)</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Main Content</label>
          <div className="mt-1">
            <ReactQuill theme="snow" value={content} onChange={setContent} className="bg-white" />
          </div>
        </div>
        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700">Tags (comma-separated, e.g., tech, javascript, nextjs)</label>
          <input type="text" id="tags" value={tags} onChange={(e) => setTags(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
        </div>
        <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Create Post
        </button>
      </form>
    </div>
  );
}