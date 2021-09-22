import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import {
  faClipboardList,
  faEllipsisH,
  faHashtag,
  faHome,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  faBell,
  faBookmark,
  faEnvelope,
} from "@fortawesome/free-regular-svg-icons";

const Navigation = ({ userObj }) => (
  <nav>
    <ul className="navigation__container">
      <li>
        <Link to="/">
          <FontAwesomeIcon icon={faTwitter} size="3x" />
        </Link>
      </li>
      <li>
        <Link to="/">
          <FontAwesomeIcon icon={faHome} size="3x" />
        </Link>
      </li>
      <li>
        <Link to="/explore">
          <FontAwesomeIcon icon={faHashtag} size="3x" />
        </Link>
      </li>
      <li>
        <Link to="/notifications">
          <FontAwesomeIcon icon={faBell} size="3x" />
        </Link>
      </li>
      <li>
        <Link to="/messages">
          <FontAwesomeIcon icon={faEnvelope} size="3x" />
        </Link>
      </li>
      <li>
        <Link to="/bookmarks">
          <FontAwesomeIcon icon={faBookmark} size="3x" />
        </Link>
      </li>
      <li>
        <Link to="/lists">
          <FontAwesomeIcon icon={faClipboardList} size="3x" />
        </Link>
      </li>
      <li>
        <Link to="/profile">
          <FontAwesomeIcon icon={faUserAlt} size="3x" />
        </Link>
      </li>
      <li>
        <Link to="/more">
          <FontAwesomeIcon icon={faEllipsisH} size="3x" />
        </Link>
      </li>
    </ul>
  </nav>
);

export default Navigation;
