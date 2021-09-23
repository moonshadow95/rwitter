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
        <span>
          <Link to="/">
            <FontAwesomeIcon icon={faTwitter} size="3x" />
          </Link>
        </span>
      </li>
      <li>
        <span>
          <Link to="/">
            <FontAwesomeIcon icon={faHome} size="3x" />
            <span>Home</span>
          </Link>
        </span>
      </li>
      <li>
        <span>
          <Link to="/explore">
            <FontAwesomeIcon icon={faHashtag} size="3x" />
            <span>Explore</span>
          </Link>
        </span>
      </li>
      <li>
        <span>
          <Link to="/notifications">
            <FontAwesomeIcon icon={faBell} size="3x" />
            <span>Notifications</span>
          </Link>
        </span>
      </li>
      <li>
        <span>
          <Link to="/messages">
            <FontAwesomeIcon icon={faEnvelope} size="3x" />
            <span>Messages</span>
          </Link>
        </span>
      </li>
      <li>
        <span>
          <Link to="/bookmarks">
            <FontAwesomeIcon icon={faBookmark} size="3x" />
            <span>Bookmarks</span>
          </Link>
        </span>
      </li>
      <li>
        <span>
          <Link to="/lists">
            <FontAwesomeIcon icon={faClipboardList} size="3x" />
            <span>Lists</span>
          </Link>
        </span>
      </li>
      <li>
        <span>
          <Link to="/profile">
            <FontAwesomeIcon icon={faUserAlt} size="3x" />
            <span>Profile</span>
          </Link>
        </span>
      </li>
      <li>
        <span>
          <Link to="/more">
            <FontAwesomeIcon icon={faEllipsisH} size="3x" />
            <span>More</span>
          </Link>
        </span>
      </li>
    </ul>
  </nav>
);

export default Navigation;
