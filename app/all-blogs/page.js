import axios from 'axios';
import React from 'react'

export default function AllBlogs() {

    const blogs = axios.get('/api/blogs');
    console.log(blogs);

  return (
    <div>
        <h1>All Blogs</h1>
        {
            blogs.map((blog) =>(blog.title))
        }
    </div>
  )
}
