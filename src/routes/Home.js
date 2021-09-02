import React from "react";
import { InsightView, DashboardView } from "@gooddata/sdk-ui-ext";
import { Headline } from "@gooddata/sdk-ui-charts";
import "@gooddata/sdk-ui-ext/styles/css/main.css";
import Page from "../components/Page";
import * as Md from "../md/full";

const Home = () => {
    return (
        <Page>
            {/* <div className="Table" style={{ height: 300 }}>
                <InsightView insight={Md.Insights.FanSegments_1} />
            </div>
            <div className="Table" style={{ height: 300 }}>
                <InsightView insight={Md.Insights.FanMaturityTrend} />
            </div>
            <div className="Table" style={{ height: 300 }}>
                <InsightView insight={Md.Insights.FanEmail_1} />
            </div>
            <div className="Table" style={{ height: 300 }}>
                <InsightView insight={Md.Insights.FanSms} />
            </div> */}
            <div className="Table" style={{ height: 300 }}>
                <DashboardView dashboard={Md.Dashboards.ExecutiveView} />;
            </div>
        </Page>
    );
};

export default Home;
