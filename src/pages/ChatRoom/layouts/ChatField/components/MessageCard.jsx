import AssistantAvartar from "./AssistantAvartar";
import UserAvartar from "./UserAvartar";
import { twMerge } from "tailwind-merge";

const MessageCard = ({ children, role = "server", error = false }) => {
  return (
    <div
      className={twMerge(
        `border-y-[1px] py-3 w-full flex justify-center ${
          error === true
            ? "bg-red-100 border-red-400 dark:bg-red-200 dark:text-black"
            : "bg-blue-100"
        } ${
          role === "openai" || role === "palm"
            ? "bg-gray-100 dark:bg-gray-800/50"
            : ""
        } 
          ${role === "user" ? "bg-white dark:bg-[#444654]" : ""}`
      )}
    >
      <div className="w-[80%] flex">
        {role === "openai" || role === "palm" ? (
          <AssistantAvartar platform={role} />
        ) : role === "user" ? (
          <UserAvartar />
        ) : (
          <div className="relative p-1 rounded-sm h-[30px] w-[30px] text-white flex items-center justify-center bg-blue-300 select-none">
            FJN
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default MessageCard;
