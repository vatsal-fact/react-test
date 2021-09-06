import React, { Component, useState } from "react";
import { DashboardView, useDashboardPdfExporter } from "@gooddata/sdk-ui-ext";
import Page from "../components/Page";
import { idRef, newNegativeAttributeFilter, attributeDisplayFormRef } from "@gooddata/sdk-model";
import { AttributeFilterButton, DateFilter, DateFilterHelpers } from "@gooddata/sdk-ui-filters";
import * as Md from "../md/full";
import { Redirect } from "react-router-dom";

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

const dashboardRef = idRef("aawgd5nHeHBS");

const Dashboard = () => {
    const [filter, setFilter] = useState(
        newNegativeAttributeFilter(attributeDisplayFormRef(Md.Type_3), { uris: [] }),
    );

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

    const CustomError = ({ message }) => (
        <p>
            {console.log(message)}
            <Redirect to="/login" />
        </p>
    );

    return (
        <Page>
            <span style={{ color: "#464e56", fontSize: "24px", fontWeight: "bold", lineHeight: "32px" }}>
                Maturity Segment
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
                <div style={style}>
                    <AttributeFilterButton filter={filter} onApply={setFilter} title="Type" />
                </div>
            </div>
            <hr style={{ border: "1px solid #dde4eb" }} />
            <DashboardView
                dashboard={dashboardRef}
                filters={dateFilter ? [dateFilter, filter] : [filter]}
                isReadOnly
                ErrorComponent={CustomError}
            />
        </Page>
    );
};

export default Dashboard;
