import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import api from '../axios';
import Navbar from "../components/Navbar";
import { ArrowLeftIcon } from 'lucide-react';

const NoteDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const res = await api.get(`/notes/${id}`);
                setNote(res.data);
            } catch (err) {
                console.error("Error fetching note:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchNote();
    }, [id]);

    if (loading) return <div className="text-center mt-8">Loading note...</div>;
    if (!note) return <div className="text-center mt-8 text-red-500">Note not found</div>;

    return (
        <div>
            <Navbar />
            <div className="min-h-screen bg-base-500 flex items-center justify-center px-4">
                <div className="bg-base-200 shadow-xl rounded-xl p-8 max-w-5xl w-full">

                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center text-md mx-0 mb-6"
                    >
                        <ArrowLeftIcon className="w-5 h-5 mr-1" />
                        Go Back
                    </button>

                    <h1 className="text-4xl font-bold mb-4">{note.title}</h1>
                    <h1 className="text-2xl font-bold mb-4">{note.subject}</h1>
                    <p className="text-lg mb-6 whitespace-pre-line">{note.content}</p>

                    {/* Optional Image */}
                    {note.image && (
                        <Zoom>
                            <img
                                src={note.image}
                                alt="Note"
                                className="w-full max-h-[500px] object-contain rounded-md border"
                            />
                        </Zoom>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NoteDetailPage;
