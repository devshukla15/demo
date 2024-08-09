import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "../services/api"

export const login = createAsyncThunk("auth/login", async (args) => {
  const response = await api.post("/auth/login", { ...args.credentials })
  response.status === 200 && args.navigate("/admin")
  return response.data
})

export const register = createAsyncThunk(
  "auth/register",
  async (credentials) => {
    const response = await api.post("/auth/register", credentials)
    return response.data
  }
)

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    status: "idle",
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null
      state.token = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading"
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.user = action.payload
        state.token = action.payload.token
        localStorage.setItem("token", action.payload.token)
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
      .addCase(register.pending, (state) => {
        state.status = "loading"
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.user = action.payload
        state.token = action.payload.token
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
  },
})

export const { logout } = authSlice.actions

export default authSlice.reducer
