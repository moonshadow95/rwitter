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
      creatorId: userObj.uid,
      hashtag: formatedHashtag,
      attachmentUrl,
    };
    await dbService.collection("rweets").add(rweetObj);
    setRweet("");
    setAttachment("");
  };
  const onRweetChange = (event) => {
    const {
      target,
      target: { value },
    } = event;
    setRweet(value);
    console.log(rweet);
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
  useEffect(() => {
    if (chosenEmoji) {
      setRweet((prev) => prev + chosenEmoji.emoji);
    }
  }, [chosenEmoji]);
  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <div>
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
                  <img
                    className={styles.upload__image}
                    src={attachment}
                    alt=""
                    style={{
                      backgroundImage: attachment,
                    }}
                  />
                  <div
                    onClick={onClearAttachment}
                    className={styles.remove__btn}
                  >
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
      </div>
      <div>
        <label htmlFor="attach-file">
          <img
            src="https://img.icons8.com/fluency-systems-regular/24/000000/image.png"
            alt=""
          />
        </label>
        <img
          src="https://img.icons8.com/windows/24/000000/poll-horizontal.png"
          alt=""
        />
        <span onClick={onEmojiToggleClick}>
          {!emojiToggle ? (
            <img
              src="https://img.icons8.com/ios-glyphs/24/000000/happy--v2.png"
              alt=""
            />
          ) : (
            <img
              src="https://img.icons8.com/material-outlined/24/000000/close-window.png"
              alt=""
            />
          )}
        </span>
        <img src="https://img.icons8.com/windows/24/000000/gif.png" alt="" />
        <img
          src="https://img.icons8.com/material-outlined/24/000000/overtime.png"
          alt=""
        />
        <input type="submit" value="Rweet" />
      </div>
      {emojiToggle && (
        <div>
          <Picker onEmojiClick={onEmojiClick} />
        </div>
      )}
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
