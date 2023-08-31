import React, { useState } from 'react';
import Select from 'react-select';
import { useFormikContext } from 'formik';



const MultiSelect = ({ options, className , name }) => {
  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);

  const { setFieldValue } = useFormikContext();


  const handleSelect = (selectedOptions) => {
    const selectedValues = selectedOptions.map(option => option.value);
    setFieldValue(name, selectedValues);
  }
  
 

  return (
    <>
      <Select
        className={className}
        classNamePrefix="select"
        defaultValue={options[0]}
        isClearable={isClearable}
        isSearchable={isSearchable}
        name = {name} 
        isMulti
        options={options}
        onChange={handleSelect}
       
      />

   
    </>
  );
};

export default MultiSelect