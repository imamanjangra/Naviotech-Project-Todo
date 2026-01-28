import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom"
import './App.css'
import LoginPage from "./pages/LoginPage"
import TodoPage from "./pages/TodoPage"
import SignupPage from "./pages/SignupPage"
import CompeletedTodo from "./pages/compeletedTodo"
import PendingTodo from "./pages/PendingTodo"
import { useContext } from "react"
import { AuthContext } from "./contexts/AuthContext"

function App() {
  const {user} = useContext(AuthContext)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={!user ? <LoginPage/> : <Navigate to='/todos' />} />
        <Route path="/signup" element={!user ? <SignupPage/> : <Navigate to='/todos'/>}/>
        <Route path="/todos" element={user ? <TodoPage/> : <Navigate to='/login'/>}/>
        <Route path="/completed" element={user ? <CompeletedTodo/> : <Navigate to='/login'/>}/>
        <Route path="/pending" element={user ? <PendingTodo/> : <Navigate to='/login'/>}/>
        <Route path="*" element={<Navigate to='/login' />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
