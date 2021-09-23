import React, { useEffect, useState } from "react";

const LocationDisplay = ({ userObj, refreshUser }) => {
  const [location, setLocation] = useState(window.location.hash);

  const getLocation = () => {
    switch (location) {
      case "#/explore":
        setLocation("Explore");
        break;
      case "#/notifications":
        setLocation("Notifications");
        break;
      case "#/messages":
        setLocation("Messages");
        break;
      case "#/bookmarks":
        setLocation("Bookmarks");
        break;
      case "#/lists":
        setLocation("Lists");
        break;
      default:
        setLocation("Home");
        break;
    }
  };
  useEffect(() => {
    getLocation();
  }, []);
  return <span>{location}</span>;
};

export default LocationDisplay;
