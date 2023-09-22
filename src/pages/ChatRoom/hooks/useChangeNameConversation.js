import { useMutation } from "@tanstack/react-query";
import { updateConversation } from "../../../services/Chat";

const useChangeNameConversation = (conversationID, conversationName) => {
  const mutation = useMutation(() =>
    updateConversation(conversationID, conversationName)
  );
  return mutation;
};

export default useChangeNameConversation;
