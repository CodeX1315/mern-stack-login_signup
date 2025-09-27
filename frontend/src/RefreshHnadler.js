import { useLocation, useNavigate } from "react-router-dom"
import { useEffect } from "react";

const RefreshHnadler = ({ setIsAuthenticated }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    if(localStorage.getItem('token')){
        setIsAuthenticated(true);
        if(location.pathname === "/login" || 
            location.pathname === "/signup" || 
            location.pathname === "/"){
                navigate("/home" , { replace: false } );
            }
        }
  }, [location, navigate, setIsAuthenticated] )

  
}

export default RefreshHnadler
