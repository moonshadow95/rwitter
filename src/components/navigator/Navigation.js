import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import Logout from "components/logout/Logout";

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
        <span id="explore">
          <img
            src="https://img.icons8.com/ios-filled/32/000000/hashtag.png"
            alt=""
          />
          <span>Explore</span>
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
          <img
            src="https://img.icons8.com/material-outlined/32/000000/connection-status-off.png"
            alt=""
          />
          <span>More</span>
        </span>
      </li>
    </ul>
    <div>
      <span id="rweetBtn">Rweet</span>
    </div>
    <div>
      <Logout photoURL={userObj?.photoURL} displayName={userObj?.displayName} />
    </div>
    <div>
      <ul>
        <li>
          <img
            src="https://img.icons8.com/material-outlined/24/000000/speech-bubble--v1.png"
            alt=""
          />
          <span>Topics</span>
        </li>
        <li>
          <img
            src="https://img.icons8.com/small/24/000000/lightning-bolt.png"
            alt=""
          />
          <span>Moments</span>
        </li>
        <li>
          <img
            src="https://img.icons8.com/material-outlined/24/000000/news.png"
            alt=""
          />
          <span>Newsletters</span>
        </li>
        <li>
          <img
            src="https://img.icons8.com/windows/24/000000/shortcut.png"
            alt=""
          />
          <span>Rwitter Ads</span>
        </li>
        <li>
          <img
            src="https://img.icons8.com/windows/24/000000/poll-vertical.png"
            alt=""
          />
          <span>Analystics</span>
        </li>
        <li>
          <img
            src="https://img.icons8.com/ios/24/000000/settings--v1.png"
            alt=""
          />
          <span>Settings and privacy</span>
        </li>
        <li>
          <img
            src="https://img.icons8.com/ios/24/000000/ask-question.png"
            alt=""
          />
          <span>Help Center</span>
        </li>
        <li>
          <img
            src="https://img.icons8.com/windows/24/000000/paint.png"
            alt=""
          />
          <span>Display</span>
        </li>
        <li>
          <img src="https://img.icons8.com/ios/24/000000/pin-2.png" alt="" />
          <span>Keyboard shortcuts</span>
        </li>
      </ul>
    </div>
  </nav>
);

const rweetInput = document.getElementById("rweetInput");
const rweetBtn = document.getElementById("rweetBtn");
const searchInput = document.getElementById("search_input");
const explore = document.getElementById("explore");

if (rweetInput && rweetBtn) {
  rweetBtn.addEventListener("click", () => {
    rweetInput.focus();
  });
}

if (explore) {
  explore.addEventListener("click", () => {
    searchInput.focus();
  });
}
export default Navigation;
