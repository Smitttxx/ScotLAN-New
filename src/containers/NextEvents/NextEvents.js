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
              <h2 class="product-heading">ScotLAN #5<span class="text-muted"></span></h2>
                <div class="row">
                  <div class="col-md-7">
                  <div>Sponsored by GTOmega and Corsair </div>
                    <ul>
                      <li><strong>Dates:</strong> Fri 5th July 7pm – Sun 7th July 7pm (48 Hours)</li>
                      <li><strong>Venue:</strong> Woodlands Games Hall, Cochrane St, Falkirk FK1 1QE</li>
                      <li><strong>Spaces:</strong> 114 seat BYOC Tickets</li>
                      <li><strong>Prices From:</strong> £35 </li>
                      <li><strong>Internet:</strong> 430mbps down 40mbps up LAN: Gigabit</li>
                      <li><a href="https://www.facebook.com/events/386414302190930/"><strong>Facebook Event</strong></a></li>
                    </ul>
                    <p className=""><a className="btn btn-lg btn-secondary sl-btn sl-btn--secondary" href="/Product/Event/ScotLAN%20Event%205" role="button">Buy Tickets Today</a></p>
                  </div>
                  <div class="col-md-5">
                    <div style={{ height: '200px', width: '100%' }}>
                              <GoogleMapReact
                                bootstrapURLKeys={{ key:"AIzaSyBtEhwgBGXTswLFsTCbAFoycaUqby6Irlo" }}
                                defaultCenter={this.state.center}
                                defaultZoom={this.state.zoom}
                              >
                                <AnyReactComponent
                                  lat={55.995980}
                                  lng={-3.786270}
                                  text={''}
                                />
                              </GoogleMapReact>
                              </div>
                    </div>
                  </div>

            <h4> What to expect at ScotLAN#5 </h4>
            <p> For general LAN questions head over to our FAQ page or get in touch with us if you cant find the answer your looking for!
            Below will tell you everything you need to know that is specific to our next event</p>

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
                        <p> Confirmed Tournaments: </p>
                        <ul>
                          <li> Counter Strike Global Offensive 5v5 </li>
                          <li> Overwatch 4v4 </li>
                          <li> League of Legends 5v5 </li>
                          <li> Rocket League 3v3 </li>
                        </ul>
                        <p> We also have servers set up for: </p>
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
                        <li> Saturday Dominos Order </li>
                        <li> Kettle, microwave and small fridge on site </li>
                        <li> Corner Shops – 5 min walk </li>
                        <li> JustEat – Various Deliveries from 5pm to 11pm Saturday & Sunday </li>
                        <li> Dominos Pizza Falkirk – Deliveries from 11am to 11pm Saturday & Sunday </li>
                        <li> Tesco – 8 min drive, 40 min walk </li>
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
                        <ul>
                          <li> 40~ free spaces on-site </li>
                          <li> Bus: Falkirk Bus Station 10 minutes away </li>
                          <li> Train: Falkirk High – 0.4 Miles </li>
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
                </div>
              </div>
            </div>
          </div>
      </div>
    );
  }
}
