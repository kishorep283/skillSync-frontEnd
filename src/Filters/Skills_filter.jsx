import React, { useEffect } from 'react'
import { Link, useNavigate} from 'react-router-dom';
import { useState } from 'react';
import { Skills1 } from '../Data/Skills';
import { Roles1 } from '../Data/Job_titles';
import { Company1 } from '../Data/Company';
import "../STYLES/Filters.css"
import "../STYLES/globaltheme.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
const Filters_page = () => {
    const[value,setValue]=useState("");
    const[debouncevalue,setDebouncevalue]=useState("");
    const[skilllist,setSkilllist]=useState([]);
    const[jobs,setjobList]=useState([]);
    const[company,setCompany]=useState([]);
    let navigate =useNavigate();
    // function for adding search value 
    const handleSearch =(e)=>{
        setValue(e.target.value);
    }
    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         setDebouncevalue(value);
    //     }, 500); // Wait 500ms before updating

    //     return () => clearTimeout(timer); // Cleanup previous timer
    // }, [value]);
    const handleSkillChange=(e)=>{
        const skill = e.target.value;
        setSkilllist((prevSkills) =>
            prevSkills.includes(skill)
                ? prevSkills.filter((s) => s !== skill) 
                : [...prevSkills, skill] 
        );
    }
    const handleJobChange =(e)=>{
      const job=e.target.value;
      setjobList((prevjob)=>
         prevjob.includes(job)
         ? prevjob.filter((s)=> s!==job)
         : [...prevjob,job]
      )
    }
    const handleCompanyChange =(e)=>{
        const comp=e.target.value;
        setCompany((prevcom)=>
        prevcom.includes(comp)
        ?prevcom.filter((s)=>s!==comp)
        :[...prevcom,comp]
    )
    }
    useEffect(()=>{
        let params = new URLSearchParams();
        if(value.trim()) params.set("search",value);
        skilllist.forEach((skills)=>params.append("tags",skills))
        jobs.forEach((job)=>params.append("job_titles",job))
        company.forEach((comp)=>params.append("company",comp))
        const queryString = params.toString();

    // Only navigate if the URL has changed to avoid duplicate entries
        if (window.location.search !== `?${queryString}`) {
            navigate(`/mentor/browse?${queryString}`);
        }
    },[value,skilllist,jobs,company,navigate])

  return (
    <div>
    <div className="container-custom">
        <div>  
            <input 
            type="text"
            onChange={handleSearch} 
            value={value}
            placeholder='search for any skill,title, or company'
            className='form-control w-100'
            style={{width:"300px"}}
            />
            <h4 style={{marginTop:"20px"}}>100+ mentors</h4>     
        </div> 
        <div>
            <h3>Skills</h3>
            <div style={{display:"flex" ,flexDirection:"column",gap:'10px'}}>
                {Skills1.map(skill => (
                    <div key={skill}>
                    <label>
                        <input 
                            type="checkbox" 
                            value={skill} 
                            checked={skilllist.includes(skill)} 
                            onChange={handleSkillChange} 
                        />
                        <span>{skill}</span>
                    </label>
                </div>
                ))}
            </div>
        </div>
        <div>
          <h3>Job Titles</h3>
            <div style={{display:"flex" ,flexDirection:"column",gap:'10px'}}>
                {Roles1.map(skill => (
                    <div key={skill}>
                    <label>
                        <input 
                            type="checkbox" 
                            value={skill} 
                            checked={jobs.includes(skill)} 
                            onChange={handleJobChange} 
                        />
                        <span >{skill}</span>
                    </label>
                </div>
                ))}
            </div>
        </div>
        <div>
            <h3>Company</h3>
            <div style={{display:"flex" ,flexDirection:"column",gap:'10px'}}>
                {Company1.map(skill => (
                    <div key={skill}>
                    <label>
                        <input 
                            type="checkbox" 
                            value={skill} 
                            checked={company.includes(skill)} 
                            onChange={handleCompanyChange} 
                        />
                        <span >{skill}</span>
                    </label>
                </div>
                ))}
            </div>
        </div> 
    </div>
        <div className="dropdown">
            {/* Dropdown Button */}
                <div>  
                    <input 
                    type="text"
                    onChange={handleSearch} 
                    value={value}
                    placeholder='search for any skill,title, or company'
                    className='form-control w-75 searching'
                    style={{width:"100vw"}}
                    />
                    <h4 style={{marginTop:"20px"}} className='h4'>100+ mentors</h4>
                
                </div>
            <button className="btn btn-primary dropdown-toggle  dropdown-button" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Filters
            </button>
            
            {/* Dropdown Content */}
            <div className="dropdown-menu p-3">
                
                {/* Skills Section */}
                <div>
                    <h5>Skills</h5>
                    <div className="d-flex flex-column gap-2">
                        {Skills1.map(skill => (
                        <label key={skill}>
                            <input 
                            type="checkbox" 
                            value={skill} 
                            checked={skilllist.includes(skill)} 
                            onChange={handleSkillChange} 
                            />
                            <span>{skill}</span>
                        </label>
                        ))}
                    </div>
                </div>

                <hr />

                {/* Job Titles Section */}
                <div>
                    <h5>Job Titles</h5>
                    <div className="d-flex flex-column gap-2">
                        {Roles1.map(skill => (
                        <label key={skill}>
                            <input 
                            type="checkbox" 
                            value={skill} 
                            checked={jobs.includes(skill)} 
                            onChange={handleJobChange} 
                            />
                            <span>{skill}</span>
                        </label>
                        ))}
                    </div>
                </div>

                <hr />

                {/* Company Section */}
                <div>
                    <h5>Company</h5>
                    <div className="d-flex flex-column gap-2">
                        {Company1.map(skill => (
                        <label key={skill}>
                            <input 
                            type="checkbox" 
                            value={skill} 
                            checked={company.includes(skill)} 
                            onChange={handleCompanyChange} 
                            />
                            <span>{skill}</span>
                        </label>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Filters_page