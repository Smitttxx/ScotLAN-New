import React, { Component } from "react";
import "./Home.css";
import '../../main.css';

export default class Home extends Component {
  render() {
    return (
      <div className="sl--homepage--heroimage">
        <div className="container">
        <div className="sl--homepage--text">
          <div> <h4>ScotLAN #5!</h4> </div>
          <h3>5th July - 7th July '19</h3>
          <p> Scotland's <strong>newest</strong> and <i>(maybe)</i> <strong>biggest</strong> community run LAN event </p>
          <p className=""><a className="btn btn-lg btn-primary" href="/Product/Event/ScotLAN%20Event%205" role="button">Buy Tickets Today</a></p>
        </div>
        </div>
      </div>
    );
  }
}
