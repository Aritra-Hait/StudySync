import { useNavigate } from "react-router"
import React, { useEffect, useState } from 'react'
import { useParams } from "react-router"
import Navbar from "../components/Navbar.jsx"
import toast from "react-hot-toast"
import api from "../axios.js"
import { LoaderIcon, Trash2Icon, ArrowLeftIcon } from "lucide-react"
const NoteUpdatePage = () => {
    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const navigate = useNavigate();

    const { id } = useParams();
    const [file, setFile] = useState(null);

    const uploadToCloudinary = async (file) => {
        const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
        const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", uploadPreset);

        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
            method: "POST",
            body: formData,
        });
        if (!res.ok) throw new Error("Cloudinary upload failed");
        const data = await res.json();
        return data.secure_url;
    };

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this note?")) return;

        try {
            await api.delete(`/notes/${id}`);
            toast.success("Note deleted");
            navigate(-1);
        } catch (error) {
            console.log("Error deleting the note:", error);
            toast.error("Failed to delete note");
        }
    };

    const handleSave = async () => {
        if (!note.title.trim() || !note.content.trim()) {
            toast.error("Please add a title or content");
            return;
        }

        setSaving(true);

        try {
            let imageUrl = note.image;
            if (file) {
                imageUrl = await uploadToCloudinary(file);
            }

            await api.put(`/notes/${id}`, {
                ...note,
                image: imageUrl,
            });

            toast.success("Note updated successfully");
            navigate(-1);
        } catch (error) {
            console.log("Error saving the note:", error);
            toast.error("Failed to update note");
        } finally {
            setSaving(false);
        }
    };



    useEffect(
        () => {
            const fetchNote = async () => {
                try {
                    const res = await api.get(`/notes/${id}`)
                    setNote(res.data);
                } catch (err) {
                    console.log("Error in fetching note", err);
                    toast.error("Failed to fetch the note");
                } finally {
                    setLoading(false);
                }
            };
            fetchNote();
        }, [id]
    );

    //console.log({ note });

    if (loading) {
        return (
            <div className="min-h-screen bg-base-200 flex items-center justify-center">
                <LoaderIcon className="animate-spin size-10" />
            </div>
        );
    }
    return (
        <div>
            <Navbar />
            <div className="min-h-screen bg-base-200 ">
                <div className="container mx-auto px-4 py-8">
                    <div className="max-w-2xl mx-auto">
                        <div className="flex items-center justify-between mb-6">
                            <button onClick={() => navigate(-1)} className="btn btn-ghost flex items-center gap-1">
                                <ArrowLeftIcon className="h-5 w-5" />
                                Back to Notes
                            </button>
                            <button onClick={handleDelete} className="btn btn-error btn-outline">
                                <Trash2Icon className="h-5 w-5" />
                                Delete Note
                            </button>
                        </div>

                        <div className="card bg-base-100">
                            <div className="card-body">
                                <div className="form-control mb-4">
                                    <label className="label">
                                        <span className="label-text">Title</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Note title"
                                        className="input input-bordered"
                                        value={note.title}
                                        onChange={(e) => setNote({ ...note, title: e.target.value })}
                                    />
                                </div>
                                <div className="form-control mb-4">
                                    <label className="label">
                                        <span className="label-text">Subject</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Note subject"
                                        className="input input-bordered"
                                        value={note.subject}
                                        onChange={(e) => setNote({ ...note, subject: e.target.value })}
                                    />
                                </div>
                                <div className="form-control mb-4">
                                    <label className="label">
                                        <span className="label-text">Content</span>
                                    </label>
                                    <textarea
                                        placeholder="Write your note here..."
                                        className="textarea textarea-bordered h-32"
                                        value={note.content}
                                        onChange={(e) => setNote({ ...note, content: e.target.value })}
                                    />
                                </div>
                                {note.image && (
                                    <div className="mb-4">
                                        <img
                                            src={note.image}
                                            alt="Current Note"
                                            className="w-full max-h-[300px] object-contain rounded border"
                                        />
                                    </div>
                                )}

                                <div className="form-control mb-4">
                                    <label className="label">
                                        <span className="label-text">Update Image (optional)</span>
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setFile(e.target.files[0] || null)}
                                    />
                                </div>

                                <div className="card-actions justify-end">
                                    <button className="btn btn-primary" disabled={saving} onClick={handleSave}>  {saving ? "Saving . . ." : "Save Changes"}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoteUpdatePage