import React, { useState } from 'react'

const PreviewImage = ({file}) => {
    const [preview , setPreview] = useState(null);
    const reader =new FileReader();
    reader.readAsDataURL(file);
    reader.onload = ()=>{
        setPreview(reader.result)
    }
  return (
    <div>
        {preview ? (
                <img src={preview} alt="Preview" width="150px" height="150px" />
            ) : (
                'No Preview'
            )}
    </div>
  )
}

export default PreviewImage