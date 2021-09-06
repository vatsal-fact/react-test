import React from "react";

import styles from "./Footer.module.scss";

import githubUri from "../media/github-logo.png";
import stackOverflowUri from "../media/stack-overflow-logo.png";
import twitterUri from "../media/twitter-logo.png";
import npmUri from "../media/npm-logo.png";

const SocialItem = ({ link, title, imageUri }) => (
    <a href={link} target="_blank" rel="noopener noreferrer" className={styles.FooterLink}>
        <img src={imageUri} alt="" aria-hidden />
        {title}
    </a>
);

const Footer = () => {
    return <footer className={styles.Footer}></footer>;
};

export default Footer;
