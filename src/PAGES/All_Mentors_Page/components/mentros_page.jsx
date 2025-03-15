import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Api } from '../../../Api';

const Mentros_page = () => {
    let [data] = useSearchParams();
    let search = data.get("search") || "";
    let tags = data.getAll("tags");
    let jobs = data.getAll("job_titles");
    let company = data.getAll("company");
    let email = JSON.parse(sessionStorage.getItem("email"));
    
    const [memoizedData, setMemoizedData] = useState([]);
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
    }, []);

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

    return (
        <div style={{ minHeight: "100vh", padding: "20px" }}>
            <div style={{  padding: "15px", textAlign: "center", borderRadius: "10px", marginBottom: "20px" }}>
                <h2>Mentors</h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginRight: '20%', maxWidth: "100%" }}>
                {AllData.map((da) => (
                    <div className="d-flex gap-3 p-4" style={{ border: "2px solid #ddd", maxWidth: "100%", borderRadius: "20px", backgroundColor: "#fff" }} key={da._id}>
                        <div>
                            <img src={da.image.startsWith("https") ? da.image : da.file} alt="mentor" width={150} height={200} style={{ objectFit: "cover", borderRadius: "20px" }} />
                        </div>
                        <div>
                            <h4>{da.firstname} {da.lastname}</h4>
                            <p>{da.job_title} at <b>{da.company}</b></p>
                            <p>{da.description}</p>
                            <div className='d-flex gap-3'>
                                {(da.skills.length > 1) ? da.skills.map((skill, index) => (
                                    <span key={index} style={{ padding: "5px 10px", backgroundColor: "#ddd", borderRadius: "20px" }}>{skill}</span>
                                )) : JSON.parse(da.skills[0]).map((skill, index) => (
                                    <span key={index} style={{ padding: "5px 10px", backgroundColor: "#ddd", borderRadius: "20px" }}>{skill.length > 1 ? skill : ""}</span>
                                ))}
                            </div>
                            <div className='d-flex gap-5 m-4 p-2'>
                                <span>Starting from <h3 className='d-inline'>${parseInt(da.price)}</h3>/month</span>
                                <Link to={`/mentor/${da._id}`}><button className='btn btn-primary'>View Profile</button></Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Mentros_page;