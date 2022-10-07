import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {

    const tokenExists = () => {
    const token = localStorage.getItem("token")
        return token !== ""
    }

    if(tokenExists()){
        return <Outlet />
    } else { 
        return <Navigate to='/login' />
    }                    
};

export default ProtectedRoute;