import { useEffect, useState } from 'react';
import Navbar from './Navbar'
import { useParams } from 'react-router-dom'

const API_BASE = import.meta.env.VITE_API_URL || "";

const Room = () => {
 const {id} = useParams();
  const [hover, setHover] = useState(false);
  const [text, setText] = useState("");
  const [textArr,setTextArr] = useState([]);
  const [copiedId,setCopiedId] = useState(null);
  useEffect(()=>{
    const getData = async () => {
    const response = await fetch(`${API_BASE}/getdata/${id}`);
    const data = await response.json();
    setTextArr(data.textArr);
    }
    getData();
    
  },[textArr]);
  const handleCopy = async(text,idx) => {
           await navigator.clipboard.writeText(text)
           setCopiedId(idx)
             setTimeout(() => setCopiedId(null), 2000);
  }
  const handleTextSend = async () => {
    const payload = {text}
    const response = await fetch(`${API_BASE}/savetext/${id}`,{
      method:"POST",
      headers:{
        'Content-Type':"application/json"
      },
      body:JSON.stringify(payload)
    });
       
    if(response.ok){
      console.log("Text saved");
      
    }
     setText('');
  }
  return (
    <div style={{
        backgroundColor:"black",
        height:"100vh"
    }}>
      <Navbar/>
      <div style={{
        padding:"10px",
        color:"white",
        fontFamily:"sans-serif"
      }}> 
        <h2>RoomId:{id} </h2>
      </div>

      <div style={{
        display:"flex",
        gap:"20px",
        position:"fixed",
        bottom:"20px",
        left:"20%",
        width:"60%",
        height:"8vh"
      }}>
        <textarea value={text} onChange={(e) => setText(e.target.value)} style={{
          width:"100%",
          backgroundColor:"#1E1F20",
          resize:"none",
          outline:"none",
          color:"white",
          height:"100%",
          overflow:"hidden",
          padding:"8px",
          borderRadius:"10px"
        }} name="inputText" ></textarea>

        <button  
        onClick={() => handleTextSend()}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
        style={{
          width:"150px",
          cursor:"pointer",
        
          fontSize:"18px",
        border:"2px solid white",
          borderRadius:"10px",
               backgroundColor: hover ? "black" : "white",
        color: hover ? "white" : "black",
        }}>Send</button>
      </div>

      <div style={{
        color:"white",
        width:"60%",
        height:"70vh",
        padding:"18px",
        backgroundColor:"#181818",
        borderRadius:"10px",
        position:"fixed",
        left:"50%",
        top:"50%",
        transform:"translate(-50%,-50%)",
        overflowY:"auto"
      }}> 
     
      {
        textArr.length > 0 ? (
          textArr.map((text,idx) => (
            <div style={{
              backgroundColor:"black",
              width:"90R",
              height:"30vh",
              padding:"10px",
              overflowY:"auto",
              position:"relative",
              border:"1px solid white",
              margin:"5px"
            }} key={idx}>
              <p style={{
                whiteSpace:"pre-wrap",
                fontSize:"22px"
              }}>{text}</p>

              <button 
              onClick={() => handleCopy(text,idx)}
              style={{
                backgroundColor:"#181818",
                color:"white",
                position:"absolute",
                right:"0%",
                top:"0%",
                margin:"8px",
                border:"1px solid white",
                borderRadius:"4px",
                padding:"4px 8px",
                cursor:"pointer"
              }}>
                {copiedId === idx?"Copied!":"Copy"} 
              </button>
            </div>
          ))
        ):( <p>Text will be displayed here</p>)
      }


      </div>
    </div>
  )
}

export default Room;