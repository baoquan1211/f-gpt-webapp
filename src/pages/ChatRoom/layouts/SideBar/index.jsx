import SidebarButton from "./components/SidebarButton";
import { useParams } from "react-router-dom";
import ConversationContainer from "./components/ConversationContainer";
import useConversation from "../../hooks/useConversation";

const SideBar = ({ setShowSideBar, sideBarRef }) => {
  const currentConversation = useParams().id;
  const getConversation = useConversation();
  const { data: conversations } = getConversation;

  /* const ChatList = [
    {
      time: "Today",
      item: [
        {
          id: 1,
          title: "Lorem Ipsum ",
        },
        {
          id: 2,
          title: "Lorem Ipsum ",
        },
        {
          id: 3,
          title: "Lorem Ipsum ",
        },
      ],
    },
    {
      time: "Yesterday",
      item: [
        {
          id: 4,
          title: "Lorem Ipsum",
        },
        {
          id: 5,
          title: "Lorem Ipsum",
        },
        {
          id: 6,
          title: "Lorem Ipsum ",
        },
      ],
    },
    {
      time: "Previous 7 Days",
      item: [
        {
          id: 7,
          title: "Lorem Ipsum",
        },
        {
          id: 8,
          title:
            "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
        },
        {
          id: 9,
          title: "Lorem Ipsum",
        },
        {
          id: 10,
          title: "Lorem Ipsum",
        },
        {
          id: 11,
          title: "Lorem Ipsum",
        },
        {
          id: 12,
          title: "Lorem Ipsum",
        },
        {
          id: 13,
          title: "Lorem Ipsum",
        },
        {
          id: 14,
          title: "Lorem Ipsum",
        },
        {
          id: 15,
          title: "Lorem Ipsum",
        },
        {
          id: 16,
          title: "Lorem Ipsum",
        },
        {
          id: 17,
          title: "Lorem Ipsum",
        },
        {
          id: 18,
          title: "Lorem Ipsum",
        },
        {
          id: 19,
          title: "Lorem Ipsum",
        },
        {
          id: 20,
          title: "Lorem Ipsum",
        },
        {
          id: 21,
          title: "Lorem Ipsum",
        },
        {
          id: 22,
          title: "Lorem Ipsum",
        },
        {
          id: 23,
          title: "Lorem Ipsum",
        },
        {
          id: 24,
          title: "Lorem Ipsum",
        },
        {
          id: 25,
          title: "Lorem Ipsum",
        },
        {
          id: 26,
          title: "Lorem Ipsum",
        },
        {
          id: 27,
          title: "Lorem Ipsum",
        },
      ],
    },
  ]; */
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
          {/* <div>
            {ChatList.map((timeList) => (
              <div
                key={timeList.time}
                className="flex flex-col overflow-y-auto font-sans text-xs text-white gap-y-2"
              >
                <h2 className="p-3 text-gray-400">{timeList.time}</h2>
                {timeList.item.map((chatItem) => (
                  <a
                    key={chatItem.id}
                    className="font-sans text-[16px] p-5 hover:bg-[#2A2B32] ct-transition
                  rounded-[6px] cursor-pointer truncate max-h-8
                  flex items-center gap-3 focus-visible:outline-none w-full"
                    href={chatItem.id}
                  >
                    <div>
                      <svg
                        stroke="currentColor"
                        fill="none"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-4 h-4"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                      </svg>
                    </div>
                    {chatItem.title}
                  </a>
                ))}
              </div>
            ))}
          </div> */}
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
