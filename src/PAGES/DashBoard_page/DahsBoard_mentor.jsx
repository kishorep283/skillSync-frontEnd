import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DashBoard_nav from './Components/DashBoard_nav';
import { Link } from 'react-router-dom';
import BodyContent from './Components/BodyContent';

const Dashboard = () => {
    // const {userData} = useAuth();
    // console.log(userData);
    const[userData,setUserData]=useState(null);
    let navigate = useNavigate();
    let token = sessionStorage.getItem("token");
    console.log(token);
    if(!token){
        navigate("/");
    }
    useEffect(() => {
        let formdata = async () => {
          try {
            if (token) {
              let { data } = await axios.get("http://localhost:3002/Auth/profile-check", {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true
              });
              console.log(data.message);
              setUserData(data.message);
            }
          } catch (err) {
            console.log(err);
          }
        };
        formdata();
      }, [navigate]);
    console.log(userData);
    
  return (
    <div>
        {/* <DashBoard_nav/> */}
        <div style={{backgroundColor:"#ddd" ,width:"100vw",height:"50vh",display:"flex",justifyContent:"center"}}>
            <div style={{alignSelf:"center"}}>
                {userData ? (<h3 style={{display:"flex",justifyContent:"center"}}>Welcome,{userData.name ?userData.name.split(" ")[0] : userData.firstname}!</h3>):(<p>Loading.....</p>)}
                <h4>Start Connecting With Mentors to explore your career to next level</h4>
                <Link to="/mentor/browse"><button className='btn btn-primary me-2' style={{marginLeft:"40%"}}>Browse Mentors</button></Link>
            </div>
        </div>
        <BodyContent/>
    </div>
  )
}

export default Dashboard