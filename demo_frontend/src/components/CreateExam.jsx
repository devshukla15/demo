import React, { useState } from "react"
import { useDispatch } from "react-redux"
import AddQuestion from "./AddQuestion"
import { addExam } from "../feature/examsSlice"

const CreateExam = ({ subjects }) => {
  const [selectedSubject, setSelectedSubject] = useState("")
  const [numQuestions, setNumQuestions] = useState(0)
  const [questions, setQuestions] = useState([])
  const dispatch = useDispatch()

  const handleAddExam = () => {
    if (
      selectedSubject &&
      numQuestions > 0 &&
      questions.length >= numQuestions
    ) {
      const newExam = {
        subject: selectedSubject,
        numQuestions: parseInt(numQuestions),
        questions,
      }
      dispatch(addExam(newExam))
      setSelectedSubject("")
      setNumQuestions(0)
      setQuestions([])
    } else {
      alert("Please fill all fields and add enough questions.")
    }
  }

  return (
    <div>
      <h3>Create Exam</h3>
      <select
        onChange={(e) => setSelectedSubject(e.target.value)}
        value={selectedSubject}
      >
        <option value="">Select Subject</option>
        {subjects?.subjects?.length &&
          subjects?.subjects?.map((subject, index) => (
            <option key={index} value={subject?.name}>
              {subject?.name}
            </option>
          ))}
      </select>
      <input
        type="text"
        placeholder="Number of Questions"
        value={numQuestions}
        onChange={(e) => setNumQuestions(e.target.value)}
      />
      <AddQuestion questions={questions} setQuestions={setQuestions} />
      <button onClick={handleAddExam}>Add Exam</button>
    </div>
  )
}

export default CreateExam
