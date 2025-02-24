import React from 'react'
import image from "./dummy-user.png"
import { Link } from 'react-router-dom'
import { Data } from '../../../Data/data'
const Part2 = () => {
  return (
    <> 
      <div className='d-grid gap-5' style={{gridTemplateColumns:"1fr 3fr" ,marginLeft:"10%",marginRight:"10%",marginTop:"5%",backgroundColor:"#f5fdfd",padding:"5%",borderRadius:"20px"}}>
        <div className='d-flex flex-column gap-4' style={{backgroundColor:"white",padding:"20%",width:"20vw"}}>
            <div className='d-flex '>
                <div>
                    <h6>john cruise</h6>
                    <h6>software Engineer</h6>
                    <h6>Engineer</h6>
                </div>
                <div>
                    <img src={image} alt="image" width={80} height={80} style={{borderRadius:"50px"}}/>
                </div>
            </div>
            <div className='d-flex flex-column gap-3'>
              <h6 style={{backgroundColor:"#ddd",padding:"4%"}}>Intro session</h6>
              <h6 style={{backgroundColor:"#ddd",padding:"4%"}}>Cv review</h6>
              <h6 style={{backgroundColor:"#ddd",padding:"4%"}}>Expert Session</h6>
            </div>
        </div>
        <div className="d-flex flex-column gap-4"style={{padding:"5%"}}>
          <h2 style={{fontFamily:"sans-serif"}}>It's In your Hand : Grab It and full fill your Dream</h2>
          <h5 style={{fontFamily:"sans-serif"}}>Want to start a new dream career? Successfully build your startup? Itching to learn high-demand skills? Work smart with an online mentor by your side to offer expert advice and guidance to match your zeal. Become unstoppable using SkillSync</h5>
          <div className='d-grid' style={{gridTemplateColumns:"1fr 1fr"}}>
            <div>
              <h6>Hundred's of Mentors</h6>
              <h6>Free Trail</h6>
              <h6>1-to-1</h6>
            </div>
            <div>
              <h6>Flexible Program</h6>
              <h6>Perfomance Charts</h6>
              <h6>95% satisfaction rate</h6>
            </div>
            <Link to="/mentor/browse/" ><button style={{backgroundColor:"#1976FF",padding:"5px 10px",color:"white",marginTop:"5%"}}>Find A Mentor </button></Link>
          </div>
        </div>
      </div>
      <div>
        <h2 style={{paddingLeft:"7%"}}>Explore 800+ Mentors</h2>
        <div className='d-grid grid-5' style={{gridTemplateColumns:"repeat(4,2fr)",marginLeft:"10%",paddingRight:"5%"}}>
          {Data.map((card,ind)=>(
            <Link to={`/mentor/:${card.id}/`} style={{ textDecoration: "none", color: "inherit" }}>
              <div className='d-flex flex-column gap-2' style={{width:"20vw",height:"70vh",marginBottom:"40px"}} >
                <img src={card.image} alt="image"  style={{ objectFit:"fill", width: "80%", height: "40vh",borderRadius:"20px" }} />
                <h4>{card.name}</h4>
                <h5 style={{fontSize:"1rem"}}>{card.description}</h5>
                <div className='d-flex gap-2' style={{display:"flex",flexWrap:"wrap"}}>
                  {card.skills?.map((car,ind)=>(
                    <h6 style={{backgroundColor:"#ddd",padding:"5px",borderRadius:"20px",fontSize:"0.9rem"}}>{car}</h6>

                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export default Part2