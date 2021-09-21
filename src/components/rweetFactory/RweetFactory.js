import { dbService, storageService } from "fbase";
import { v4 as uuidv4 } from "uuid";
import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { formatHashtags } from "hashtagFormatter";

const RweetFactory = ({ userObj }) => {
  const [rweet, setRweet] = useState("");
  const [attachment, setAttachment] = useState("");
  const [hashtag, setHashtag] = useState("");
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
    setAttachment(null);
    fileInput.current.value = null;
  };

  return (
    <form onSubmit={onSubmit} className="factoryForm">
      <div className="factoryInput__container">
        <input
          className="factoryInput__input"
          value={rweet}
          onChange={onRweetChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input
          type="text"
          value={hashtag}
          onChange={onHashtagChange}
          placeholder="Hashtag splits by ,"
          maxLength={100}
        />
        <input type="submit" value="&rarr;" className="factoryInput__arrow" />
      </div>
      <label htmlFor="attach-file" className="factoryInput__label">
        <span>Add photos</span>
        <FontAwesomeIcon icon={faPlus} />
      </label>
      <input
        id="attach-file"
        type="file"
        accept="image/*"
        onChange={onFileChange}
        style={{
          opacity: 0,
        }}
      />
      {attachment && (
        <div className="factoryForm__attachment">
          <img
            src={attachment}
            alt=""
            style={{
              backgroundImage: attachment,
            }}
          />
          <div className="factoryForm__clear" onClick={onClearAttachment}>
            <span>Remove</span>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      )}
    </form>
  );
};

export default RweetFactory;
