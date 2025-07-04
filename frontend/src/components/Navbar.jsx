import React from 'react'
import { Link, useNavigate } from 'react-router'
const Navbar = () => {
    const navigate = useNavigate();
    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    };
    return (
        <header className='bg-base-300 my-4 border-b border-base-content/10'>
            <div className='mx-auto max-w-6xl p-4 md:flex items-center justify-between'>
                <h1 className='text-4xl m-2 font-bold text-primary font-mono tracking-tighter md:m-0'> StudySync</h1>
                <div className='flex items-center m-2 gap-8 md:m-0'>
                    <Link to="/Planner" className='btn btn-secondary text-lg'>Study Planner</Link >
                    <Link to="/notes" className='btn btn-secondary text-lg'>Notes</Link >

                </div>
                <button
                    onClick={(e) => { handleLogout(e) }}
                    className="btn text-lg text-black bg-red-700 hover:bg-red-800 m-2 md:m-0"
                >Logout</button>
            </div>


        </header >
    )
}

export default Navbar