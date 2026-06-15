import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_URL || "";

const Card = () => {
  const [showRoom, setShowRoom] = useState(false);
  const [roomId , setRoomId] = useState("");
  const [err,setErr] = useState('');
  const navigate = useNavigate();
  const handleCreateRoom = async() => {
    const data = await fetch(`${API_BASE}/create-room`);
    
    const response = await data.json();

    if(response.roomId){
      navigate("/room/"+response.roomId)
    }
    
  };

  const handleJoinRoom = async() => {
    const res = await fetch(`${API_BASE}/room/${roomId}`)
    if(res.ok){
          navigate("/room/"+roomId)
    }else{
      const data = await res.json();
      setErr(data.message);
    }
  }
  return (
    <div
      style={{
        height: "60vh",
        width: "60vw",
        backgroundColor: "#2C2E35",
        margin: "auto",
      }}
    >
      <div
        style={{
          width: "100%",
          padding: "0px",
          color: "white",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          borderBottom: "2px solid #3650ae",
        }}
      >
        <button
          onClick={() => setShowRoom(false)}
          style={{
            backgroundColor: showRoom ? "#2C2E35" : "#3650ae",
            border: "0px",
            color: "white",
            fontSize: "24px",
            flexGrow: "1",
            margin: "0px",
            cursor: "pointer",
          }}
        >
          Create Room
        </button>
        <button
          onClick={() => setShowRoom(true)}
          style={{
            backgroundColor: showRoom ? "#3650ae" : "#2C2E35",
            border: "0px",
            color: "white",
            fontSize: "24px",
            flexGrow: "1",
            cursor: "pointer",
          }}
        >
          Join Room
        </button>
      </div>
      {showRoom ? (
        <>
          <div
            style={{
              position:"relative",
              height: "100%",
              width: "100%",
              display: "flex",
              alignItems: "start",
              justifyContent: "center",
              padding: "10px",
            }}

          >
            <h1 style={
                {
                marginTop: "50px",
                color: "white",
                fontFamily: "sans-serif",
                textAlign: "center",
              }
            }>Enter your Room ID:</h1>
            <div style={{
                position:"absolute",
                marginTop:"120px",
                width:"80%"
            }}>
                <input
                onChange={(e) => setRoomId(e.target.value)}
                style={{
                width:"100%",
                padding:"8px",
                marginLeft:"3%",
                outline:"none"
                }} type="text" placeholder="Enter Room ID"/>
            </div>
            <div style={{
                    position: "absolute",
                height: "100%",
                display: "flex",
                alignItems: "center",
                marginTop: "-160px",
                color:"red",
                fontSize:"18px",
            
            }}>
              {err ? <p>{err}</p>:""}
            </div>
                  <div
              style={{
                position: "absolute",
                bottom:"40%",
                display: "flex",
                alignItems: "center",
                marginTop: "",
              }}
            >
              <button
                style={{
                  width: "200px",
                  padding: "5px 8px",
                  cursor: "pointer",
                }}
                onClick={() => handleJoinRoom()}
              >
                Join Room
              </button>
   
            </div>
         
          </div>
        </>
      ) : (
        <>
          <div
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              alignItems: "start",
              justifyContent: "center",
              padding: "10px",
            }}
          >
            <h1
              style={{
                marginTop: "50px",
                color: "white",
                fontFamily: "sans-serif",
                textAlign: "center",
              }}
            >
              Start sharing the text by creating <br /> the room below
            </h1>
            <div
              style={{
                position: "absolute",
                height: "100%",
                display: "flex",
                alignItems: "center",
                marginTop: "-120px",
              }}
            >
              <button
                style={{
                  width: "200px",
                  padding: "5px 8px",
                  cursor: "pointer",
                }}
                onClick={() => handleCreateRoom()}
              >
                Create Room
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
