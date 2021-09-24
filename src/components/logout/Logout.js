import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Logout = ({ userObj }) => {
  return (
    <div>
      {false ? (
        <img src="" alt="" />
      ) : (
        <FontAwesomeIcon icon={faUserCircle} size="3x" />
      )}
      <div></div>
    </div>
  );
};
export default Logout;
