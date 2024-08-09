import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchSubjects, addSubject } from "../feature/subjectSlices"

const SubjectList = () => {
  const dispatch = useDispatch()
  const subjects = useSelector((state) => state.subjects.subjects)
  const status = useSelector((state) => state.subjects.status)
  const error = useSelector((state) => state.subjects.error)
  const [newSubject, setNewSubject] = useState("")
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchSubjects())
    }
  }, [status, dispatch])

  const handleAddSubject = (e) => {
    e.preventDefault()
    if (newSubject.trim()) {
      dispatch(addSubject({ name: newSubject.trim() }))
      setNewSubject("")
      setShowForm(false)
    }
  }

  if (status === "loading") {
    return <p>Loading...</p>
  }

  if (status === "failed") {
    return <p>{error}</p>
  }
  console.log(subjects?.subjects)

  return (
    <div>
      <h2>Subjects</h2>
      <ul>
        {subjects?.subjects?.map((subject) => (
          <li key={subject._id}>{subject?.name}</li>
        ))}
      </ul>
      <button onClick={() => setShowForm(true)}>Add Subject</button>
      {showForm && (
        <form onSubmit={handleAddSubject}>
          <input
            type="text"
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
            placeholder="Enter new subject"
          />
          <button type="submit">Add</button>
          <button type="button" onClick={() => setShowForm(false)}>
            Cancel
          </button>
        </form>
      )}
    </div>
  )
}

export default SubjectList
