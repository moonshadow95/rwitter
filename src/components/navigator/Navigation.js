import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

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
            <img
              src="https://img.icons8.com/windows/32/000000/home.png"
              alt=""
            />
            <span>Home</span>
          </Link>
        </span>
      </li>
      <li>
        <span>
          <Link to="/explore">
            <img
              src="https://img.icons8.com/ios-filled/32/000000/hashtag.png"
              alt=""
            />
            <span>Explore</span>
          </Link>
        </span>
      </li>
      <li>
        <span>
          <Link to="/notifications">
            <img
              src="https://img.icons8.com/ios/32/000000/appointment-reminders--v1.png"
              alt=""
            />
            <span>Notifications</span>
          </Link>
        </span>
      </li>
      <li>
        <span>
          <Link to="/messages">
            <img
              src="https://img.icons8.com/fluency-systems-regular/32/000000/filled-message.png"
              alt=""
            />
            <span>Messages</span>
          </Link>
        </span>
      </li>
      <li>
        <span>
          <Link to="/bookmarks">
            <img
              src="https://img.icons8.com/material-outlined/32/000000/bookmark-ribbon--v1.png"
              alt=""
            />
            <span>Bookmarks</span>
          </Link>
        </span>
      </li>
      <li>
        <span>
          <Link to="/lists">
            <img
              src="https://img.icons8.com/pastel-glyph/32/000000/file.png"
              alt=""
            />
            <span>Lists</span>
          </Link>
        </span>
      </li>
      <li>
        <span>
          <Link to="/profile">
            <img
              src="https://img.icons8.com/material-outlined/32/000000/user--v1.png"
              alt=""
            />
            <span>Profile</span>
          </Link>
        </span>
      </li>
      <li>
        <span>
          <Link to="/more">
            <img
              src="https://img.icons8.com/material-outlined/32/000000/connection-status-off.png"
              alt=""
            />
            <span>More</span>
          </Link>
        </span>
      </li>
    </ul>
    <div>
      <span id="rweetBtn">Rweet</span>
    </div>
  </nav>
);

const rweetInput = document.getElementById("rweetInput");
const rweetBtn = document.getElementById("rweetBtn");
if (rweetInput && rweetBtn) {
  rweetBtn.addEventListener("click", () => {
    rweetInput.focus();
  });
}

export default Navigation;
