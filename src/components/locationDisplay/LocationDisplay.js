import { useEffect, useState } from "react";
import styles from "./location.module.css";

const LocationDisplay = () => {
  const [url, setUrl] = useState();
  useEffect(() => {
    setUrl(window.location.hash);
    const nav = document.querySelector("nav");
    nav.addEventListener("click", () => {
      setTimeout(() => {
        setUrl(window.location.hash);
      });
    });
  }, []);
  return (
    <div className={styles.container}>
      <span>
        {url === "#/" && "Home"}
        {url === "#/profile" && "Profile"}
      </span>
    </div>
  );
};

export default LocationDisplay;
