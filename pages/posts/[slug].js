// File: pages/posts/[slug].js
import Head from 'next/head';
import Link from 'next/link';
import { format } from 'date-fns';
import dbConnect from '../../lib/dbConnect';
import Post from '../../models/Post';

export default function PostPage({ post }) {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Head>
          <title>{post.title} | NextGen Blog</title>
          <meta name="description" content={post.description} />
        </Head>

        <main className="max-w-3xl mx-auto">
          <article>
            <Link href="/" className="text-blue-600 hover:underline mb-8 block">&larr; Back to all posts</Link>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">{post.title}</h1>
            <p className="text-gray-500 mb-8">
              Published on {format(new Date(post.createdAt), 'MMMM d, yyyy')}
            </p>
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>
        </main>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  await dbConnect();
  const posts = await Post.find({}, 'slug').limit(20);

  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  await dbConnect();
  const result = await Post.findOne({ slug: params.slug });

  if (!result) {
    return { notFound: true };
  }
  
  const post = result.toObject();
  post._id = post._id.toString();
  post.createdAt = post.createdAt.toISOString();

  return {
    props: {
      post,
    },
    revalidate: 60,
  };
}