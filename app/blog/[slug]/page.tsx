"use client";

import { notFound, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardHeader, CardBody } from "@heroui/react";
import ReactMarkdown from "react-markdown";
import Link from "next/link";

import posts from "../postsData"; // adjust the path if needed

export default function BlogPost() {
  const params = useParams();
  const index = posts.findIndex((p) => p.slug === params?.slug);
  const post = posts[index];

  if (!post) {
    notFound(); // fallback 404 page
  }

  const prevPost = index > 0 ? posts[index - 1] : null;
  const nextPost = index < posts.length - 1 ? posts[index + 1] : null;

  return (
    <main className="relative min-h-screen px-6 py-20 bg-gray-50">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: "url('/images/corporate-bg.jpg')" }}
      />

      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto relative z-10 flex flex-col gap-6"
        initial={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.6 }}
      >
        {/* Back to Blog Button */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            className="inline-block px-6 py-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-full shadow transition-all duration-300"
            href="/blog"
          >
            ← Back to Blog
          </Link>
        </motion.div>

        {/* Blog Card */}
        <Card className="bg-white/90 backdrop-blur-xl border border-gray-300 shadow-xl rounded-2xl overflow-hidden">
          <img
            alt={post.title}
            className="w-full h-96 object-cover"
            src={post.image}
          />
          <CardHeader className="p-6 text-4xl font-bold text-primary">
            {post.title}
          </CardHeader>
          <CardBody className="p-6 text-gray-700">
            <p className="text-sm text-gray-400 mb-6">{post.date}</p>

            <ReactMarkdown
              components={{
                p: ({ node, ...props }) => (
                  <p
                    className="mb-4 text-gray-700 leading-relaxed"
                    {...props}
                  />
                ),
                a: ({ node, ...props }) => (
                  <a
                    className="text-blue-700 hover:underline"
                    {...props}
                    rel="noopener noreferrer"
                    target="_blank"
                  />
                ),
                h1: ({ node, ...props }) => (
                  <h1
                    className="text-3xl font-bold text-primary mb-4"
                    {...props}
                  />
                ),
                h2: ({ node, ...props }) => (
                  <h2
                    className="text-2xl font-semibold text-primary mb-3"
                    {...props}
                  />
                ),
                h3: ({ node, ...props }) => (
                  <h3
                    className="text-xl font-semibold text-primary mb-2"
                    {...props}
                  />
                ),
                ul: ({ node, ...props }) => (
                  <ul className="list-disc list-inside mb-4" {...props} />
                ),
                ol: ({ node, ...props }) => (
                  <ol className="list-decimal list-inside mb-4" {...props} />
                ),
                li: ({ node, ...props }) => (
                  <li className="mb-2 ml-2" {...props} />
                ),
                strong: ({ node, ...props }) => (
                  <strong className="font-semibold" {...props} />
                ),
              }}
            >
              {post.content || "Content coming soon..."}
            </ReactMarkdown>
          </CardBody>
        </Card>

        {/* Previous / Next Buttons */}
        <div className="flex justify-between mt-6 gap-4">
          {/* Previous Button */}
          {prevPost ? (
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.95 }}>
              <Link
                className="block px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold rounded-full shadow transition-all duration-300"
                href={`/blog/${prevPost.slug}`}
              >
                ←{" "}
                {prevPost.title.length > 30
                  ? prevPost.title.slice(0, 30) + "..."
                  : prevPost.title}
              </Link>
            </motion.div>
          ) : (
            <div />
          )}

          {/* Next Button */}
          {nextPost ? (
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.95 }}>
              <Link
                className="block px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold rounded-full shadow transition-all duration-300"
                href={`/blog/${nextPost.slug}`}
              >
                {nextPost.title.length > 30
                  ? nextPost.title.slice(0, 30) + "..."
                  : nextPost.title}{" "}
                →
              </Link>
            </motion.div>
          ) : (
            <div />
          )}
        </div>
      </motion.div>
    </main>
  );
}
