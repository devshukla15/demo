import React from "react"
import SubjectList from "./SubjectList"
import CreateExam from "./CreateExam"
import ExamList from "./ExamList"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const AdminDashboard = () => {
  const subjects = useSelector((state) => state.subjects)
  const exams = useSelector((state) => state.exams)
  const token = useSelector((state) => state.auth.token)
  const navigate = useNavigate()
  if (!token) {
    navigate("/")
  }

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <CreateExam subjects={subjects} />
      <SubjectList subjects={subjects} />
      <ExamList exams={exams} />
    </div>
  )
}

export default AdminDashboard
