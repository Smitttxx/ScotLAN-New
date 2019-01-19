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

  render() {
    return (
      <div class="sl--sitecontainer--background__keyboard">
        <div className="container">

          <h2 class="product-heading">Next Events<span class="text-muted"></span></h2>
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
          <div>
          <ListGroup>
            <ListGroupItem> Dates: Fri 15th March 6pm – Sun 17th March 6pm (48 Hours) </ListGroupItem>
            <ListGroupItem> Venue: Woodlands Games Hall, Cochrane St, Falkirk FK1 1QE </ListGroupItem>
            <ListGroupItem> Spaces: 100 seat BYOC Tickets: 100 </ListGroupItem>
            <ListGroupItem> Internet: 430mbps down 40mbps up LAN: Gigabit </ListGroupItem>
            <ListGroupItem> Facebook Event </ListGroupItem>
          </ListGroup>
          </div>
          <h4> What even is a LAN Gaming Party? </h4>
          <p> Games & Events We survey everyone who buys a ticket so you decide what gets played at the event.</p>
          <p> We also have servers set up for: </p>
          <div>
          <ListGroup>
            <ListGroupItem> TrackMania </ListGroupItem>
            <ListGroupItem> Overwatch </ListGroupItem>
            <ListGroupItem> Age Of Empires </ListGroupItem>
            <ListGroupItem> Team Fortress 2 & PropHunt </ListGroupItem>
            <ListGroupItem> Unreal Tournament 2004 </ListGroupItem>
            <ListGroupItem> Half-Life 2: Deathmatch </ListGroupItem>
            <ListGroupItem> Counter-Strike: Global Offensive </ListGroupItem>
            <ListGroupItem> Armagetron Advanced </ListGroupItem>
          </ListGroup>
          </div>
          ... And many many more!

          <h4>Parking / Travel</h4>
          <div>
          <ListGroup>
            <ListGroupItem> 40~ free spaces on-site </ListGroupItem>
            <ListGroupItem> Bus: Falkirk Bus Station 10 minute away </ListGroupItem>
            <ListGroupItem> Train: Falkirk High – 0.4 Miles Eating </ListGroupItem>
            <ListGroupItem> Daily Morning Rolls (Outside Caterer) </ListGroupItem>
            <ListGroupItem> Saturday Dominos Order </ListGroupItem>
            <ListGroupItem> Kettle, microwave and small fridge on site </ListGroupItem>
            <ListGroupItem> Corner Shops – 5 min walk </ListGroupItem>
            <ListGroupItem> -Eat – Various Deliveries from 5pm to 11pm Saturday & Sunday </ListGroupItem>
            <ListGroupItem> Dominos Pizza Falkirk – Deliveries from 11am to 11pm Saturday & Sunday </ListGroupItem>
            <ListGroupItem> Tesco – 8 min drive, 40 min walk Sleeping </ListGroupItem>
            <ListGroupItem> Floor space in main hall / upstairs </ListGroupItem>
          </ListGroup>
          </div>
          <h4> What to bring</h4>
          <div>
          <ListGroup>
            <ListGroupItem> Computer, power cable </ListGroupItem>
            <ListGroupItem> Keyboard, mouse, Surge Protected 4 Way </ListGroupItem>
            <ListGroupItem> Screen, power cable </ListGroupItem>
            <ListGroupItem> Headphones / headset </ListGroupItem>
            <ListGroupItem> Airbed / roll mat – no doubles as space is limited! </ListGroupItem>
            <ListGroupItem> Security </ListGroupItem>
            <ListGroupItem> You are responsible for securing your possessions! </ListGroupItem>
            <ListGroupItem> Front door will be locked at 4am Saturday night, unlocked 9am Sunday morning </ListGroupItem>
          </ListGroup>
          </div>
        </div>
      </div>
    );
  }
}
