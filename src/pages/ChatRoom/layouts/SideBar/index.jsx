import SidebarButton from "./components/SidebarButton";
import { useParams } from "react-router-dom";
import ConversationContainer from "./components/ConversationContainer";
import useConversation from "../../hooks/useConversation";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

const SideBar = ({ setShowSideBar, sideBarRef }) => {
  const currentConversation = useParams().id;
  const getConversation = useConversation();
  const { data: conversations, isError, refetch } = getConversation;
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries("get-conversation");
  }, []);

  return (
    <div
      ref={sideBarRef}
      className="bg-[#202123] absolute left-0 lg:relative z-50 side-bar-exit"
    >
      <div className="flex flex-col p-2 h-[calc(100dvh-60px)]">
        <div className={`flex gap-2 ct-transition overflow-hidden`}>
          <SidebarButton
            className="justify-start flex-grow overflow-hidden ct-transition"
            to={"/"}
          >
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>{" "}
            &nbsp; {"New chat"}
          </SidebarButton>

          <SidebarButton
            className="w-11 h-11 text-white overflow-hidden ct-transition"
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
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="9" y1="3" x2="9" y2="21"></line>
            </svg>
          </SidebarButton>
        </div>
        <div className="list-conversation flex flex-col gap-3 mt-1 overflow-y-auto lg:overflow-y-auto lg:hover:overflow-y-auto scroll-m-[10px]">
          <div className="flex flex-col font-sans text-xs text-white gap-y-2">
            <h2 className="p-3 text-gray-400">List of conversation: </h2>

            {conversations?.length > 0 ? (
              <ConversationContainer
                conversations={conversations}
                currentConversation={currentConversation}
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
