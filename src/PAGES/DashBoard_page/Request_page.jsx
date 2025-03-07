import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import Requests from './Components/Requests';
import Friends from './Components/Friends';
const Request_page = () => {
  let location = useLocation();
  return (
    <div>
        <Link to="/DashBoard/connections/requests"><button>Requests</button></Link>
        <Link to="/DashBoard/connections/friends"><button>Friends</button></Link>
        
    </div>
  )
}

export default Request_page