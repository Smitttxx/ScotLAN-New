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

export default class SL2_Prev extends Component {
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
              <h2 class="product-heading">ScotLAN #2<span class="text-muted"></span></h2>
              <div>Sponsored by GT Omega and ASRock</div>

              <div className="row product--info">
                      <dl>
                        <dt>Gamers: 30/32</dt>
                        <dt>Event: Fri 5th October 7pm – Sun 7th October 7pm (48 Hours)</dt>
                        <dt>Address: 31st Pentland (Juniper Green) Scout Hall, 45 Lanark Rd W, Currie EH14 5JX</dt>
                      </dl>
                </div>
                </div>
                  <div class="gradient-line"></div>
                  <div class="tournament-list">
                          <div class="tournament-list-pc">
                          <div class="sl-previousevents-pcheading header"><i class="fas fa-keyboard"></i> PC Tournaments </div>
                          <dl>
                            <dt>Overwatch 3v3</dt>
                            <dt>GS:GO 2V2</dt>
                          </dl>
                          </div>
                          <div class="tournament-list-console">
                          <div class="sl-previousevents-consoleheading header"><i class="fas fa-gamepad"></i> Console Corner Tournament</div>
                          <dl>
                            <dt>Nintendo 64 Mario Kart Tournament</dt>
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
                    <div>Floydo </div>
                    <div>Andy McCrae </div>
                    <div>Fragle132</div>
                    <div>Left-One</div>
                    <div>Captain Awesome</div>
                    <div>LockedOutBro</div>
                    <div>Skillin</div>
                    </div>
                  <div className="attendance-col attendance-col-2">

                    <div>Ezicc</div>
                    <div>Arfy</div>
                    <div>Heepz</div>
                    <div>AndyH</div>
                    <div>Gmurray</div>
                    <div>Bane</div>
                    <div>Rampage</div>
                    <div>JugsAnnaM</div>
                    <div>LionHeartDiz</div>
                    <div>Magestical</div>
                    <div>Keikun</div>
                  </div>

                  <div className="attendance-col attendance-col-4">
                    <div>C.7 G</div>
                    <div>C.8 Naim</div>
                    <div>D.1 Carb0n</div>
                    <div>D.2 KayCee</div>
                    <div>D.3 Lawliet</div>
                    <div>D.4 The Joker</div>
                    <div>D.5 Gotty</div>
                    <div>D.6 KirkyBoi</div>
                    <div>D.7 DarkNinjaZelda</div>
                    <div>D.8 ScottishJay</div>
                  </div>
                </div>
                <div className="col-md-5 sl-previousevents-attendance__seats">
    <div className="small-floorplan">
     <div className="row small-floorplan--areas">
       <div className="col-lg-12">
         <div className="small-floorplan--rows">
           <div className="small-floorplan--block small-floorplan--block--A">
             <div className="small-floorplan--row small-floorplan--row-1">
             <Tooltip title='A.1 Andy_M'>
                 <button class="seat seat--taken"></button>
             </Tooltip>
             <Tooltip title='A.2 Rob'>
                 <button class="seat seat--taken"></button>
             </Tooltip>
             <Tooltip title='A.3 Carvid'>
                 <button class="seat seat--taken"></button>
             </Tooltip>
             <Tooltip title='A.4 Smitttxx'>
                 <button class="seat seat--taken"></button>
             </Tooltip>
             <Tooltip title='A.5 Floydo'>
                 <button class="seat seat--taken"></button>
             </Tooltip>
             <Tooltip title='A.6 Andy McCrae'>
                 <button class="seat seat--taken"></button>
             </Tooltip>
             <Tooltip title='A.7 Fragle132'>
                 <button class="seat seat--taken"></button>
             </Tooltip>
             <Tooltip title='A.8 Left-One'>
                 <button class="seat seat--taken"></button>
             </Tooltip>
             </div>
             <div className="small-floorplan--row large-floorplan--row-2">
             <Tooltip title='B.1 Captain Awesome'>
                 <button class="seat seat--taken"></button>
             </Tooltip>
             <Tooltip title='B.2 LockedOutBro'>
                 <button class="seat seat--taken"></button>
             </Tooltip>
             <Tooltip title='B.3 Skillin'>
                 <button class="seat seat--taken"></button>
             </Tooltip>
             <Tooltip title='B.4 Ezicc'>
                 <button class="seat seat--taken"></button>
             </Tooltip>
             <Tooltip title='B.5 Arfy'>
                 <button class="seat seat--taken"></button>
             </Tooltip>
             <Tooltip title='B.6 Heepz'>
                 <button class="seat seat--taken"></button>
             </Tooltip>
             <Tooltip title='B.7 AndyH'>
                 <button class="seat seat--taken"></button>
             </Tooltip>
             <Tooltip title='B.8 Gmurray'>
                 <button class="seat seat--taken"></button>
             </Tooltip>
             </div>
           </div>
           <div className="small-floorplan--block large-floorplan--block--B">
             <div className="small-floorplan--row large-floorplan--row-3 ">
             <Tooltip title='C.1 Bane'>
                 <button class="seat seat--taken"></button>
             </Tooltip>
             <Tooltip title='C.2 Rampage'>
                 <button class="seat seat--taken"></button>
             </Tooltip>
             <Tooltip title='C.3 JugsAnnaM'>
                 <button class="seat seat--taken"></button>
             </Tooltip>
             <Tooltip title='C.4 LionHeartDiz'>
                 <button class="seat seat--taken"></button>
             </Tooltip>
             <Tooltip title='C.5 Magestical'>
                 <button class="seat seat--taken"></button>
             </Tooltip>
             <Tooltip title='C.6 Keikun'>
                 <button class="seat seat--taken"></button>
             </Tooltip>
             <Tooltip title='C.7 G'>
                 <button class="seat seat--taken"></button>
             </Tooltip>
             <Tooltip title='C.8 Naim'>
                 <button class="seat seat--taken"></button>
             </Tooltip>
             </div>
             <div className="small-floorplan--row large-floorplan--row-4">
             <Tooltip title='D.1 Carb0n'>
                 <button class="seat seat--taken"></button>
             </Tooltip>
             <Tooltip title='D.2 KayCee'>
                 <button class="seat seat--taken"></button>
             </Tooltip>
             <Tooltip title='D.3 Lawliet'>
                 <button class="seat seat--taken"></button>
             </Tooltip>
             <Tooltip title='D.4 The Joker'>
                 <button class="seat seat--avalible"></button>
             </Tooltip>
             <Tooltip title='D.5 Gotty'>
                 <button class="seat seat--taken"></button>
             </Tooltip>
             <Tooltip title='D.6 KirkyBoi'>
                 <button class="seat seat--taken"></button>
             </Tooltip>
             <Tooltip title='D.7 DarkNinjaZelda'>
                 <button class="seat seat--taken"></button>
             </Tooltip>
             <Tooltip title='D.8 ScottishJay'>
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
