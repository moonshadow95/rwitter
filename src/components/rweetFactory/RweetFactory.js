import { dbService, storageService } from "fbase";
import { v4 as uuidv4 } from "uuid";
import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { formatHashtags } from "hashtagFormatter";
import { faFileImage, faSmile } from "@fortawesome/free-regular-svg-icons";
import Picker from "emoji-picker-react";

const RweetFactory = ({ userObj }) => {
  const rweetRef = useRef();
  const [rweet, setRweet] = useState("");
  const [attachment, setAttachment] = useState("");
  const [hashtag, setHashtag] = useState("");
  const [emojiToggle, setEmojiToggle] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState(null);
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
    setRweet((prev) => prev + emojiObject.emoji);
  };
  const onEmojiToggleClick = () => {
    setEmojiToggle((prev) => !prev);
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <input
          ref={rweetRef}
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
        <input type="submit" value="Rweet" />
      </div>
      <label htmlFor="attach-file">
        <FontAwesomeIcon icon={faFileImage} size="1x" />
      </label>
      <span onClick={onEmojiToggleClick}>
        {!emojiToggle ? (
          <FontAwesomeIcon icon={faSmile} />
        ) : (
          <FontAwesomeIcon icon={faTimes} />
        )}
      </span>
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
          opacity: 0,
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
