import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "../services/api"

export const fetchExams = createAsyncThunk("exams/fetchExams", async () => {
  const response = await api.get("/exams")
  return response.data
})

export const addExam = createAsyncThunk("exams/addExam", async (exam) => {
  const response = await api.post("/exams", exam)
  return response.data
})

const examSlice = createSlice({
  name: "exams",
  initialState: { exams: [], status: "idle", error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExams.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchExams.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.exams = action.payload
      })
      .addCase(fetchExams.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
      .addCase(addExam.pending, (state) => {
        state.status = "loading"
      })
      .addCase(addExam.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.exams.push(action.payload)
      })
      .addCase(addExam.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
  },
})

export default examSlice.reducer
