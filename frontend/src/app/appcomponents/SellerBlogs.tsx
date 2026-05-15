"use client";

import { useState } from "react";
import apiClient from "@/lib/axios";
import { useAppSelector } from "@/utils/reduxhook";


export default function SellerBlogs() {
  const [title, setTitle] = useState("");
  const tokens = useAppSelector((state) => state.data.token);

  const [sections, setSections] = useState([
    {
      heading: "",
      content: "",
    },
  ]);

  const [loading, setLoading] = useState(false);

  // Add New Section
  const addSection = () => {
    setSections([
      ...sections,
      {
        heading: "",
        content: "",
      },
    ]);
  };

  // Handle Heading Change
  const handleHeadingChange = (index: number, value: string) => {
    const updatedSections = [...sections];
    updatedSections[index].heading = value;
    setSections(updatedSections);
  };

  // Handle Content Change
  const handleContentChange = (index: number, value: string) => {
    const updatedSections = [...sections];
    updatedSections[index].content = value;
    setSections(updatedSections);
  };

  // Remove Section
  const removeSection = (index: number) => {
    const updatedSections = sections.filter((_, i) => i !== index);
    setSections(updatedSections);
  };

  // Submit Blog
  const createBlog = async () => {
    try {
      setLoading(true);

      const payload = {
        title,
        headings: sections.map((item) => item.heading),
        content: sections.map((item) => item.content),
      };

      console.log(payload);

      const response = await apiClient.post("/blogs/create", payload , {
        headers : {
            "Authorization" : `Bearer ${tokens}`
        }
      });

      console.log(response.data);

      alert("Blog Created Successfully");

      // Reset Form
      setTitle("");
      setSections([
        {
          heading: "",
          content: "",
        },
      ]);
    } catch (error) {
      console.log(error);
      alert("Failed To Create Blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">
            Create New Blog
          </h1>

          <p className="text-gray-500 mt-2">
            Write structured blog content with headings and paragraphs.
          </p>
        </div>

        <button
          onClick={createBlog}
          disabled={loading}
          className="px-8 py-4 rounded-2xl bg-black text-white
                     hover:bg-gray-800 transition-all duration-300
                     disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Publishing..." : "Publish Blog"}
        </button>
      </div>

      {/* Blog Title */}
      <div className="bg-white p-6 rounded-3xl shadow-lg mb-8">
        <label className="block text-xl font-semibold mb-3">
          Blog Title
        </label>

        <input
          type="text"
          placeholder="Enter Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 rounded-2xl
                     px-5 py-4 outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      {/* Sections */}
      <div className="space-y-8">
        {sections.map((section, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl shadow-lg p-6"
          >
            {/* Section Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">
                Section {index + 1}
              </h2>

              {sections.length > 1 && (
                <button
                  onClick={() => removeSection(index)}
                  className="px-4 py-2 rounded-xl bg-red-500 text-white
                             hover:bg-red-600 transition-all duration-300"
                >
                  Remove
                </button>
              )}
            </div>

            {/* Heading */}
            <div className="mb-6">
              <label className="block text-lg font-medium mb-2">
                Heading
              </label>

              <input
                type="text"
                placeholder="Enter Section Heading"
                value={section.heading}
                onChange={(e) =>
                  handleHeadingChange(index, e.target.value)
                }
                className="w-full border border-gray-300 rounded-2xl
                           px-5 py-4 outline-none
                           focus:ring-2 focus:ring-black"
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-lg font-medium mb-2">
                Content
              </label>

              <textarea
                placeholder="Write Your Content..."
                value={section.content}
                onChange={(e) =>
                  handleContentChange(index, e.target.value)
                }
                rows={8}
                className="w-full border border-gray-300 rounded-2xl
                           px-5 py-4 outline-none resize-none
                           focus:ring-2 focus:ring-black"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Add Section Button */}
      <div className="mt-10 flex justify-center">
        <button
          onClick={addSection}
          className="px-8 py-4 rounded-2xl bg-blue-600 text-white
                     hover:bg-blue-700 transition-all duration-300"
        >
          + Add New Section
        </button>
      </div>
    </div>
  );
}