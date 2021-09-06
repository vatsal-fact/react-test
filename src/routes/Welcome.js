import React from "react";
import { Link } from "react-router-dom";

import Page from "../components/Page";
import Card from "../components/Card";

const Welcome = () => {
    return (
        <Page>
            <span
                style={{
                    color: "#464e56",
                    fontSize: "22px",
                    fontWeight: "bold",
                    lineHeight: "32px",
                }}
            >
                Fan Maturity Model
            </span>
            <hr style={{ border: "1px solid #dde4eb" }} />
            <div className="cards" style={{ paddingBottom: "50px" }}>
                <Link style={{ textDecoration: "none" }} to="/dashboard/executive">
                    <Card title="Executive View"></Card>
                </Link>
                <Link style={{ textDecoration: "none" }} to="/dashboard/maturity">
                    <Card title="Maturity Segment"></Card>
                </Link>
            </div>
            <span
                style={{
                    color: "#464e56",
                    fontSize: "22px",
                    fontWeight: "bold",
                    lineHeight: "32px",
                }}
            >
                Cohort Analysis
            </span>
            <hr style={{ border: "1px solid #dde4eb" }} />
            <div className="cards">
                <Link style={{ textDecoration: "none" }} to="/cohort/email">
                    <Card title="Email Engagement Cohort"></Card>
                </Link>
                <Link style={{ textDecoration: "none" }} to="/cohort/sms">
                    <Card title="SMS Engagement Cohort"></Card>
                </Link>
                <Link style={{ textDecoration: "none" }} to="/cohort/mobilepush">
                    <Card title="Mobile Push Engagement Cohort"></Card>
                </Link>
            </div>
        </Page>
    );
};

export default Welcome;
