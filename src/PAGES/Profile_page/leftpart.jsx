import React, { useEffect, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { Data } from '../../Data/data';
const Leftpart = () => {
    let{query_id}=useParams();
    let id=query_id.replace(":","");
    let query = parseInt(id);
    console.log(query);
    const[list,setList]=useState(null);
    useEffect(()=>{
        let newdata =Data.find((data)=>(
            parseInt(data.id) ==query
        ))
        console.log(newdata);
        setList(newdata);
    },[query])
    // console.log(list.name);
    if(!list){
      return <h4>Loading...</h4>
    }
  return (
    <>
      <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:"10px"}}>
        <div>
            <div style={{backgroundColor:"",padding:"5vh 50px",borderRadius:"20px",marginLeft:"5%"}}>
                <img src={list.image} alt="image" width={200} height={200} style={{objectFit:"cover",borderRadius:"50%"}} />

            </div>
            <div style={{marginLeft:"10%",gap:"20px",display:"flex",flexDirection:"column"}}>
                <div>
                  <h5>{list.name}</h5>
                  <h6>{list.job_title} @{list.company}</h6>
                  <h6>{list.description}</h6>
                </div>
                <div >
                  {/* <i class="bi-lightbulb-fill text-warning"></i> */}
                  <h5>skills</h5>
                  <div className='d-flex gap-3' style={{marginTop:"0px"}}>
                    {list.skills.map((skill)=>(
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
                <Link><button className="btn btn-primary w-75 text-white" style={{marginLeft:"5%"}}>Book A Call</button></Link>
              </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Leftpart