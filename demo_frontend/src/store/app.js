import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../feature/authSlice"
import subjectsReducer from "../feature/subjectSlices"
import examsReducer from "../feature/examsSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    subjects: subjectsReducer,
    exams: examsReducer,
  },
})

export default store
