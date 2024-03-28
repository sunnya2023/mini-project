import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updatePassword,
} from "firebase/auth";
import { auth } from "./Firebase";
import {
  Error,
  ForgotPassowrd,
  Form,
  Input,
  Switcher,
  Title,
  Wrapper,
} from "../components/Auth";
import GithubButton from "../components/GithubButton";

export default function CreateAccount() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (isLoading || email === "" || password === "") return;
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      if (!auth.currentUser?.emailVerified) throw setError("No verified");

      navigate("/");
    } catch (e) {
      //setError
      if (e instanceof FirebaseError) {
        // console.log(e.code, e.message);
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <Wrapper>
      <Title>Login to X</Title>
      <Form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          value={email}
          name="email"
          type="email"
          placeholder="Email"
          required
        />
        <Input
          onChange={onChange}
          name="password"
          value={password}
          placeholder="Password"
          type="password"
          required
        />
        <Input type="submit" value={isLoading ? "Loading..." : "Log in"} />
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}

      <ForgotPassowrd>
        <Link to="/reset-password">Forgot your password?</Link>
      </ForgotPassowrd>

      <Switcher>
        Dont have an account?
        <Link to="/create-account"> Create one &rarr; </Link>
      </Switcher>
      <GithubButton />
    </Wrapper>
  );
}
