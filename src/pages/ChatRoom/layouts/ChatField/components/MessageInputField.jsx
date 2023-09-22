import { CloudCog } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const MessageInputField = ({ props }) => {
  // const textareaRef = useRef(null);
  const { message, setMessage, submitHandle } = props;

  const resizeTextarea = (event) => {
    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  const submitFormHandle = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      const sendButton = document.getElementById("send-message-button");
      sendButton.click();
      event.target.style.height = "auto";
    }
  };

  return (
    <textarea
      name="message_input"
      rows={1}
      type="text"
      placeholder="Send a message"
      className="flex flex-grow max-h-[100px] overflow-y-scroll font-sans resize-none focus-visible:outline-none bg-background"
      onChange={(event) => {
        setMessage(event.target.value);
      }}
      value={message}
      onKeyDown={submitFormHandle}
      onInput={resizeTextarea}
    />
  );
};

export default MessageInputField;
