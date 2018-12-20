import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import "./Home.css";
import '../../main.css';

export default class Home extends Component {
  render() {
    return (
      <div>
        <div id="myCarousel" className="carousel slide" data-ride="carousel">
        <ol className="carousel-indicators">
          <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
        </ol>
        <div className="carousel-inner" role="listbox">
          <div className="carousel-item active">
            <img className="first-slide" src="/Images/banner-photo.png" alt="First slide" />
            <div className="container">
              <div className="carousel-caption">
                <div className="timer">
                  <div className="timer-days">
                    <div className="timer-time"><span id="days"></span></div>
                    <div className="timer-text">Days</div>
                  </div>
                  <div className="timer-hours">
                    <div className="timer-time"><span id="hours"></span></div>
                    <div className="timer-text">Hours</div>
                  </div>
                  <div className="timer-mins">
                    <div className="timer-time"><span id="mins"></span></div>
                    <div className="timer-text">Mins</div>
                  </div>
                  <div className="timer-seconds">
                    <div className="timer-time"><span id="seconds"></span></div>
                    <div className="timer-text">Secs</div>
                  </div>
                </div>
                <h4 className="timer-tagline">Until ScotLAN 4!</h4>
                <p className=""><a className="btn btn-lg btn-primary" href="/Product/Event/ScotLAN%20Event%205" role="button">Buy Tickets Today</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container marketing">
      <hr className=" featurette-divider" />
      <div className="row">
      <div><h4>Our Events:</h4></div>
      <div><ul>
        <li>Our Next Event: ScotLAN XMAS!</li>
        <li>Our Next Avalible Event: ScotLAN 4</li>
      </ul></div>
    </div>
      <div className="row">
        <div className="col-lg-4">
          <img className="img-circle" src="/Images/scotlan-1.png" alt="Generic placeholder image" width="140" height="140" />
          <h2>ScotLAN #1</h2>
          <p>This event was on the 5th of May. You can see our album below and see if scotlan is your sorta THANG</p>
          <p><a className="btn btn-secondary" href="#" role="button">View Gallery »</a></p>
        </div>
        <div className="col-lg-4">
          <img className="img-circle"  src="/Images/scotlan-2.png" alt="Generic placeholder image" width="140" height="140" />
          <h2>ScotLAN #2</h2>
          <p>After the sucess of scotLAN #1 we decided to keep going .. yeah, who knew?.</p>
          <p><a className="btn btn-secondary" href="#" role="button">SOLD OUT »</a></p>
        </div>
        <div className="col-lg-4">
          <img className="img-circle"  src="/Images/xmas-1.png"  alt="Generic placeholder image" width="140" height="140" />
          <h2>ScotLAN XMAS</h2>
          <p>Complete with decorations and presents ... thats right PRESENTS!.</p>
          <p><a className="btn btn-secondary" href="#" role="button">Buy Tickets »</a></p>
        </div>
      </div>
      </div>
      </div>
    );
  }
}
