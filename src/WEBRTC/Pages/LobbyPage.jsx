import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../ScoketProvider/socketProvider";

const LobbyScreen = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");
   
  // localStorage.setItem("email",email);
  const socket = useSocket();
  const navigate = useNavigate();

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { email, room });
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { email, room } = data;
      navigate(`/DashBoard/connections/friends/room/${room}`);
    },
    [navigate]
  );
  

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    // socket.on("chat:message", handleIncomingMessage);
    return () => {
      socket.off("room:join", handleJoinRoom);
      // socket.off("chat:message", handleIncomingMessage);
    };
  }, [socket, handleJoinRoom]);

  return (
    <div>
      <h1>Lobby</h1>
      <form onSubmit={handleSubmitForm}>
        <label htmlFor="email">Email ID:</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <input
        style={{fontSize:"1.2rem"}}
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="room" >Room Number:</label>&nbsp;&nbsp;
        <input
        style={{marginTop:"1%",fontSize:"1.2rem"}}
          type="text"
          id="room"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <br />
        <button style={{padding:"7px 40px",marginTop:"1%",borderRadius:"20px",backgroundColor:"green",color:"white"}}>Join</button>
      </form>
    </div>
  );
};

export default LobbyScreen;
