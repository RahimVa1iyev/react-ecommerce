import React from 'react'
import ContentLoader from 'react-content-loader'

const SliderLoader = props => (
    <ContentLoader 
    speed={2}
    width={1000}
    height={500}
    viewBox="0 0 1000 500"
    backgroundColor="#e8e8e8"
    foregroundColor="#e1dbdb"
    {...props}
  >
    <rect x="-10" y="189" rx="3" ry="3" width="484" height="16" /> 
    <rect x="-11" y="136" rx="3" ry="3" width="472" height="14" /> 
    <rect x="-23" y="243" rx="3" ry="3" width="510" height="6" /> 
    <rect x="-20" y="270" rx="3" ry="3" width="480" height="6" /> 
    <rect x="-441" y="328" rx="3" ry="3" width="682" height="20" /> 
    <rect x="619" y="123" rx="0" ry="0" width="359" height="238" /> 
  </ContentLoader>
)




export default SliderLoader