import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import "./Home.css";
import '../../main.css';

export default class Home extends Component {
  render() {
    return (
      <div>
        <div id="myCarousel" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
          <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
        </ol>
        <div class="carousel-inner" role="listbox">
          <div class="carousel-item active">
            <img class="first-slide" src="/Images/banner-photo.png" alt="First slide" />
            <div class="container">
              <div class="carousel-caption">
                <div class="timer">
                  <div class="timer-days">
                    <div class="timer-time"><span id="days"></span></div>
                    <div class="timer-text">Days</div>
                  </div>
                  <div class="timer-hours">
                    <div class="timer-time"><span id="hours"></span></div>
                    <div class="timer-text">Hours</div>
                  </div>
                  <div class="timer-mins">
                    <div class="timer-time"><span id="mins"></span></div>
                    <div class="timer-text">Mins</div>
                  </div>
                  <div class="timer-seconds">
                    <div class="timer-time"><span id="seconds"></span></div>
                    <div class="timer-text">Secs</div>
                  </div>
                </div>
                <h4 class="timer-tagline">Until ScotLAN 4!</h4>
                <p class=""><a class="btn btn-lg btn-primary" href="/Product/Event/ScotLAN%20Event%205" role="button">Buy Tickets Today</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container marketing">
      <hr class=" featurette-divider" />
      <div class="row">
      <div><h4>Our Events:</h4></div>
      <div><ul>
        <li>Our Next Event: ScotLAN XMAS!</li>
        <li>Our Next Avalible Event: ScotLAN 4</li>
      </ul></div>
    </div>
      <div class="row">
        <div class="col-lg-4">
          <img class="img-circle" src="/Images/scotlan-1.png" alt="Generic placeholder image" width="140" height="140" />
          <h2>ScotLAN #1</h2>
          <p>This event was on the 5th of May. You can see our album below and see if scotlan is your sorta THANG</p>
          <p><a class="btn btn-secondary" href="#" role="button">View Gallery »</a></p>
        </div>
        <div class="col-lg-4">
          <img class="img-circle"  src="/Images/scotlan-2.png" alt="Generic placeholder image" width="140" height="140" />
          <h2>ScotLAN #2</h2>
          <p>After the sucess of scotLAN #1 we decided to keep going .. yeah, who knew?.</p>
          <p><a class="btn btn-secondary" href="#" role="button">SOLD OUT »</a></p>
        </div>
        <div class="col-lg-4">
          <img class="img-circle"  src="/Images/xmas-1.png"  alt="Generic placeholder image" width="140" height="140" />
          <h2>ScotLAN XMAS</h2>
          <p>Complete with decorations and presents ... thats right PRESENTS!.</p>
          <p><a class="btn btn-secondary" href="#" role="button">Buy Tickets »</a></p>
        </div>
      </div>
      </div>
      </div>
    );
  }
}
