import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import Requests from './Components/Requests';
import Friends from './Components/Friends';
const Request_page = () => {
  let location = useLocation();
  return (
    
    <div>
        <Link to="/DashBoard/connections/requests"><button style={{padding:"5px 10px",border:"2px solid grey",borderRadius:"20px"}}>Friend Requests</button></Link>
        <Link to="/DashBoard/connections/friends"><button style={{padding:"5px 10px",border:"2px solid grey",borderRadius:"20px"}}>Friends</button></Link>
        <Link to="/DashBoard/connections/membor_requests"><button style={{padding:"5px 10px",border:"2px solid grey",borderRadius:"20px"}}>Membership_Requests</button></Link>&nbsp;&nbsp;
        <Link to="/DashBoard/connections/memborships"><button style={{padding:"5px 10px",border:"2px solid grey",borderRadius:"20px"}}>Memberships</button></Link>&nbsp;&nbsp;  
    </div>
  )
}

export default Request_page