import React from 'react'


const SliderItem = (props) => {
    const { title, secondTitle, description, imageUri, buttonText, buttonUrl } = props.item
   
    return (
        <>

            <div className="col-lg-6 col-12">
                <div className="slider-left-side">
                    <h4>{title}</h4>
                    <h1>{secondTitle}</h1>
                    <p>{description}</p>
                    <a href={buttonUrl}>{buttonText}</a>
                </div>
            </div>
        
               <div className="col-lg-6 col-12 ">
               <div className="slider-right-side">
                    <img className='watch-img' src={imageUri} alt="my img" />
                </div></div>     
      

        </>
    )
}

export default SliderItem