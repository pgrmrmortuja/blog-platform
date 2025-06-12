'use client';

import { AuthContext } from "@/providers/AuthProvider";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useParams, useRouter } from "next/navigation";

export default function UpdateBlogs() {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    console.log("update id", id);
    const router = useRouter();

    const [blog, setBlog] = useState([]);


    // ✅ Blog data fetch
    useEffect(() => {
        axios.get(`/api/blogs/${id}`)
            .then((res) => {
                setBlog(res.data);

            })
            .catch((err) => {
                console.error(err);
                Swal.fire("Error", "Blog not found", "error");

            });
    }, [id]);

    const handleUpdateBlogs = async (event) => {
        event.preventDefault();
        const form = event.target;

        const author_name = form.author_name.value;
        const author_email = form.author_email.value;
        const author_photo = form.author_photo.value;
        const title = form.title.value;
        const photo = form.photo.value;
        const short_snippet = form.short_snippet.value;
        const full_content = form.full_content.value;
        const primary = form.primary.value;
        const secondary = form.secondary.value;
        const tags = { primary, secondary };
        const date = new Date().toLocaleDateString();

        const updatedBlog = {
            title,
            photo,
            short_snippet,
            full_content,
            tags,
            date,
            author_name,
            author_email,
            author_photo,
        };

        try {
            const res = await axios.put(`/api/blogs/${id}`, updatedBlog);
            if (res.data.modifiedCount > 0) {
                Swal.fire("Success!", "Blog updated successfully.", "success");
                router.push("/my-blogs");
            } else {
                Swal.fire("Info", "No changes were made.", "info");
            }
        } catch (error) {
            console.error(error);
            Swal.fire("Error", "Failed to update blog.", "error");
        }
    };

    console.log("blog data", blog);

    // if (!blog) {
    //     return (
    //         <div className="flex justify-center items-center min-h-screen">
    //             <span className="loading loading-spinner loading-lg text-orange-500"></span>
    //         </div>
    //     );
    // }

    return (
        <div className="flex justify-center items-center min-h-screen p-6">
            <form
                onSubmit={handleUpdateBlogs}
                className="w-full max-w-lg bg-orange-100 p-8 rounded-lg shadow-lg space-y-6"
            >
                <h2 className="text-3xl font-bold text-center text-black mb-10">Update Blog</h2>

                {/* Author Name */}
                <input type="text" name="author_name" defaultValue={user?.displayName} readOnly className="w-full bg-white px-4 py-2 border rounded" />
                <input type="email" name="author_email" defaultValue={user?.email} readOnly className="w-full bg-white px-4 py-2 border rounded" />
                <input type="text" name="author_photo" defaultValue={user?.photoURL} readOnly className="w-full bg-white px-4 py-2 border rounded" />

                <input type="text" name="title" defaultValue={blog.title} required className="w-full px-4 py-2 border rounded" />
                <input type="text" name="photo" defaultValue={blog.photo} required className="w-full px-4 py-2 border rounded" />
                <textarea name="short_snippet" defaultValue={blog.short_snippet} required className="w-full px-4 py-2 border rounded" />
                <textarea name="full_content" defaultValue={blog.full_content} required className="w-full px-4 py-2 border rounded" />
                <input type="text" name="primary" defaultValue={blog.tags?.primary} className="w-full px-4 py-2 border rounded" />
                <input type="text" name="secondary" defaultValue={blog.tags?.secondary} className="w-full px-4 py-2 border rounded" />

                <button type="submit" className="w-full py-3 btn bg-orange-500 text-black font-bold">
                    Update Blog
                </button>
            </form>
        </div>
    );
}
