import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from "../../../assets/logo.png";
const DashBoard_nav = () => {
    const[hovercolor,setHoverColor]=useState("");
    const[hoveralert,setHoverAlert]=useState("");
    const[hoverprofile,setHoverprofile]=useState("");
    const location =useLocation();
    let mentors = location.pathname.includes("/mentors");
    let Requests =location.pathname.includes("/Requests");
    let profile = location.pathname.includes("/profile");
    const buttonStyles ={
        backgroundColor:hovercolor?"#3385ff":"",
        color:hovercolor?"white":"",
        padding:"5px 10px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "background-color 0.3s ease"
    }
    const button1Styles ={
        backgroundColor:hoveralert?"#3385ff":"",
        color:hoveralert?"white":"",
        padding:"5px 10px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "background-color 0.3s ease"
    }
    const button2Styles ={
        backgroundColor:hoverprofile?"#3385ff":"",
        color:hoverprofile?"white":"",
        padding:"5px 10px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "background-color 0.3s ease"
    }
    const handleLogOut = ()=>{
        sessionStorage.setItem("login","");
        sessionStorage.setItem("token","");
    }
  return (
    <div className='d-flex justify-content-between' style={{backgroundColor:"#ddd",borderBottom:"2px solid #bbb"}}>
        <div className='d-flex gap-5' style={{alignContent:"center",alignItems:"center",marginLeft:"7%",fontSize:"1.1rem"}}>
            <img src={logo} alt="Image" width={100} height={100} />
            <Link to="/DashBoard/mentors" className='text-decoration-none' style={{backgroundColor:mentors?"#3385ff":"",borderRadius:mentors?"5px":"" ,color:mentors?"white":""}}><p style={buttonStyles}  
              onMouseEnter={()=>{setHoverColor(true)}}
              onMouseLeave={()=>{setHoverColor(false)}}
             >Mentors</p></Link>
            <Link to="/DashBoard/connections" className='text-decoration-none' style={{backgroundColor:Requests?"#3385ff":"",padding:Requests?"0px 0px":"" ,borderRadius:Requests?"5px":"" ,color:Requests?"white":""}}><p style={button1Styles}
                onMouseEnter={()=>{setHoverAlert(true)}}
                onMouseLeave={()=>{setHoverAlert(false)}}>Connections</p></Link>
            <Link to="/DashBoard/profile" className='text-decoration-none' style={{backgroundColor:profile?"#3385ff":"",padding:profile?"0px 0px":"" ,borderRadius:profile?"5px":"" ,color:profile?"white":""}}><p style={button2Styles}
                onMouseEnter={()=>{setHoverprofile(true)}}
                onMouseLeave={()=>{setHoverprofile(false)}}>Profile</p></Link>
        </div>
        <div className='d-flex align-items-center gap-4' style={{marginRight:"7%"}}>
            <Link to="/mentor/browse"><button className='btn btn-primary me-2'>Browse Mentors</button></Link>
            <Link to="/"><button className='btn btn-primary me-2' onClick={handleLogOut}>Log Out</button></Link>
        </div>
    </div>
  )
}

export default DashBoard_nav