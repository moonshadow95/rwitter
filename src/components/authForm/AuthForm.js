import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faExchangeAlt } from "@fortawesome/free-solid-svg-icons";
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
            <FontAwesomeIcon
              className={styles.switch__icon}
              icon={faExchangeAlt}
            />
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
