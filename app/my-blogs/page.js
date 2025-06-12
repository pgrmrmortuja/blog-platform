"use client";

import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import BlogCard from '../components/BlogCard';
import { AuthContext } from '@/providers/AuthProvider';
import Link from 'next/link';


export default function MyBlogs() {
    const { user } = useContext(AuthContext);

    console.log(user?.email);

    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            const response = await axios.get(`/api/blogs?email=${user?.email}`);
            setBlogs(response.data);
        };

        fetchBlogs();
    }, [user?.email]);

    console.log(blogs);

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4 md:px-10">
            <h1 className="text-3xl font-bold text-center mb-8">My Blogs</h1>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {blogs.length === 0 ? (
                    <p className="text-center text-gray-600">No blogs found.</p>
                ) : (
                    blogs.map((blog) => (
                        <div key={blog._id}
                            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300"
                        >
                            {/* <div className="w-full h-48 relative">
                                <Image
                                    src={blog.photo || "https://via.placeholder.com/400x200"}
                                    alt={blog.title}
                                    fill
                                    className="object-cover rounded-t-xl"
                                />
                            </div> */}
                            <div className="p-4">
                                <h2 className="text-xl font-semibold mb-1">{blog.title}</h2>
                                <p className="text-sm text-gray-500 mb-2">By {blog.author_name}</p>
                                <p className="text-gray-700 text-sm mb-3">{blog.short_snippet}</p>

                                {/* ✅ Tags section */}
                                <div className="flex flex-wrap gap-2 mt-2">
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

                                <div className="mt-4 text-right">
                                    <Link href={`/blogs/${blog._id}`}>
                                        <button
                                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md transition"
                                        >
                                            Details
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}