import React from "react";
import cx from "classnames";
import { NavLink } from "react-router-dom";

import styles from "./Header.module.scss";
import logo from "../../media/factoreal.png";

const Logo = () => {
    return (
        <NavLink to="/" className={cx(styles.Link, styles.Logo)}>
            {/* {appName} */}
            <img src={logo} alt="Factoreal" className={styles.LoginLogo} style={{ height: 45 }} />
        </NavLink>
    );
};

export default Logo;
