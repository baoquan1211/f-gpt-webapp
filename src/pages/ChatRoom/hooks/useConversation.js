import { useQuery } from "@tanstack/react-query";
import { getConversation } from "../../../services/Chat";

const useConversation = (conversationID) => {
  const useConversationQuery = useQuery({
    queryKey: ["get-conversation", conversationID],
    queryFn: () => getConversation(conversationID),
    cacheTime: Infinity,
    staleTime: 60 * 1000,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchInterval: true,
  });
  return useConversationQuery;
};

export default useConversation;
