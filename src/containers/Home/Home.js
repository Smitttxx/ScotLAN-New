import React, { Component } from "react";
import "./Home.css";
import '../../main.css';


//var lastOrder=new Date('2019-06-20 23:34'); //Testing
// YYYY/MM/DD
export default class Home extends Component {
  render(){
    var date = new Date();
    var onSale=new Date('2020-01-24 18:00');
    var now = new Date().getTime();
    var distance = onSale - now;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if ( days > 0) {
          var onSaleCountdown = "Buy In " + days + " days";
        } else if ( days <= 0 && hours >= 1 ) {
          var onSaleCountdown = "Buy In " + hours + " hrs";
        } else {
          var onSaleCountdown = "Buy In " + minutes + " mins";
        }

    if(date > onSale) {
      return (
        <div className="sl--homepage sl--homepage--heroimage">3
          <div className="sl--homepage--backgroundgradient">
            <div className="container">
              <div className="row">
                <div className="col-md-6 sl-event-1">
                  <div className="sl--homepage--text">
                  <div class="box">
                    <div class="ribbon  ribbon-top-left"><span>SOLD OUT</span></div>
                      <div> <h4>ScotLAN <span><small>#</small>7!</span></h4> </div>
                      <h3>March 6<small>th</small> - 8<small>th</small> 2020</h3>
                      <p><strong class="bebas"><i class="fas fa-user-friends"></i> 32</strong> <small>player event</small></p>
                      <p className=""><a className="btn btn-lg btn-secondary sl-btn sl-btn--secondary bebas" href="/ProductSoldOut/Event/ScotLAN%20Event%207" role="button">Event Info</a></p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 sl-event-2">
                  <div className="sl--homepage--text">
                    <div class="box">
                      <div class="ribbon green-ribbon ribbon-top-left"><span class="bebas">ON SALE NOW</span></div>
                      <div> <h4>ScotLAN <small>#</small>8!</h4> </div>
                      <h3>June 26<small>th</small> - 28<small>th</small> 2020</h3>
                      <p><strong class="bebas"><i class="fas fa-users"></i> 100</strong> <small>player event</small></p>
                      <p className=""><a className="btn btn-lg btn-secondary sl-btn sl-btn--secondary bebas" href="/Product/Event/ScotLAN%20Event%208" role="button" >Buy Tickets</a></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="sl--homepage sl--homepage--heroimage">
          <div className="sl--homepage--backgroundgradient">
            <div className="container">
              <div className="row">
                <div className="col-md-6 sl-event-1">
                  <div className="sl--homepage--text">
                  <div class="box">
                    <div class="ribbon  ribbon-top-left"><span class="bebas">SOLD OUT</span></div>
                      <div> <h4>ScotLAN <span><small>#</small>7!</span></h4> </div>
                      <h3>March 6<small>th</small> - 8<small>th</small> 2020</h3>
                      <p><strong class="bebas"><i class="fas fa-user-friends"></i> 32</strong> <small class="bebas">player event</small></p>
                      <p className=""><a className="btn btn-lg btn-secondary sl-btn sl-btn--secondary bebas" href="/ProductSoldOut/Event/ScotLAN%20Event%207" role="button">Event Info</a></p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 sl-event-2">
                  <div className="sl--homepage--text">
                    <div class="box">
                      <div class="ribbon green-ribbon ribbon-top-left"><span class="bebas"> {onSaleCountdown}</span></div>
                      <div> <h4>ScotLAN <small>#</small>8!</h4> </div>
                      <h3>June 26<small>th</small> - 28<small>th</small> 2020</h3>
                      <p><strong class="bebas"><i class="fas fa-users"></i> 100</strong> <small class="bebas">player event</small></p>
                      <p className=""><a className="btn btn-lg btn-secondary sl-btn sl-btn--secondary btn-green-disabled bebas"  role="button" disabled>On sale @ 6pm on 24th Jan!</a></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}
