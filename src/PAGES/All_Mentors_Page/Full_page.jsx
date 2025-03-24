import React from 'react'
import Filters_page from '../../Filters/Skills_filter.jsx'
import Mentros_page from './components/mentros_page.jsx'
import "../../STYLES/mentorspage.css"
const Full_page = () => {
  return (
    <div>
      <div className="mentors_page" style={{backgroundColor:"var(--background-color)",marginTop:"130px"}}>
        <Filters_page/>
        <Mentros_page/>
      </div>
    </div>
  )
}

export default Full_page