import React, { useState } from "react";
import Page from "../components/Page";
import * as Md from "../md/full";
// import { Execute, isEmptyResult } from "@gooddata/react-components";
import { Execute } from "@gooddata/sdk-ui";
import { AttributeFilterButton, DateFilter, DateFilterHelpers } from "@gooddata/sdk-ui-filters";
import { newNegativeAttributeFilter, attributeDisplayFormRef } from "@gooddata/sdk-model";
import Cohort from "./Cohort";
import { NavLink, Redirect } from "react-router-dom";

const dateFrom = new Date();
dateFrom.setMonth(dateFrom.getMonth() - 1);

// const measureTitle = "";
const availableGranularities = ["GDC.time.date"];

const dateFilterOptions = {
    allTime: {
        localIdentifier: "ALL_TIME",
        type: "allTime",
        name: "",
        visible: true,
    },

    absoluteForm: {
        localIdentifier: "ABSOLUTE_FORM",
        type: "absoluteForm",
        from: dateFrom.toISOString().substr(0, 10), // 'YYYY-MM-DD'
        to: new Date().toISOString().substr(0, 10), // 'YYYY-MM-DD'
        name: "",
        visible: true,
    },

    relativeForm: {
        localIdentifier: "RELATIVE_FORM",
        type: "relativeForm",
        granularity: "GDC.time.month",
        from: undefined,
        to: undefined,
        name: "",
        visible: true,
    },

    relativePreset: {
        "GDC.time.date": [
            {
                from: -6,
                to: 0,
                granularity: "GDC.time.date",
                localIdentifier: "LAST_7_DAYS",
                type: "relativePreset",
                visible: true,
                name: "",
            },

            {
                from: -29,
                to: 0,
                granularity: "GDC.time.date",
                localIdentifier: "LAST_30_DAYS",
                type: "relativePreset",
                visible: true,
                name: "",
            },

            {
                from: -89,
                to: 0,
                granularity: "GDC.time.date",
                localIdentifier: "LAST_90_DAYS",
                type: "relativePreset",
                visible: true,
                name: "",
            },
        ],

        "GDC.time.month": [
            {
                from: 0,
                to: 0,
                granularity: "GDC.time.month",
                localIdentifier: "THIS_MONTH",
                type: "relativePreset",
                visible: true,
                name: "",
            },

            {
                from: -1,
                to: -1,
                granularity: "GDC.time.month",
                localIdentifier: "LAST_MONTH",
                type: "relativePreset",
                visible: true,
                name: "",
            },

            {
                from: -11,
                to: 0,
                granularity: "GDC.time.month",
                localIdentifier: "LAST_12_MONTHS",
                type: "relativePreset",
                visible: true,
                name: "",
            },
        ],

        "GDC.time.quarter": [
            {
                from: 0,
                to: 0,
                granularity: "GDC.time.quarter",
                localIdentifier: "THIS_QUARTER",
                type: "relativePreset",
                visible: true,
                name: "",
            },

            {
                from: -1,
                to: -1,
                granularity: "GDC.time.quarter",
                localIdentifier: "LAST_QUARTER",
                type: "relativePreset",
                visible: true,
                name: "",
            },

            {
                from: -3,
                to: 0,
                granularity: "GDC.time.quarter",
                localIdentifier: "LAST_4_QUARTERS",
                type: "relativePreset",
                visible: true,
                name: "",
            },
        ],
    },
};

const Sms = () => {
    const [filter, setFilter] = useState(
        newNegativeAttributeFilter(attributeDisplayFormRef(Md.Name_1), { uris: [] }),
    );

    const [filterDate, setFilterDate] = useState({
        selectedFilterOption: dateFilterOptions.allTime,
        excludeCurrentPeriod: false,
    });

    const onApply = (selectedFilterOption, excludeCurrentPeriod) => {
        setFilterDate({
            selectedFilterOption,
            excludeCurrentPeriod,
        });
    };

    const dateFilter = DateFilterHelpers.mapOptionToAfm(
        filterDate.selectedFilterOption,
        Md.DateDatasets.Date.ref,
        filterDate.excludeCurrentPeriod,
    );

    return (
        <Page>
            <div className="header-space">
                <span className="header-nav">
                    <NavLink className="link" to={"/"}>
                        Home
                    </NavLink>{" "}
                    {">"} Cohort Analysis
                </span>
            </div>
            <span style={{ color: "#464e56", fontSize: "24px", fontWeight: "bold", lineHeight: "32px" }}>
                SMS Engagement Cohort
            </span>
            <hr style={{ border: "1px solid #dde4eb" }} />
            <div style={{ display: "flex" }}>
                <div style={{ width: "200px", paddingRight: "20px" }}>
                    <DateFilter
                        excludeCurrentPeriod={filterDate.excludeCurrentPeriod}
                        selectedFilterOption={filterDate.selectedFilterOption}
                        filterOptions={dateFilterOptions}
                        availableGranularities={availableGranularities}
                        customFilterName="Selected date range"
                        dateFilterMode="active"
                        onApply={onApply}
                    />
                </div>
                <div style={{ width: "200px", paddingRight: "20px" }}>
                    <AttributeFilterButton filter={filter} onApply={setFilter} title="Campaigns" />
                </div>
            </div>
            <hr style={{ border: "1px solid #dde4eb" }} />
            <Execute
                seriesBy={[Md.Clicked.Sum]}
                slicesBy={[
                    Md.CampaignId_1,
                    Md.DatesDate.YyyyMmDd,
                    Md.Name_1,
                    Md.Delivered_2,
                    Md.DateDate.YyyyMmDd,
                ]}
                filters={dateFilter ? [dateFilter, filter] : [filter]}
            >
                {executionResult => {
                    if (executionResult.error) {
                        return <Redirect to="/login" />;
                    }
                    return (
                        <div>
                            {executionResult.result !== undefined ? (
                                <Cohort data={executionResult.result.dataView} />
                            ) : (
                                "Loading..."
                            )}
                        </div>
                    );
                }}
            </Execute>
        </Page>
    );
};

export default Sms;
