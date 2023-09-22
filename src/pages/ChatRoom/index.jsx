import SideBar from "./layouts/SideBar";
import ChatField from "./layouts/ChatField";
import "./index.css";
import { CSSTransition } from "react-transition-group";
import { useState, useRef } from "react";
import Button from "./layouts/SideBar/components/SidebarButton";
import Header from "./layouts/Header";
import { useParams } from "react-router-dom";

const ChatRoom = () => {
  const [showSideBar, setShowSideBar] = useState(true);
  const sideBarRef = useRef(null);
  const chatFieldRef = useRef(null);
  const conversationID = useParams().id;

  return (
    <>
      <Header />
      <div className="lg:flex relative block ct-transition mt-[60px] overflow-hidden">
        {
          <Button
            className={`absolute z-10 ml-2 bg-gray-100 dark:bg-[#444654] border-none w-11 h-11 hover:bg-white top-2 dark:hover:bg-[#595b6d] ${
              showSideBar ? "block lg:hidden" : ""
            }`}
            onClick={() => {
              setShowSideBar((currentState) => {
                return !currentState;
              });
            }}
          >
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 text-black dark:text-white"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="9" y1="3" x2="9" y2="21"></line>
            </svg>
          </Button>
        }
        <CSSTransition
          in={showSideBar}
          nodeRef={sideBarRef}
          timeout={200}
          classNames="side-bar"
          mountOnEnter={true}
        >
          <SideBar
            showSideBar={showSideBar}
            setShowSideBar={setShowSideBar}
            sideBarRef={sideBarRef}
          />
        </CSSTransition>
        <CSSTransition
          in={showSideBar}
          nodeRef={chatFieldRef}
          timeout={200}
          classNames="chat-field"
        >
          <ChatField
            showSideBar={showSideBar}
            setShowSideBar={setShowSideBar}
            chatFieldRef={chatFieldRef}
            conversationID={conversationID}
          />
        </CSSTransition>
      </div>
    </>
  );
};

export default ChatRoom;
