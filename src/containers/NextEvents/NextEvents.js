import React, { Component } from "react";
import {  ListGroup, ListGroupItem } from "react-bootstrap";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => (
  <div style={{
    color: 'white',
    background: 'red',
    padding: '10px 10px',
    display: 'inline-flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100%',
    transform: 'translate(-50%, -50%)'
  }}>
    {text}
  </div>
);

export default class NextEvents extends Component {
  constructor(props) {
    super(props);

    this.state = {
      center: {
        lat: 55.995980,
        lng: -3.786270
      },
      zoom: 16
    };
  }

  async componentDidMount() {
    window.scrollTo(0, 0);
  }

  showPanel = index => {
    var hasAttribute = document.getElementById(index).hasAttribute("hidden");

    if(hasAttribute) {
      document.getElementById(index).removeAttribute("hidden");
    } else {
      document.getElementById(index).setAttribute("hidden", "hidden");
    }
  }


  render() {
    return (
      <div>
        <div className="keyboard-background">
          <div className="section-container">
            <div className="section-container-keyboard">
              <div className="container">
              <h2 class="product-heading">What to expect at ScotLAN?<span class="text-muted"></span></h2>

                <p> A LAN Party is an event where you take your computer to our venue, hook it up on a high speed network and play video games with and against each other for 48 hours.</p>
                <p> ScotLAN was founded in November 2017 buy a group of 4 friends. To meet the team head over to our <a href="/AboutUs">Meet the team Page</a></p>
                <p> For general LAN questions head over to our <a href="/FAQS">FAQ's Page</a> or <a href="/Contact">get in touch</a> with us if you cant find the answer your looking for!</p>


            <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">

                <div className="panel panel-default">
                    <div className="panel-heading" role="tab" id="headingOne">
                      <div className="panel-title" onClick={()=>{this.showPanel("collapseTournamnets")}}>
                        <a className="collapsed">
                         <div>Tournaments</div>
                        </a>
                      </div>
                    </div>
                    <div id="collapseTournamnets" className="panel-collapse" hidden="hidden">
                        <div className="panel-body">
                        <p> Every event has event specific tournaments - to find out what these are head over to the event page </p>

                        <p> Every event also has servers set up for: </p>
                        <div>
                        <ul>
                          <li> TrackMania </li>
                          <li> Overwatch </li>
                          <li> Age Of Empires </li>
                          <li> Team Fortress 2 & PropHunt </li>
                          <li> Unreal Tournament 2004 </li>
                          <li> Half-Life 2: Deathmatch </li>
                          <li> Counter-Strike: Global Offensive </li>
                          <li> Armagetron Advanced </li>
                        </ul>
                        </div>
                        ... And many many more!
                        </div>
                    </div>
                </div>
                <div className="panel panel-default">
                    <div className="panel-heading" role="tab" id="headingOne">
                      <div className="panel-title" onClick={()=>{this.showPanel("collapseFoodDrink")}}>
                        <a className="collapsed">
                         <div>Food & Drink</div>
                        </a>
                      </div>
                    </div>
                    <div id="collapseFoodDrink" className="panel-collapse" hidden="hidden">
                      <div className="panel-body">
                      <ul>
                        <li> Daily Morning Rolls (Outside Caterer) </li>
                        <li> Saturday Pizza Order </li>
                        <li> Kettle, microwave and small fridge on site </li>
                        <li> Corner Shops – 5 min walk </li>
                        <li> JustEat – Various Deliveries from 5pm to 11pm Saturday & Sunday </li>
                      </ul>
                        </div>
                    </div>
                </div>
                <div className="panel panel-default">
                    <div className="panel-heading" role="tab" id="headingOne">
                      <div className="panel-title" onClick={()=>{this.showPanel("collapseParking")}}>
                        <a className="collapsed">
                         <div>Parking/Travel</div>
                        </a>
                      </div>
                    </div>
                    <div id="collapseParking" className="panel-collapse" hidden="hidden">
                      <div className="panel-body">
                        <div>
                        <p> 104 Man Event</p>
                        <ul>
                          <li> 40~ free spaces on-site </li>
                          <li> Bus: Falkirk Bus Station 10 minutes away </li>
                          <li> Train: Falkirk High – 0.4 Miles </li>
                        </ul>
                        <p> 32 Man Event</p>
                        <ul>
                          <li> 15~ free spaces on-site </li>
                        </ul>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="panel panel-default">
                    <div className="panel-heading" role="tab" id="headingOne">
                      <div className="panel-title" onClick={()=>{this.showPanel("collapseUnder16")}}>
                        <a className="collapsed">
                         <div>Under 16's</div>
                        </a>
                      </div>
                    </div>
                    <div id="collapseUnder16" className="panel-collapse" hidden="hidden">
                      <div className="panel-body">
                            <div>
                        <p>If you are aged 15 or under, you are required to provide a completed and signed parental consent form on arrival to the event. To obtain a form use the <a href="/contact">contact us here.</a> </p>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="panel panel-default">
                    <div className="panel-heading" role="tab" id="headingOne">
                      <div className="panel-title" onClick={()=>{this.showPanel("collapseCancellations")}}>
                        <a className="collapsed">
                         <div>Cancellations</div>
                        </a>
                      </div>
                    </div>
                    <div id="collapseCancellations" className="panel-collapse" hidden="hidden">
                      <div className="panel-body">
                            <div>
                        <p>If you are unable to attend the event, please notify us as soon as possible. If your notification is received over 28 days prior to the start of the event, your payment will be refunded subject to a £10 administration fee per ticket. Notifications received within 28 days of the event will not be refunded unless the event is full and your place can be sold to the next person on the waiting list, in which case the £10 administration fee will still apply. Refunds will typically take up to 10 working days to process providing all of the information required is supplied in order make the transaction. Note that standard BYOC tickets are not transferable and are for the named holder only unless purchased as a voucher, in which case they can be transferred to the new ticket holder once, from which point they also become non-transferable. Flex tickets do allow for multiple ticket transfers.
                        </p>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="panel panel-default">
                    <div className="panel-heading" role="tab" id="headingOne">
                      <div className="panel-title" onClick={()=>{this.showPanel("collapseEquipment")}}>
                        <a className="collapsed">
                         <div> What will I bring? </div>
                        </a>
                      </div>
                    </div>
                    <div id="collapseEquipment" className="panel-collapse" hidden="hidden">
                        <div className="panel-body">
                        <div>
                        <ul>
                          <li> Computer, power cable </li>
                          <li> Keyboard, mouse, Surge Protected 4 Way </li>
                          <li> Screen, power cable </li>
                          <li> Headphones / headset </li>
                          <li> Airbed / roll mat – no doubles as space is limited! </li>
                          <li> Security </li>
                          <li> You are responsible for securing your possessions! </li>
                          <li> Front door will be locked at 4am Saturday night, unlocked 9am Sunday morning </li>
                        </ul>
                        </div>
                        </div>
                      </div>
                    </div>
                  </div>
                                <a class="btn btn-lg btn-secondary sl-btn sl-btn--secondary sl-button-accordion" href="/Product/Event/ScotLAN%20Event%205" role="button">Buy Tickets Today <i class="fas fa-chevron-right"></i></a> 
                </div>
              </div>
            </div>
          </div>
      </div>
    );
  }
}
