import React from 'react'

const FeaturesItem = (props) => {
    const {icon,title,desc} = props.feature;
  return (
    <>
           <div key={props.key} className="col-lg-4 col-12">
              <div className="features-box d-flex align-items-center gap-3">
                <div className="icon-feature">
                    <img src={icon} alt="my img" />
                </div>
                <div className="title-feature">
                    <h6>{title}</h6>
                    <p>{desc}</p>
                </div>
              </div>
           </div>
    </>
  )
}

export default FeaturesItem