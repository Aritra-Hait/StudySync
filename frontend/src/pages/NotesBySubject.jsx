import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import api from '../axios.js';
import NoteCard from '../components/NoteCard.jsx';
import Navbar from "../components/Navbar.jsx";
import toast from 'react-hot-toast';
import { ArrowLeftIcon, PlusIcon } from 'lucide-react';
const NotesBySubjectPage = () => {
    const { subject } = useParams();
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const res = await api.get(`/notes/subject/${subject}`);
                setNotes(res.data);
            } catch (err) {
                toast.error("Failed to load notes");
            } finally {
                setLoading(false);
            }
        };
        fetchNotes();
    }, [subject]);

    return (
        <div className='min-h-screen'>
            <Navbar />
            <div className="flex justify-between">
                <Link to={"/subjects"} className="flex m-2 items-center gap-2 text-lg font-semibold ">
                    <ArrowLeftIcon className='size-5' />Back to Subjects
                </Link>
                <Link to="/createNote" className='btn btn-primary m-6 text-lg'>
                    <PlusIcon className='size-5' />
                    <span>New Note</span>
                </Link></div>
            <div className='max-w-7xl mx-auto p-4 mt-6'>
                {loading && <div className=' text-center text-primary py-10 text-2xl'>Loading Notes . . .</div>}

                {notes.length > 0 &&
                    <div className='grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {notes.map(note => {
                            return <NoteCard key={note._id} note={note} setNotes={setNotes} />
                        })}
                    </div>
                }
            </div>
        </div>

    )
}

export default NotesBySubjectPage;