import Typewriter from "typewriter-effect";

const NewChatSCreen = () => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-between text-center flex-col items-center gap-3 w-full">
      <h1 className="lg:text-5xl text-3xl font-semibold mb-1">
        Fujichat Chatroom
      </h1>

      <Typewriter
        options={{
          loop: true,
        }}
        onInit={(typewriter) => {
          typewriter
            .typeString(
              "<strong>Choose AI model which you want to have a conversation</strong>"
            )
            .pauseFor(1000)
            .deleteAll()
            .typeString(
              "<strong>Bad words or private information will be blocked</strong>"
            )
            .pauseFor(1000)
            .start();
        }}
      />
    </div>
  );
};

export default NewChatSCreen;
