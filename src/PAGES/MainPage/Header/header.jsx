import React, { useCallback, useEffect, useState } from "react";
import logo from "../../../assets/logo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import debounce from "lodash.debounce";
import "./header.css";
const Header = () => {
  const [islogin, setlogin] = useState(false);
  const[value,setValue]=useState("");
  const[locator,setLocator]=useState(true);
  let navigate =useNavigate();
  useEffect(() => {
    let data = sessionStorage.getItem("login");
    if (data) {
      setlogin(true);
    } else {
      setlogin(false);
    }
  }, [islogin]);
  // const handleSearch =(e)=>{
  //   setValue(e.target.value);
  //   let params = new URLSearchParams();
  //   if(value.trim()) params.set("search",value);
  //   let queryString =params.toString();
  //   value.length >0 ? navigate(`/mentor/browse?${queryString}`): navigate("/")
  // }
  let location =useLocation();
  useEffect(()=>{
    if(location.pathname.includes("mentor/browse")){
      setLocator(false);
    }
  },[])
  
  const debouncedSearch = useCallback(
    debounce((searchValue) => {
      let params = new URLSearchParams();
      if (searchValue.trim()) params.set("search", searchValue);
      let queryString = params.toString();
      searchValue.length > 0
        ? navigate(`/mentor/browse?${queryString}`)
        : (locator ? navigate(`/mentor/browse`):navigate("/"));
    }, 1000), // 500ms debounce time
    [navigate]
  );

  const handleSearch = (e) => {
    setValue(e.target.value);
    debouncedSearch(e.target.value);
  };
  // useEffect(()=>{
  //   let params = new URLSearchParams();
  //   if(value.trim()) params.set("search",value);
  //   let queryString= params.toString();
  //   navigate(`/mentor/browse?${queryString}`)
  // },[value])
  return (
    <>
      <header>
        <div
          className="d-flex justify-content-between align-items-center p-1 "
          style={{ width: "100vw", backgroundColor: "#F5F5F5",borderBottom:"2px solid #bbb",top:"0",position:"sticky",zIndex:"1000" }}
        >
          <div style={{ display: "flex", paddingLeft: "7%" }}>
            <Link to="/">
              <img src={logo} alt="logo" width={150} height={100} />
            </Link>
          </div>
          <div className="input-group" style={{ width: "30vw" }}>
            <span className="input-group-text bg-white border-end-0">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control border-start-0"
              placeholder="Search"
              value={value}
              onChange={handleSearch}
            />
          </div>
          <div style={{ paddingRight: "7%" }}>
            <Link to="/mentor/browse">
              <button className="btn btn-primary me-2">
                Browse All Mentors
              </button>
            </Link>
            {islogin ? (
              <Link to="/DashBoard/mentors">
                <button className="btn btn-primary me-2">DashBoard</button>
              </Link>
            ) : (
              <Link to="/Auth/Login">
                <button className="btn btn-outline-primary">Login</button>
              </Link>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
