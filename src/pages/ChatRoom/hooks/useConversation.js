import { useQuery } from "@tanstack/react-query";
import { getConversation } from "../../../services/Chat";
import { useSelector } from "react-redux";

const useConversation = (conversationID) => {
  const accessToken = useSelector((state) => state.auth.access);
  const useConversationQuery = useQuery({
    queryKey: ["get-conversation", conversationID],
    queryFn: () => getConversation(conversationID, accessToken),
    cacheTime: Infinity,
    staleTime: 60 * 1000,
  });
  return useConversationQuery;
};

export default useConversation;
