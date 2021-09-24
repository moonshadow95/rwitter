import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styles from "./footer.module.css";

const Footer = (props) => (
  <footer className={styles.footer}>
    <span>Terms of Service</span>
    <span>Privacy Policy</span>
    <span>Cookie Policy</span>
    <span>Ads info</span>
    <span id="more_btn">
      More <FontAwesomeIcon icon={faEllipsisH} />
    </span>
    <span>&copy; {new Date().getFullYear()} Rwitter, Jong.</span>
    <ul className={styles.more}>
      <li>About</li>
      <li>Status</li>
      <li>Rwitter for Business</li>
      <li>Developers</li>
    </ul>
  </footer>
);

export default Footer;
