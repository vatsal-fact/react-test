import React, { Component, useState } from "react";
import { InsightView, DashboardView } from "@gooddata/sdk-ui-ext";
import { Headline } from "@gooddata/sdk-ui-charts";
import "@gooddata/sdk-ui-ext/styles/css/main.css";
import Page from "../components/Page";
import * as Md from "../md/full";
// import { Execute, isEmptyResult } from "@gooddata/react-components";
import { Execute, LoadingComponent, ErrorComponent } from "@gooddata/sdk-ui";
import "@gooddata/sdk-ui-filters/styles/css/main.css";
import "@gooddata/sdk-ui-charts/styles/css/main.css";
import {
    AttributeFilterButton,
    DateFilter,
    defaultDateFilterOptions,
    DateFilterHelpers,
} from "@gooddata/sdk-ui-filters";
import { newNegativeAttributeFilter, idRef, attributeDisplayFormRef } from "@gooddata/sdk-model";
import Cohort from "./Cohort";

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
        from: "2021-01-01",
        to: "2021-12-31",
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
                from: -14,
                to: 0,
                granularity: "GDC.time.date",
                localIdentifier: "LAST_15_DAYS",
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
        ],
    },
};

const Home = () => {
    // const [filter, setFilter] = useState(
    //     newNegativeAttributeFilter(attributeDisplayFormRef(Md.Name), { uris: [] }),
    // );

    // const [filterDate, setFilterDate] = useState({
    //     selectedFilterOption: dateFilterOptions.allTime,
    //     excludeCurrentPeriod: false,
    // });

    // const onApply = (selectedFilterOption, excludeCurrentPeriod) => {
    //     setFilterDate({
    //         selectedFilterOption,
    //         excludeCurrentPeriod,
    //     });
    // };

    // const dateFilter = DateFilterHelpers.mapOptionToAfm(
    //     filterDate.selectedFilterOption,
    //     Md.DateDatasets.CreatedAt.ref,
    //     filterDate.excludeCurrentPeriod,
    // );

    return (
        <Page>
            {/* <div></div>
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
            </div> */}

            <Execute
                seriesBy={[Md.ClickOrOpen.Sum]}
                slicesBy={[
                    Md.CampaignId,
                    Md.DatesDate.YyyyMmDd,
                    Md.Name,
                    Md.Delivered_1,
                    Md.DateDate.YyyyMmDd,
                ]}
            >
                {executionResult => {
                    console.log("executionResult");
                    console.log(executionResult);
                    if (executionResult.isLoading == false && executionResult.result != undefined) {
                        console.log("executionResult.result");
                        // this.saveData(executionResult.result, "campaignDetails");
                        // console.log(JSON.stringify(executionResult.result.dataView));
                        // console.log(
                        //     JSON.stringify(
                        //         executionResult.result
                        //             .data()
                        //             .series()
                        //             .toArray(),
                        //     ),
                        // );
                        console.log(JSON.stringify(executionResult.result.data()));
                    }
                    return (
                        <div>
                            {executionResult.result != undefined ? (
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

export default Home;
