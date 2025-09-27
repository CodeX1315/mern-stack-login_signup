import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";


const Home = () => {
    const [ loggedInUser, setLoggedInUser ] = useState('');
    const [products, setProducts ] = useState([]);
    const navigate = useNavigate();
    useEffect(() => { 
        setLoggedInUser(localStorage.getItem('loggedInUser'))
    }, [])

    const onLogoutClick = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess("User logged out successfully");
        setTimeout(() => {
            navigate("/login");
        }, 1000);
    }

    const fetchProducts = async () => {
        try{
            const url = "http://localhost:8080/products";
            const headers = {
                headers : {
                    'Authorization' : localStorage.getItem('token')
                }
            }
            const response = await fetch(url, headers );
            const result = await response.json();
            console.log(result);
            setProducts(result);
        }catch(err){
            console.log(err);
        }
        console.log(localStorage.getItem('token'));

    }

    useEffect(() => {
fetchProducts();
    }, [])
  return (
    <div>
      <h1>{loggedInUser}</h1>
      <button onClick={onLogoutClick}>Logout</button>
      <div>
        {
            products?.length > 0 && products.map( (prouct, index) => (
                <div key={index}>
                    <h3>{prouct.name}</h3>
                    <p>{prouct.price}</p>
                </div>
            ))
        }
      </div>

      <ToastContainer />
    </div>
  )

}
export default Home
