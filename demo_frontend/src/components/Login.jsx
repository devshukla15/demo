import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../feature/authSlice"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const auth = useSelector((state) => state.auth)

  const handleSubmit = (e) => {
    if (username === "admin" && password === "password") {
      e.preventDefault()
      dispatch(login({ credentials: { username, password }, navigate }))
    } else {
      alert("Invalid credentials")
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
      {auth.status === "loading" && <p>Loading...</p>}
      {auth.error && <p>{auth.error}</p>}
    </div>
  )
}

export default Login
