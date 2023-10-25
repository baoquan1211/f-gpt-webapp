import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "@/redux/actions/authAction.js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { z } from "zod";
import { store } from "@/redux/store.js";

const Login = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let user = useSelector((state) => state.auth);
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const loginValidation = z.object({
    username: z
      .string({
        required_error: "Username is required",
        invalid_type_error: "Username must be a string",
      })
      .min(1),
    password: z
      .string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string",
      })
      .min(1),
  });

  const loginHandle = (event) => {
    event.preventDefault();

    const valition = loginValidation.safeParse({
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    });
    if (valition.success) {
      setLoading(true);
      dispatch(
        loginAction({
          username: usernameRef.current.value,
          password: passwordRef.current.value,
        })
      ).then(() => {
        setLoading(false);
        const { auth } = store.getState();
        if (auth.error) {
          toast({
            variant: "destructive",
            description: auth.error.detail,
          });
        }
      });
    }
  };

  useEffect(() => {
    if (user.access) {
      navigate("/policies");
    }
  });

  return (
    <section className="bg-gradient-to-r from-rose-100 to-teal-100 dark:from-slate-800 dark:to-blue-900 w-full h-screen">
      <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-primary-foreground p-8 lg:p-12 rounded-lg">
        <form className="flex flex-col gap-2" onSubmit={loginHandle}>
          <h1 className="font-bold text-2xl md:text-3xl">
            Welcome to Fujichat
          </h1>
          <h2 className="text-lg text-secondary-foreground/50">
            Login to your account
          </h2>

          <Input
            type="text"
            id="username"
            ref={usernameRef}
            placeholder="Username"
            className="min-w-[250px] md:min-w-[350px] mt-8"
            autoComplete="username"
            required
          />

          <Input
            type="password"
            id="password"
            ref={passwordRef}
            placeholder="Password"
            className="min-w-[250px] md:min-w-[350px] mt-3"
            autoComplete="current-password"
            required
          />
          <span className="text-xs text-primary/70">
            {"Don't have account. "}{" "}
            <Link to={"/register"} className="text-primary">
              {"Please register."}
            </Link>
          </span>

          <Button
            disabled={loading}
            className="mt-8"
            type="submit"
            variants="destructive"
          >
            Login
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Login;
