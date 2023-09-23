import { useQuery } from "@tanstack/react-query";
import { getConversation } from "../../../services/Chat";

const useConversation = (conversationID) => {
  const useConversationQuery = useQuery({
    queryKey: ["get-conversation", conversationID],
    queryFn: async () => {
      const res = await getConversation(conversationID);
      if (res) return res;
      throw new Error("Something went wrong");
    },
    cacheTime: Infinity,
    staleTime: 10 * 1000,
    refetchOnMount: true,
    retry: true,
  });
  return useConversationQuery;
};

export default useConversation;
