import { dbService, storageService } from "fbase";
import { v4 as uuidv4 } from "uuid";
import React, { useEffect, useRef, useState } from "react";
import { formatHashtags } from "hashtagFormatter";
import Picker from "emoji-picker-react";
import LocationDisplay from "components/locationDisplay/LocationDisplay";
import styles from "./rweetFactory.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const RweetFactory = ({ userObj }) => {
  const [rweet, setRweet] = useState("");
  const [attachment, setAttachment] = useState("");
  const [hashtag, setHashtag] = useState("");
  const [emojiToggle, setEmojiToggle] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState("");
  const fileInput = useRef();
  const onSubmit = async (event) => {
    let formatedHashtag;
    if (rweet === "") {
      return;
    }
    if (hashtag !== "") {
      formatedHashtag = formatHashtags(hashtag);
    }
    event.preventDefault();
    let attachmentUrl = "";
    if (attachment) {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }
    const rweetObj = {
      text: rweet,
      createdAt: Date.now(),
      creatorPhoto: userObj.photoURL,
      creatorName: userObj.displayName,
      creatorEmail: userObj.email,
      creatorId: userObj.uid,
      hashtag: formatedHashtag,
      attachmentUrl,
    };
    await dbService.collection("rweets").add(rweetObj);
    setRweet("");
    setHashtag("");
    setAttachment("");
    setChosenEmoji("");
    setEmojiToggle(false);
  };
  const onRweetChange = (event) => {
    const {
      target,
      target: { value },
    } = event;
    setRweet(value);
    target.style.height = "1px";
    target.style.height = `${target.scrollHeight + 25}px`;
  };
  const onHashtagChange = (event) => {
    const {
      target: { value },
    } = event;
    setHashtag(value);
  };
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    if (theFile) {
      reader.readAsDataURL(theFile);
      reader.onloadend = (finishedEvent) => {
        const {
          currentTarget: { result },
        } = finishedEvent;
        setAttachment(result);
      };
    }
  };
  const onClearAttachment = () => {
    setAttachment("");
    fileInput.current.value = "";
  };
  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };
  const onEmojiToggleClick = () => {
    setEmojiToggle((prev) => !prev);
  };
  console.log(attachment);
  useEffect(() => {
    if (chosenEmoji) {
      setRweet((prev) => prev + chosenEmoji.emoji);
    }
  }, [chosenEmoji]);
  useEffect(() => {
    const submitBtn = document.getElementById("submitBtn");
    const rweetInput = document.getElementById("rweetInput");
    const submitInput = document.getElementById("submitInput");

    if (rweetInput.value) {
      submitBtn.style.opacity = "1";
      submitBtn.style.cursor = "pointer";
      submitInput.style.opacity = "1";
      submitInput.style.cursor = "pointer";
    } else {
      submitBtn.style.opacity = "0.6";
      submitBtn.style.cursor = "auto";
      submitInput.style.opacity = "0.6";
      submitInput.style.cursor = "auto";
    }
  }, [rweet]);
  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <LocationDisplay />
      <div className={styles.outer__container}>
        <div className={styles.avatar}>
          <img src={userObj.photoURL} alt="" />
        </div>
        <div className={styles.input__container}>
          <div className={styles.inner__container}>
            <textarea
              id="rweetInput"
              className={styles.input__rweet}
              value={rweet}
              onChange={onRweetChange}
              type="text"
              placeholder="What's happening?"
              maxLength={120}
            />
            {attachment && (
              <div className={styles.attachment__container}>
                <img className={styles.upload__image} src={attachment} alt="" />
                <div onClick={onClearAttachment} className={styles.remove__btn}>
                  <FontAwesomeIcon icon={faTimes} />
                </div>
              </div>
            )}
          </div>
          <input
            type="text"
            className={styles.input__hashtag}
            value={hashtag}
            onChange={onHashtagChange}
            placeholder="Hashtag splits by comma"
            maxLength={30}
          />
        </div>
      </div>
      <div className={styles.icon__container}>
        <span className={styles.icon}>
          <label htmlFor="attach-file">
            <img
              src="https://img.icons8.com/fluency-systems-regular/24/000000/image.png"
              alt=""
            />
          </label>
        </span>
        <span className={`${styles.icon} ${styles.icon__incomplete}`}>
          <img src="https://img.icons8.com/windows/22/000000/gif.png" alt="" />
        </span>
        <span className={`${styles.icon} ${styles.icon__incomplete}`}>
          <img
            src="https://img.icons8.com/windows/24/000000/poll-horizontal.png"
            alt=""
          />
        </span>
        <span
          className={`${styles.icon} ${styles.emoji__btn}`}
          onClick={onEmojiToggleClick}
        >
          {!emojiToggle ? (
            <img
              src="https://img.icons8.com/ios-glyphs/22/000000/happy--v2.png"
              alt=""
            />
          ) : (
            <img
              src="https://img.icons8.com/material-outlined/22/000000/close-window.png"
              alt=""
            />
          )}
          {emojiToggle && (
            <div className={styles.emoji__picker}>
              <Picker onEmojiClick={onEmojiClick} />
            </div>
          )}
        </span>
        <span className={`${styles.icon} ${styles.icon__incomplete}`}>
          <img
            src="https://img.icons8.com/material-outlined/21/000000/overtime.png"
            alt=""
          />
        </span>
        <span id="submitBtn" className={styles.submit__btn}>
          <input
            id="submitInput"
            className={styles.submit__input}
            type="submit"
            value="Rweet"
          />
        </span>
      </div>

      <input
        ref={fileInput}
        id="attach-file"
        type="file"
        accept="image/*"
        onChange={onFileChange}
        style={{
          display: "none",
        }}
      />
    </form>
  );
};

export default RweetFactory;
