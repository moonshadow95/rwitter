import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Footer = (props) => (
  <footer>
    <span>Terms of Service</span>
    <span>Privacy Policy</span>
    <span>Cookie Policy</span>
    <span>Ads info</span>
    <span>
      More <FontAwesomeIcon icon={faEllipsisH} />
    </span>
    <span>&copy; {new Date().getFullYear()} Rwitter, Jong.</span>
  </footer>
);

export default Footer;