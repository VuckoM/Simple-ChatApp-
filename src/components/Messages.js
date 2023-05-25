import { useRef, useEffect } from "react";
import RenderMessages from "./RenderMessages";

function Messages({ messages, currentMember }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <ul className="messagesList">
      {messages.map((message) => {
        return (
          <RenderMessages
            key={message.id}
            message={message}
            currentMember={currentMember}
          />
        );
      })}

      <div ref={messagesEndRef} />
    </ul>
  );
}

export default Messages;