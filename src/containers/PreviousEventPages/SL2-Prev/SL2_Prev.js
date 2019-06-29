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
        <div className="container">
          <h2 class="product-heading">ScotLAN #2<span class="text-muted"></span></h2>
                  <div>Sponsored by GT Omega, Crucial and ASRock </div>
                  <div className="row product--info">
                  <div className="col-md-8">
                      <ul>
                        <li><strong>Gamers:</strong> 30 </li>
                        <li><strong>Event:</strong> Fri 15th March 7pm – Sun 17th March 7pm (48 Hours)</li>
                        <li><strong>Address:</strong> 31st Pentland (Juniper Green) Scout Hall, 45 Lanark Rd W, Currie EH14 5JX</li>
                      </ul>

                      <span> <h4>Tournament Winners !! <i class="fas fa-trophy"></i> </h4></span>
                      <div class="SL-Previoiusevents-pcheading"><i class="fas fa-keyboard"></i> PC </div>
                      <dl>
                        <dt>CS:GO 2v2</dt>
                          <dd>Winners - </dd>
                        <dt>Overwatch 3v3</dt>
                          <dd>Winners - </dd>
                      </dl>
                      <span><div class="SL-Previoiusevents-consoleheading"><i class="fas fa-gamepad"></i> Console Corner </div></span>
                      <dl>
                        <dt>Nintendo 64 Mario Kart Tournament</dt>
                          <dd>Winner - </dd>
                      </dl>

                    </div>
                  <div className="col-md-4">
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
                  </div>
              </div>
          </div>
          </div>
              </div>
    );
  }
}
