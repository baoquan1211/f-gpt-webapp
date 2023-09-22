import { useEffect, useRef, useState } from "react";

const MessageInputField = ({ props }) => {
  const textareaRef = useRef(null);

  const resizeTextarea = () => {
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  };

  const submitFormHandle = (event) => {
    if (event.key === "Enter") {
      const form = document.getElementById("message-form");
      form.submit();
    }
  };

  useEffect(() => {
    if (textareaRef !== undefined && textareaRef !== null) {
      textareaRef?.current?.addEventListener("input", resizeTextarea);
      textareaRef?.current?.addEventListener("keydown", submitFormHandle);
    }

    return () => {
      textareaRef?.current?.removeEventListener("input", resizeTextarea);
      textareaRef?.current?.removeEventListener("keydown", submitFormHandle);
    };
  });

  const { message, setMessage } = props;
  return (
    <textarea
      name="message_input"
      rows={1}
      type="text"
      placeholder="Send a message"
      className="flex flex-grow max-h-[100px] overflow-hidden font-sans resize-none focus-visible:outline-none bg-background"
      onChange={(event) => {
        setMessage(event.target.value);
      }}
      value={message}
      ref={textareaRef}
    />
  );
};

export default MessageInputField;
