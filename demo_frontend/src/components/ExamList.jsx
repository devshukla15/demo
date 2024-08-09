import React, { useDeferredValue, useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"

const ExamList = ({ exams }) => {
  const [visibleExamIndex, setVisibleExamIndex] = useState(null)
  const [filteredExams,setFilteredExams] = useState(exams)
  const [query,setQUery] = useState('')
  const searchQuery = useDeferredValue(query)

  const toggleQuestionsVisibility = (index) => {
    setVisibleExamIndex(visibleExamIndex === index ? null : index)
  }

  useMemo(() => {
    if(query === "") setFilteredExams(exams)
    else {
    const newExams = {...filteredExams, exams: exams?.exams.filter((exam) => exam.subject?.toLowerCase().includes(query))}
    setFilteredExams(newExams)
  }
},[searchQuery])

useEffect(() => {
  setFilteredExams(exams)
}, [exams])
  
  return (
    <div>
      <h2>Exams</h2>
      <ul>
        <input type="text" placeholder="Search exams" onChange={(e) =>setQUery(e.target.value)} />
        {filteredExams &&
          filteredExams.exams.map((exam, index) => (
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
                      <Link to={`/exam/${exam?._id}`}>Go to Exam</Link>
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
