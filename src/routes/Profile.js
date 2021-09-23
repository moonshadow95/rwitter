import {
  faCalendarAlt,
  faUserCircle,
} from "@fortawesome/free-regular-svg-icons";
import {
  faCameraRetro,
  faLongArrowAltLeft,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navigation from "components/navigator/Navigation";
import Rweet from "components/rweet/Rweet";
import SearchForm from "components/searchForm/SearchForm";
import { authService, dbService } from "fbase";
import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

const Profile = ({ userObj, refreshUser }) => {
  const history = useHistory();
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
  const [editing, setEditing] = useState(false);
  const [myRweets, setMyRweets] = useState([]);
  const [rweetLength, setRweetLength] = useState("0");
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const [userEmail] = useState(authService.currentUser.email);
  const [avatarUrl, setAvatarUrl] = useState(authService.currentUser.photoURL);
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };
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
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
      refreshUser();
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
  useEffect(() => {
    getMyRweets();
    getTextLength(nameRef);
    getTextLength(bioRef);
    getTextLength(locationRef);
    getTextLength(websiteRef);
  }, []);
  return (
    <>
      <Navigation />
      {/* Edit Profile */}
      {editing && (
        <div>
          <div>
            <form onSubmit={onSubmit}>
              <div>
                <span onClick={toggleEditing}>
                  <FontAwesomeIcon icon={faTimes} />
                  Edit profile
                </span>
                <input type="submit" value="Save" />
              </div>
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
              {attachment ? (
                <img src={attachment} alt="" />
              ) : (
                <FontAwesomeIcon icon={faUserCircle} size="9x" />
              )}
              <ul>
                <li>
                  <div>
                    <span>Name</span>
                    <span>{nameLength} / 50</span>
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
                <li>
                  <div>
                    <span>Bio</span>
                    <span>{bioLength} / 160</span>
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
                <li>
                  <div>
                    <span>Location</span>
                    <span>{locationLength} / 30</span>
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
                <li>
                  <div>
                    <span>Website</span>
                    <span>{websiteLength} / 100</span>
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
      <div>
        <Link to="/">
          <FontAwesomeIcon icon={faLongArrowAltLeft} />
        </Link>
        <div>
          <span>{userObj.displayName}</span>
          <br />
          <span>{rweetLength} Rweets</span>
        </div>
      </div>
      <div>
        <div>
          {avatarUrl ? (
            <img src={avatarUrl} alt="" />
          ) : (
            <FontAwesomeIcon icon={faUserCircle} size="9x" />
          )}
          <div>
            <button onClick={toggleEditing}>Edit profile</button>
          </div>
        </div>
        <br />
        <span>{userObj.displayName}</span>
        <br />
        <span>{userEmail}</span>
        <br />
        <span>
          <FontAwesomeIcon icon={faCalendarAlt} /> Joined {creationTime}
        </span>
      </div>
      <div>
        <div>
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
      <SearchForm />
      {/* <button onClick={onLogOutClick}>Log Out</button> */}
    </>
  );
};
export default Profile;
