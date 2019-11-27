import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import GoogleMapReact from 'google-map-react';
import { Link, withRouter } from "react-router-dom";
import {  Tooltip } from 'react-tippy';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Label, FormGroup, FormControl, ControlLabel, Table, Button, Modal } from "react-bootstrap";


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

export default class SL6_Prev extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      message:"",
      quantityStd:"0",
      quantityVip:"0",
      redirectToCheckout: false,
      center: {
        lat: 55.995980,
        lng: -3.786270
      },
      zoom: 16,
      showModal: false,
      seatPlan:[],
      seatPlanByRow:[],
    };
    this.closeModal = this.closeModal.bind(this);
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

  closeModal() {
      this.setState({ showModal: !this.state.showModal });
    }

  render() {
    return (
      <div className="keyboard-background">
        <div className="section-container">
          <div className="section-container-keyboard">
        <div className="container sl-previousevents">

            <div class="event-detail-list">
              <h2 class="product-heading">ScotLAN #6 XMAS!<span class="text-muted"></span></h2>
              <div>Sponsored by GT Omega</div>

              <div className="row product--info">
                      <dl>
                        <dt>Gamers: 32/32</dt>
                        <dt>Event: Fri 29th November 6pm – Sun 1th December 6pm (48 Hours)</dt>
                        <dt>Address: 31st Pentland (Juniper Green) Scout Hall, 45 Lanark Rd W, Currie EH14 5JX</dt>
                      </dl>
                </div>
                </div>
                  <div class="gradient-line"></div>
                  <div class="tournament-list">
                          <div class="tournament-list-pc">
                          <div class="sl-previousevents-pcheading header"><i class="fas fa-keyboard"></i> PC Tournaments </div>
                          <dl>
                            <dt>League of Legends: Teamfight Tactics</dt>
                            <dt>Overwatch 2v2</dt>
                            <dt>Warsow Instagib</dt>
                            <dt>PUBG</dt>
                          </dl>
                          </div>
                          <div class="tournament-list-console">
                          <div class="sl-previousevents-consoleheading header"><i class="fas fa-beer"></i> Pub Quiz Winners! </div>
                          <dl>
                            <dt>TBC</dt>
                          </dl>
                          </div>
                          </div>

              <div class="gradient-line"></div>
              <div class="sl-previousevents-eventinfo">
              <div class="attendance-list">
              <div class="row">
              <div class="sl-previousevents-attendance header"><i class="fas fa-headset"></i> Gamers </div>
              <div className="col-md-7 sl-previousevents-attendance__list">
                <div className="attendance-col attendance-col-1">
                    <div>Carvid </div>
                    <div>Rob </div>
                    <div>Smitttxx </div>
                    <div>Skillin </div>
                    <div>Grandy </div>
                    <div>NYX</div>
                    <div>BlackHawkChris</div>
                    <div>Kizashee</div>
                    <div>GMurray</div>
                    <div>Chaos</div>
                    <div>KindPhish</div>
                    </div>
                  <div className="attendance-col attendance-col-2">

                    <div>xXH33PZz </div>
                    <div>CamDawg </div>
                    <div>J4M3S </div>
                    <div>AndyH</div>
                    <div>Squiff</div>
                    <div>[SGD] LumpyHamster </div>
                    <div>[SGD] Slipshod</div>
                    <div>[SGD] Kanika</div>
                    <div>[SGD] Jawcore</div>
                    <div>[SGD] Abhi</div>
                    <div>[SGD] camM</div>
                  </div>

                  <div className="attendance-col attendance-col-4">
                    <div>MuckinFinted </div>
                    <div>Kyudo </div>
                    <div>SaltBadGuy </div>
                    <div>Morphene</div>
                    <div>P Fitz</div>
                    <div>Magestical</div>
                    <div>Raika</div>
                    <div>KayCee </div>
                    <div>Carb0n </div>
                  </div>
                </div>
                <div className="col-md-5 sl-previousevents-attendance__seats">
                <div className="small-floorplan">
                 <div className="row small-floorplan--areas">
                   <div className="col-lg-12">
                     <div className="small-floorplan--rows">
                       <div className="small-floorplan--block small-floorplan--block--A">
                         <div className="small-floorplan--row small-floorplan--row-1">
                         <Tooltip title='A.1 Carvid'>
                             <button class="seat seat--taken"></button>
                         </Tooltip>
                         <Tooltip title='A.2 Rob'>
                             <button class="seat seat--taken"></button>
                         </Tooltip>
                         <Tooltip title='A.3 Smitttxx'>
                             <button class="seat seat--taken"></button>
                         </Tooltip>
                         <Tooltip title='A.4 Skillin'>
                             <button class="seat seat--taken"></button>
                         </Tooltip>
                         <Tooltip title='A.5 Grandy'>
                             <button class="seat seat--taken"></button>
                         </Tooltip>
                         <Tooltip title='A.6 NYX'>
                             <button class="seat seat--taken"></button>
                         </Tooltip>
                         <Tooltip title='A.7 BlackHawkChris'>
                             <button class="seat seat--taken"></button>
                         </Tooltip>
                         <Tooltip title='A.8 Kizashee'>
                             <button class="seat seat--taken"></button>
                         </Tooltip>
                         </div>
                         <div className="small-floorplan--row large-floorplan--row-2">
                         <Tooltip title='B.1 Murray'>
                             <button class="seat seat--taken"></button>
                         </Tooltip>
                         <Tooltip title='B.2 Chaos'>
                             <button class="seat seat--taken"></button>
                         </Tooltip>
                         <Tooltip title='B.3 KindPhish'>
                             <button class="seat seat--taken"></button>
                         </Tooltip>
                         <Tooltip title='B.4 xXH33PZz'>
                             <button class="seat seat--taken"></button>
                         </Tooltip>
                         <Tooltip title='B.5 CamDawg'>
                             <button class="seat seat--taken"></button>
                         </Tooltip>
                         <Tooltip title='B.6 J4M3S'>
                             <button class="seat seat--taken"></button>
                         </Tooltip>
                         <Tooltip title='B.7 AndyH'>
                             <button class="seat seat--taken"></button>
                         </Tooltip>
                         <Tooltip title='B.8 Squiff'>
                             <button class="seat seat--taken"></button>
                         </Tooltip>
                         </div>
                       </div>
                       <div className="small-floorplan--block large-floorplan--block--B">
                         <div className="small-floorplan--row large-floorplan--row-3 ">
                         <Tooltip title='C.1 [SGD] LumpyHamster'>
                             <button class="seat seat--taken"></button>
                         </Tooltip>
                         <Tooltip title='C.2 [SGD] Slipshod'>
                             <button class="seat seat--taken"></button>
                         </Tooltip>
                         <Tooltip title='C.3 [SGD] Kanika'>
                             <button class="seat seat--taken"></button>
                         </Tooltip>
                         <Tooltip title='C.4 [SGD] Jawcore'>
                             <button class="seat seat--taken"></button>
                         </Tooltip>
                         <Tooltip title='C.5 [SGD] Abhi'>
                             <button class="seat seat--taken"></button>
                         </Tooltip>
                         <Tooltip title='C.6 [SGD] camM'>
                             <button class="seat seat--taken"></button>
                         </Tooltip>
                         <Tooltip title='C.7 MuckinFinted'>
                             <button class="seat seat--taken"></button>
                         </Tooltip>
                         <Tooltip title='C.8 Kyudo'>
                             <button class="seat seat--taken"></button>
                         </Tooltip>
                         </div>
                         <div className="small-floorplan--row large-floorplan--row-4">
                         <Tooltip title='D.1 SaltBadGuy'>
                             <button class="seat seat--taken"></button>
                         </Tooltip>
                         <Tooltip title='D.2 Morphene'>
                             <button class="seat seat--taken"></button>
                         </Tooltip>
                         <Tooltip title='D.3 P Fitz'>
                             <button class="seat seat--taken"></button>
                         </Tooltip>
                         <Tooltip title='D.4 Magestical'>
                             <button class="seat seat--taken"></button>
                         </Tooltip>
                         <Tooltip title='D.5 Jarnbjorn'>
                             <button class="seat seat--taken"></button>
                         </Tooltip>
                         <Tooltip title='D.6 Raika'>
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
                    </div>
                    </div>
                    <div class="product--info--enquire"><a className="btn btn-lg btn-secondary sl-btn sl-btn--secondary" href="/Gallery" role="button">Gallery</a></div>
</div>
                </div></div>
                  </div>
              </div>
          </div>
                  </div>
        </div>

    );
  }
}
