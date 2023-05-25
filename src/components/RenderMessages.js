import dayjs from "dayjs";

function RenderMessages({ message, currentMember }) {
  const messageFromMe = message.member.username === currentMember.username;
  const messageMember = messageFromMe ? "Messaging currentMember" : "Messaging";

  return (
    <li key={message.id} className={messageMember}>
      <span
        className="memberIcon"
        style={{ backgroundColor: message.member.color }}
      />
      <div className="messageContent">
        <div className="memberUsername">
          {message.member.username || currentMember.username}
        </div>
        <div className="messageText">
          {message.text}
          <div className="messagesTimeContainer">
            <p className="messagesTime">
              {dayjs(message.timestamp).format("HH:mm")}
            </p>
          </div>
        </div>
      </div>
    </li>
  );
}

export default RenderMessages;