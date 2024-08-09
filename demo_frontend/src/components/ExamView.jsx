import React from "react"
import { useParams } from "react-router-dom"
import {  useSelector } from "react-redux"
import "../style.css"

const ExamView = () => {
  const { id } = useParams()

  const exam = useSelector((state) =>
    state?.exams?.exams?.find((exam, index) => exam?._id === id)
  )
  
  if (!exam) {
    return <p>Exam not found</p>
  }
  
  // Shuffle questions
  const shuffledQuestions = exam?.questions

 
  
  return (
    <div className="container">
      <h3>Exam for {exam.subject}</h3>
      {shuffledQuestions && shuffledQuestions?.map((question, index) => (
        <div key={index} className="exam-question">
          <p>{question.text}</p>
          {question.type === "Radio" || question.type === "Checkbox" ? (
            question.options.map((option, idx) => (
              <label key={idx}>
                <input
                  type={question.type.toLowerCase()}
                  name={question.text}
                />{" "}
                {option}
              </label>
            ))
          ) : (
            <input type={question.type.toLowerCase()} />
          )}
        </div>
      ))}
    </div>
  )
}

export default ExamView
