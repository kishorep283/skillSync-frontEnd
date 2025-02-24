import React, { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Data } from '../../Data/data';
import { Link } from 'react-router-dom';
import { First } from '../../Data/data';
import { lazy } from 'react';
import { Suspense } from 'react';
const LazyComponent =lazy(()=>import("./Second.jsx"))
const Mentros_page = () => {
    let [data] = useSearchParams();
    let search=data.get("search")||"";
    console.log(search);
    let tags=data.getAll("tags");
    let jobs =data.getAll("job_titles");
    let company = data.getAll("company");
    console.log(company);
    const memoizedData=useMemo(()=>Data,[Data]);
    const[AllData,setAllData]=useState([]);
    useEffect(() => {
      setAllData((prevData) => {
          let filteredData = [...prevData];
   
          // **Filter by Search Query**
          if (search.trim() !== "") {
              filteredData = filteredData.filter(
                  (item) =>
                      item.name.toUpperCase().includes(search.toUpperCase()) ||
                      item.company.toUpperCase().includes(search.toUpperCase()) ||
                      item.job_title.toUpperCase().includes(search.toUpperCase()) ||
                      item.skills.some((skill) => skill.toUpperCase().includes(search.toUpperCase()))
              );
          } else {
              filteredData = [...memoizedData]; // Reset when search is empty
          }
   
          // **Filter by Tags**
          if (tags.length > 0) {
              filteredData = filteredData.filter((item) =>
                  item.skills.some((skill) => tags.includes(skill))
              );
          }
   
          // **Filter by Job Titles**
          if (jobs.length > 0) {
              filteredData = filteredData.filter((item) =>
                  jobs.some((job) => item.job_title.toUpperCase().includes(job.toUpperCase()))
              );
          }
   
          // **Filter by Company**
          if (company.length > 0) {
              filteredData = filteredData.filter((item) =>
                  company.some((com) => item.company.toUpperCase().includes(com.toUpperCase()))
              );
          }
   
          return JSON.stringify(prevData) !== JSON.stringify(filteredData) ? filteredData : prevData;
      });
   }, [search, tags, jobs, company, memoizedData]);
   
      
  return (
    <div>
        <div style={{display:"flex", flexDirection:"column",gap:"20px",marginRight:'20%',maxWidth:"100%"}}>
            {AllData.map((da)=>(
                <div className="d-flex gap-3 p-4" style={{border:"2px solid #ddd",maxWidth:"100%",borderRadius:"20px"}}>
                    <div>
                      <img src={da.image} alt="image" width={150} height={200} style={{objectFit:"cover",borderRadius:"20px"}}/>
                    </div>
                    <div>
                      <div>
                        <h4>{da.name}</h4>
                        <p>{da.job_title} at <b>{da.company}</b></p>
                      </div>
                      <div>
                        <p>{da.description}</p>
                      </div>
                      <div className='d-flex gap-3'>
                        {da.skills.map((skill)=>(
                          <span style={{padding:"5px 10px", backgroundColor:"#dddd",borderRadius:"20px"}}>{skill}</span>
                        ))} 
                      </div>
                      <div className='d-flex gap-5 m-4 p-2'>
                        <span>Starting from <h3 className='d-inline'>${da.price}</h3>/month</span>
                        <Link to={`/mentor/:${da.id}`}><button className='btn btn-primary'>View Profile</button></Link>
                      </div>
                      
                    </div>
                </div>
            ))}
        </div>
        {/* <Suspense fallback={<h5>Loading...</h5>}>
            <LazyComponent/>
        </Suspense> */}
    </div>
  )
}
export default Mentros_page