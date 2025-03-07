import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
const Friends = () => {
  const[friends,setFriends]=useState([]);
  let token =sessionStorage.getItem("token");
  useEffect(()=>{
    let fetchData = async()=>{
      let {data}= await axios.get(`http://localhost:3002/connection/friends/email`,{
        headers:{
          Authorization:`Bearer ${token}`,
        },
        withCredentials:true
      })
      setFriends(data.message);
    }
    fetchData();
  },[token])
  console.log(friends);
  return (
    <>
       <h4>Friends List</h4>
       <Link to="/DashBoard/connections/requests"><button style={{padding:"5px 10px",border:"2px solid grey",borderRadius:"20px"}}>Requests</button></Link>&nbsp;&nbsp;
       <Link to="/DashBoard/connections/friends"><button style={{padding:"5px 10px",border:"2px solid grey",borderRadius:"20px"}}>Friends</button></Link>
       {typeof friends[0]==="string" ? <h3>{friends[0]}</h3>:
       <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
        {friends.map((friend,ind)=>(
          <div key={ind} style={{display:"flex",justifyContent:"space-between",border:"2px solid #ddd",borderRadius:"20px",padding:"10px 20px",margin:"0px 7%"}}>
             <div>
              <img src={friend.image} alt="image" width={200} height={200}/>
              <h4>{friend.about}</h4>
             </div>
             <div>
              <h4>{friend.firstname}&nbsp;&nbsp;{friend.lastname}</h4>
              <h4>{friend.company}</h4>
              <h4>{friend.country}</h4>
              <h4>{friend.description}</h4>
              <h4>{friend.email}</h4>
              <h4>{friend.job_title}</h4>
                <div style={{display:"flex" ,gap:"5px"}}>
                  <h4>{friend.skills.length>1 ? friend.skills.map((skill,ind)=>(
                    <p style={{fontSize:"1rem"}} key={ind}>{skill}</p>
                  
                  )):JSON.parse(friend.skills).map((skill,ind)=>(
                    <span style={{fontSize:"2rem"}}>{skill}</span>
                  ))}</h4>
                </div>
                <button style={{padding:"5px 20px",borderRadius:"20px"}}>Room</button>
             </div>
          </div> 
        ))}
       </div>
       }
    </>
  )
}

export default Friends