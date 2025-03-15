import React from 'react'
import Filters_page from '../../Filters/Skills_filter.jsx'
import Mentros_page from './components/mentros_page.jsx'
const Full_page = () => {
  return (
    <div>
      <div style={{display:"flex" ,justifyContent:"space-between",gap:"30px",marginTop:"0%",paddingTop:"2%",backgroundColor:"#FAFAFA"}}>
        <Filters_page/>
        <Mentros_page/>
      </div>
    </div>
  )
}

export default Full_page