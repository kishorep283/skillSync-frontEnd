import React, { useEffect, useState } from 'react'
import Profile_Form from './Components/Profile_form'
import axios from 'axios';
const Profile_page = () => {
  let token =sessionStorage.getItem("token");
  const[userdetails,setUserDetails]=useState({firstname:"",lastname:"",email:"",job_title:"",company:"",image:"",skills:[]});
  // console.log(email)
  useEffect(()=>{
    const  submit = async()=>{
      if (!token) return;
      let { data } = await axios(
        `http://localhost:3002/Auth/profile_data/email`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      console.log(data);
      console.log(typeof data);
      // console.log(typeof data.message === "string");
      // debugger;
      if (typeof data.message === "string") {
        return;
      } else {
        // console.log(data.message);
        let { message } = data;
        // let skills = Array.isArray(message.skills) ? message.skills : JSON.parse(message.skills || "[]");
        let skills =JSON.parse(message.skills)
        console.log(skills);
        console.log(message);
        setUserDetails({
          firstname: message.firstname || message.name.split(" ")[0],
          lastname: message.lastname || message.name.split(" ")[1],
          email: message.email,
          job_title: message.profession,
          company: message.company,
          image: message.image,
          skills: skills
        });
      }
    }
    submit();
  },[token]);
  console.log(userdetails);
  console.log(userdetails.image);
  // console.log(userdetails.skills.length === 0);
  return (
    <div>
      {userdetails.skills.length !==0 ? 
        <>
         <img src={userdetails.image ? userdetails.image :"https://www.un.org/pga/wp-content/uploads/sites/53/2018/09/Dummy-image-1.jpg"} alt="image" width={200} height={200}/>
         <p>{userdetails.firstname}</p>
         <p>{userdetails.lastname}</p>
         <p>{userdetails.job_title}</p>
         <p>{userdetails.company}</p>
         <p>{userdetails.email}</p>
         <div className='d-flex gap-3'>
          {userdetails.skills.map((skill,ind)=>(
            <p>{skill}</p>         
          ))}
        </div>
        </>
        : <Profile_Form/>}
    </div>
  )
}

export default Profile_page