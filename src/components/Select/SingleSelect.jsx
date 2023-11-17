import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useFormikContext } from 'formik';



const SingleSelect = ({ options ,defaultValue  , name , className }) => {
  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  
  const { setFieldValue } = useFormikContext();


  const handleSelect = (e) => {
     var data = e !=null ? e.value : "";
     setFieldValue(name, data); 
  }
  


  return (
    <>
      <Select
        className= {className}
        classNamePrefix="select"      
        isClearable={isClearable}
        isSearchable={isSearchable}
        name = {name} 
        options={options}
        onChange={handleSelect}
      />

     
    
    </>
  );
};

export default SingleSelect