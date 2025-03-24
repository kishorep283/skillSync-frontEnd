import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Api } from '../../../Api';
import "../../../STYLES/mentors.css"
const Mentros_page = () => {
    let [data] = useSearchParams();
    console.log(useSearchParams())

    const searchParams = new URLSearchParams(window.location.search);
const searchQuery = searchParams.get('search');
console.log("Search Query:", searchQuery);

    const[activePage,setActivePage]=useState(0);
    console.log(data);
    let search = data.get("search") || "";
    console.log(search)
    let tags = data.getAll("tags");
    let jobs = data.getAll("job_titles");
    let company = data.getAll("company");
    let email = JSON.parse(sessionStorage.getItem("email"));
    const [memoizedData, setMemoizedData] = useState([]);
    console.log(window.location.href)
    useEffect(() => {
        let fetchData = async () => {
            let { data } = await axios.get(`${Api}/Auth/AllData`);
            let { message } = data;
            if (email) {
                let finalData = message.filter(each => each.email !== email);
                setMemoizedData(finalData);
            } else {
                setMemoizedData(message);
            }
        };
        fetchData();
    }, [email]);

    const [AllData, setAllData] = useState([]);
    useEffect(() => {
        if (memoizedData.length === 0) return;
        let filteredData = [...memoizedData];

        if (search.trim() !== "") {
            filteredData = filteredData.filter(item =>
                item.firstname.toUpperCase().includes(search.toUpperCase()) ||
                item.lastname.toUpperCase().includes(search.toUpperCase()) ||
                item.company.toUpperCase().includes(search.toUpperCase()) ||
                item.job_title.toUpperCase().includes(search.toUpperCase()) ||
                item.skills.some(skill => skill.toUpperCase().includes(search.toUpperCase()))
            );
        }
        console.log(filteredData)
        if (tags.length > 0) {
            filteredData = filteredData.filter(item =>
                item.skills.some(skill => tags.includes(skill))
            );
        }
        if (jobs.length > 0) {
            filteredData = filteredData.filter(item =>
                jobs.some(job => item.job_title.toUpperCase().includes(job.toUpperCase()))
            );
        }
        if (company.length > 0) {
            filteredData = filteredData.filter(item =>
                company.some(com => item.company.toUpperCase().includes(com.toUpperCase()))
            );
        }
        setAllData(prevData => JSON.stringify(prevData) !== JSON.stringify(filteredData) ? filteredData : prevData);
    }, [search, tags, jobs, company, memoizedData]);
    const handleTab=(k)=>{
        setActivePage(k);
    }
    const handlePrev=()=>{
        setActivePage((prev)=>prev-1);
    }
    const handleNext=()=>{
        setActivePage((prev)=>prev+1);
    }
    let Cards =4;
    let totalPages = Math.ceil(AllData.length/Cards);
    let start=activePage*Cards;
    let end =start+Cards;
    return (
        <div className='ment'>
            <div style={{  padding: "15px", textAlign: "center", borderRadius: "10px", marginBottom: "20px" }}>
                <h2>Mentors</h2>
            </div>
            <div className='cards'>
                {AllData.slice(start,end).map((da) => (
                    <div className=" carrd" style={{ border: "2px solid var(--border-color)", maxWidth: "100%", borderRadius: "20px", backgroundColor: "var(--background-color)" }} key={da._id}>
                        <div>
                            <img src={da.image.startsWith("https") ? da.image : da.file} alt="mentor" width={150} height={200} style={{ objectFit: "cover", borderRadius: "20px" }} />
                        </div>
                        <div>
                            <h4>{da.firstname} {da.lastname}</h4>
                            <p>{da.job_title} at <b>{da.company}</b></p>
                            <p>{da.description}</p>
                            <div className='skill-map'>
                                {(da.skills.length > 1) ? da.skills.map((skill, index) => (
                                    <span className="skilled" key={index} >{skill}</span>
                                )) : JSON.parse(da.skills[0]).map((skill, index) => (
                                    <span className="skilled" key={index} >{skill.length > 1 ? skill : ""}</span>
                                ))}
                            </div>
                            <div className='d-flex gap-5 m-4 p-2'>
                                <span>Starting from <h3 className='d-inline'>&#8377;{parseInt(da.price)}</h3>/month</span>
                                <Link to={`/mentor/${da._id}`}><button className='btn btn-primary profile-btn'>View Profile</button></Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='pagination-main'>
                <button disabled={activePage===0} className='steps' onClick={handlePrev}>Prev</button>
                {[...Array(totalPages).keys()].map((k)=>(
                    <span key={k} className='page' style={{backgroundColor:activePage===k ?"var(--secondary-color)":"",color:activePage===k?"white":"var(--text-color)"}} onClick={()=>handleTab(k)}>{k}</span> 
                ))}
               <button disabled={activePage===totalPages-1} className='steps' onClick={handleNext}>Next</button>
            </div>
        </div>
    );
}

export default Mentros_page;