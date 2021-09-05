import React from "react";
import cx from "classnames";
import { NavLink } from "react-router-dom";

import styles from "./Header.module.scss";

const Links = () => {
    return (
        <>
            {/* <NavLink
                to="/welcome"
                className={cx(styles.Link, "s-welcome-link")}
                activeClassName={styles.LinkActive}
            >
                Welcome
            </NavLink> */}
            <NavLink
                to={"/dashboard/executive"}
                className={styles.Link}
                activeClassName={styles.LinkActive}
                exact
            >
                Fan Maturity Model - I
            </NavLink>
            <NavLink
                to={"/dashboard/maturity"}
                className={styles.Link}
                activeClassName={styles.LinkActive}
                exact
            >
                Fan Maturity Model - II
            </NavLink>
            <NavLink
                to={"/cohort/email"}
                className={styles.Link}
                activeClassName={styles.LinkActive}
                exact
            >
                Email
            </NavLink>
            <NavLink
                to={"/cohort/sms"}
                className={styles.Link}
                activeClassName={styles.LinkActive}
                exact
            >
                Sms
            </NavLink>
        </>
    );
};

export default Links;
