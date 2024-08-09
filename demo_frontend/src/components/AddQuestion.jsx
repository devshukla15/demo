import React, { useState } from "react"

const AddQuestion = ({ questions, setQuestions }) => {
  const [questionText, setQuestionText] = useState("")
  const [questionType, setQuestionType] = useState("Text")
  const [options, setOptions] = useState(["", ""])

  const addOption = () => setOptions([...options, ""])

  const updateOption = (index, value) => {
    const newOptions = options.slice()
    newOptions[index] = value
    setOptions(newOptions)
  }

  const addQuestion = () => {
    if (questionText.trim()) {
      const newQuestion = {
        text: questionText,
        type: questionType,
        options:
          questionType === "Radio" || questionType === "Checkbox"
            ? options
            : null,
      }
      setQuestions([...questions, newQuestion])
      setQuestionText("")
      setOptions(["", ""])
    } else {
      alert("Please enter a question.")
    }
  }

  return (
    <div>
      <h4>Add Question</h4>
      <input
        type="text"
        placeholder="Question Text"
        value={questionText}
        onChange={(e) => setQuestionText(e.target.value)}
      />
      <select
        onChange={(e) => setQuestionType(e.target.value)}
        value={questionType}
      >
        <option value="Text">Text</option>
        <option value="Number">Number</option>
        <option value="Radio">Radio</option>
        <option value="Checkbox">Checkbox</option>
      </select>
      {(questionType === "Radio" || questionType === "Checkbox") && (
        <div>
          {options.map((option, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Option ${index + 1}`}
              value={option}
              onChange={(e) => updateOption(index, e.target.value)}
            />
          ))}
          <button onClick={addOption}>Add Option</button>
        </div>
      )}
      <button onClick={addQuestion}>Add Question</button>
    </div>
  )
}

export default AddQuestion
