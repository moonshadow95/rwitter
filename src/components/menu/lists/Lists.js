import React from "react";

const Lists = (props) => (
  <div>
    <div>
      <span>Pinned Lists</span>
      <small>
        Nothing to see here yet — pin your favorite Lists to access them
        quickly.
      </small>
    </div>
    <div>
      <span>Discover new Lists</span>
      <ul>
        <li>
          <div>
            <img
              src="https://img.icons8.com/ios/50/000000/document--v1.png"
              alt=""
            />
            <div>
              <span>코코아톡 클론코딩</span>
              <div>
                <img src="/image/nomadcoders.svg" alt="" />
                <span>nomadcoders</span>
                <small>@nico</small>
              </div>
            </div>
            <div>
              <span>Follow</span>
            </div>
          </div>
        </li>
        <li>
          <div>
            <img
              src="https://img.icons8.com/ios/50/000000/document--v1.png"
              alt=""
            />
            <div>
              <span>노마드 코인</span>
              <div>
                <img src="/image/nomadcoders.svg" alt="" />
                <span>nomadcoders</span>
                <small>@nico</small>
              </div>
            </div>
            <div>
              <span>Follow</span>
            </div>
          </div>
        </li>
        <li>
          <div>
            <img
              src="https://img.icons8.com/ios/50/000000/document--v1.png"
              alt=""
            />
            <div>
              <span>트위터 클론코딩</span>
              <div>
                <img src="/image/nomadcoders.svg" alt="" />
                <span>nomadcoders</span>
                <small>@nico</small>
              </div>
            </div>
            <div>
              <span>Follow</span>
            </div>
          </div>
        </li>
        <li>
          <span>Show more</span>
        </li>
      </ul>
    </div>
    <div>
      <span>Your Lists</span>
      <small>
        You haven't created or followed any Lists. When you do, they'll show up
        here.
      </small>
    </div>
  </div>
);

export default Lists;
