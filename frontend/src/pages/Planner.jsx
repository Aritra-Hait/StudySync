'use client';

import React, { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import { enIN } from 'date-fns/locale';
import "react-big-calendar/lib/css/react-big-calendar.css";
import Navbar from "../components/Navbar.jsx";
import { calendarAPI } from "../axios.js";
import { Link } from "react-router";
import Modal from "react-modal";
import toast from "react-hot-toast";
import { NotebookPen } from "lucide-react";
import { Trash2 } from "lucide-react";

const locales = { "en-IN": enIN };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });

// Accessibility setup
Modal.setAppElement("#root");

export const fetchTasks = () => calendarAPI.get("/allTasks");

export default function CalendarPage() {
    const [tasks, setTasks] = useState([]);
    const [view, setView] = useState(Views.MONTH);
    const [date, setDate] = useState(new Date());

    const [selectedTask, setSelectedTask] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        const loadTasks = async () => {
            const res = await fetchTasks();
            const parsedTasks = res.data.map(task => ({
                ...task,
                start: new Date(task.start),
                end: new Date(task.end),
            }));

            setTasks(parsedTasks);
        };

        loadTasks();
    }, []);


    const handleDelete = async (e, id) => {
        e.preventDefault();

        if (!window.confirm("Are you sure want to delete this task?")) return;

        try {
            await calendarAPI.delete(`/deleteTask/${id}`)
            setTasks((prev) => prev.filter(note => note._id !== id));
            toast.success("Task deleted sucessfully")
            setModalIsOpen(false);
        } catch (err) {
            console.log('Error in handleDelete', err);
            toast.error("Failed to delete note");
        }
    }

    return (
        <div>
            <Navbar />
            <div className="bg-white text-black p-4">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex">
                        <h1 className="text-2xl font-bold flex justify-center">Track Your Progress and Plan Ahead</h1>
                        <NotebookPen className="m-1" />
                    </div>
                    <Link
                        to="/AddTask"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
                    >
                        Add Task
                    </Link>
                </div>

                <Calendar
                    localizer={localizer}
                    events={tasks}
                    startAccessor="start"
                    endAccessor="end"
                    views={[Views.MONTH, Views.WEEK, Views.DAY]}
                    view={view}
                    onView={(v) => setView(v)}
                    date={date}
                    onNavigate={(d) => setDate(d)}
                    style={{ height: 600 }}
                    onSelectEvent={(task) => {
                        setSelectedTask(task);
                        setModalIsOpen(true);
                    }}
                    eventPropGetter={(task) => ({
                        style: {
                            color: "white",
                            backgroundColor: "#2563eb",
                            border: "3px solid gold",
                            borderRadius: "6px",
                            padding: "2px",
                        },
                    })}
                />

                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={() => setModalIsOpen(false)}
                    contentLabel="Task Details"
                    className="bg-base-200 p-6 rounded shadow-md max-h-2xl max-w-[95vw] lg:max-w-3xl w-full outline-none z-[1000]"

                    overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000]"
                >

                    {selectedTask && (
                        <div className="overflow-y-auto max-h-[80vh] ">
                            <div className="m-4 flex justify-between">
                                <button
                                    onClick={(e) => { handleDelete(e, selectedTask._id) }}
                                    className="flex bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                                >
                                    Delete<Trash2 className="cursor-pointer" />
                                </button>
                                <button
                                    onClick={() => setModalIsOpen(false)}
                                    className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600 transition"
                                >
                                    Close
                                </button>
                            </div>
                            <h2 className="text-3xl font-bold mb-2 flex justify-center">{selectedTask.title}</h2>
                            <div className="flex justify-between">
                                <p className="m-4"><strong>Start:</strong> {new Date(selectedTask.start).toLocaleString()}</p>
                                <p className="m-4"><strong>End:</strong> {new Date(selectedTask.end).toLocaleString()}</p>
                            </div>
                            <p className="text-lg m-1">{selectedTask.task}</p>


                        </div>
                    )}
                </Modal>
            </div>
        </div>
    );
}
