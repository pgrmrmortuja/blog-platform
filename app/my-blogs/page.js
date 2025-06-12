"use client";

import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/providers/AuthProvider';
import Link from 'next/link';
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from 'sweetalert2';


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

    //delete
    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`/api/blogs/${id}`);
                    setBlogs(blogs.filter(blog => blog._id !== id));

                    Swal.fire(
                        'Deleted!',
                        'Your blog has been deleted.',
                        'success'
                    );
                } catch (error) {
                    Swal.fire(
                        'Error!',
                        'There was a problem deleting the blog.',
                        'error'
                    );
                }
            }
        });
    };

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
                            <div className="p-4">
                                <h2 className="text-xl font-semibold mb-1">{blog.title}</h2>
                                <p className="text-sm text-gray-500 mb-2">By {blog.author_name}</p>
                                <p className="text-gray-700 text-sm mb-3">{blog.short_snippet}</p>

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

                                {/* 👇 Update & Delete buttons */}
                                <div className="flex justify-between items-center mt-4">
                                    <Link href={`/update/${blog._id}`}>
                                        <button className="text-blue-600 hover:text-blue-800 text-xl" title="Edit">
                                            <FaEdit />
                                        </button>
                                    </Link>

                                    <button onClick={() => handleDelete(blog._id)} className="text-red-600 hover:text-red-800 text-xl" title="Delete">
                                        <FaTrash />
                                    </button>
                                </div>

                                {/* ✅ Details Button */}
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