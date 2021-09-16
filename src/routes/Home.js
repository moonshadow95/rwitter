/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { dbService } from "fbase";

const Home = () => {
  const [rweet, setRweet] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("rweets").add({ rweet, createdAt: Date.now() });
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
    </div>
  );
};

export default Home;
