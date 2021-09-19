import { authService, firebaseInstance } from "fbase";
import React from "react";

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
    <div>
      <div>
        <button name="github" onClick={onSocialClick}>
          Continue with Github
        </button>
        <button name="google" onClick={onSocialClick}>
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Auth;
