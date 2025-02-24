import React from 'react'
import { useState,useEffect} from 'react';
const ContinueEffet = () => {
    const words = ["DevOps", "Marketing", "Product Management", "Engineering"];
    const [index, setIndex] = useState(0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % words.length);
      }, 2000); 
  
      return () => clearInterval(interval);
    }, []);
  
    return (
      <div style={{ fontSize: "2rem", fontWeight: "bold", minHeight: "40px" }}>
        <h1>{`${words[index]}`}</h1>
      </div>
    );
}

export default ContinueEffet;