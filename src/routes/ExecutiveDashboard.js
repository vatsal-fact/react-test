import React, { useState } from "react";
import { DashboardView } from "@gooddata/sdk-ui-ext";
import Page from "../components/Page";
import { idRef } from "@gooddata/sdk-model";
import { DateFilter, DateFilterHelpers } from "@gooddata/sdk-ui-filters";
import * as Md from "../md/full";
import { Redirect } from "react-router";
import { NavLink } from "react-router-dom";

const dateFrom = new Date();
dateFrom.setMonth(dateFrom.getMonth() - 1);

const availableGranularities = ["GDC.time.date", "GDC.time.month", "GDC.time.quarter", "GDC.time.year"];

const defaultDateFilterOptions = {
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

const style = { width: 300, paddingRight: "20px" };

const dashboardRef = idRef("aaD9G8VAf9tl");

const Dashboard = () => {
    const [filterDate, setDateFilter] = useState({
        selectedFilterOption: defaultDateFilterOptions.allTime,
        excludeCurrentPeriod: false,
    });

    const onApplyDateFilter = (selectedFilterOption, excludeCurrentPeriod) => {
        setDateFilter({
            selectedFilterOption,
            excludeCurrentPeriod,
        });
    };

    const dateFilter = DateFilterHelpers.mapOptionToAfm(
        filterDate.selectedFilterOption,
        Md.DateDatasets.Date.ref,
        filterDate.excludeCurrentPeriod,
    );

    const CustomError = ({ code, message, description, icon }) => {
        if (message !== "No data")
            return (
                <p>
                    {console.log(message)}
                    <Redirect to="/login" />
                </p>
            );
        else {
            return (
                <div className="info-label info-no-data">
                    <div className="info-label-icon gd-icon-filter info-no-data-icon"></div>
                    <div className="info-no-data-label">No data</div>
                    <div className="info-no-data-message">No data for your filter selection.</div>
                </div>
            );
        }
    };

    return (
        <Page>
            <div className="header-space">
                <span className="header-nav">
                    <NavLink className="link" to={"/"}>
                        Home
                    </NavLink>{" "}
                    {">"} Fan Maturity Model
                </span>
            </div>
            <span style={{ color: "#464e56", fontSize: "24px", fontWeight: "bold", lineHeight: "32px" }}>
                Executive View
            </span>
            <hr style={{ border: "1px solid #dde4eb" }} />
            <div style={{ display: "flex" }}>
                <div style={style}>
                    <DateFilter
                        excludeCurrentPeriod={filterDate.excludeCurrentPeriod}
                        selectedFilterOption={filterDate.selectedFilterOption}
                        filterOptions={defaultDateFilterOptions}
                        availableGranularities={availableGranularities}
                        customFilterName="Selected date"
                        dateFilterMode="active"
                        dateFormat="MM/dd/yyyy"
                        onApply={onApplyDateFilter}
                    />
                </div>
            </div>
            <hr style={{ border: "1px solid #dde4eb" }} />
            <DashboardView
                dashboard={dashboardRef}
                filters={dateFilter ? [dateFilter] : []}
                isReadOnly
                ErrorComponent={CustomError}
            />
        </Page>
    );
};

export default Dashboard;
