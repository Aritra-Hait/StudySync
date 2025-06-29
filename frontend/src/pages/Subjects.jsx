import React, { useEffect, useState } from 'react'
import Navbar from "../components/Navbar.jsx"
import { Link } from 'react-router'
import api from '../axios.js'
import toast from 'react-hot-toast'
import { ArrowLeftIcon, PlusIcon } from 'lucide-react'
const HomePage = () => {
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const res = await api.get("/notes/subjects");

                setSubjects(res.data);
            } catch (err) {
                console.log("Error fetching subjects");
                toast.error("Failed to load subjects");

            } finally {
                setLoading(false);
            }
        }
        fetchSubjects();
    }, []);
    return (
        <div className='min-h-screen'>
            <Navbar />
            <div className="flex justify-between">
                <Link to={"/notes"} className="flex m-2 items-center gap-2 text-lg font-semibold ">
                    <ArrowLeftIcon className='size-5' />See All Notes
                </Link>
                <Link to="/createNote" className='btn btn-primary m-6 text-lg'>
                    <PlusIcon className='size-5' />
                    <span>New Note</span>
                </Link></div>
            <h1 className="text-3xl text-center my-9 font-semibold">Subjects</h1>

            <div className='max-w-7xl mx-auto p-4 mt-6'>
                {loading && <div className=' text-center text-primary py-10 text-2xl'>Loading Subjects . . .</div>}


                {subjects.length > 0 &&
                    <div className="flex flex-wrap gap-10">

                        {subjects.map(subject => (
                            <Link key={subject}
                                to={`/subject/${subject}`}
                                className="btn btn-primary text-xl text-black px-4 py-2 rounded whitespace-nowrap"
                            >
                                {subject}
                            </Link>
                        ))}
                    </div>


                }
            </div>
        </div >

    )
}

export default HomePage