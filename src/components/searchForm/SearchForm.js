/* eslint-disable react/jsx-no-target-blank */
import {
  faCheck,
  faEllipsisH,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "components/footer/footer";
import { dbService } from "fbase";
import React, { useRef, useState } from "react";
import Rweet from "components/rweet/Rweet";
import styles from "./search.module.css";

const SearchForm = () => {
  const searchRef = useRef();
  const [showMore, setShowMore] = useState(false);
  const [searching, setSearching] = useState(false);
  const [searchedRweets, setSearchedRweets] = useState([]);
  const toggleShowMore = () => {
    setShowMore((prev) => !prev);
  };
  const getRweets = (keyword) => {
    dbService.collection("rweets").onSnapshot((snapshot) => {
      const rweetArray = snapshot.docs.map((doc) => ({ ...doc.data() }));
      rweetArray.forEach((rweetObj) => {
        const rweetKey = Object.keys(rweetObj).filter((key) => key === "text");
        const isMatch = (obj) => obj[rweetKey].includes(keyword);
        const matched = rweetArray.filter((rweet) => isMatch(rweet));
        setSearchedRweets(matched);
      });
    });
  };
  const onChange = (event) => {
    event.preventDefault();
    if (searchRef.current.value !== "") {
      const keyword = searchRef.current.value;
      getRweets(keyword);
    } else {
      setSearchedRweets([]);
    }
  };
  const onFocus = () => {
    setSearching(true);
  };
  const onSearchOut = () => {
    setSearching(false);
  };
  return (
    <div className={styles.container}>
      {/* search twitter */}
      <div className={styles.search__container}>
        <form onSubmit={onChange}>
          <div className={styles.search__form}>
            <img
              src="https://img.icons8.com/ios-glyphs/22/000000/search--v1.png"
              alt=""
            />
            <input
              id="search_input"
              className={styles.search__input}
              ref={searchRef}
              name="searhTerm"
              type="text"
              placeholder="Search Rwitter"
              onChange={onChange}
              onFocus={onFocus}
            />
          </div>
        </form>
        {searching && (
          <div className={styles.hover__container}>
            <div className={styles.hover__text}>
              <span>Try searching for a keyword</span>
              <span className={styles.search__cancel} onClick={onSearchOut}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </div>
            {searchedRweets.length !== 0 && (
              <div className={styles.result__container}>
                {searchedRweets.map((rweet, index) => (
                  <Rweet key={index} rweetObj={rweet} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      {/* trends for you */}
      <div className={styles.trend__container}>
        <div className={styles.title}>
          <span>Trends for you</span>
          <img
            src="https://img.icons8.com/ios/18/000000/settings--v1.png"
            alt=""
          />
        </div>
        <ul className={styles.list}>
          <li className={styles.item}>
            <a href="https://nomadcoders.co/" target="_blank">
              <div className={styles.small}>
                <span>Trending in South Korea</span>
                <FontAwesomeIcon icon={faEllipsisH} />
              </div>
              <div className={styles.strong}>
                <span>노마드코더</span>
              </div>
              <div className={styles.small}>
                <span>5,586 Tweets</span>
              </div>
            </a>
          </li>
          <li className={`${styles.item} ${styles.incomplete}`}>
            <div className={styles.small}>
              <span>Trending in South Korea</span>
              <FontAwesomeIcon icon={faEllipsisH} />
            </div>
            <div className={styles.strong}>
              <span>니꼬</span>
            </div>
            <div className={styles.small}>
              <span>4,485 Tweets</span>
            </div>
          </li>
          <li className={`${styles.item} ${styles.incomplete}`}>
            <div className={styles.small}>
              <span>Trending in South Korea</span>
              <FontAwesomeIcon icon={faEllipsisH} />
            </div>
            <div className={styles.strong}>
              <span>린</span>
            </div>
            <div className={styles.small}>
              <span>4,485 Tweets</span>
            </div>
          </li>
          <li className={styles.item}>
            <a href="https://nomadcoders.co/nwitter" target="_blank">
              <div className={styles.small}>
                <span>Trending in South Korea</span>
                <FontAwesomeIcon icon={faEllipsisH} />
              </div>
              <div className={styles.strong}>
                <span>리액트</span>
              </div>
              <div className={styles.small}>
                <span>4,316 Tweets</span>
              </div>
            </a>
          </li>
          <li className={styles.item}>
            <a href="https://nomadcoders.co/nwitter" target="_blank">
              <div className={styles.small}>
                <span>Trending in South Korea</span>
                <FontAwesomeIcon icon={faEllipsisH} />
              </div>
              <div className={styles.strong}>
                <span>파이어베이스</span>
              </div>
              <div className={styles.small}>
                <span>1,546 Tweets</span>
              </div>
            </a>
          </li>
          {showMore && (
            <>
              <li className={`${styles.item} ${styles.incomplete}`}>
                <div className={styles.small}>
                  <span>Trending in South Korea</span>
                  <FontAwesomeIcon icon={faEllipsisH} />
                </div>
                <div className={styles.strong}>
                  <span>월요일 좋아</span>
                </div>
                <div className={styles.small}>
                  <span>673 Tweets</span>
                </div>
              </li>
              <li className={styles.item}>
                <a
                  href="https://www.youtube.com/watch?v=3up-M863_2M&t=3s"
                  target="_blank"
                >
                  <div className={styles.small}>
                    <span>Trending in South Korea</span>
                    <FontAwesomeIcon icon={faEllipsisH} />
                  </div>
                  <div className={styles.strong}>
                    <span>아두이노</span>
                  </div>
                  <div className={styles.small}>
                    <span>895 Tweets</span>
                  </div>
                </a>
              </li>
              <li className={styles.item}>
                <a
                  href="https://nomadcoders.co/es6-once-and-for-all"
                  target="_blank"
                >
                  <div className={styles.small}>
                    <span>Trending in South Korea</span>
                    <FontAwesomeIcon icon={faEllipsisH} />
                  </div>
                  <div className={styles.strong}>
                    <span>자바스크립트</span>
                  </div>
                  <div className={styles.small}>
                    <span>6,246 Tweets</span>
                  </div>
                </a>
              </li>
              <li className={styles.item}>
                <a
                  href="https://namu.wiki/w/%EA%B9%80%EC%B9%98"
                  target="_blank"
                >
                  <div className={styles.small}>
                    <span>Trending in South Korea</span>
                    <FontAwesomeIcon icon={faEllipsisH} />
                  </div>
                  <div className={styles.strong}>
                    <span>김치 좋아</span>
                  </div>
                  <div className={styles.small}>
                    <span>5,441 Tweets</span>
                  </div>
                </a>
              </li>
              <li className={styles.item}>
                <a
                  href="https://namu.wiki/w/%EA%B0%90%EC%9E%90"
                  target="_blank"
                >
                  <div className={styles.small}>
                    <span>Trending in South Korea</span>
                    <FontAwesomeIcon icon={faEllipsisH} />
                  </div>
                  <div className={styles.strong}>
                    <span>감자 좋아</span>
                  </div>
                  <div className={styles.small}>
                    <span>3,824 Tweets</span>
                  </div>
                </a>
              </li>
            </>
          )}
          {!showMore ? (
            <li className={styles.item}>
              <div className={styles.showmore}>
                <span onClick={toggleShowMore}>Show more</span>
              </div>
            </li>
          ) : (
            <li className={styles.item}>
              <div className={styles.showmore}>
                <span onClick={toggleShowMore}>Show less</span>
              </div>
            </li>
          )}
        </ul>
      </div>
      {/* Who to follow */}
      <div className={styles.trend__container}>
        <div className={styles.title}>
          <span>Who to follow</span>
        </div>
        <ul className={styles.list}>
          <li className={styles.item}>
            <a href="https://nomadcoders.co/" target="_blank">
              <div className={styles.follow__container}>
                <div className={styles.follow__img}>
                  <img src="/image/nomadcoders.svg" alt="" />
                </div>
                <div className={styles.follow__content}>
                  <span className={styles.strong}>
                    노마드코더
                    <FontAwesomeIcon
                      className={styles.check}
                      icon={faCheck}
                      size="xs"
                    />
                  </span>
                  <span className={styles.small}>@nomadcoders.co</span>
                </div>
                <div className={styles.follow__btn}>
                  <span>Follow</span>
                </div>
              </div>
            </a>
          </li>
          <li className={`${styles.item} ${styles.incomplete}`}>
            <div className={styles.follow__container}>
              <div className={styles.follow__img}>
                <img src="/image/nomadcoders.svg" alt="" />
              </div>
              <div className={styles.follow__content}>
                <span className={styles.strong}>
                  니꼬
                  <FontAwesomeIcon
                    className={styles.check}
                    icon={faCheck}
                    size="xs"
                  />
                </span>
                <span className={styles.small}>@nico.</span>
              </div>
              <div className={styles.follow__btn}>
                <span>Follow</span>
              </div>
            </div>
          </li>
          <li className={`${styles.item} ${styles.incomplete}`}>
            <div className={styles.follow__container}>
              <div className={styles.follow__img}>
                <img src="/image/nomadcoders.svg" alt="" />
              </div>
              <div className={styles.follow__content}>
                <span className={styles.strong}>
                  린
                  <FontAwesomeIcon
                    className={styles.check}
                    icon={faCheck}
                    size="xs"
                  />
                </span>
                <span className={styles.small}>@lynn.</span>
              </div>
              <div className={styles.follow__btn}>
                <span>Follow</span>
              </div>
            </div>
          </li>
          <li className={`${styles.item} ${styles.incomplete}`}>
            <div>
              <span>Show more</span>
            </div>
          </li>
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default SearchForm;
