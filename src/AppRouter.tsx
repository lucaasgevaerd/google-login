import { useContext } from "react"
import { Route, Routes } from "react-router-dom"
import { AuthenticationContext } from "./App"
import NotFound from "./components/NotFound"
import PrivateRoute from "./components/PrivateRoute"
import Home from "./pages/Home"
import Login from "./pages/Login"
import RecoverPassword from "./pages/RecoverPassword"

function AppRouter() {
  const { isAuthenticated } = useContext(AuthenticationContext);
  return (
    <>
      <Routes>
        {(isAuthenticated.value === false) && (
          <>
            <Route path="/" element={<Login />} />
            <Route path="/recover-password" element={<RecoverPassword />} />
          </>
        )}
        <Route path="/home" element={<PrivateRoute />} >
          <Route path="/home" element={<Home />} />
        </Route>
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default AppRouter