import React, { useEffect } from "react"
import SubjectList from "./SubjectList"
import CreateExam from "./CreateExam"
import ExamList from "./ExamList"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { fetchSubjects } from "../feature/subjectSlices"
import { fetchExams } from "../feature/examsSlice"
import "../style.css"

const AdminDashboard = () => {
  const subjects = useSelector((state) => state.subjects)
  const exams = useSelector((state) => state.exams)
  const token = localStorage.getItem("token")
  const navigate = useNavigate()
  const dispatch = useDispatch()
  if (!token) {
    navigate("/")
  }

  useEffect(() => {
    dispatch(fetchSubjects())
    dispatch(fetchExams())
  }, [dispatch])

  return (
    <div>
      <div className="flex-container">
      <h2>Admin Dashboard</h2>
      </div>
      <CreateExam subjects={subjects} />
      <SubjectList subjects={subjects} />
      <ExamList exams={exams} />
    </div>
  )
}

export default AdminDashboard
