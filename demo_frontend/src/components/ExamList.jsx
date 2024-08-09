import React, { useState } from "react"
import { Link } from "react-router-dom"

const ExamList = ({ exams }) => {
  const [visibleExamIndex, setVisibleExamIndex] = useState(null)

  const toggleQuestionsVisibility = (index) => {
    setVisibleExamIndex(visibleExamIndex === index ? null : index)
  }

  return (
    <div>
      <h3>Exams</h3>
      <ul>
        {exams &&
          exams.exams.map((exam, index) => (
            <li key={index}>
              <p>Subject: {exam.subject}</p>
              <p>Number of Questions: {exam.numQuestions}</p>
              <button onClick={() => toggleQuestionsVisibility(index)}>
                {visibleExamIndex === index
                  ? "Hide Questions"
                  : "Show Questions"}
              </button>
              {visibleExamIndex === index && (
                <ul>
                  {exam.questions.map((question, qIndex) => (
                    <li key={qIndex}>
                      <p>{question.text}</p>
                      {question.type === "Radio" ||
                      question.type === "Checkbox" ? (
                        <ul>
                          {question.options.map((option, oIndex) => (
                            <li key={oIndex}>{option}</li>
                          ))}
                        </ul>
                      ) : null}
                      <Link to={`/exam/${index}`}>Go to Exam</Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
      </ul>
    </div>
  )
}

export default ExamList
