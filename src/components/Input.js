import { useState } from "react";

const Input = ({ handleMessages }) => {
  const [text, setText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const sendMessage = (event) => {
    event.preventDefault();
    if (text.trim() === "") {
      setErrorMessage(
        "Ne možeš poslati praznu poruku. Unesi tekst za slanje."
      );
    } else {
      handleMessages(text.trim());
      setText("");
      setErrorMessage("");
    }
  };

  return (
    <div className="inputContainer">
      <form onSubmit={sendMessage}>
        <input
          className="messageInput"
          type="text"
          size="100"
          placeholder="Napiši nešto..."
          value={text}
          onChange={(event) => setText(event.target.value)}
          autoFocus
        />
        <button className="sendButton" type="submit">
          Pošalji
        </button>
      </form>
      {errorMessage && <div className="error">{errorMessage}</div>}
    </div>
  );
};

export default Input;