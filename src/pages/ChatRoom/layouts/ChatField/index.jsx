import SendMessageButton from "./components/SendMessageButton";
import { useState, useEffect, useRef } from "react";
import MessageCard from "./components/MessageCard";
import { socket } from "../../../../socket/index.js";
import MessageInputField from "./components/MessageInputField";
import MarkdownToHtml from "./components/MarkdownToHtml";
import LoadingIcons from "react-loading-icons";
import { getConversation } from "../../../../services/Chat";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import AssistantAvartar from "./components/AssistantAvartar";
import PALM from "../../../../assets/png/icon-palm.png";
import ExportButton from "./components/ExportButton";

const ChatField = ({ chatFieldRef, conversationID }) => {
  if (localStorage.getItem("ai-platform") == null) {
    localStorage.setItem("ai-platform", "openai");
  }
  const loadingAIPlatform = useRef(localStorage.getItem("ai-platform"));
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);
  const [conversationName, setConversationName] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiPlatform, setAIPlatform] = useState(loadingAIPlatform.current);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const loadingRef = useRef(conversationID);
  const scrollRef = useRef(null);
  const user = useSelector((state) => state.auth);

  const fetchData = (id) => {
    if (id === undefined) return;
    getConversation(id, user.access).then((data) => {
      if (data.data === "Conversation is not found") {
        navigate("/");
        return;
      }
      if (data.messages === null) return;
      setConversation(JSON.parse(data.messages));
      setConversationName(data.name);
    });
  };

  useEffect(() => {
    if (conversationID === undefined) {
      setConversation([]);
      return;
    }
    fetchData(conversationID);
  }, [conversationID]);

  useEffect(() => {
    try {
      socket.on("connect_error", (reason) => {
        console.error("test", reason);
        if (reason === "io server disconnect") {
          socket.connect();
        }
        toast.error("Can not connect to server");
        return;
      });

      socket.on("answer_request", (data) => {
        setLoading(false);
        if (data.error) {
          toast.error(data.error);
          // window.location.reload();
          return;
        }
        if (
          conversationID === undefined ||
          conversationID == data.conversation
        ) {
          setConversation([...conversation, data.response]);
          scrollRef.current?.scrollIntoView({ behavior: "smooth" });
        }

        if (conversationID === undefined) {
          navigate(`/c/${data.conversation}`);
          conversationID = data.conversation;
          queryClient.invalidateQueries(["get-conversation"]);
        }
      });
    } catch (error) {
      console.error(error);
      toast.error(error);
    }
  }, [conversation]);
  const submitHandle = (event) => {
    event.preventDefault();

    if (loading) return;

    setConversation([...conversation, { role: "user", content: message }]);
    socket.emit("ask_request", {
      user: user.username,
      conversation: conversationID,
      ai_platform: aiPlatform,
      message: { role: "user", content: message },
    });
    setMessage("");
    loadingRef.current = conversationID;
    setLoading(true);
    loadingAIPlatform.current = aiPlatform;
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className={`h-[calc(100dvh-60px)] relative flex-grow chat-field-enter-done`}
      ref={chatFieldRef}
    >
      <div className="relative flex flex-col items-center justify-center w-full h-full ct-transition overflow-hidden">
        {conversationID ? (
          <div className="w-full flex justify-end p-4">
            <ExportButton
              conversation={conversation}
              conversationID={conversationID}
              conversationName={conversationName}
            />
          </div>
        ) : null}
        <div className="chat-field flex-grow w-full justify-center pb-32 overflow-y-auto overflow-x-hidden dark:text-gray-200 text-xs md:text-base">
          {conversation?.map((item, index) => (
            <MessageCard key={index} role={item?.role} blocked={item?.blocked}>
              <MarkdownToHtml value={item?.content} />
            </MessageCard>
          ))}
          {loading === true && loadingRef.current === conversationID ? (
            <MessageCard role={loadingAIPlatform.current}>
              <LoadingIcons.ThreeDots
                stroke="black"
                fill="gray"
                className="w-8 h-8 ml-[15px]"
              />
            </MessageCard>
          ) : null}
          <div ref={scrollRef} />
        </div>
        <div className="absolute left-0 z-40 w-full bottom-2 flex flex-col md:items-center">
          <div className="w-[700px] flex gap-x-3 p-3 select-none">
            <button
              onClick={() => {
                setAIPlatform("openai");
                localStorage.setItem("ai-platform", "openai");
              }}
              className={`w-10 h-10 flex items-center justify-center ${
                aiPlatform === "openai" ? "border-green-600 border-2" : ""
              }`}
            >
              <AssistantAvartar className="w-8 h-8" />
            </button>
            <button
              onClick={() => {
                setAIPlatform("palm");
                localStorage.setItem("ai-platform", "palm");
              }}
              className={`w-10 h-10 flex items-center justify-center ${
                aiPlatform === "palm" ? "border-green-600 border-2" : ""
              }`}
            >
              <img src={PALM} alt="palm" className="w-8 h-8" />
            </button>
          </div>
          <div className="flex items-center justify-center">
            <form
              id="message-form"
              name="message_input_form"
              onSubmit={submitHandle}
              className="py-[8px] px-[16px] border-[1px] w-[700px] flex justify-center items-center shadow-2xl rounded-[12px] 
              shadow-slate-500 overflow-auto ct-transition bg-background"
            >
              <MessageInputField props={{ message, setMessage }} />
              {loading ? (
                <LoadingIcons.BallTriangle
                  stroke="black"
                  fill="gray"
                  className="w-8 h-8"
                />
              ) : (
                <SendMessageButton disabled={message === "" ? true : false} />
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatField;
