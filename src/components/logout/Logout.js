import { faCheck, faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { authService } from "fbase";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import styles from "./logout.module.css";

const Logout = ({ photoURL, displayName }) => {
  const [isPopup, setIsPopup] = useState(false);
  const [profileUserObj, setProfileUserObj] = useState({});
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };
  const getUserObj = () => {
    setProfileUserObj(authService.currentUser);
  };
  useEffect(() => {
    const logoutBtn = document.getElementById("logoutBtn");
    const popup = document.getElementById("popup");
    logoutBtn.addEventListener("click", () => {
      if (!isPopup) {
        popup.style.opacity = "1";
        popup.style.pointerEvents = "auto";
        setIsPopup(true);
      } else {
        popup.style.opacity = "0";
        popup.style.pointerEvents = "none";
        setIsPopup(false);
      }
    });
    getUserObj();
  }, [isPopup]);
  return (
    <div className={styles.container}>
      <div id="logoutBtn" className={styles.btn}>
        <div className={styles.top}></div>
        <div className={styles.right}></div>
        <div className={styles.bottom}></div>
        <div className={styles.left}></div>
        <img
          className={styles.avatar}
          src={photoURL || profileUserObj.photoURL}
          alt=""
        />
        <div className={styles.userinfo}>
          <span className={styles.username}>
            {displayName || profileUserObj.displayName || "Anonymous User"}
          </span>
          <span className={styles.email}>{authService.currentUser.email}</span>
        </div>
        <FontAwesomeIcon className={styles.ellipsis} icon={faEllipsisH} />
      </div>
      <div id="popup" className={styles.popup}>
        <div className={styles.btn}>
          <img
            className={styles.avatar}
            src={photoURL || profileUserObj.photoURL}
            alt=""
          />
          <div className={styles.userinfo}>
            <span className={styles.username}>
              {displayName || profileUserObj.displayName || "Anonymous User"}
            </span>
            <span className={styles.email}>
              {authService.currentUser.email}
            </span>
          </div>
          <FontAwesomeIcon icon={faCheck} />
        </div>
        <div className={styles.logout__btn}>
          <span>Add an existing account</span>
        </div>
        <div className={styles.logout__btn} onClick={onLogOutClick}>
          <span>
            Log out&nbsp;
            {displayName || profileUserObj.displayName || "Anonymous User"}
          </span>
        </div>
        <div className={styles.square}></div>
      </div>
    </div>
  );
};
export default Logout;
