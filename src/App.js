import {v4 as uuidv4} from "uuid";
import "./App.css";
import Messages from "./components/Messages";
import Input from "./components/Input";
import { useState, useEffect } from "react";
import nadimci from "./data/nadimci.json";
import dodataknadimcima from "./data/dodataknadimcima.json";

const drone = new window.Scaledrone("ANaLLwyazbL1cEF0");

function App() {
  const [messages, setMessages] = useState([]);
  const [member, setMember] = useState({});

  useEffect(() => {
    const room = drone.subscribe("observable-room");
    room.on("data", (data, member) => {
      const newMessage = {
        text: data.text,
        member: data.member,
        id: data.id,
        timestamp: data.timestamp,
      };
      setMessages((m) => [...m, newMessage]);
    });
    drone.on ("open", (error) => {
      if (error) {
        return console.error(error);
      }
      const nadimak = nadimci[Math.floor(Math.random()* nadimci.length)];
      const dodataknadimka = dodataknadimcima[Math.floor(Math.random()*dodataknadimcima.length)];
      const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
      const randomMember = {
        username: `${dodataknadimka} ${nadimak}`,
        color: color,
        id: drone.clientId,
      }
      setMember(randomMember);
    });
  }, []);

  const sendMessage = (message) => {
    const newMessage = {
      text: message,
      member: member,
      id: uuidv4(),
      timestamp: new Date().getTime(),
    };
    drone.publish({
      room: "observable-room",
      message: newMessage,
    }); 
  };

  return (
    <div className="chatapp">
      <div className="appHeader">
        <h1>Chat App</h1>
      </div>
      <Messages messages={messages} currentMember={member} />
      <Input handleMessages={sendMessage} />
    </div>
  );
}

export default App;