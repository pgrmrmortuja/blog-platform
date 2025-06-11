'use client';

import axios from "axios";
import Swal from "sweetalert2";

export default function AddBlogs() {

  const handleAddBlogs = async (event) => {
    event.preventDefault();

    const form = event.target;

    // const author_name = form.author_name.value;
    // const author_email = form.author_email.value;
    // const author_photo = form.author_photo.value;
    const title = form.title.value;
    const photo = form.photo.value;
    const short_snippet = form.short_snippet.value;
    const full_content = form.full_content.value;
    const primary = form.primary.value;
    const secondary = form.secondary.value;
    const tags = { primary, secondary };

    const newBlogs = { title, photo, short_snippet, full_content, tags };

    console.log(newBlogs);

    const blogsRes = await axios.post('/api/blogs', newBlogs);

    console.log(blogsRes.data);

    if (blogsRes.data.insertedId) {
      //show success popup
      form.reset();
      Swal.fire({
        position: "top",
        icon: "success",
        title: `${title} is uploaded successfully.`,
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen  p-6">
      <form
        onSubmit={handleAddBlogs}
        className="w-full max-w-lg bg-orange-100 p-8 rounded-lg shadow-lg space-y-6">
        <h2 className="text-3xl font-bold text-center text-black mb-10">Add Your Blogs</h2>

        {/* User Name (Read-only) */}
        {/* <div className="mb-4">
          <label htmlFor="author_name" className="block text-lg font-medium text-gray-700">
            User Name
          </label>
          <input
            type="text"
            name="author_name"
            id="author_name"
            value={user?.displayName || ""}
            readOnly
            className="mt-2 w-full border-2 border-gray-300 rounded-lg px-4 py-2 bg-white cursor-not-allowed"
          />
        </div> */}

        {/* User Email (Read-only) */}
        {/* <div className="mb-4">
          <label htmlFor="author_email" className="block text-lg font-medium text-gray-700">
            User Email
          </label>
          <input
            type="email"
            name="email"
            id="author_email"
            value={user?.email || ""}
            readOnly
            className="mt-2 w-full border-2 border-gray-300 bg-white rounded-lg px-4 py-2 cursor-not-allowed"
          />
        </div> */}

        {/* Photo URL */}
        {/* <div className="mb-4">
          <label htmlFor="author_photo" className="block text-lg font-medium text-gray-700">
            Product's Photo URL
          </label>
          <input
            type="text"
            name="author_photo"
            id="author_photo"
            className="mt-2 w-full bg-white border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div> */}

        {/* Blog Title */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-lg font-medium text-gray-700">
            Blog Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="mt-2 bg-white w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Blog Photo URL */}
        <div className="mb-4">
          <label htmlFor="photo" className="block text-lg font-medium text-gray-700">
            Blog Photo URL
          </label>
          <input
            type="text"
            name="photo"
            id="photo"
            className="mt-2 bg-white w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Short Snippet */}
        <div className="mb-4">
          <label htmlFor="short_snippet" className="block text-lg font-medium text-gray-700">
            Short Snippet
          </label>
          <textarea
            name="short_snippet"
            id="short_snippet"
            rows="1"
            className="mt-2 bg-white w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>


        {/* Full Content */}
        <div className="mb-4">
          <label htmlFor="full_content" className="block text-lg font-medium text-gray-700">
            Full Content
          </label>
          <textarea
            name="full_content"
            id="full_content"
            rows="6"
            className="mt-2 bg-white w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Tags */}
        <div className="mb-4 flex gap-4">
          {/* primary */}
          <div className="mb-4">
            <label htmlFor="primary" className="block text-lg font-medium text-gray-700">
              Tags (Primary)
            </label>
            <input
              type="text"
              name="primary"
              id="primary"
              className="mt-2 bg-white w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
            />
          </div>

          {/* secondary */}
          <div className="mb-4">
            <label htmlFor="secondary" className="block text-lg font-medium text-gray-700">
              Tags(Secondary)
            </label>
            <input
              type="text"
              name="secondary"
              id="secondary"
              className="mt-2 bg-white w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full font-bold py-3 rounded-lg items-center btn  bg-orange-500 text-black hover:text-orange-400 border-none"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
