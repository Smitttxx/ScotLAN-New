import React, { Component } from "react";
import "./SL4.css";
import { Redirect } from 'react-router-dom';
import { API, Auth } from "aws-amplify";
import GoogleMapReact from 'google-map-react';
import { Link, withRouter } from "react-router-dom";
import {  Tooltip } from 'react-tippy';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

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

export default class SL4 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      message:"",
      center: {
        lat: 55.899710,
        lng: -3.295903
      },
      zoom: 16,
    };
  }

  async componentDidMount() {
    window.scrollTo(0, 0);
  }

      render() {
    return (
      <div className="keyboard-background">
        <div className="section-container">
          <div className="section-container-keyboard">
            <div className="container">
            <h2 className="product-heading">ScotLAN #4</h2>
            <div>Sponsored by GTOmega and ASRock </div>
            <div className="row product--info">
            <p className="lead">Events take place over a 3 day weekend starting on a Friday at 6PM and finishing on a Sunday 6PM so games can be played 24hrs a day, if you have enough energy drinks.</p>
            <div className="col-md-8">
              <h4> What you need to know </h4>
                <ul>
                  <li><strong>Gamers:</strong> 32 (3 Tickets available)</li>
                  <li><strong>Event:</strong> Fri 15th March 7pm – Sun 17th March 7pm (48 Hours)</li>
                  <li><strong>Parking Avalible:</strong> Yes </li>
                  <li><strong>Ticket Price:</strong> £25</li>
                  <li><strong>Address:</strong> 31st Pentland (Juniper Green) Scout Hall, 45 Lanark Rd W, Currie EH14 5JX</li>
                  <li><a href="https://www.facebook.com/events/259251014795130/"><strong>Facebook Event</strong></a></li>

                </ul>

                <div className="small-floorplan">
                 <div className="row small-floorplan--areas">
                   <div className="col-lg-7">
                     <div className="small-floorplan--rows">
                       <div className="small-floorplan--block small-floorplan--block--A">
                         <div className="small-floorplan--row small-floorplan--row-1">
                         <Tooltip title='A.1 Rob'>
                             <button class="seat seat--taken"></button>
                         </Tooltip>
                         <Tooltip title='A.2 Smitttxx'>
                             <button class="seat seat--taken"></button>
                         </Tooltip>
                         <Tooltip title='A.3 Carvid'>
                             <button class="seat seat--taken"></button>
                         </Tooltip>
                         <Tooltip title='A.4 AndyM_29'>
                             <button class="seat seat--taken"></button>
                         </Tooltip>
                         <Tooltip title='A.5 Ezicc'>
                             <button class="seat seat--taken"></button>
                         </Tooltip>
                         <Tooltip title='A.6 avalible'>
                             <button class="seat seat--avalible"></button>
                         </Tooltip>
                         <Tooltip title='A.7 Left-One'>
                             <button class="seat seat--taken"></button>
                         </Tooltip>
                         <Tooltip title='A.8 GMurray'>
                             <button class="seat seat--taken"></button>
                         </Tooltip>
                         </div>
                         <div className="small-floorplan--row large-floorplan--row-2">
                         <Tooltip title='B.1 Sunnuld'>
                             <button class="seat seat--taken"></button>
                         </Tooltip>
                         <Tooltip title='B.2 BeccaHR'>
                             <button class="seat seat--taken"></button>
                         </Tooltip>
                         <Tooltip title='B.3 Skillin'>
                             <button class="seat seat--taken"></button>
                         </Tooltip>
                         <Tooltip title='B.4 Emperor'>
                             <button class="seat seat--taken"></button>
                         </Tooltip>
                         <Tooltip title='B.5 DotShotgun'>
                             <button class="seat seat--taken"></button>
                         </Tooltip>
                         <Tooltip title='B.6 Grandy'>
                             <button class="seat seat--taken"></button>
                         </Tooltip>
                         <Tooltip title='B.7 AndyH'>
                             <button class="seat seat--taken"></button>
                         </Tooltip>
                         <Tooltip title='B.8 Squifferz'>
                             <button class="seat seat--taken"></button>
                         </Tooltip>
                         </div>
                       </div>
                       <div className="small-floorplan--block large-floorplan--block--B">
                         <div className="small-floorplan--row large-floorplan--row-3 ">
                         <Tooltip title='C.1 Kyudo'>
                             <button class="seat seat--taken"></button>
                         </Tooltip>
                         <Tooltip title='C.2 Phil'>
                             <button class="seat seat--taken"></button>
                         </Tooltip>
                         <Tooltip title='C.3 Phreak'>
                             <button class="seat seat--taken"></button>
                         </Tooltip>
                         <Tooltip title='C.4 Rust'>
                             <button class="seat seat--taken"></button>
                         </Tooltip>
                         <Tooltip title='C.5 Magestical'>
                             <button class="seat seat--taken"></button>
                         </Tooltip>
                         <Tooltip title='C.6 Flashy Slashy'>
                             <button class="seat seat--taken"></button>
                         </Tooltip>
                         <Tooltip title='C.7 Salt BadGuy'>
                             <button class="seat seat--taken"></button>
                         </Tooltip>
                         <Tooltip title='C.8 Morphene'>
                             <button class="seat seat--taken"></button>
                         </Tooltip>
                         </div>
                         <div className="small-floorplan--row large-floorplan--row-4">
                         <Tooltip title='D.1 Levente'>
                             <button class="seat seat--taken"></button>
                         </Tooltip>
                         <Tooltip title='D.2 Joker'>
                             <button class="seat seat--taken"></button>
                         </Tooltip>
                         <Tooltip title='D.3 Gotty'>
                             <button class="seat seat--taken"></button>
                         </Tooltip>
                         <Tooltip title='D.4 avalible'>
                             <button class="seat seat--avalible"></button>
                         </Tooltip>
                         <Tooltip title='D.5 Salt King'>
                             <button class="seat seat--taken"></button>
                         </Tooltip>
                         <Tooltip title='D.6 Dec'>
                             <button class="seat seat--taken"></button>
                         </Tooltip>
                         <Tooltip title='D.7 KayCee'>
                             <button class="seat seat--taken"></button>
                         </Tooltip>
                         <Tooltip title='D.8 Carb0n'>
                             <button class="seat seat--taken"></button>
                         </Tooltip>
                         </div>
                         </div>
                         </div>
                   </div>
                   <div className="col-lg-5">
                     <div className="small-floorplan--sleeping-area">
                       <button className="small-floorplan--sleeping-area-design"> | Sleeping Area | </button>
                     </div>
                   </div>
                 </div>
               </div>
               <div class="product--info--enquire"><a className="btn btn-lg btn-secondary sl-btn sl-btn--secondary" href="/Contact" role="button">Enquire</a></div>
            </div>
            <div className="col-md-4">
              <div class="google-map" style={{ height: '200px', width: '100%', border: '5px solid #73D14C'}}>
                  <GoogleMapReact
                    bootstrapURLKeys={{ key:"AIzaSyBtEhwgBGXTswLFsTCbAFoycaUqby6Irlo" }}
                    defaultCenter={this.state.center}
                    defaultZoom={this.state.zoom}
                  >
                    <AnyReactComponent
                      lat={55.899710}
                      lng={-3.295903}
                      text={''}
                    />
                  </GoogleMapReact>
                </div>
                <h4>Tournaments</h4>
                <p> Sign up for these Tournaments will be opened at the event</p>
                <h6>PC</h6>
                <ul>
                  <li>CS:GO 3v3</li>
                  <li>League of Legends 3v3 </li>
                  <li>Overwatch 1v1 </li>
                </ul>
                <h6>Console Corner</h6>
                <ul>
                  <li>Tekken 7</li>
                </ul>
  </div>
            </div>
            </div>
          </div>
          </div>
      </div>
    );
  }
}
