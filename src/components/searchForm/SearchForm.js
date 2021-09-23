import {
  faCheckCircle,
  faCog,
  faEllipsisH,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "components/footer/footer";
import React, { useState } from "react";

const SearchForm = (props) => {
  const [showMore, setShowMore] = useState(false);
  const toggleShowMore = () => {
    setShowMore((prev) => !prev);
  };
  return (
    <div>
      {/* search twitter */}
      <div>
        <form>
          <div>
            <FontAwesomeIcon icon={faSearch} />
            <input type="text" placeholder="Search Twitter" />
          </div>
        </form>
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
                <span>
                  노마드코더 <FontAwesomeIcon icon={faCheckCircle} />
                </span>
                <br />
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
                <span>
                  니꼬 <FontAwesomeIcon icon={faCheckCircle} />
                </span>
                <br />
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
                <span>
                  린 <FontAwesomeIcon icon={faCheckCircle} />
                </span>
                <br />
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
