import React from "react";
import { login } from "../../services/Auth/index.js";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../redux/actions/authAction.js";
import { Button } from "../../components/ui/button.jsx";
import { Input } from "../../components/ui/input.tsx";
import "./index.css";

const Login = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.auth);
  const queryClient = useQueryClient();

  const loginHandle = (event) => {
    event.preventDefault();
    dispatch(
      loginAction({
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      })
    );
  };

  useEffect(() => {
    if (auth) {
      navigate("/policies");
      queryClient.invalidateQueries(["get-conversation"]);
    }
  });

  return (
    <section className="login-body">
      <div className="login-container">
        <form className="login-form" onSubmit={loginHandle}>
          <h1 className="login-form-title">Welcome to Fujichat</h1>
          <div className="wrap-input">
            <Input
              type="text"
              id="username"
              ref={usernameRef}
              placeholder="Username"
            />
          </div>
          <div className="wrap-input">
            <Input
              type="password"
              id="password"
              ref={passwordRef}
              placeholder="Password"
            />
          </div>

          <div className="container-login-form-btn">
            <Button className="login-form-btn" type="submit">
              Login
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
