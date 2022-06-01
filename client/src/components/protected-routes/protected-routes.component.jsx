import { Navigate, Outlet } from "react-router-dom";
import { useStateValue } from "../../contexts/StateProvider";



const ProtectedRoutes = () => {
    const [{isLogin}] = useStateValue()
    const isAuth =  Object.keys(isLogin).length !== 0 ? true : false 
    return isAuth ?  <Navigate to= "/" /> : <Outlet />
}

export default ProtectedRoutes