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
    let provider = "";
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    await authService.signInWithPopup(provider);
  };
  return (
    <div className={styles.container}>
      <button name="github" onClick={onSocialClick} className={styles.button}>
        <span>
          Continue with Github&nbsp;
          <FontAwesomeIcon icon={faGithub} />
        </span>
      </button>
      <button name="google" onClick={onSocialClick} className={styles.button}>
        <span>
          Continue with Google&nbsp;
          <FontAwesomeIcon icon={faGoogle} />
        </span>
      </button>
    </div>
  );
};

export default AuthSocial;
