import React, { Component } from "react";

import "./Card.scss";

export default class Card extends Component {
    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <h2>{this.props.title}</h2>
                    <h5>{this.props.sub}</h5>
                </div>
            </div>
        );
    }
}
