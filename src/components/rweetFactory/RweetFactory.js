import { dbService, storageService } from "fbase";
import { v4 as uuidv4 } from "uuid";
import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { formatHashtags } from "hashtagFormatter";
import Picker from "emoji-picker-react";
import LocationDisplay from "components/locationDisplay/LocationDisplay";

const RweetFactory = ({ userObj }) => {
  const [rweet, setRweet] = useState("");
  const [attachment, setAttachment] = useState("");
  const [hashtag, setHashtag] = useState("");
  const [emojiToggle, setEmojiToggle] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const fileInput = useRef();
  console.log(userObj);
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
      target: { value },
    } = event;
    setRweet(value);
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
    if (rweet) {
      setRweet((prev) => prev + chosenEmoji.emoji);
    } else {
      setRweet(chosenEmoji.emoji);
    }
  };
  const onEmojiToggleClick = () => {
    setEmojiToggle((prev) => !prev);
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <LocationDisplay />
        <div>
          <input
            id="rweetInput"
            value={rweet}
            onChange={onRweetChange}
            type="text"
            placeholder="What's happening?"
            maxLength={120}
          />
          <input
            type="text"
            value={hashtag}
            onChange={onHashtagChange}
            placeholder="Hashtag splits by ,"
            maxLength={100}
          />
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
      {attachment && (
        <div>
          <img
            src={attachment}
            alt=""
            style={{
              backgroundImage: attachment,
            }}
          />
          <div onClick={onClearAttachment}>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      )}
    </form>
  );
};

export default RweetFactory;
