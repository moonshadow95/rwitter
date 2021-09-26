import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logout from "components/logout/Logout";
import styles from "./navigation.module.css";

const Navigation = ({ userObj }) => {
  const [isMore, setIsMore] = useState(false);
  useEffect(() => {
    const moreBtn = document.getElementById("moreBtn");
    const moreMenu = document.getElementById("moreMenu");
    const rweetInput = document.getElementById("rweetInput");
    const rweetBtn = document.getElementById("rweetBtn");
    const searchInput = document.getElementById("search_input");
    const explore = document.getElementById("explore");
    moreBtn.addEventListener("click", () => {
      if (!isMore) {
        moreMenu.style.opacity = "1";
        moreMenu.style.pointerEvents = "auto";
        setIsMore(true);
      } else {
        moreMenu.style.opacity = "0";
        moreMenu.style.pointerEvents = "none";
        setIsMore(false);
      }
    });
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
    <nav className={styles.nav}>
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
              <span>
                Home
                <div className={styles.menu__hover}></div>
              </span>
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
            <span>
              Explore
              <div className={styles.menu__hover}></div>
            </span>
          </span>
        </li>
        <li className={`${styles.list__item} ${styles.incomplete}`}>
          <span className={styles.item__text}>
            <img
              className={styles.item__icon}
              src="https://img.icons8.com/ios/28/000000/appointment-reminders--v1.png"
              alt=""
            />
            <span>
              Notifications
              <div className={styles.menu__hover}></div>
            </span>
          </span>
        </li>
        <li className={`${styles.list__item} ${styles.incomplete}`}>
          <span className={styles.item__text}>
            <img
              className={styles.item__icon}
              src="https://img.icons8.com/fluency-systems-regular/28/000000/filled-message.png"
              alt=""
            />
            <span>
              Messages
              <div className={styles.menu__hover}></div>
            </span>
          </span>
        </li>
        <li className={`${styles.list__item} ${styles.incomplete}`}>
          <span className={styles.item__text}>
            <img
              className={styles.item__icon}
              src="https://img.icons8.com/small/28/000000/bookmark-ribbon.png"
              alt=""
            />
            <span>
              Bookmarks
              <div className={styles.menu__hover}></div>
            </span>
          </span>
        </li>
        <li className={`${styles.list__item} ${styles.incomplete}`}>
          <span className={styles.item__text}>
            <img
              className={styles.item__icon}
              src="https://img.icons8.com/pastel-glyph/28/000000/file.png"
              alt=""
            />
            <span>
              Lists
              <div className={styles.menu__hover}></div>
            </span>
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
              <span>
                Profile
                <div className={styles.menu__hover}></div>
              </span>
            </Link>
          </span>
        </li>
        <li id="moreBtn" className={`${styles.list__item} ${styles.more__btn}`}>
          <span className={styles.item__text}>
            <img
              className={styles.item__icon}
              src="https://img.icons8.com/material-outlined/28/000000/connection-status-off.png"
              alt=""
            />
            <span>
              More
              <div className={styles.menu__hover}></div>
            </span>
          </span>
          {/* More menu */}
          <div id="moreMenu" className={styles.more__container}>
            <ul className={styles.more__list}>
              <li className={styles.more__item}>
                <img
                  src="https://img.icons8.com/material-outlined/20/000000/speech-bubble--v1.png"
                  alt=""
                />
                <span>Topics</span>
              </li>
              <li className={styles.more__item}>
                <img
                  src="https://img.icons8.com/small/20/000000/lightning-bolt.png"
                  alt=""
                />
                <span>Moments</span>
              </li>
              <li className={styles.more__item}>
                <img
                  src="https://img.icons8.com/material-outlined/20/000000/news.png"
                  alt=""
                />
                <span>Newsletters</span>
              </li>
              <li className={styles.more__item}>
                <img
                  src="https://img.icons8.com/windows/20/000000/shortcut.png"
                  alt=""
                />
                <span>Rwitter Ads</span>
              </li>
              <li className={`${styles.more__item} ${styles.analystics}`}>
                <img
                  src="https://img.icons8.com/windows/20/000000/poll-vertical.png"
                  alt=""
                />
                <span>Analystics</span>
              </li>
              <li className={styles.more__item}>
                <img
                  src="https://img.icons8.com/ios/20/000000/settings--v1.png"
                  alt=""
                />
                <span>Settings and privacy</span>
              </li>
              <li className={styles.more__item}>
                <img
                  src="https://img.icons8.com/ios/20/000000/ask-question.png"
                  alt=""
                />
                <span>Help Center</span>
              </li>
              <li className={styles.more__item}>
                <img
                  src="https://img.icons8.com/windows/20/000000/paint.png"
                  alt=""
                />
                <span>Display</span>
              </li>
              <li className={styles.more__item}>
                <img
                  src="https://img.icons8.com/ios/20/000000/pin-2.png"
                  alt=""
                />
                <span>Keyboard shortcuts</span>
              </li>
            </ul>
          </div>
        </li>
        {/* Rweet button */}
        <li className={styles.list__item}>
          <div className={styles.rweet_btn}>
            <span id="rweetBtn">Rweet</span>
          </div>
        </li>
      </ul>
      {/* Logout */}
      <div className={styles.logout__btn}>
        <Logout
          photoURL={userObj?.photoURL}
          displayName={userObj?.displayName}
        />
      </div>
    </nav>
  );
};

export default Navigation;
