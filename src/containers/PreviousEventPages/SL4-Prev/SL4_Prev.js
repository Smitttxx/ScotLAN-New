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

export default class SL4_Prev extends Component {
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
              <h2 class="product-heading">ScotLAN #4<span class="text-muted"></span></h2>
              <div>Sponsored by GT Omega and ASRock</div>

              <div className="row product--info">
                      <dl>
                        <dt>Gamers: 30/32</dt>
                        <dt>Event: Fri 15th March 7pm – Sun 17th March 7pm (48 Hours)</dt>
                        <dt>Address: 31st Pentland (Juniper Green) Scout Hall, 45 Lanark Rd W, Currie EH14 5JX</dt>
                      </dl>
                </div>
                </div>
                  <div class="gradient-line"></div>
                  <div class="tournament-list">
                          <div class="tournament-list-pc">
                          <div class="sl-previousevents-pcheading header"><i class="fas fa-keyboard"></i> PC Tournaments </div>
                          <dl>
                            <dt>CS:GO 3v3</dt>
                            <dd>Winners - Mount (Carb0n, Dobby, GMurray)</dd>
                            <dt>League of Legends 3v3</dt>
                            <dd>Winners - Retired - (Magestical, SaltBadGuy, FlashySlashy)</dd>
                            <dt>Overwatch 1v1</dt>
                            <dd>Winners - Carb0n</dd>
                          </dl>
                          </div>
                          <div class="tournament-list-console">
                          <div class="sl-previousevents-consoleheading header"><i class="fas fa-gamepad"></i> Console Corner Tournament</div>
                          <dl>
                            <dt>Tekken 7</dt>
                            <dd>Winner - Magestical</dd>
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
                    <div>Andy_M </div>
                    <div>Carvid </div>
                    <div>Rob </div>
                    <div>Smitttxx </div>
                    <div>Ezicc </div>
                    <div>Left-One </div>
                    <div>GMurray </div>
                    <div>Sunnuld </div>
                    <div>BeccaHR </div>
                    <div>Skillin </div>
                    <div>Emperor </div>
                    </div>
                  <div className="attendance-col attendance-col-2">

                    <div>DotShotgun </div>
                    <div>Grandy </div>
                    <div>AndyH </div>
                    <div>Squiff </div>
                    <div>Kyudo </div>
                    <div>Muckin Finted </div>
                    <div>Phreak </div>
                    <div>Rust </div>
                    <div>Magestical </div>
                    <div>Flashy Slashy </div>
                    <div>Salt BadGuy </div>
                  </div>

                  <div className="attendance-col attendance-col-4">
                    <div>Morphene </div>
                    <div>Levente </div>
                    <div>Joker </div>
                    <div>Gotty </div>
                    <div>Salt King </div>
                    <div>Dec </div>
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
                               <Tooltip title='A.6 Space'>
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
                               <Tooltip title='D.4 Space'>
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
