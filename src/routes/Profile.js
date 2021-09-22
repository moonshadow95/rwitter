import {
  faCalendarAlt,
  faUserCircle,
} from "@fortawesome/free-regular-svg-icons";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Rweet from "components/rweet/Rweet";
import { authService, dbService } from "fbase";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

const Profile = ({ userObj, refreshUser }) => {
  const history = useHistory();
  const [myRweets, setMyRweets] = useState([]);
  const [rweetLenght, setRweetLenght] = useState("0");
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const [userEmail] = useState(authService.currentUser.email);
  const [avatarUrl, setAvatarUrl] = useState(authService.currentUser.photoURL);
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
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
  const getMyRweets = async () => {
    const rweets = await dbService
      .collection("rweets")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createdAt")
      .get();
    setRweetLenght(rweets.docs.map((doc) => doc.data()).length);
    const myRweetsArray = rweets.docs.map((doc) => doc.data());
    setMyRweets(myRweetsArray);
  };
  const creationTime = authService.currentUser.metadata.creationTime.substr(
    8,
    8
  );
  useEffect(() => {
    getMyRweets();
  }, []);
  return (
    <>
      <div>
        <Link to="/">
          <FontAwesomeIcon icon={faLongArrowAltLeft} />
        </Link>
        <div>
          <span>{userObj.displayName}</span>
          <br />
          <span>{rweetLenght} Rweets</span>
        </div>
      </div>
      <div>
        {avatarUrl ? (
          <img src={avatarUrl} alt="" />
        ) : (
          <FontAwesomeIcon icon={faUserCircle} size="9x" />
        )}
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
          {myRweets.map((rweet) => (
            <Rweet
              key={rweet.id}
              rweetObj={rweet}
              isOwner={rweet.creatorId === userObj.uid}
            />
          ))}
        </div>
      </div>
      {/* <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Display name"
          onChange={onChange}
          value={newDisplayName}
        />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button> */}
    </>
  );
};
export default Profile;
