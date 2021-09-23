import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import Rweet from "components/rweet/Rweet";
import RweetFactory from "components/rweetFactory/RweetFactory";
import SearchForm from "components/searchForm/SearchForm";
import Navigation from "components/navigator/Navigation";

const Home = ({ userObj }) => {
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

  return (
    <div>
      <Navigation userObj={userObj} />
      <div>
        <RweetFactory userObj={userObj} />
        <div style={{ marginTop: 30 }}>
          {rweets.map((rweet) => (
            <Rweet
              key={rweet.id}
              rweetObj={rweet}
              isOwner={rweet.creatorId === userObj.uid}
            />
          ))}
        </div>
      </div>
      <SearchForm rweets={rweets} />
    </div>
  );
};

export default Home;
