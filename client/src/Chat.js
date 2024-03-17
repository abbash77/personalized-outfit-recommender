import React, { useState,useEffect } from 'react';
import axios from 'axios';

const Chat = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [features, setFeatures] = useState([]);
    const [images,setImages]=useState([])
    const [finalImages,setFinalImages]=useState([])
  
    const handleImageUpload = async (event) => {
      const imageFile = event.target.files[0];
      setSelectedImage(imageFile);
  
      const formData = new FormData();
      formData.append('image', imageFile);
  
      try {
        const response = await axios.post('http://127.0.0.1:5000/api/extract-features', formData);
  
        setFeatures(response.data);
        console.log("res",response)
        console.log("resd",response.data.list)
        setImages(response.data.list)
        console.log("list",images)
        console.log("hello")
      } catch (error) {
        console.error('Error extracting features:', error);
      }
    };
    useEffect(() => {
      console.log("list", images); // This will show the updated images array
      if(images.length>0){
        let dummy=[]
        for(let i=0;i<images.length;i++){
          dummy.push('/'+images[i].replace(/\\/g, '/'))
        }
        setFinalImages(dummy)
        // filePathWithBackslashes.replace(/\\/g, '/');
      }
  }, [images]);
  useEffect(() => {
    console.log("listfinallll", finalImages); // This will show the updated images array
    finalImages.map((imageUrl, index)=>{
      console.log(imageUrl)
    })
  }, [finalImages]);
  
    return (
      <div>
        <h1>Image Feature Extraction</h1>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {selectedImage && <img src={URL.createObjectURL(selectedImage)} alt="Selected" />}
        <h2>Extracted Features:</h2>
        <ul>
          hello
        </ul>
        {finalImages.length>0&&<div>{finalImages.map((imageUrl, index) => (
                  <img key={index} src={`http://127.0.0.1:5000${imageUrl}`}  alt={`Image ${index}`} />
              ))}</div>}
      </div>
    );
}

export default Chat
