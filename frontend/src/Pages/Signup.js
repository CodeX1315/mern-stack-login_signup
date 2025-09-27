import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

const Signup = () => {
    const[ signupData, setSignUpData ] = useState({
        name: "",
        email: "",
        password: ""
    });
    const navigate = useNavigate();
   
    const onHandleChange = (e) =>{
        const { name, value} = e.target;
        const copyData = { ...signupData};
        copyData[name] = value;
        setSignUpData(copyData);
    }

    const handleValidation = async (e) => {
        e.preventDefault();
        //cleint side validation

        const { name, email, password } = signupData;
        if(!name || !email || !password){
            return handleError("All fields are required");
        }
        try{
            const url = "http://localhost:8080/auth/signup";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(signupData)
            });
            const result = await response.json();
            const { success, message, error } = result;
            if(success){
                handleSuccess(message);
                setTimeout(() => {
                    navigate("/login");
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
        <h1>SignUp</h1>
        <div>
          <label htmlFor="Name">Name</label>
          <input
            onChange={onHandleChange}
            type="text"
            name="name"
            placeholder="Enter your name"
            autoFocus
            value={signupData.name}
          />
        </div>
        <div>
          <label htmlFor="Email">Email</label>
          <input
          onChange={onHandleChange}
            type="text"
            name="email"
            placeholder="Enter your Email"
            value={signupData.email}
          />
        </div>
        <div>
          <label htmlFor="Password">Password</label>
          <input
          onChange={onHandleChange}
            type="password"
            name="password"
            placeholder="Enter your password"
            value={signupData.password}
          />
        </div>
        <button>SignUp</button>
        <span>
          Already have an account ? <Link to="/login">Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signup;
