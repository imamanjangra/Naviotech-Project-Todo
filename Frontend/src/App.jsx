import {BrowserRouter, Route, Routes} from "react-router-dom"
import './App.css'
import LoginPage from "./pages/LoginPage"
import TodoPage from "./pages/TodoPage"
import SignupPage from "./pages/SignupPage"

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/todos" element={<TodoPage/>}/>
        <Route path="/signup" element={<SignupPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
