import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faPenToSquare,
  faCheck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import {
  updateConversation,
  deleteConversation,
} from "../../../../../services/Chat";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../../../components/ui/alert-dialog";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

const ConversationCard = ({ conversation, currentConversation }) => {
  const [nameChanging, setNameChanging] = useState(false);
  const inputNameRef = useRef(null);
  const changeNameShowRef = useRef(null);
  const accessToken = useSelector((state) => state.auth.access);
  const changeNameMutation = useMutation(
    () =>
      updateConversation(
        conversation.id,
        inputNameRef.current?.value,
        accessToken
      ),
    {
      onSuccess: () => {
        toast.success("Updated name successfully");
        changeNameMutation.reset();
        conversation.name = inputNameRef.current?.value;
      },
      onError: () => {
        toast.error(changeNameMutation.error);
        changeNameMutation.reset();
      },
    }
  );

  const deleteMutation = useMutation(
    () => deleteConversation(conversation.id, accessToken),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["get-conversation"]);
        toast.success(`Delete ${conversation.name} successfully`);
        deleteMutation.reset();
        navigate("/");
      },
      onError: () => {
        toast.error(deleteMutation.error);
        deleteMutation.reset();
      },
    }
  );

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const changeNameHandle = async (event) => {
    event.preventDefault();

    if (!nameChanging) {
      setNameChanging(true);
      inputNameRef.current.focus();
    } else {
      if (inputNameRef.current?.value !== conversation.name)
        await changeNameMutation.mutateAsync();
      setNameChanging(false);
    }
  };

  useEffect(() => {
    const mouseClickHandle = (event) => {
      if (nameChanging) {
        if (!changeNameShowRef.current?.contains(event.target)) {
          setNameChanging(false);
        }
      }
    };
    document.addEventListener("mousedown", mouseClickHandle);

    return () => {
      document.removeEventListener("mousedown", mouseClickHandle);
    };
  });

  const deleteHandle = async () => {
    await deleteMutation.mutateAsync();
  };

  return (
    <div key={conversation.id} className="relative" ref={changeNameShowRef}>
      <Link
        className={`font-sans text-[16px] p-5 ct-transition
            rounded-[6px] cursor-pointer truncate max-h-8
            flex items-center gap-3 focus-visible:outline-none w-full
            ${
              currentConversation == conversation.id
                ? "bg-[#2c2e3c]"
                : "hover:bg-[#2A2B32]"
            }`}
        to={`/c/${conversation.id}`}
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
        <form
          name="change_name_form"
          onSubmit={changeNameHandle}
          className={`${nameChanging ? "" : "hidden"}`}
        >
          <input
            name="change_name_input"
            autoFocus={nameChanging}
            type="text"
            defaultValue={conversation.name}
            className={`bg-transparent w-[70%] outline-none focus:outline-[0.5px] outline-blue-300`}
            ref={inputNameRef}
          />
        </form>
        <h1 className={`w-[70%] h-full ${nameChanging ? "hidden" : ""}`}>
          {conversation.name}
        </h1>
      </Link>

      {currentConversation == conversation.id ? (
        <div className="absolute right-1 top-[20%] flex gap-0.5">
          <button
            className="hover:bg-[#525565] p-1 rounded ct-transition bg-[#2c2e3c] bg-opacity-90"
            onClick={changeNameHandle}
          >
            <FontAwesomeIcon
              icon={nameChanging ? faCheck : faPenToSquare}
              style={{ color: "#687792" }}
            />
          </button>
          {nameChanging ? (
            <button
              onClick={() => {
                if (nameChanging) {
                  setNameChanging(false);
                }
              }}
              className="hover:bg-[#525565] p-1 rounded ct-transition bg-[#2c2e3c] bg-opacity-90"
            >
              <FontAwesomeIcon icon={faXmark} style={{ color: "#687792" }} />
            </button>
          ) : (
            <AlertDialog>
              <AlertDialogTrigger>
                <a className="hover:bg-[#525565] p-1 rounded ct-transition bg-[#2c2e3c] bg-opacity-90">
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    style={{ color: "#687792" }}
                  />
                </a>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription className="text-[18px]">
                    <span className="font-bold">{conversation.name}</span> will
                    be deleted.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={deleteHandle}
                    className={"bg-red-500 hover:bg-red-600 ct-transition"}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default ConversationCard;
