import { faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { authService, firebaseInstance } from "fbase";
import React from "react";
import styles from "./authSocial.module.css";

const AuthSocial = () => {
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    }
    if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    await authService.signInWithPopup(provider);
  };
  return (
    <div className={styles.container}>
      <div name="github" onClick={onSocialClick} className={styles.button}>
        <span>
          Continue with Github&nbsp;
          <FontAwesomeIcon icon={faGithub} />
        </span>
      </div>
      <div name="google" onClick={onSocialClick} className={styles.button}>
        <span>
          Continue with Google&nbsp;
          <FontAwesomeIcon icon={faGoogle} />
        </span>
      </div>
    </div>
  );
};

export default AuthSocial;
