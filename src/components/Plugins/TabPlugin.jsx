import React, { useState } from 'react'

const TabPlugin = (props) => {
  const [toggle,setToggle] = useState(1);

  const ToggleHandle = (num)=>{
      setToggle(num)
  }

  return (
    <>

      <div className="tab-header">
        <div className="row align-items-center justify-content-center ">
          <div  className="col-lg-2 text-center">
            <span className={toggle===1?"active-tab":"deactive"} onClick={()=>ToggleHandle(1)} >Description</span>
          </div>
          <div className="col-lg-2  text-center">
            <span className={toggle===2?"active-tab":"deactive"}  onClick={()=>ToggleHandle(2)} >Review</span>
          </div>
          <div className="col-lg-2 text-center">
           <span className={toggle===3?"active-tab":"deactive"} onClick={()=>ToggleHandle(3)} > Comment</span>
          </div>
        </div>
      </div>

      <div className="tab-menu">
         <div className={toggle===1?"desc":"desc  d-none"}>
           {props.desc}
         </div>
         <div className={toggle===2?"review" : "review d-none"}>
          aa
         </div>
         <div className={toggle===3?"comment":"comment d-none"}>
          dd
         </div>
      </div>

    </>
  )
}

export default TabPlugin