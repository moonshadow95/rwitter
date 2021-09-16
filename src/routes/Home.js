/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import Rweet from "components/Rweet";

const Home = ({ userObj }) => {
  const [rweet, setRweet] = useState("");
  const [rweets, setRweets] = useState([]);
  useEffect(() => {
    dbService.collection("rweets").onSnapshot((snapshot) => {
      const rweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRweets(rweetArray);
    });
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService
      .collection("rweets")
      .add({ text: rweet, createdAt: Date.now(), creatorId: userObj.uid });
    setRweet("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setRweet(value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={rweet}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
          onChange={onChange}
        />
        <input type="submit" value="Rweet"></input>
      </form>
      <div>
        {rweets.map((rweet) => (
          <Rweet
            key={rweet.id}
            rweetObj={rweet}
            isOwner={rweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
