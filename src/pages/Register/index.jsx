import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRef, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { register } from "@/services/Auth";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Register = () => {
  const nameRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const emailRef = useRef();
  const { toast } = useToast();
  const navigate = useNavigate();
  let user = useSelector((state) => state.auth);

  const registerMutaion = useMutation({
    mutationFn: ({ name, email, username, password }) => {
      return register({ name, email, username, password });
    },
  });

  const registerHandle = (event) => {
    event.preventDefault();
    if (confirmPasswordRef.current?.value != passwordRef.current?.value) {
      toast({ title: "Please confirm password again!" });
      return;
    }
    registerMutaion
      .mutateAsync({
        name: nameRef.current.value,
        email: emailRef.current.value,
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      })
      .then((res) => {
        if (res?.status >= 400) {
          toast({ title: `User or email exists !!!` });
          registerMutaion.reset();
          return;
        }
        toast({ title: "Register succesfully !!!" });
        navigate("/login");
      });
  };

  useEffect(() => {
    if (user.access) {
      navigate("/policies");
    }
  });

  return (
    <section className="bg-gradient-to-r from-rose-100 to-teal-100 dark:from-slate-800 dark:to-blue-900 w-full h-screen">
      <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-primary-foreground p-8 lg:p-12 rounded-lg">
        <form className="flex flex-col gap-2" onSubmit={registerHandle}>
          <h1 className="font-bold text-2xl md:text-3xl">
            Welcome to Fujichat
          </h1>
          <h2 className="text-lg text-secondary-foreground/50">
            Register for new user
          </h2>

          <Input
            type="text"
            id="name"
            ref={nameRef}
            placeholder="Name"
            className="min-w-[250px] md:min-w-[350px] mt-3"
            autoComplete="username"
            required
          />

          <Input
            type="text"
            id="email"
            ref={emailRef}
            placeholder="Email"
            className="min-w-[250px] md:min-w-[350px] mt-3"
            autoComplete="username"
            required
          />

          <Input
            type="text"
            id="username"
            ref={usernameRef}
            placeholder="Username"
            className="min-w-[250px] md:min-w-[350px] mt-3"
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

          <Input
            type="password"
            id="confirm-password"
            ref={confirmPasswordRef}
            placeholder="Confirm password"
            className="min-w-[250px] md:min-w-[350px] mt-3"
            autoComplete="current-password"
            required
          />
          <span className="text-xs text-primary/70">
            {"Already have account. "}{" "}
            <Link to={"/login"} className="text-primary">
              {"Please login."}
            </Link>
          </span>

          <Button
            disabled={registerMutaion.isLoading}
            className="mt-8"
            type="submit"
            variants="destructive"
          >
            Register
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Register;
