import React from "react"
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom"
import Login from "./components/Login"
import AdminDashboard from "./components/AdminDashboard"
import ExamView from "./components/ExamView"
import { useSelector } from "react-redux"
import "./style.css"

const App = () => {
  const exams = useSelector((state) => state.exams)

  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="exam/:id" element={<ExamView exams={exams} />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
