import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Logout from "components/logout/Logout";
import styles from "./navigation.module.css";

const Navigation = ({ userObj }) => {
  useEffect(() => {
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
  });
  return (
    <nav>
      {/* Menu */}
      <ul className={styles.list}>
        <li className={styles.list__item}>
          <span className={styles.item__text}>
            <Link to="/">
              <img
                className={styles.item__icon}
                src="https://img.icons8.com/ios/32/000000/twitter--v1.png"
                alt=""
              />
            </Link>
          </span>
        </li>
        <li className={styles.list__item}>
          <span className={styles.item__text}>
            <Link to="/">
              <img
                className={styles.item__icon}
                src="https://img.icons8.com/windows/28/000000/home.png"
                alt=""
              />
              <span>Home</span>
            </Link>
          </span>
        </li>
        <li className={styles.list__item}>
          <span className={styles.item__text} id="explore">
            <img
              className={styles.item__icon}
              src="https://img.icons8.com/ios/28/000000/hashtag.png"
              alt=""
            />
            <span>Explore</span>
          </span>
        </li>
        <li className={styles.list__item}>
          <span className={styles.item__text}>
            <Link to="/notifications">
              <img
                className={styles.item__icon}
                src="https://img.icons8.com/ios/28/000000/appointment-reminders--v1.png"
                alt=""
              />
              <span>Notifications</span>
            </Link>
          </span>
        </li>
        <li className={styles.list__item}>
          <span className={styles.item__text}>
            <Link to="/messages">
              <img
                className={styles.item__icon}
                src="https://img.icons8.com/fluency-systems-regular/28/000000/filled-message.png"
                alt=""
              />
              <span>Messages</span>
            </Link>
          </span>
        </li>
        <li className={styles.list__item}>
          <span className={styles.item__text}>
            <Link to="/bookmarks">
              <img
                className={styles.item__icon}
                src="https://img.icons8.com/small/28/000000/bookmark-ribbon.png"
                alt=""
              />
              <span>Bookmarks</span>
            </Link>
          </span>
        </li>
        <li className={styles.list__item}>
          <span className={styles.item__text}>
            <Link to="/lists">
              <img
                className={styles.item__icon}
                src="https://img.icons8.com/pastel-glyph/28/000000/file.png"
                alt=""
              />
              <span>Lists</span>
            </Link>
          </span>
        </li>
        <li className={styles.list__item}>
          <span className={styles.item__text}>
            <Link to="/profile">
              <img
                className={styles.item__icon}
                src="https://img.icons8.com/ios/28/000000/gender-neutral-user.png"
                alt=""
              />
              <span>Profile</span>
            </Link>
          </span>
        </li>
        <li className={styles.list__item}>
          <span className={styles.item__text}>
            <img
              className={styles.item__icon}
              src="https://img.icons8.com/material-outlined/28/000000/connection-status-off.png"
              alt=""
            />
            <span>More</span>
          </span>
        </li>
        {/* Rweet button */}
        <li className={styles.list__item}>
          <div className={styles.rweet_btn}>
            <span id="rweetBtn">Rweet</span>
          </div>
        </li>
      </ul>
      {/* Logout */}
      <div>
        <Logout
          photoURL={userObj?.photoURL}
          displayName={userObj?.displayName}
        />
      </div>
      {/* More menu */}
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
};

export default Navigation;
