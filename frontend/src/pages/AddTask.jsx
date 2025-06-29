import { useState } from 'react'
import Navbar from '../components/Navbar';
import { ArrowLeftIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { calendarAPI } from '../axios';

const AddTask = () => {
    const [subject, setSubject] = useState("");
    const [task, setDetails] = useState("");
    const [startTime, setStartTime] = useState("");
    const [deadline, setDeadline] = useState("");

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!subject.trim() || !task.trim() || !startTime.trim() || !deadline.trim()) {
            toast.error("All fields are required");
            return;
        }

        if (new Date(startTime) > new Date(deadline)) {
            toast.error("Deadline cannot be before starting time");
            return;
        }

        setLoading(true);
        try {
            await calendarAPI.post("/addTask", {
                title: subject,
                task: task,
                start: new Date(startTime),
                end: new Date(deadline),
            });

            toast.success("Task added successfully!");
            navigate("/planner");
        } catch (err) {
            console.log("Error adding task", err);
            if (err.response.status === 429) {
                toast.error("Slow down! You're adding tasks too fast", {
                    duration: 4000, icon: "💀",
                })
            } else
                toast.error("Failed to add task");
        } finally {
            setLoading(false);
        }

        // console.log(task);
        // console.log(startTime);
        // console.log(deadline);
    }
    return (
        <div>
            <Navbar />
            <div className='min-h-screen bg-base-200'>
                <div className='container mx-auto px-4 py-8'>
                    <div className='max-w-2xl mx-auto'>
                        <Link to={"/planner"} className="flex items-center gap-2 text-md font-semibold ">
                            <ArrowLeftIcon className='size-5' />Back to Planner
                        </Link>
                        <div className="card bg-base-100">
                            <div className="card-body">
                                <h2 className="card-title text-2xl mb-4">Add New Task</h2>
                                <form onSubmit={handleSubmit}>

                                    <div className="form-control mb-4">
                                        <label className="text-lg font-semibold mb-2 block">
                                            Subject
                                        </label>
                                        <input type='text' placeholder='Subject' className='input input-bordered my-2' value={subject} onChange={(e) => setSubject(e.target.value)} />
                                    </div>
                                    <div className="form-control mb-4">
                                        <label className="text-lg font-semibold mb-2 block">
                                            Task Details
                                        </label>
                                        <textarea
                                            placeholder="Write your task here..."
                                            className="textarea textarea-bordered h-32 mb-4"
                                            value={task}
                                            onChange={(e) => setDetails(e.target.value)}
                                        />
                                    </div>

                                    <div className="form-control mb-4">
                                        <label htmlFor="startTime" className="text-lg font-semibold mb-2 block">
                                            Starting Time
                                        </label>
                                        <input
                                            id="startTime"
                                            type="datetime-local"
                                            value={startTime}
                                            onChange={(e) => setStartTime(e.target.value)}
                                            className="input input-bordered mb-4"
                                        />
                                    </div>

                                    <div className="form-control mb-4">
                                        <label htmlFor="deadline" className="text-lg font-semibold mb-2 block">
                                            Deadline (Expected)
                                        </label>
                                        <input
                                            id="deadline"
                                            type="datetime-local"
                                            value={deadline}
                                            onChange={(e) => setDeadline(e.target.value)}
                                            className="input input-bordered mb-4"
                                        />
                                    </div>


                                    <div className="card-actions justify-end">
                                        <button type='submit' className='btn btn-primary' disabled={loading}>
                                            {loading ? "Adding . . ." : "Add Task"}
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

export default AddTask;