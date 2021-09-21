import { authService, firebaseInstance } from "fbase";
import AuthForm from "components/authForm/AuthForm";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

const Auth = () => {
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
    <div className="authContainer">
      <FontAwesomeIcon icon={faTwitter} size="3x" />
      <AuthForm />
      <div className="authBtns">
        <button name="github" onClick={onSocialClick} className="authBtn">
          Continue with Github&nbsp;
          <FontAwesomeIcon icon={faGithub} />
        </button>
        <button name="google" onClick={onSocialClick} className="authBtn">
          Continue with Google&nbsp;
          <FontAwesomeIcon icon={faGoogle} />
        </button>
      </div>
    </div>
  );
};

export default Auth;
