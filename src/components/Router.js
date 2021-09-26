import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Bookmarks from "./menu/bookmarks/Bookmarks";
import Lists from "./menu/lists/Lists";
import Messages from "./menu/messages/Messages";
import Notifications from "./menu/notifications/Notifications";
import Navigation from "./navigator/Navigation";
import SearchForm from "./searchForm/SearchForm";
import styles from "./router.module.css";
import LocationDisplay from "./locationDisplay/LocationDisplay";

const AppRouter = ({ isLoggedIn, userObj, refreshUser }) => {
  return (
    <Router>
      <Switch>
        <>
          {isLoggedIn ? (
            <div className={styles.container}>
              <div className={styles.nav__container}>
                <Navigation userObj={userObj} />
              </div>
              <div className={styles.main}>
                <LocationDisplay />
                <Route exact path="/">
                  <Home userObj={userObj} />
                </Route>
                <Route exact path="/profile">
                  <Profile userObj={userObj} refreshUser={refreshUser} />
                </Route>
              </div>
              <div className={styles.search__container}>
                <SearchForm />
              </div>
            </div>
          ) : (
            <>
              <Route>
                <Auth exact path="/" />
              </Route>
            </>
          )}
        </>
      </Switch>
    </Router>
  );
};

export default AppRouter;
