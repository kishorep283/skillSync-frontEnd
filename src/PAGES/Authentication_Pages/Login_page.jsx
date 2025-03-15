import React, { useState } from 'react'
import { ToastContainer,toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from "../../assets/logo.png"
import { Api } from '../../Api';
import "../../STYLES/Login_page.scss"
const Login_page = () => {
    const[logindetails,setLogin]=useState({email:"",password:""});
    const navigate =useNavigate();
    const handleChange=(e)=>{
        setLogin({...logindetails,[e.target.name]:e.target.value});
    }
    console.log(logindetails)
    sessionStorage.setItem("email",JSON.stringify(logindetails.email));
    const handleSubmit =async (e)=>{
        e.preventDefault();
        // if (!validateForm()) return; 

        try {
            const response = await fetch(`${Api}/Auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(logindetails),
            });

            const data = await response.json();
            console.log(data);
            if(!data.token){
                toast.error("User Not Found,please Register")
            }else{
                if (data.token) {
                    toast.success("Login successful!");
                    sessionStorage.setItem("token", data.token);
                    sessionStorage.setItem("login",true); // Store toke
                    setTimeout(()=>{navigate("/DashBoard/mentors")},500);
                } else {
                    toast.error(data.message || "Invalid credentials");
                }
            }
        } catch (error) {
            toast.error("Server error. Please try again later.");
        }
    }
    const handleGoogleLogin = async (credentialResponse) => {
        const decoded = jwtDecode(credentialResponse.credential);
        console.log("Google User:", decoded);
    
        try {
            const response = await axios.post(`${Api}/Auth/google-login`, {
                email: decoded.email,
                name: decoded.name
            });
         
            const data = response.data;
          if (data.token) {
            toast.success("Google Login Successful!");
            sessionStorage.setItem("token", data.token);
            sessionStorage.setItem("login",true);
            setTimeout(()=>{
                navigate("/DashBoard/mentors");
            },500)
          } else {
            toast.error("Google login failed");
          }
        } catch (error) {
          toast.error("Google login error");
          console.log(error);
        }
    }

  return (
     <GoogleOAuthProvider clientId="298562466281-ctsf8ge5ti5dmif748i68sruq031avvh.apps.googleusercontent.com">
        <div className="login-container">
            {/* Logo Section */}
            <div className="logo-section">
                <img src={logo} alt="Logo" />
            </div>

            {/* Login Form */}
            <div className="login-form">
                <div className="card">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Enter your email"
                        value={logindetails.email}
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
                        value={logindetails.password}
                        onChange={handleChange}
                        required
                    />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                </form>

                {/* Google Login */}
                <div className="google-login">
                    <GoogleLogin
                    onSuccess={handleGoogleLogin}
                    onError={() => toast.error("Google Login Failed")}
                    />
                </div>

                {/* Register Link */}
                <p className="text-center">
                    New user? <Link to="/Auth/Register">Register here</Link>
                </p>
                </div>

                {/* Toast Notifications */}
                <ToastContainer
                position="top-center"
                autoClose={3000}
                toastStyle={{ fontSize: "10px", padding: "15px", width: "200px", height: "30px" }}
                />
            </div>
        </div>

        </GoogleOAuthProvider>
  )
}

export default Login_page