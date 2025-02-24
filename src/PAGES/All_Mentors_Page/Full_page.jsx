import React from 'react'
import Filters_page from '../../Filters/Skills_filter'
import Mentros_page from './mentros_page'
const Full_page = () => {
  return (
    <div>
      <div style={{display:"flex" ,justifyContent:"space-between",gap:"30px",marginTop:"5%"}}>
        <Filters_page/>
        <Mentros_page/>
      </div>
    </div>
  )
}

export default Full_page