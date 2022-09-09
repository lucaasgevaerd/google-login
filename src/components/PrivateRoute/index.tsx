import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthenticationContext } from "../../App";

function PrivateRoute() {

  const { isAuthenticated } = useContext(AuthenticationContext)

  return (
    <>
      {isAuthenticated.value ? (
        <Outlet />
      ) : (
        <Navigate to={'/'} />
      )}
    </>
  )
}

export default PrivateRoute