"use client";

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BlogCard from '../components/BlogCard';

export default function AllBlogs() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            const response = await axios.get('/api/blogs');
            setBlogs(response.data);
        };

        fetchBlogs();
    }, []);

    console.log(blogs);

    return (

        <div className="min-h-screen bg-gray-100 py-8 px-4 md:px-10">
            <h1 className="text-3xl font-bold text-center mb-8">All Blogs</h1>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {blogs.length === 0 ? (
                    <p className="text-center text-gray-600">No blogs found.</p>
                ) : (
                    blogs.map((blog) => (
                        <BlogCard key={blog._id} blog={blog}></BlogCard>
                    ))
                )}
            </div>
        </div>

    );
}