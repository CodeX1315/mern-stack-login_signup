import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

const Login = () => {
    const[ loginData, setloginData ] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();
   
    const onHandleChange = (e) =>{
        const { name, value} = e.target;
        const copyData = { ...loginData};
        copyData[name] = value;
        setloginData(copyData);
    }

    const handleValidation = async (e) => {
        e.preventDefault();
        //cleint side validation

        const { email, password } = loginData;
        if(!email || !password){
            return handleError("All fields are required");
        }
        try{
            const url = "http://localhost:8080/auth/login";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginData)
            });
            const result = await response.json();
            const { success, message, jwtoken, name, error } = result;
            if(success){
                handleSuccess(message);
            localStorage.setItem("token", jwtoken);
            localStorage.setItem("loggedInUser", name);
                setTimeout(() => {
                    navigate("/home ");
                }, 3000)
            }else if(error){
                const details = error?.details[0].message;
                handleError(details);
            }else if(!success){
                handleError(message);
            }

        }catch(err){
            handleError(err);
        }
    }
  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleValidation}>
        <h1>Login</h1>
        <div>
          <label htmlFor="Email">Email</label>
          <input
          onChange={onHandleChange}
            type="text"
            name="email"
            placeholder="Enter your Email"
            value={loginData.email}
          />
        </div>
        <div>
          <label htmlFor="Password">Password</label>
          <input
          onChange={onHandleChange}
            type="password"
            name="password"
            placeholder="Enter your password"
            value={loginData.password}
          />
        </div>
        <button>Login</button>
            <span>Don't have account ?
                <Link to="/signup">SignUp</Link>
            </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
