import React from "react";

import styles from "./Footer.module.scss";

// const SocialItem = ({ link, title, imageUri }) => (
//     <a href={link} target="_blank" rel="noopener noreferrer" className={styles.FooterLink}>
//         <img src={imageUri} alt="" aria-hidden />
//         {title}
//     </a>
// );

const Footer = () => {
    return <footer className={styles.Footer}></footer>;
};

export default Footer;
