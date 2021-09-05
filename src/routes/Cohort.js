// @ts-nocheck
import React, { Component, useState } from "react";
import moment from "moment";
const _ = require("lodash");

export default class Cohort extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cohortData: [],
            timeInterval: "daily",
            noOfDays: 6,
            startDate: "",
            rowData: {},
            colData: {},
            showAbsolute: false,
            showCells: true,
        };
        this.handleAbsolue = this.handleAbsolue.bind(this);
        this.handleCells = this.handleCells.bind(this);
    }

    async xcomponentWillReceiveProps(nextProps) {
        // console.log("nextProps");
        await this.generateCohortData(nextProps);
    }

    async componentDidMount() {
        // console.log("props loaded");
        await this.generateCohortData(this.props);
    }

    async componentDidUpdate() {
        // console.log("Update");
        if (this.state.cohortData.length > 0) {
            let data = this.state.cohortData;
            let initialDate = new Date(
                moment(this.state.startDate).year(),
                moment(this.state.startDate).month(),
                moment(this.state.startDate).date(),
            );
            let container = document.getElementById("main-example");
            window.Cornelius.draw({
                labels: {
                    time: "Created Date", // Time
                    people: "Targeted", // People
                    weekOf: "", // Week Of
                },
                formatHeaderLabel: function(i) {
                    return `Day ${i - 1}`;
                },
                displayAbsoluteValues: this.state.showAbsolute,
                initialDate: initialDate,
                container: container,
                cohort: data,
                timeInterval: "daily",
                initialIntervalNumber: 0,
                drawEmptyCells: this.state.showCells,
                formatDailyLabel: (date, i) => {
                    return moment(date)
                        .add(i, "days")
                        .format("DD MMM YYYY");
                },
            });
        }
    }

    async generateCohortData(input) {
        let data = input.data;
        if (data.data && data.data.length > 0) {
            let rowData;
            let colData;
            let startDate = this.state.startDate;
            if (
                Object.keys(this.state.rowData).length === 0 &&
                Object.keys(this.state.colData).length === 0
            ) {
                rowData = [];
                colData = [];
                let length = data.data.length;
                for (let i = 0; i < length; i++) {
                    // console.log(data.data[i])
                    let item = {};
                    item.date = data.headerItems[0][1][i].attributeHeaderItem.name;
                    item.count = data.data[i].pop();
                    item.created = data.headerItems[0][4][i].attributeHeaderItem.name;
                    rowData.push(item);

                    let items = {};
                    items.name = data.headerItems[0][2][i].attributeHeaderItem.name;
                    items.delivered = data.headerItems[0][3][i].attributeHeaderItem.name;
                    items.created = data.headerItems[0][4][i].attributeHeaderItem.name;

                    colData.push(items);
                }

                startDate = colData[0].created;

                // remove duplicate keys
                colData = colData.filter(
                    (v, i, a) => a.findIndex(t => t.name === v.name && t.delivered === v.delivered) === i,
                );

                // sum of delivered over created date
                colData = Object.fromEntries(
                    colData.reduce(
                        (m, { created, delivered }) =>
                            m.set(created, (m.get(created) || 0) + parseInt(delivered)),
                        new Map(),
                    ),
                    ([created, delivered]) => ({ created, delivered }),
                );

                // group raw data by created date
                rowData = _.mapValues(_.groupBy(rowData, "created"), clist =>
                    clist.map(data => _.omit(data, "created")),
                );
            } else {
                rowData = this.state.rowData;
                colData = this.state.colData;
            }

            let days = getDates(colData, startDate, this.state.noOfDays);

            let result = [];
            let dates = Object.keys(days);

            for (let i = 0; i <= this.state.noOfDays; i++) {
                let temp = [];
                temp.push(days[dates[i]]);
                if (rowData[dates[i]]) {
                    let temp2 = rowData[dates[i]];
                    temp2 = Object.fromEntries(
                        temp2.reduce(
                            (m, { date, count }) => m.set(date, (m.get(date) || 0) + parseInt(count)),
                            new Map(),
                        ),
                        ([date, count]) => ({ date, count }),
                    );
                    let startDay = moment(startDate).add(i, "days");
                    for (let j = 0; j <= this.state.noOfDays - i; j++) {
                        if (temp2[moment(startDay).format("YYYY-MM-DD")]) {
                            temp.push(temp2[moment(startDay).format("YYYY-MM-DD")]);
                        } else {
                            temp.push(null);
                        }
                        startDay = moment(startDay).add(1, "days");
                    }
                }
                result.push(temp);
            }

            // console.log(JSON.stringify(result));
            this.setState({
                startDate: startDate,
                cohortData: result,
                rowData: rowData,
                colData: colData,
            });
        }
    }

    async handleClick(day) {
        await this.setState({ noOfDays: day });
        await this.generateCohortData(this.props);
    }

    handleAbsolue() {
        this.setState(prevState => ({
            showAbsolute: !prevState.showAbsolute,
        }));
    }

    handleCells() {
        this.setState(prevState => ({
            showCells: !prevState.showCells,
        }));
    }

    exportTableToCSV() {
        let filename = "Email-cohort.csv";
        // console.log("inside");
        let csv = [];
        let rows = document.querySelectorAll("table tr");

        for (let i = 0; i < rows.length; i++) {
            let row = [],
                cols = rows[i].querySelectorAll("td, th");

            for (let j = 0; j < cols.length; j++) row.push(cols[j].innerText);

            csv.push(row.join(","));
        }

        // Download CSV file
        this.downloadCSV(csv.join("\n"), filename);
    }

    downloadCSV(csv, filename) {
        let csvFile;
        let downloadLink;
        // CSV file
        csvFile = new Blob([csv], { type: "text/csv" });
        // Download link
        downloadLink = document.createElement("a");
        // File name
        downloadLink.download = filename;
        // Create a link to the file
        downloadLink.href = window.URL.createObjectURL(csvFile);
        // Hide download link
        downloadLink.style.display = "none";
        // Add the link to DOM
        document.body.appendChild(downloadLink);
        // Click download link
        downloadLink.click();
    }

    render() {
        return (
            <div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div>
                        <button className="button-class" onClick={e => this.handleClick(6)}>
                            7 days
                        </button>
                        <button className="button-class" onClick={e => this.handleClick(14)}>
                            15 days
                        </button>
                        <button className="button-class" onClick={e => this.handleClick(29)}>
                            30 days
                        </button>
                    </div>
                    <div>
                        <button className="button-class" onClick={this.handleAbsolue}>
                            {this.state.showAbsolute ? "Show %" : "Hide %"}
                        </button>
                        {/* <button className="button-class" onClick={this.handleCells}>
                            {this.state.showCells ? "Hide" : "Show"} Cells
                        </button> */}
                        <button className="button-class" onClick={e => this.exportTableToCSV()}>
                            Export
                        </button>
                    </div>
                </div>
                <div id="main-example"></div>
            </div>
        );
    }
}

function getDates(res, startDate, stopDays) {
    let currentDate = moment(startDate);
    let stopDate = moment(currentDate).add(stopDays, "days");
    let response = {};
    while (currentDate <= stopDate) {
        let temp = moment(currentDate).format("YYYY-MM-DD");
        if (res[temp]) {
            response[temp] = res[temp];
        } else {
            response[temp] = 0;
        }
        currentDate = moment(currentDate).add(1, "days");
    }
    return response;
}
