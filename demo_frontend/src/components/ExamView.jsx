import React from "react"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import "../style.css"

const ExamView = () => {
  const { id } = useParams()
  const exams = useSelector((state) => state.exams)
  console.log(exams)

  const exam = useSelector((state) =>
    state?.exams?.exams?.find((exam, index) => index.toString() === id)
  )

  if (!exam) {
    return <p>Exam not found</p>
  }

  // Shuffle questions
  const shuffledQuestions = exam.questions
    .sort(() => Math.random() - 0.5)
    .slice(0, exam.numQuestions)

  return (
    <div className="container">
      <h3>Exam for {exam.subject}</h3>
      {shuffledQuestions.map((question, index) => (
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
