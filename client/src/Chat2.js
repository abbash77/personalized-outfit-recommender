import React, { useState, useEffect } from "react";
import "./chat.css";
import f from "./images/f.png";
import mike from "./images/mike.png";
import gal from "./images/gal.png";
import ai from "./images/ai.png";
import mess from "./images/message.png"
import axios from "axios";
import newg from "./images/newg.png";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState({ text: "", user: "" });
  const [selectedImage, setSelectedImage] = useState(null);
  const [features, setFeatures] = useState([]);
  const [images, setImages] = useState([]);
  const [finalImages, setFinalImages] = useState([]);
  const [finalImages2,setFinalImages2]=useState([])
  const [cnt,setCnt]=useState(0)
  const [savingChats,setSavingChats]=useState('')
  const [imagesFromText,setImagesFromText]=useState([])

  const messaging = (e) => {
    setMessage({ text: e.target.value, user: "u" });
  };
  const sendingMessage = async (e) => {
    e.preventDefault();
    setSavingChats(prev=>{
      return prev+" "+message.text
    })
    console.log("save",savingChats)
    const resp = await axios.post(
      "http://127.0.0.1:8080/api/send-message",
      message.text,
      {
        headers: {
          "Content-Type": "text/plain",
        },
      }
    );
    console.log("resp",resp.data.reply);
    messages.push(message);
    messages.push({ text: resp.data.reply, user: "b" });

    setMessages(messages);
    setMessage({ text: "", user: "" });
  };
  const handleImageUpload = async (event) => {
    const imageFile = event.target.files[0];
    setSelectedImage(imageFile);

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/extract-features",
        formData
      );

      setFeatures(response.data);
      console.log("res", response);
      console.log("resd", response.data.list);
      
      messages.push({ text: 'Here are few results', user:'img' });
      setCnt(prev=>prev+1)
      setImages(response.data.list);
      
      setMessages(messages);
      console.log("list", images);
      console.log("hello");
    } catch (error) {
      console.error("Error extracting features:", error);
    }
  };
  useEffect(() => {
    console.log("list", images); // This will show the updated images array
    if (images.length > 0) {
      let dummy = [];
      for (let i = 0; i < images.length-1; i++) {
        dummy.push("/" + images[i].replace(/\\/g, "/"));
      }
      setFinalImages(dummy);
      // setFinalImages2([...finalImages2, images]);
      // setFinalImages2(finalImages)
      
      // filePathWithBackslashes.replace(/\\/g, '/');
    }
  }, [images]);
  useEffect(() => {
    // console.log("listfinallll", finalImages); // This will show the updated images array
    imagesFromText.map((imageUrl, index)=>{
      console.log(imageUrl)
    })
  }, [imagesFromText]);
  const texttoimg=async()=>{
    const dataToSend = { text:savingChats }
    const resp=await axios.post("http://127.0.0.1:7070/search",savingChats,{
      headers: {
        "Content-Type": "text/plain",
      },
    })
    console.log(resp.data)
    let dummy=[]
    for(let i=0;i<resp.data.length/2;i++){
      dummy.push(resp.data[i][3])
    }
    setSavingChats('')
    messages.push({ text: 'Here are few results', user:'img1' });
    setImagesFromText(dummy)
  }
  return (
    <div>
      <div className="navi"></div>
      <div className="maincomp">
        <div className="leftComp">
          <h1 className="head">History</h1>
          <div className="history1">
            <img className="mess" src={mess} alt="elec" />
            <p className="rp1">One day ago</p>
            <p className="rp2">I need a red purse</p>
          </div>
          <div className="history1">
            <img className="mess" src={mess} alt="elec" />
            <p className="rp1">2 days ago</p>
            <p className="rp2">Saree for diwali</p>
          </div>

          <div className="history1">
            <img className="mess" src={mess} alt="elec" />
            <p className="rp1">One week ago</p>
            <p className="rp2">Yellow frock</p>
          </div>
          <div className="history1">
            <img className="mess" src={mess} alt="elec" />
            <p className="rp1">One month ago</p>
            <p className="rp2">Jeans</p>
          </div>
          <div className="history1">
            <img className="mess" src={mess} alt="elec" />
            <p className="rp1">One month ago</p>
            <p className="rp2">I want red formals</p>
          </div>
        </div>

        <div className="rightcomp">
          <div className="highest">
          <div className="chat1">👋 Hello! I'm Flipkart chatbot 🤖.I'm here to assist you with picking your choice of clothes and accessories. </div>
            {/* {messages.map((val)=>(
                  <div>{val.user==='u'&&<div className="chat2">{val.text}</div>}{val.user==='b'&&<div className="chat1">{val.text}</div>}</div>
                ))} */}
            {messages.map((val) => (
              <div>
                
                {val.user === "u" && <div className="chat2">{val.text}</div>}
                {val.user === "b" &&<div className="bah"><div className="chat1">{val.text}</div><img className="ai" src={ai} alt="elec" /></div>}
                {val.user === 'img' && <div className="textreply"><div>{val.text}</div>{finalImages.length > 0 && <div className="listimg">{finalImages.map((imageUrl, index) => (
                  <img className="imgbox" key={index} src={`http://127.0.0.1:5000${imageUrl}`} alt={`Image ${index}`} />
                ))}</div>} </div>}
                {val.user === 'img1' && <div className="textreply"><div>{val.text}</div> {imagesFromText.length > 0 && <div className="listimg">{imagesFromText.map((imageUrl, index) => (
                  
                  <img className="imgbox" key={index} src={`http://127.0.0.1:7070/${imageUrl}`} alt={`Image ${index}`} />
                ))}</div>} </div>}
                {/* {val.user === 1 && <div>{finalImages.length > 0 && <div className="listimg">{finalImages.map((imageUrl, index) => (
                  <img className="imgbox" key={index} src={`http://127.0.0.1:5000${imageUrl}`} alt={`Image ${index}`} />
                ))}</div>} </div>}
                {val.user === 2 && <div>{finalImages.length > 0 && <div className="listimg">{finalImages.map((imageUrl, index) => (
                  <img className="imgbox" key={index} src={`http://127.0.0.1:5000${imageUrl}`} alt={`Image ${index}`} />
                ))}</div>} </div>} */}
              </div>
            ))}
          </div>
          <div className="lowest">
            <input
              id="inputimg"
              className="inputimg"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            ></input>
            <label htmlFor="inputimg" className="">
              <img className="gal" src={newg} alt="elec" />
            </label>

            <img className="mike" src={mike} alt="elec" />
            <form className="forminput" onSubmit={sendingMessage}>
              <input
                value={message.text}
                onChange={messaging}
                type="text "
                className="inputr"
                placeholder="Ask something!"
              />
              <button type="submit" className="btn">
                {" "}
                Send
              </button>
              
            </form>
            <button  onClick={texttoimg} className="btn generate">
                {" "}
                Generate
              </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Chat;
