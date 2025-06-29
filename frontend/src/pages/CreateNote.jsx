import React, { useState } from 'react'
import Navbar from "../components/Navbar.jsx"
import { ArrowLeftIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import api from '../axios.js';
const CreateNote = () => {
    const [title, setTitle] = useState("");
    const [subject, setSubject] = useState("");
    const [content, setContent] = useState("");
    const [file, setFile] = useState("");

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const uploadToCloudinary = async (file) => {
        const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
        const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', uploadPreset);

        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
            method: 'POST',
            body: formData,
        });
        if (!res.ok) throw new Error('Cloudinary upload failed');
        const data = await res.json();
        return data.secure_url;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim() || !subject.trim() || !content.trim()) {
            toast.error("All fields are required");
            return;
        }
        setLoading(true);
        try {
            let imageUrl = "";
            if (file !== "")
                imageUrl = await uploadToCloudinary(file);
            await api.post("/notes", {
                title, content, image: imageUrl, subject
            })
            toast.success("Note created successfully!")
            navigate(-1);
        } catch (err) {
            console.log("Error creating note", err);
            if (err.response.status === 429) {
                toast.error("Slow down! You're creating notes too fast", {
                    duration: 4000, icon: "💀",
                })
            } else
                toast.error("Failed to create note");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <Navbar />
            <div className='min-h-screen bg-base-200'>
                <div className='container mx-auto px-4 py-8'>
                    <div className='max-w-2xl mx-auto'>
                        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-md font-semibold ">
                            <ArrowLeftIcon className='size-5' />Back to Notes
                        </button>
                        <div className="card bg-base-100">
                            <div className="card-body">
                                <h2 className="card-title text-2xl mb-4">Create New Note</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className='form-control mb-4'>
                                        <label className='label-text'>
                                            <span className='label-text'>Title</span>
                                        </label>
                                        <input type='text' placeholder='Note Title' className='input input-bordered my-2' value={title} onChange={(e) => setTitle(e.target.value)} />
                                    </div>
                                    <div className='form-control mb-4'>
                                        <label className='label-text'>
                                            <span className='label-text'>Subject</span>
                                        </label>
                                        <input type='text' placeholder='Note Subject' className='input input-bordered my-2' value={subject} onChange={(e) => setSubject(e.target.value)} />
                                    </div>
                                    <div className="form-control mb-4">
                                        <label className="label">
                                            <span className="label-text">Content</span>
                                        </label>
                                        <textarea
                                            placeholder="Write your note here..."
                                            className="textarea textarea-bordered h-32"
                                            value={content}
                                            onChange={(e) => setContent(e.target.value)}
                                        />
                                    </div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setFile(e.target.files[0] || null)}
                                    />


                                    <div className="card-actions justify-end">
                                        <button type='submit' className='btn btn-primary' disabled={loading}>
                                            {loading ? "Creating . . ." : "Create Note"}
                                        </button>

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateNote