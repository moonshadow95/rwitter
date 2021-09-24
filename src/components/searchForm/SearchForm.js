import { faCog, faEllipsisH, faTimes } from "@fortawesome/free-solid-svg-icons";
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
      <div>
        <form onSubmit={onChange}>
          <div>
            <img
              src="https://img.icons8.com/ios-glyphs/22/000000/search--v1.png"
              alt=""
            />
            <input
              id="search_input"
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
          <div>
            {searchedRweets.length === 0 ? (
              <span>Try searching for a keyword</span>
            ) : (
              <>
                {searchedRweets.map((rweet, index) => (
                  <Rweet key={index} rweetObj={rweet} />
                ))}
              </>
            )}
            <span onClick={onSearchOut}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </div>
        )}
      </div>
      {/* trends for you */}
      <div>
        <div>
          <span>Trends for you</span>
          <span>
            <FontAwesomeIcon icon={faCog} />
          </span>
        </div>
        <ul>
          <li>
            <div>
              <span>Trending in South Korea</span>
              <FontAwesomeIcon icon={faEllipsisH} />
            </div>
            <div>
              <span>노마드코더</span>
            </div>
            <div>
              <span>5,586 Tweets</span>
            </div>
          </li>
          <li>
            <div>
              <span>Trending in South Korea</span>
              <FontAwesomeIcon icon={faEllipsisH} />
            </div>
            <div>
              <span>니꼬</span>
            </div>
            <div>
              <span>4,485 Tweets</span>
            </div>
          </li>
          <li>
            <div>
              <span>Trending in South Korea</span>
              <FontAwesomeIcon icon={faEllipsisH} />
            </div>
            <div>
              <span>린</span>
            </div>
            <div>
              <span>4,485 Tweets</span>
            </div>
          </li>
          <li>
            <div>
              <span>Trending in South Korea</span>
              <FontAwesomeIcon icon={faEllipsisH} />
            </div>
            <div>
              <span>리액트</span>
            </div>
            <div>
              <span>4,316 Tweets</span>
            </div>
          </li>
          <li>
            <div>
              <span>Trending in South Korea</span>
              <FontAwesomeIcon icon={faEllipsisH} />
            </div>
            <div>
              <span>파이어베이스</span>
            </div>
            <div>
              <span>1,546 Tweets</span>
            </div>
          </li>
          {showMore && (
            <>
              <li>
                <div>
                  <span>Trending in South Korea</span>
                  <FontAwesomeIcon icon={faEllipsisH} />
                </div>
                <div>
                  <span>월요일 좋아</span>
                </div>
                <div>
                  <span>673 Tweets</span>
                </div>
              </li>
              <li>
                <div>
                  <span>Trending in South Korea</span>
                  <FontAwesomeIcon icon={faEllipsisH} />
                </div>
                <div>
                  <span>아두이노</span>
                </div>
                <div>
                  <span>895 Tweets</span>
                </div>
              </li>
              <li>
                <div>
                  <span>Trending in South Korea</span>
                  <FontAwesomeIcon icon={faEllipsisH} />
                </div>
                <div>
                  <span>자바스크립트</span>
                </div>
                <div>
                  <span>6,246 Tweets</span>
                </div>
              </li>
              <li>
                <div>
                  <span>Trending in South Korea</span>
                  <FontAwesomeIcon icon={faEllipsisH} />
                </div>
                <div>
                  <span>김치 좋아</span>
                </div>
                <div>
                  <span>5,441 Tweets</span>
                </div>
              </li>
              <li>
                <div>
                  <span>Trending in South Korea</span>
                  <FontAwesomeIcon icon={faEllipsisH} />
                </div>
                <div>
                  <span>감자 좋아</span>
                </div>
                <div>
                  <span>3,824 Tweets</span>
                </div>
              </li>
            </>
          )}
          {!showMore ? (
            <li>
              <div>
                <span onClick={toggleShowMore}>Show more</span>
              </div>
            </li>
          ) : (
            <li>
              <div>
                <span onClick={toggleShowMore}>Show less</span>
              </div>
            </li>
          )}
        </ul>
      </div>
      {/* Who to follow */}
      <div>
        <div>
          <span>Who to follow</span>
        </div>
        <ul>
          <li>
            <div>
              <div>
                <img src="/image/nomadcoders.svg" alt="" />
              </div>
              <div>
                <span>노마드코더</span>
                <img
                  src="https://img.icons8.com/material-outlined/18/000000/ok--v1.png"
                  alt=""
                />
                <span>@nomadcoders.co</span>
              </div>
              <div>
                <span>Follow</span>
              </div>
            </div>
          </li>
          <li>
            <div>
              <div>
                <img src="/image/nomadcoders.svg" alt="" />
              </div>
              <div>
                <span>니꼬</span>
                <img
                  src="https://img.icons8.com/material-outlined/18/000000/ok--v1.png"
                  alt=""
                />
                <span>@nico.</span>
              </div>
              <div>
                <span>Follow</span>
              </div>
            </div>
          </li>
          <li>
            <div>
              <div>
                <img src="/image/nomadcoders.svg" alt="" />
              </div>
              <div>
                <span>린</span>
                <img
                  src="https://img.icons8.com/material-outlined/18/000000/ok--v1.png"
                  alt=""
                />
                <span>@lynn.</span>
              </div>
              <div>
                <span>Follow</span>
              </div>
            </div>
          </li>
          <li>
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
