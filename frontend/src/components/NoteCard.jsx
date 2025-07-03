import React from 'react'
import { Link } from 'react-router'
import { PenSquareIcon, Trash2Icon } from 'lucide-react'
import { formatDate } from '../utils'
import api from '../axios'
import toast from 'react-hot-toast'
const NoteCard = ({ note, setNotes }) => {

    const handleDelete = async (e, id) => {
        e.preventDefault();

        if (!window.confirm("Are you sure want to delete this note?")) return;

        try {
            await api.delete(`/notes/${id}`)
            setNotes((prev) => prev.filter(note => note._id !== id));
            toast.success("Note deleted sucessfully")
        } catch (err) {
            console.log('Error in handleDelete', err);
            toast.error("Failed to delete note");
        }
    }

    return (
        <div className='card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00ff9D]'>
            <div className='card-body'>
                <h3 className='card-title text-base-content'>{note.title}</h3>
                <Link to={`/note/${note._id}`} className='text-base-content/70 line-clamp-3'>Click here to view content</Link>
                <div className="card-actions justify-between items-center mt-4">
                    <span className="text-sm text-base-content/60">
                        {formatDate(new Date(note.createdAt))}
                    </span>
                    <div className="flex items-center gap-3">
                        <Link to={`/note/${note._id}/update`} className='btn btn-ghost btn-xs' ><PenSquareIcon className="size-4" /></Link>
                        <button className='btn btn-ghost btn-xs text-error' onClick={(e) => handleDelete(e, note._id)}>
                            <Trash2Icon className='size-4' />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoteCard