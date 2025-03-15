import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Api } from '../../../Api';
const Memborships = () => {
  const[friends,setFriends]=useState([]);
  const[mailmessage,setMailMessage]=useState({message:"",roomid:""});
  const[present,setPresent]=useState(false);
  let token =sessionStorage.getItem("token");
  console.log("token",token);
  useEffect(()=>{
    console.log("i'm invoked useffrect");
    let fetchData = async()=>{
        console.log("i'm invoked");
      let {data}= await axios.get(`${Api}/connection/memborships/email`,{
        headers:{
          Authorization:`Bearer ${token}`,
        },
        withCredentials:true
      })
      console.log(data);
      setFriends(data.message);
    }
    fetchData();
  },[token])
   // handlemail values
  const handleMailValues=(e)=>{
     setMailMessage((prev)=>({
      ...prev,
      [e.target.name]: e.target.value,
     }))
  }

  //form submit
  const handleFormSubmit =(e)=>{
    e.preventDefault();
    setPresent(false);
  }
  //handling mail details
  const handleMail = async(e)=>{
    let token =e.target.dataset.token;
    let email = e.target.dataset.email;
    if(!token){
      let {data}=await axios.delete(`${Api}/connection/delete/${email}`,{
        headers:{
          Authorization:`Bearer ${token}`,
        },
        withCredentials:true
      });
      toast.error("The user is no longer can Access");
      windows.location.reload();
    }else{
      setPresent(true);
      let bodydata = `the meeting shedules at ${mailmessage.message} and the roomId:${mailmessage.roomid}`;
      let {data} = await axios.post(`${Api}/connection/mail/${email}`,
        {
          body:{
            data:bodydata
          }
        },
        {
        headers:{
          Authorization:`Bearer ${token}`
        },
        withCredentials:true
        }
      );
      if(data.message){
        toast.success(data.message);
      }else{
        toast.error("Failed to send");
      }
    }
  }

  console.log(friends);
  sessionStorage.setItem("memborships",JSON.stringify(friends));
  return (
    <>
       <h4>MemberShips List</h4>
       <Link to="/DashBoard/connections/requests"><button style={{padding:"5px 10px",border:"2px solid grey",borderRadius:"20px"}}>Friend Requests</button></Link>&nbsp;&nbsp;
       <Link to="/DashBoard/connections/membor_requests"><button style={{padding:"5px 10px",border:"2px solid grey",borderRadius:"20px"}}>Membership_Requests</button></Link>&nbsp;&nbsp;
       <Link to="/DashBoard/connections/memborships"><button style={{padding:"5px 10px",border:"2px solid grey",borderRadius:"20px"}}>Memberships</button></Link>&nbsp;&nbsp;
       <Link to="/DashBoard/connections/friends"><button style={{padding:"5px 10px",border:"2px solid grey",borderRadius:"20px"}}>Friends</button></Link>
       {present &&
       <form className='chat-form' onSubmit={handleFormSubmit}>
       <input
         type="text"
         placeholder="Enter text"
         name="message"
         value={mailmessage.message}
         onChange={handleMailValues}
         
       />
       <input
         type="text"
         placeholder="Enter roomId"
         name="roomid"
         value={mailmessage.roomid}
         onChange={handleMailValues}
         
       />
       <button type="submit" >Send</button>
     </form>}
       
       {typeof friends[0]==="string" ? <div style={{marginLeft:"30%"}}><h3 style={{marginLeft:"30%"}}>{friends[0]}</h3></div>:
       <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
        {friends.map((friend,ind)=>(
          <div key={ind} style={{display:"flex",justifyContent:"space-between",border:"2px solid #ddd",borderRadius:"20px",padding:"10px 20px",margin:"0px 7%"}}>
             <div>
              <img src={friend.image?friend.image :"https://static.everypixel.com/ep-pixabay/0329/8099/0858/84037/3298099085884037069-head.png"} alt="image" width={200} height={200}/>
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
                    <div style={{display:"flex",gap:"20px",justifyContent:"space-between"}}>
                      <p style={{fontSize:"1rem"}} key={ind}>{skill}</p>
                    </div>
                  
                  )):JSON.parse(friend.skills).map((skill,ind)=>(
                    
                      <span style={{fontSize:"1.3rem",marginRight:"5px",padding:"5px 10px",backgroundColor:"#ddd",borderRadius:"20px"}}>{skill}</span>
                    
                  ))}</h4>
                </div>
                <button style={{padding:"5px 20px",borderRadius:"20px"}} onClick={handleMail} data-email={friend.token} data-token={friend.token}>Send Mail</button>
                <Link to="/DashBoard/connections/friends/room"><button style={{padding:"5px 20px",borderRadius:"20px"}}>Room</button></Link>
             </div>
          </div> 
        ))}
       </div>
       }
    </>
  )
}

export default Memborships;