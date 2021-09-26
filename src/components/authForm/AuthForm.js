import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { authService } from "fbase";
import React, { useState } from "react";
import styles from "./authform.module.css";
import AuthSocial from "./AuthSocial";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSumbit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        data = await authService.signInWithEmailAndPassword(email, password);
        console.log(data);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  const toggleAccount = () => {
    setNewAccount((prev) => !prev);
  };
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <img src="/image/login_bg.png" alt="" />
        <FontAwesomeIcon className={styles.icon} icon={faTwitter} />
      </div>
      <div className={styles.auth__container}>
        <div className={styles.title}>
          <FontAwesomeIcon className={styles.title__icon} icon={faTwitter} />
          <h1>What's happening now?</h1>
          <h2>Sign up for Twitter today.</h2>
        </div>
        <div className={styles.form__container}>
          <form className={styles.form} onSubmit={onSumbit}>
            <input
              className={styles.input}
              name="email"
              type="text"
              placeholder="Email"
              required
              value={email}
              onChange={onChange}
            />
            <input
              className={styles.input}
              name="password"
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={onChange}
            />
            <input
              className={styles.submit__btn}
              type="submit"
              value={newAccount ? "Create Account" : "Log In"}
            />
            {error && (
              <div className={styles.error}>
                <span>{error}</span>
              </div>
            )}
          </form>
          <span onClick={toggleAccount} className={styles.switch}>
            {!newAccount ? (
              <span className={styles.active}>Log In</span>
            ) : (
              <span>Log In</span>
            )}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="20"
              height="20"
              viewBox="0 0 172 172"
              style={{ fill: "#000000" }}
            >
              <g
                fill="none"
                fill-rule="nonzero"
                stroke="none"
                stroke-width="1"
                stroke-linecap="butt"
                stroke-linejoin="miter"
                stroke-miterlimit="10"
                stroke-dasharray=""
                stroke-dashoffset="0"
                font-family="none"
                font-weight="none"
                font-size="none"
                text-anchor="none"
                style={{ mixBlendMode: "normal" }}
              >
                <path d="M0,172v-172h172v172z" fill="none"></path>
                <g fill="#ffffff">
                  <path d="M142.70625,97.95938c-1.6125,-1.6125 -4.16563,-1.6125 -5.64375,0c-1.6125,1.6125 -1.6125,4.16562 0,5.64375l19.8875,20.02187h-108.575c-2.28438,0 -4.03125,1.74688 -4.03125,4.03125c0,2.28438 1.74687,4.03125 4.03125,4.03125h108.575l-20.02187,20.02187c-1.6125,1.6125 -1.6125,4.16563 0,5.64375c0.80625,0.80625 1.88125,1.20938 2.82187,1.20938c0.94062,0 2.01563,-0.40313 2.82188,-1.20938l26.875,-26.875c1.6125,-1.6125 1.6125,-4.16562 0,-5.64375zM127.79063,47.03125c0,-2.28438 -1.74687,-4.03125 -4.03125,-4.03125h-108.70937l20.02188,-20.02187c1.6125,-1.6125 1.6125,-4.16562 0,-5.64375c-1.6125,-1.6125 -4.16562,-1.6125 -5.64375,0l-26.875,26.875c-1.6125,1.6125 -1.6125,4.16562 0,5.64375l26.875,26.875c0.80625,0.80625 1.88125,1.20938 2.82188,1.20938c0.94063,0 2.01563,-0.40313 2.82187,-1.20938c1.6125,-1.6125 1.6125,-4.16562 0,-5.64375l-20.02188,-20.02188h108.575c2.28437,0 4.16562,-1.74687 4.16562,-4.03125z"></path>
                </g>
              </g>
            </svg>
            {!newAccount ? (
              <span>Create Account</span>
            ) : (
              <span className={styles.active}>Create Account</span>
            )}
          </span>
        </div>
        <AuthSocial />
      </div>
    </div>
  );
};

export default AuthForm;
