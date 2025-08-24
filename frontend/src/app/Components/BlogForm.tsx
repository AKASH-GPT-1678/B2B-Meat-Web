import { Button } from "@/components/ui/button";
import React from "react";
import axios from "axios";
import {  useAppSelector } from "@/utils/reduxhook";



export interface Blog {
    title: string;
    thumbnail: string;
    summary?: string;
    author?: string;
    date?: string;
}
interface BlogCardProps {
    blog: Blog;
}


export const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
    return (
        <div className="w-full max-h-[200px] flex flex-col md:flex-row bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">

            {/* Thumbnail Image */}
            <div className="md:w-1/3 w-full h-[200px] md:h-auto">
                <img
                    src={blog.thumbnail}
                    alt={blog.title}
                    className="object-cover w-full h-full"
                />
            </div>

            {/* Content */}
            <div className="md:w-2/3 p-4 flex flex-col justify-between">
                <div>
                    <h2 className="text-xl font-bold text-gray-800 line-clamp-2">
                        {blog.title}
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                        {blog.summary || "This blog post does not have a summary yet."}
                    </p>
                </div>

                <div className="mt-4 text-sm text-gray-500">
                    <span>By: {blog.author || "Anonymous"}</span>
                    <span className="ml-4">Date: {blog.date || "Unknown"}</span>
                </div>
            </div>
        </div>
    );
};





export default function BlogForm() {
    const [title, setTitle] = React.useState("");
    const [headings, setHeadings] = React.useState<string[]>([]);
    const [content, setContent] = React.useState<string[]>([]);
    const [unfilledError, setUnfilledError] = React.useState(false);
    const [misMatchError, setMisMatchedError] = React.useState(false);
    const [someError, setSomeError] = React.useState(false);
    const [submit, setSubmit] = React.useState(true);

    const headingsRef = React.useRef<HTMLInputElement>(null);
    const contentRef = React.useRef<HTMLTextAreaElement>(null);


    const token = useAppSelector((state) => state.data.token);

    const handleMicroSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (headingsRef.current) {
            const value = headingsRef.current.value.trim();
            setHeadings(prev => [...prev, value]);
            headingsRef.current.value = "";
            if (headings.length >= 2 && content.length >= 2) {
                setSubmit(false);
            }

        }

    };


    const handleAddContent = (event: React.FormEvent) => {
        event.preventDefault();
        if (contentRef.current && contentRef.current.value.trim()) {
            const value = contentRef.current.value.trim();
            setContent(prev => [...prev, value]);
            contentRef.current.value = "";
            if (headings.length >= 2 && content.length >= 2) {
                setSubmit(false);
            }
        }
    };



    const upoadBlog = async () => {
        if (!title || headings.length === 0 || content.length === 0) {
            setUnfilledError(true);
            return;


        };

        if (headings.length != content.length) {
            setMisMatchedError(true)

        }
        try {

            const data = {
                "title": title,
                "headings": headings,
                "content": content
            }
            const response = await axios.post('http://localhost:8080/blogs/create', data, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            console.log(response.data);
            return response.data;

        } catch (error) {
            console.log("Error");
            setSomeError(true)


        }

    };

    return (


        <div className="max-w-[600px] mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
            <form className="flex flex-col gap-4 lg:w-[500px]">

                {/* Title Input */}
                <input
                    type="text"
                    placeholder="Title"
                    className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                {/* Headings Input + Micro Submit */}
                <input
                    type="text"
                    placeholder="Add your headings"
                    className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    ref={headingsRef}
                />
                <Button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-md w-fit self-start"
                    onClick={handleMicroSubmit}
                >
                    Add
                </Button>

                {/* Content Input + Micro Submit */}
                <textarea
                    placeholder="Add your Content"
                    className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    ref={contentRef}
                    rows={5}
                ></textarea>
                <Button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-md w-fit self-start"
                    onClick={handleAddContent}
                >
                    Add
                </Button>

                {/* Error Messages */}
                {unfilledError && (
                    <p className="mt-4 text-red-600 text-sm">
                        Fill all the fields before submission
                    </p>
                )}
                {misMatchError && (
                    <p className="mt-4 text-red-600 text-sm">
                        The number of headings and content should be the same
                    </p>
                )}
                {someError && (
                    <p className="mt-4 text-red-600 text-sm">
                        Unable to submit data. Add it properly.
                    </p>
                )}

                {/* Final Submit Button */}
                <Button
                    className="mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-md disabled:opacity-50"
                    disabled={submit}
                    onClick={upoadBlog}
                >
                    Submit
                </Button>
            </form>

            <div>{/* Extra content block if needed */}</div>
        </div>


    )
}