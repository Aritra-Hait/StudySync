import React, { useEffect, useState } from 'react'
import Navbar from "../components/Navbar.jsx"
import { Link } from 'react-router'
import { PlusIcon, FoldersIcon } from "lucide-react"
import NotesNotFound from '../components/NotesNotFound.jsx'
import NoteCard from '../components/NoteCard.jsx'
import api from '../axios.js'
const HomePage = () => {
    const [isRateLimited, setRateLimited] = useState(false);
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const res = await api.get("/notes");
                setNotes(res.data);
            } catch (err) {
                console.log("Error fetching notes");
                if (res.response.status == 429) {
                    setRateLimited(true);
                } else {
                    toast.error("Failed to load notes");
                }
            } finally {
                setLoading(false);
            }
        }
        fetchNotes();
    }, []);
    return (
        <div className='min-h-screen'>
            <Navbar />
            <div className="flex md:justify-between">
                <Link to="/subjects" className="btn btn-info m-3 md:m-6 text-lg">
                    <div className="flex"><FoldersIcon className="size-5 mt-1 mr-1" />Organize by Subject</div>
                </Link>
                <Link to="/createNote" className='btn btn-primary m-3 md:m-6 text-lg'>
                    <PlusIcon className='size-5' />
                    <span>New Note</span>
                </Link>

            </div>

            <div className='max-w-7xl mx-auto p-4 mt-6'>
                {loading && <div className=' text-center text-primary py-10 text-2xl'>Loading Notes . . .</div>}

                {notes.length === 0 && !isRateLimited &&
                    <NotesNotFound />}
                {notes.length > 0 && !isRateLimited &&
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

export default HomePage