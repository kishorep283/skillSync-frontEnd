import React, { useEffect, useState } from 'react'
import logo from '../../../assets/final_ika.png'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link, useNavigate } from 'react-router-dom';
import './header.css'
const Header = () => {
  // const[search,setSearch]=useState("");
  // const navigate =useNavigate();
  // const handleSearch =(e)=>{
  //   setSearch(e.target.value);
  // }
  // useEffect(()=>{
  //   let params =new URLSearchParams();
  //   if(search.trim()) params.set("search",search);
  //   const queryString = params.toString();
  //   if (window.location.search !== `?${queryString}`) {
  //     navigate(`/mentor/browse/?${queryString}`);
  //   }
  // },[search])
  return (
    <>
      <header>
        <div
          className="d-flex justify-content-between align-items-center p-1 sticky-top"
          style={{ width: "100vw", backgroundColor: "#F5F5F5" }}>
          <div style={{ display: "flex", paddingLeft: "7%" }}>
            <img src={logo} alt="logo" width={150} height={100} />
          </div>
          <div className="input-group" style={{ width: "30vw" }}>
            <span className="input-group-text bg-white border-end-0">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control border-start-0"
              placeholder="Search"
              // value={search}
              // onChange={handleSearch}
            />
          </div>
          <div style={{ paddingRight: "7%" }}>
            <Link to="/mentor/browse"><button className="btn btn-primary me-2">Browse All Mentors</button></Link>
            <button className="btn btn-outline-primary">Login</button>
          </div>
        </div>
        <div className='small-nav' style={{backgroundColor:"#F5F5F5",borderBottom:"1px solid #ddd",borderTop:"0.5px solid #ddd",paddingTop:"10px",paddingBottom:"10px", paddingLeft:"7%", paddingRight:"7%"}} >
          <Link to="/mentor/browse/?search=Engineering & tags=Engineering" className="hover-link">Engineering Mentors</Link>
          <Link to="/mentor/browse/?search=Design & tags=Design" className="hover-link">Design Mentors</Link>
          <Link to="/mentor/browse/?search=Founder & tags=Startup" className="hover-link">startUp Mentors</Link>
          <Link to="/mentor/browse/?search=ProductManager & tags=ProductManagement" className="hover-link">Product Managers</Link>
          <Link to="/mentor/browse/?search=Marketer & tags=Marketing" className="hover-link">Marketing Coaches</Link>
          <Link to="/mentor/browse/?search=Leadership & tags=Leadership" className="hover-link">LeadorShip Mentors</Link>
          <Link to="/mentor/browse/?search=Career & tags=Career" className="hover-link">Career Coaches</Link>
          <Link to="/top" className="hover-link">Top Mentors</Link>
        </div>
      </header>
    </>
  );
}

export default Header