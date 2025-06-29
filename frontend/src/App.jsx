import React from 'react'
import { Route, Routes } from 'react-router'
import Login from "./pages/Login.jsx";
import Signup from "./pages/SignUp.jsx";
import HomePage from './pages/Home.jsx'
import Subjects from "./pages/Subjects.jsx"
import NotesBySubjectPage from "./pages/NotesBySubject.jsx"
import CreateNote from "./pages/CreateNote.jsx"
import NoteUpdatePage from "./pages/NoteUpdatePage.jsx"
import Planner from "./pages/Planner.jsx"
import NoteDetailPage from "./components/NoteDetailPage.jsx"
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AddTask from './pages/AddTask.jsx'
import toast from "react-hot-toast"


const App = () => {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]" />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/notes" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/subjects" element={<ProtectedRoute><Subjects /></ProtectedRoute>} />
        <Route path="/subject/:subject" element={<ProtectedRoute><NotesBySubjectPage /></ProtectedRoute>} />
        <Route path="/createNote" element={<ProtectedRoute><CreateNote /></ProtectedRoute>} />
        <Route path="/note/:id/update" element={<ProtectedRoute><NoteUpdatePage /></ProtectedRoute>} />
        <Route path="/note/:id" element={<ProtectedRoute><NoteDetailPage /></ProtectedRoute>} />
        <Route path="/planner" element={<ProtectedRoute><Planner /></ProtectedRoute>} />
        <Route path="/AddTask" element={<ProtectedRoute><AddTask /></ProtectedRoute>} />
      </Routes>
    </div>
  )
}

export default App