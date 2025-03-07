import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { ToastContainer,toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
// import { useAuth } from './AuthContext';
import { Link } from 'react-router-dom';

const Requests = () => {
    const[requests,setrequests] = useState([]);
    let token =sessionStorage.getItem("token");
    // console.log(email)
    useEffect(()=>{
      let requestdata =async(req,res)=>{
        try{
          let {data} = await axios.get(`http://localhost:3002/connection/requests/email`,{
            headers:{Authorization:`Bearer ${token}`},
            withCredentials:true
          });
          console.log(data.message);
          setrequests(data.message);
        }
        catch(errr){
          console.log(errr);
        }
      }
      requestdata();
    },[])
    const handleResponse=useCallback(async(e)=>{
      let {data}=await axios.get(`http://localhost:3002/connection/response/${e.target.innerText}/${e.target.name}`,{
        headers:{
          Authorization:`Bearer ${token}`,
        },
        withCredentials:true
      })
      toast.success(data.message);
    })
    console.log(typeof requests[0] ==="string");
    console.log(requests);
  return (
    <>
      <div style={{marginBottom:"5%",marginLeft:"45%",marginTop:"3%"}}>
      <Link to="/DashBoard/connections/requests"><button style={{padding:"5px 10px",border:"2px solid grey",borderRadius:"20px"}}>Requests</button></Link>&nbsp;&nbsp;
      <Link to="/DashBoard/connections/friends"><button style={{padding:"5px 10px",border:"2px solid grey",borderRadius:"20px"}}>Friends</button></Link>
      </div>
      {typeof requests[0]=== "string" && <h3>{requests[0]}</h3>}
      <div style={{margin:"0px 7%",display:"flex",flexDirection:"column",borderRadius:"20px",padding:"10px"}}>
        {typeof requests[0] !== "string" && requests.map((reqe,ind)=>(
          <div className='d-flex' style={{display:"flex",justifyContent:"space-between",border:"2px solid black",borderRadius:"20px"}}>
            <div style={{marginLeft:"5%"}}>
            <img src={reqe.image} alt="" width={200} height={200}/>
            <h4>{reqe.about}</h4>
            </div>
            <div style={{marginRight:"10%"}}>
              <h3>{reqe.firstname}&nbsp;&nbsp;{reqe.lastname}</h3>
              <h4>{reqe.email}</h4>
              <h4>{reqe.job_title} at {reqe.company}</h4>
              <div style={{display:"flex" ,gap:"5px"}}>
                <h4>{reqe.skills.length>1 ? reqe.skills.map((skill,ind)=>(
                  <p style={{fontSize:"0.5rem"}}>{skill}</p>
                
                )):JSON.parse(reqe.skills[0]).map((skill,ind)=>(
                  <span style={{fontSize:"1rem"}}>{skill}</span>
                ))}</h4>
              </div>
              <button style={{padding:"5px 10px",borderRadius:"20px"}} name={reqe.email} onClick={handleResponse}>Accept</button>&nbsp;&nbsp;
              <button style={{padding:"5px 10px",borderRadius:"20px"}} name={reqe.email} onClick={handleResponse}>Reject</button>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer position="top-center" autoClose={3000} toastStyle={{ fontSize: "10px", padding: "15px", width: "200px",height:"30px" }}/>
    </>
  )
}

export default Requests