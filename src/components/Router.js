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

const AppRouter = ({ isLoggedIn, userObj, refreshUser }) => {
  return (
    <Router>
      <Switch>
        {isLoggedIn ? (
          <div>
            <Navigation userObj={userObj} />
            <Route exact path="/">
              <Home userObj={userObj} />
            </Route>
            <Route exact path="/notifications">
              <Notifications />
            </Route>
            <Route exact path="/messages">
              <Messages />
            </Route>
            <Route exact path="/bookmarks">
              <Bookmarks />
            </Route>
            <Route exact path="/lists">
              <Lists />
            </Route>
            <Route exact path="/profile">
              <Profile userObj={userObj} refreshUser={refreshUser} />
            </Route>
            <SearchForm />
          </div>
        ) : (
          <>
            <Route>
              <Auth exact path="/" />
            </Route>
          </>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;
