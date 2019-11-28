import React, { Component } from "react";
import "./Home.css";
import '../../main.css';

export default class Home extends Component {
  render() {
    return (
      <div className="sl--homepage--heroimage">
        <div className="sl--homepage--backgroundgradient">
        <div className="container">
        <div className="sl--homepage--text">
          <div> <h4>ScotLAN #7!</h4> </div>
          <h3>March 6th - 8th 2019</h3>
          <p> Scotland's <strong>newest</strong> and <i>(maybe)</i> <strong>biggest</strong> community run LAN event </p>
          <p className=""><a className="btn btn-lg btn-secondary sl-btn sl-btn--secondary" href="/Product/Event/ScotLAN%20Event%206" role="button">Buy Tickets  </a></p>
          </div>
        </div>
        </div>
      </div>
    );
  }
}
