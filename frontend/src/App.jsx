import { BrowserRouter, Route, Routes } from "react-router-dom"
import { NotFound } from "./Pages/NotFound"
import { Home } from "./Pages/Home"
import { Login } from "./components/login"
import { AdminPanel } from "./components/AdminPanel"
import { ResetPassword } from "./components/ResetPassword"

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/reset-password" element={<ResetPassword/>}/>
          <Route path="/admin" element={<AdminPanel/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
