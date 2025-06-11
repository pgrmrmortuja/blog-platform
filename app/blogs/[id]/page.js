"use client";

import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';

export default function BlogDetails({ params }) {
  const { id } = params;

  const [blog, setBlog] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`/api/blogs/${id}`);
        setBlog(response.data);
      } catch (error) {
        console.error("Error loading blog:", error);
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) {
    return <p className="text-center text-gray-600 mt-10">Loading blog details...</p>;
  }


  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-10">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        {/* Cover Image */}
        {/* <Image
          src={blog.photo || "https://via.placeholder.com/800x400"}
          alt={blog.title}
          width={800}
          height={400}
          className="w-full h-64 object-cover"
        /> */}

        {/* Content */}
        <div className="p-6">
          {/* Title & Save */}
          <div className="flex justify-between items-start mb-4 flex-col md:flex-row">
            <h2 className="text-2xl font-bold">{blog.title}</h2>
            <button
              onClick={() => setSaved(!saved)}
              className="text-blue-600 hover:text-blue-800 transition text-xl mt-2 md:mt-0"
              title={saved ? "Unsave" : "Save"}
            >
              {saved ? <FaBookmark /> : <FaRegBookmark />}
            </button>
          </div>

          {/* Author Info */}
          <div className="flex items-center gap-4 mb-4">
            {/* <Image
              src={blog.author_photo || "https://via.placeholder.com/50"}
              alt={blog.author_name}
              width={50}
              height={50}
              className="rounded-full w-12 h-12 object-cover"
            /> */}
            <div>
              <p className="font-medium">{blog.author_name}</p>
              <p className="text-sm text-gray-500">{blog.author_email}</p>
            </div>
          </div>

          {/* Date */}
          <p className="text-sm text-gray-400 mb-4">Published on {blog.date}</p>

          {/* Short Snippet */}
          <p className="text-gray-700 mb-4">{blog.short_snippet}</p>

          {/* Full Content */}
          <p className="text-gray-800 leading-relaxed whitespace-pre-line">
            {blog.full_content}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-6">
            {blog?.tags?.primary && (
              <span className="px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                {blog.tags.primary}
              </span>
            )}
            {blog?.tags?.secondary && (
              <span className="px-3 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                {blog.tags.secondary}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
