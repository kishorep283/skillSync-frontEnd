import React, { useState } from 'react'
import { ToastContainer,toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Link } from 'react-router-dom';
import logo from "../../assets/logo.png"

const Register_page = () => {
    const[register,setRegister]=useState({email:"",password:"",firstname:"",lastname:""});
    const handleChange =(e)=>{
        setRegister({...register,[e.target.name]:e.target.value});
    }
    const isValidEmail = (email) => {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        };
        const validateForm = () => {
            if (!register.email || !register.password) {
                toast.error("All fields are required!");
                return false;
            }
            if (!isValidEmail(register.email)) {
                toast.error("Invalid email format!");
                return false;
            }
            if (register.password.length < 6) {
                console.log(register.password[0].length)
                toast.error("Password must be at least 6 characters long!");
                return false;
            }
            return true;
        };
        const handleSubmit =async (e)=>{
                e.preventDefault();
                if (!validateForm()) return; 
        
                try {
                    const response = await fetch("http://localhost:3002/Auth/register", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(register),
                    });
        
                    const data = await response.json();
                    console.log(data);
                    if(!data.message){
                        toast.error("User not valid")
                    }else{
                        if (data.message) {
                            toast.success("Register successful!");
                            sessionStorage.setItem("token", data.token); // Store toke
                            setTimeout(()=>{
                                window.location.href="/Auth/Login"
                            },500)
                        } else {
                            toast.error(data.message || "enter valid details");
                        }
                    }
                } catch (error) {
                    toast.error("Server error. Please try again later.");
                }
            }

  return (
        <div className="d-flex justify-content-between" style={{maxHeight:"100vh"}}>
            <div style={{padding:"200px 250px",backgroundColor:"#cfe2ff",marginTop:"0%"}}><img src={logo} alt="Logo" width={300} height={200} /></div>
            <div style={{marginTop:"3%",marginRight:"15%"}}>
                    <div className="card p-4 shadow" style={{ width: "350px"}}>
                        <h2 className="text-center">Register</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">firstname</label>
                                <input
                                    type="text"
                                    name="firstname"
                                    className="form-control"
                                    placeholder="Enter your firstname"
                                    value={register.firstname}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">lastname</label>
                                <input
                                    type="text"
                                    name="lastname"
                                    className="form-control"
                                    placeholder="Enter your lastname"
                                    value={register.lastname}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    placeholder="Enter your email"
                                    value={register.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    placeholder="Enter your password"
                                    value={register.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Register</button>
                        </form>
                        <div className="text-center mt-3">
                        
                        </div>
                        <p className="text-center mt-3">
                            Already have an Account ? <Link to="/Auth/Login">Login here</Link>
                        </p>
                    </div>

                    {/* Toast Notifications */}
                    <ToastContainer position="top-center" autoClose={3000} toastStyle={{ fontSize: "10px", padding: "15px", width: "200px",height:"30px" }}/>
            </div>
        </div>
  )
}

export default Register_page