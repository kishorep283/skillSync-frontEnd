import React, { useCallback, useEffect, useState } from 'react'
import { data, Link, useParams, useSearchParams } from 'react-router-dom'
import axios from 'axios';
import { ToastContainer,toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
// import { Data } from '../../../Data/data';
const Leftpart = () => {
    let{query_id}=useParams();
    console.log(query_id);
    // let query = parseInt(query_id);
    // console.log(query);
    const[list,setList]=useState(null);
    const[userData,setUserData]=useState([]);
    let token =sessionStorage.getItem("token");
    console.log(token);
    useEffect(()=>{
        let newdata =async()=>{
          let {data} = await axios.get("http://localhost:3002/Auth/AllData");
          // console.log(data.message);
          let{message}=data;
          setUserData(message);
        }
        newdata();
    },[])
    useEffect(()=>{
      let filterdata = userData.find((item)=>item._id===query_id);
      setList(filterdata)
      console.log(list);
    },[userData,query_id]);
    let handleConnect =useCallback(async()=>{
      let gmail = list.email && list.email;
      let {data} =await axios.post(`http://localhost:3002/connection/assign/${gmail}`,{},{
       headers: { Authorization: `Bearer ${token}` },
         withCredentials: true,
       })
       console.log(data.message);
       toast.success(data.message);
        // fetch(`http://localhost:3002/connection/assign/${gmail}`, { method:"POST",headers:{ Authorization: `Bearer ${token}` }}).then(res=>{console.log(res.json())})
    },[list])
    console.log(list);
    if(!list){
      return <h4>Loading...</h4>
    }

    // async function fun() {
    //   const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhakBnbWFpbC5jb20iLCJpYXQiOjE3NDEyNTI1ODd9.sxRRa6YJ6mQY0L-hAv6FHF8jhrogavNKre4XJ-J6n_c"
    //   let gmail = list.email && list.email;
    //     let data =await axios.post(`http://localhost:3002/connection/assign/${gmail}`,{headers:{Authorization: `Bearer ${token}`}})
    //   console.log(data)
    // }
    // fun()
    // console.log(data);
  return (
    <>
      <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:"10px"}}>
        <div>
            <div style={{backgroundColor:"",padding:"5vh 50px",borderRadius:"20px",marginLeft:"5%"}}>
                <img src={list.image} alt="image" width={200} height={200} style={{objectFit:"cover",borderRadius:"50%"}} />

            </div>
            <div style={{marginLeft:"10%",gap:"20px",display:"flex",flexDirection:"column"}}>
                <div>
                 {list.name ? <h3>{list.name}</h3>:<h3>{list.firstname}&nbsp;&nbsp;{list.lastname}</h3>}
                  <h6>{list.job_title} @{list.company}</h6>
                  <h6>{list.description}</h6>
                </div>
                <div >
                  {/* <i class="bi-lightbulb-fill text-warning"></i> */}
                  <h5>skills</h5>
                  <div className='d-flex gap-3' style={{marginTop:"0px"}}>
                    {list.skills.length>1 ?(list.skills).map((skill)=>(
                      <p style={{padding:"5px",backgroundColor:"#ddd",borderRadius:"20px"}}>{skill}</p>
                    )):(JSON.parse(list.skills[0])).map((skill)=>(
                      <p style={{padding:"5px",backgroundColor:"#ddd",borderRadius:"20px"}}>{skill}</p>
                    ))}
                  </div>
                </div>
                <div>
                  <p><i class="bi bi-geo-alt-fill text-primary"></i>&nbsp;&nbsp;{list.country}</p>
                  <p><i class="bi bi-star-fill text-primary"></i>&nbsp;&nbsp;4.8</p>
                  <p><i class="bi bi-clock-fill text-primary" ></i>&nbsp;&nbsp;Active Today</p>
                </div>
                <div>
                  <h6>{list.about}</h6>
                </div>
            </div>
        </div>
        <div style={{border:"2px solid #ddd",padding:"10px",borderRadius:"20px",marginRight:"5%",height:"55vh",marginTop:"5%",position:"sticky"}}>
          <p >Membership Plans</p>
          <div>
              <h4>{list.price}$/<span>month</span></h4>
              <p>video calls, pair programming, code reviews, interview practice & unlimited chat on slack.</p>
              <div>
                  <p><i class="bi bi-telephone-fill text-primary" ></i>&nbsp;&nbsp;4 calls per month (60min/call)</p>
                  <p><i class="bi bi-chat-dots-fill text-primary" ></i>&nbsp;&nbsp;Unlimited Q&A via chat</p>
                  <p><i class="bi bi-clock-fill text-primary" ></i>&nbsp;&nbsp;Expect responses in 24 hours or less</p>
                  <p><i class="bi bi-bag-fill text-primary"></i>Hands-on support</p>
              </div>
              <div>
                <button className="btn btn-primary w-75 text-white" style={{marginLeft:"5%"}} onClick={handleConnect}>Connect</button>
              </div>
          </div>
        </div>
            <ToastContainer position="top-center" autoClose={3000} toastStyle={{ fontSize: "10px", padding: "15px", width: "200px",height:"30px" }}/>
        
      </div>
   
    </>
  )
}

export default Leftpart