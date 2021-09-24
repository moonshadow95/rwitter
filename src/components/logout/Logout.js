import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { authService } from "fbase";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

const Logout = ({ photoURL, displayName }) => {
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
    getUserObj();
  });
  return (
    <>
      <div>
        <img src={photoURL || profileUserObj.photoURL} alt="" />
        <div>
          <span>
            {displayName || profileUserObj.displayName || "Anonymous User"}
          </span>
          <span>{authService.currentUser.email}</span>
        </div>
      </div>
      <div>
        <div>
          <img src={photoURL || profileUserObj.photoURL} alt="" />
          <div>
            <span>
              {displayName || profileUserObj.displayName || "Anonymous User"}
            </span>
            <span>{authService.currentUser.email}</span>
          </div>
          <div>
            <FontAwesomeIcon icon={faCheck} />
          </div>
        </div>
        <div>
          <span>Add an existing account</span>
        </div>
        <div onClick={onLogOutClick}>
          <span>
            Log out&nbsp;
            {displayName || profileUserObj.displayName || "Anonymous User"}
          </span>
        </div>
      </div>
    </>
  );
};
export default Logout;
