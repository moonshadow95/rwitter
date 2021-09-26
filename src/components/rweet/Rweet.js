import React, { useState } from "react";
import { authService, dbService, storageService } from "fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { formatHashtags } from "hashtagFormatter";
import styles from "./rweet.module.css";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const Rweet = ({ rweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newRweet, setNewRweet] = useState(rweetObj.text);
  const [newHashtag, setNewHashtag] = useState(rweetObj.hashtag);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure?");
    if (ok) {
      await dbService.doc(`rweets/${rweetObj.id}`).delete();
      if (rweetObj.attachmentUrl) {
        await storageService.refFromURL(rweetObj.attachmentUrl).delete();
      }
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onRweetChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewRweet(value);
  };
  const onHashtagChange = (event) => {
    const {
      target: { value },
    } = event;
    const newValue = formatHashtags(value);
    setNewHashtag(newValue);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`rweets/${rweetObj.id}`).update({ text: newRweet });
    await dbService
      .doc(`rweets/${rweetObj.id}`)
      .update({ hashtag: newHashtag });
    setEditing(false);
  };
  const displayedAt = (createdAt) => {
    const milliSeconds = new Date() - createdAt;
    const seconds = milliSeconds / 1000;
    if (seconds < 60) return `방금 전`;
    const minutes = seconds / 60;
    if (minutes < 60) return `${Math.floor(minutes)}분 전`;
    const hours = minutes / 60;
    if (hours < 24) return `${Math.floor(hours)}시간 전`;
    const days = hours / 24;
    if (days < 2) return `${Math.floor(days)}일 전`;
    if (days >= 2) {
      const dateObj = new Date(createdAt);
      const year = dateObj.getFullYear();
      const month = dateObj.getMonth() + 1;
      const date = dateObj.getDate();
      return `${year}년 ${month}월 ${date}일`;
    }
  };
  const displayDate = displayedAt(rweetObj.createdAt);

  const onLikeClick = async () => {
    if (rweetObj.like.length <= 0) {
      rweetObj.like.push(authService.currentUser.uid);
      await dbService
        .doc(`rweets/${rweetObj.id}`)
        .update({ like: rweetObj.like });
    } else {
      const isLiked = rweetObj.like.every(
        (uid) => uid === authService.currentUser.uid
      );
      if (!isLiked) {
        rweetObj.like.push(authService.currentUser.uid);
        await dbService
          .doc(`rweets/${rweetObj.id}`)
          .update({ like: rweetObj.like });
      }
    }
  };

  return (
    <div className="rweet">
      {editing ? (
        <div className={styles.container}>
          <div className={styles.creator__photo}>
            <img src={rweetObj.creatorPhoto} alt="" />
          </div>
          <div className={styles.inner__container}>
            <div className={styles.creator__info}>
              <span className={styles.username}>{rweetObj.creatorName}</span>
              <span className={styles.email}>{rweetObj.creatorEmail}</span>·
              <span className={styles.created}>{displayDate}</span>
            </div>
            <div className={styles.content}>
              <form onSubmit={onSubmit}>
                <textarea
                  className={styles.input__rweet}
                  type="text"
                  placeholder="Edit Rweet"
                  value={newRweet}
                  onChange={onRweetChange}
                  required
                  maxLength={120}
                />
                <input
                  className={styles.input__hashtag}
                  type="text"
                  value={newHashtag}
                  onChange={onHashtagChange}
                  placeholder="Edit Hashtags"
                  maxLength={30}
                />
                <span id="submitBtn" className={styles.submit__btn}>
                  <input
                    id="submitInput"
                    className={styles.submit__input}
                    type="submit"
                    value="Update Rweet"
                  />
                </span>
              </form>
            </div>
            <div
              className={`${styles.attachment__container} ${styles.edit__attachment}`}
            >
              {rweetObj.attachmentUrl && (
                <img src={rweetObj.attachmentUrl} alt="" />
              )}
            </div>
          </div>
          <span onClick={toggleEditing}>
            <span className={styles.cancel}>
              <FontAwesomeIcon icon={faTimes} />{" "}
            </span>
          </span>
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.creator__photo}>
            <img src={rweetObj.creatorPhoto} alt="" />
          </div>
          <div className={styles.inner__container}>
            <div className={styles.creator__info}>
              <span className={styles.username}>{rweetObj.creatorName}</span>
              <span className={styles.email}>{rweetObj.creatorEmail}</span>·
              <span className={styles.created}>{displayDate}</span>
            </div>
            <div className={styles.content}>
              <h4 className={styles.text}>{rweetObj.text}</h4>
              <ul className={styles.list}>
                {rweetObj.hashtag &&
                  rweetObj.hashtag.map((tag) => (
                    <li
                      className={styles.item}
                      key={rweetObj.hashtag.indexOf(tag)}
                    >
                      {tag}
                    </li>
                  ))}
              </ul>
            </div>
            <div className={styles.attachment__container}>
              {rweetObj.attachmentUrl && (
                <img src={rweetObj.attachmentUrl} alt="" />
              )}
            </div>
            <div className={styles.buttons}>
              <ul className={styles.button__list}>
                <li className={styles.button__item}>
                  <span className={`${styles.icon} ${styles.icon__incomplete}`}>
                    <img
                      src="https://img.icons8.com/material-outlined/20/000000/speech-bubble--v2.png"
                      alt=""
                    />
                  </span>
                </li>
                <li className={styles.button__item}>
                  <span className={`${styles.icon} ${styles.icon__incomplete}`}>
                    <img
                      src="https://img.icons8.com/material-sharp/20/000000/retweet.png"
                      alt=""
                    />
                  </span>
                </li>
                <li
                  className={`${styles.button__item} ${styles.like__container}`}
                  onClick={onLikeClick}
                >
                  <span className={`${styles.icon} ${styles.icon__incomplete}`}>
                    <img
                      src="https://img.icons8.com/material-outlined/20/000000/like--v1.png"
                      alt=""
                    />
                  </span>
                  <span className={styles.like}>{rweetObj.like.length}</span>
                </li>
                <li className={styles.button__item}>
                  <span className={`${styles.icon} ${styles.icon__incomplete}`}>
                    <img
                      src="https://img.icons8.com/pastel-glyph/20/000000/upload--v1.png"
                      alt=""
                    />
                  </span>
                </li>
              </ul>
            </div>
          </div>
          {isOwner && (
            <div className={styles.edit__container}>
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrashAlt} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faEdit} />
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Rweet;
