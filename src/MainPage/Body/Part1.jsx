import React, { useState ,useEffect} from 'react'
import ContinueEffet from './components/Effect.jsx'
import { Link } from 'react-router-dom'
import InfiniteScrollCards from './components/Scroll.jsx'
const Part1 = () => {
  const[value,setValue]=useState("");
  const handlevalue =(e)=>{
    setValue(e.target.value);
  }
  return (
    <>
      <div className='d-grid' style={{gridTemplateColumns:"2fr 1fr"}}>
        <div className='d-flex flex-column gap-4 flex-shrink-1' style={{paddingLeft:"10%", paddingTop:"7%"}}>
            <p style={{fontSize:"1.2rem"}}>Learn a new Skill,Land your Dream Job</p>
            <div className='d-flex gap-2'>
                <h1 style={{color:"#071952"}}>1-on-1</h1>
                <h1 style={{color:" #1976FF"}}><ContinueEffet/></h1><br />
                <h1 style={{color:"#071952"}}>MentorShip</h1>
            </div>
            <div className="input-group w-75">
              <input type="text" className="p-2 w-50" onChange={()=>handlevalue} placeholder="Search by company, skills or role" style={{borderColor:""}} />
              <Link to={`/mentor/brouse/?search=${value}`}><button className="p-2" style={{ backgroundColor: "#1976FF", color: "white" }}>
                Find mentors
              </button></Link>
           </div>
           <div>
              <div className='d-flex gap-2'>
                <p className='p-1' style={{backgroundColor:"#e2dede",borderRadius:"15px"}}>product managers</p>
                <p className='p-1'style={{backgroundColor:"#e2dede",borderRadius:"15px"}}>Career Coaches</p>
                <p className='p-1' style={{backgroundColor:"#e2dede",borderRadius:"15px"}}>Software Engineering</p>
              </div>
              <div className='d-flex gap-2'>
                <p className='p-1' style={{backgroundColor:"#e2dede",borderRadius:"15px"}}>Leadership mentors</p>
                <p className='p-1' style={{backgroundColor:"#e2dede",borderRadius:"15px"}}>Ux Designers</p>
                <p className='p-1' style={{backgroundColor:"#e2dede",borderRadius:"15px"}}>Data Scientist</p>
              </div>
           </div>
           <div className='d-flex gap-5'>
            <div>
              <h2>800+</h2>
              <p>Mentors</p>
            </div>
            <div>
              <h2>2000+</h2>
              <p>matches made</p>
            </div>
            <div>
              <h2>20+</h2>
              <p>countries represented</p>
            </div>
           </div>

        </div>
        <div style={{paddingRight:"10%"}}>
          <InfiniteScrollCards/>
        </div>
      </div>
    </>
  )
}

export default Part1