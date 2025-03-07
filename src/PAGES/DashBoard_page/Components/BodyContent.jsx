import React from 'react'

const BodyContent = () => {
  return (
    <div>
        <h3 style={{marginLeft:"7%",marginTop:"3%",marginBottom:"2%"}}>Featured Sessions</h3>
        <div style={{marginLeft:"7%",marginRight:"7%",display:"grid",gridTemplateColumns:"repeat(3,1fr)" ,gap:"50px"}}>
            <div style={{border:"2px solid #ddd",borderRadius:"20px",padding:"20px"}}>
                <h3>Intro Call</h3>
                <p>If you are looking for a mentor ,here is the great Oppurtunity</p>
                <h5>Approx 30 mins</h5>
            </div>
            <div style={{border:"2px solid #ddd",borderRadius:"20px",padding:"20px"}}>
                <h3>Work Review</h3>
                <p>IN these session, A mentor will sit in front of you and examine the work what you have done</p>
                <h5>Approx 45 mins</h5>
            </div>
            <div style={{border:"2px solid #ddd",borderRadius:"20px",padding:"20px"}}>
                <h3>Interview Preparation</h3>
                <p>Some Big Interviews are coming Up!they teach you well prepared for any interview and may be they interview hiring experiance ,They share their interview experiance</p>
                <h5>Approx 50 mins</h5>
            </div>
        </div>
    </div>
  )
}

export default BodyContent