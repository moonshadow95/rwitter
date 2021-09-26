import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons";
import {
  faCameraRetro,
  faLongArrowAltLeft,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Rweet from "components/rweet/Rweet";
import { authService, dbService, storageService } from "fbase";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import styles from "./profile.module.css";

const Profile = ({ userObj, refreshUser }) => {
  const fileInput = useRef();
  const nameRef = useRef();
  const bioRef = useRef();
  const locationRef = useRef();
  const websiteRef = useRef();
  const [nameLength, setNameLength] = useState();
  const [bioLength, setBioLength] = useState();
  const [locationLength, setLocationLength] = useState();
  const [websiteLength, setWebsiteLength] = useState();
  const [attachment, setAttachment] = useState("");
  const [photoURL, setPhotoURL] = useState(userObj.photoURL);
  const [editing, setEditing] = useState(false);
  const [myRweets, setMyRweets] = useState([]);
  const [rweetLength, setRweetLength] = useState("0");
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const [userEmail] = useState(authService.currentUser.email);
  const onChange = (event) => {
    const {
      target: { value, name },
    } = event;
    if (name === "name") {
      setNewDisplayName(value);
    }
    switch (name) {
      case "name":
        setNameLength(value.length);
        break;
      case "bio":
        setBioLength(value.length);
        break;
      case "location":
        setLocationLength(value.length);
        break;
      case "website":
        setWebsiteLength(value.length);
        break;
      default:
        break;
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if (attachment) {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      const attachmentUrl = await response.ref.getDownloadURL();
      await userObj.updateProfile({
        photoURL: attachmentUrl,
      });
      refreshUser();
      setPhotoURL(userObj.photoURL);
      window.location.reload();
    }
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
      refreshUser();
      window.location.reload();
    }
  };

  const creationTime = authService.currentUser.metadata.creationTime.substr(
    8,
    8
  );
  const toggleEditing = () => {
    setEditing((prev) => !prev);
    onClearAttachment();
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
    if (!fileInput.current) {
      return;
    }
    fileInput.current.value = "";
  };
  const getMyRweets = async () => {
    const rweets = await dbService
      .collection("rweets")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createdAt")
      .get();
    setRweetLength(rweets.docs.map((doc) => doc.data()).length);
    const myRweetsArray = rweets.docs.map((doc) => doc.data());
    setMyRweets(myRweetsArray);
  };
  const getTextLength = (ref) => {
    if (!ref.current) {
      return;
    }
    const textLength = ref.current.value.length;
    switch (ref) {
      case nameRef:
        setNameLength(textLength);
        break;
      case bioRef:
        setBioLength(textLength);
        break;
      case locationRef:
        setLocationLength(textLength);
        break;
      case websiteRef:
        setWebsiteLength(textLength);
        break;
      default:
        break;
    }
  };
  const onBackClick = () => {
    window.location.reload();
  };
  useEffect(() => {
    getMyRweets();
    getTextLength(nameRef);
    getTextLength(bioRef);
    getTextLength(locationRef);
    getTextLength(websiteRef);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={styles.container}>
      {/* Edit Profile */}
      {editing && (
        <div className={styles.hover}>
          <div className={styles.hover__container}>
            <form className={styles.hover__form} onSubmit={onSubmit}>
              <div className={styles.hover__btn}>
                <span onClick={toggleEditing}>
                  <FontAwesomeIcon
                    className={styles.edit__cancel}
                    icon={faTimes}
                  />
                  Edit profile
                </span>
                <input id="editSave" type="submit" value="Save" />
              </div>
              <div className={styles.hover__photo}>
                <label htmlFor="attach-file">
                  <FontAwesomeIcon icon={faCameraRetro} size="1x" />
                </label>
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
                <div className={styles.attachment}>
                  {attachment ? (
                    <img src={attachment} alt="" />
                  ) : (
                    photoURL && <img src={photoURL} alt="" />
                  )}
                </div>
              </div>
              <ul className={styles.list}>
                <li className={styles.item}>
                  <div className={styles.content}>
                    <span className={styles.small}>Name</span>
                    <span>{nameLength || "0"} / 50</span>
                  </div>
                  <textarea
                    ref={nameRef}
                    name="name"
                    type="text"
                    placeholder="Display name"
                    onChange={onChange}
                    value={newDisplayName}
                    maxLength={50}
                    style={{ resize: "none" }}
                  />
                </li>
                <li className={styles.item}>
                  <div className={styles.content}>
                    <span className={styles.small}>Bio</span>
                    <span className={styles.length}>
                      {bioLength || "0"} / 160
                    </span>
                  </div>
                  <textarea
                    ref={bioRef}
                    name="bio"
                    type="text"
                    placeholder="Bio"
                    onChange={onChange}
                    maxLength={160}
                    style={{ resize: "none" }}
                  />
                </li>
                <li className={styles.item}>
                  <div className={styles.content}>
                    <span className={styles.small}>Location</span>
                    <span className={styles.length}>
                      {locationLength || "0"} / 30
                    </span>
                  </div>
                  <textarea
                    ref={locationRef}
                    name="location"
                    type="text"
                    placeholder="Location"
                    onChange={onChange}
                    maxLength={30}
                    style={{ resize: "none" }}
                  />
                </li>
                <li className={styles.item}>
                  <div className={styles.content}>
                    <span className={styles.small}>Website</span>
                    <span className={styles.length}>
                      {websiteLength || "0"} / 100
                    </span>
                  </div>
                  <textarea
                    ref={websiteRef}
                    name="website"
                    type="text"
                    placeholder="Website"
                    onChange={onChange}
                    maxLength={100}
                    style={{ resize: "none" }}
                  />
                </li>
              </ul>
            </form>
          </div>
        </div>
      )}
      <div className={styles.username__container}>
        <span className={styles.back} onClick={onBackClick}>
          <Link to="/">
            <FontAwesomeIcon id="backToHome" icon={faLongArrowAltLeft} />
          </Link>
        </span>
        <div className={styles.user}>
          <span className={styles.user__name}>{userObj.displayName}</span>
          <span className={styles.user__rweet}>
            {1 >= rweetLength
              ? `${rweetLength} Rweet`
              : `${rweetLength} Rweets`}
          </span>
        </div>
      </div>
      <div className={styles.user__info}>
        <div className={styles.photo}>
          <img src={photoURL} alt="" />
        </div>
        <div className={styles.user__text}>
          <span className={styles.strong}>{userObj.displayName}</span>
          <span className={styles.small}>{userEmail}</span>
          <span className={styles.small}>
            <FontAwesomeIcon icon={faCalendarAlt} /> Joined {creationTime}
          </span>
        </div>
        <div className={styles.edit__btn}>
          <span onClick={toggleEditing}>Edit profile</span>
        </div>
      </div>
      <div>
        <div className={styles.my}>
          <span>My Rweets</span>
        </div>
        <div>
          {myRweets.map((rweet, index) => (
            <Rweet
              key={index}
              rweetObj={rweet}
              isOwner={rweet.creatorId === userObj.uid}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
