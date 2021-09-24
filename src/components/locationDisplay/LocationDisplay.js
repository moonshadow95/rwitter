import React, { useEffect, useState } from "react";
import styles from "./location.module.css";

const LocationDisplay = () => {
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
  });
  return (
    <div className={styles.container}>
      <span>{location}</span>
    </div>
  );
};

export default LocationDisplay;
