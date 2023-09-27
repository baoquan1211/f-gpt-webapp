import Typewriter from "typewriter-effect";
import React from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";

const RootScreen = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-gradient-to-r from-rose-100 to-teal-100 dark:from-slate-800 dark:to-blue-900 w-full h-screen">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center text-center flex-col items-center gap-3 w-full">
        <h1 className="lg:text-5xl text-3xl font-semibold">
          Welcome to Fujichat
        </h1>

        <Typewriter
          options={{
            loop: true,
          }}
          onInit={(typewriter) => {
            typewriter
              .typeString(
                "Join to make conversations with multiple AI chatbot."
              )
              .pauseFor(1000)
              .deleteAll()
              .typeString("OpenAI and PaLM are available !!!")
              .pauseFor(1000)
              .start();
          }}
        />

        <Button
          className="mt-3 flex gap-2 text-lg"
          onClick={() => {
            navigate("/login");
          }}
        >
          Get start <LogIn />
        </Button>
      </div>
    </section>
  );
};

export default RootScreen;
