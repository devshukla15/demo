import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "../services/api"

export const fetchSubjects = createAsyncThunk(
  "subjects/fetchSubjects",
  async () => {
    const response = await api.get("/subjects")
    return response.data
  }
)

export const addSubject = createAsyncThunk(
  "subjects/addSubject",
  async (subject) => {
    const response = await api.post("/subjects", subject)
    return response.data
  }
)

const subjectSlice = createSlice({
  name: "subjects",
  initialState: { subjects: [], status: "idle", error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubjects.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchSubjects.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.subjects = action.payload
      })
      .addCase(fetchSubjects.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
      .addCase(addSubject.pending, (state) => {
        state.status = "loading"
      })
      .addCase(addSubject.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.subjects.push(action.payload)
      })
      .addCase(addSubject.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
  },
})

export default subjectSlice.reducer
