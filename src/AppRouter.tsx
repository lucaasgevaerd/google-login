import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import RecoverPassword from "./pages/RecoverPassword"

function AppRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/recover-password" element={<RecoverPassword />} />
      </Routes>
    </>
  )
}

export default AppRouter