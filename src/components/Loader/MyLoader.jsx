import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
    <ContentLoader 
    speed={2}
    width={500}
    height={400}
    viewBox="0 0 400 500"
    backgroundColor="#e8e8e8"
    foregroundColor="#e1dbdb"
    {...props}
  >
    <rect x="178" y="278" rx="3" ry="3" width="166" height="3" /> 
    <rect x="179" y="314" rx="3" ry="3" width="8" height="0" /> 
    <rect x="500" y="267" rx="0" ry="0" width="1" height="1" /> 
    <rect x="418" y="195" rx="0" ry="0" width="12" height="2" /> 
    <rect x="169" y="29" rx="0" ry="0" width="208" height="229" /> 
    <rect x="141" y="142" rx="0" ry="0" width="5" height="6" /> 
    <rect x="136" y="138" rx="0" ry="0" width="5" height="4" /> 
    <rect x="179" y="287" rx="3" ry="3" width="166" height="3" /> 
    <rect x="181" y="300" rx="3" ry="3" width="13" height="8" /> 
    <rect x="201" y="300" rx="3" ry="3" width="13" height="8" /> 
    <rect x="223" y="300" rx="3" ry="3" width="13" height="8" /> 
    <rect x="179" y="331" rx="3" ry="3" width="60" height="4" /> 
    <rect x="257" y="332" rx="3" ry="3" width="60" height="4" />
  </ContentLoader>
)

export default MyLoader
