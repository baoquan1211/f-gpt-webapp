import ConversationCard from "./ConversationCard";

const ConversationContainer = ({ currentConversation, conversations }) => {
  return (
    <div className="mr-[5px]">
      {conversations &&
        conversations?.map((conversation) => (
          <ConversationCard
            key={conversation.id}
            conversation={conversation}
            currentConversation={currentConversation}
          />
        ))}
    </div>
  );
};

export default ConversationContainer;
