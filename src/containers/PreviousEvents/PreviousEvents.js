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

export default class PreviousEvents extends Component {
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
          <h2 class="product-heading">Previous Events<span class="text-muted"></span></h2>
          <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">

          <div className="panel panel-default">
              <div className="panel-heading" role="tab" id="headingFour">
                <h4 className="panel-title" onClick={()=>{this.showPanel("collapseFour")}}>
                  <a className="collapsed">
                     ScotLAN #4 - Level Up Party
                  </a>
                </h4>
              </div>
              <div id="collapseFour" className="panel-collapse" hidden="hidden">
                  <div className="panel-body">
                  <h2 className="product-heading">ScotLAN #4</h2>
                  <div>Sponsored by GTOmega and ASRock </div>
                  <div className="row product--info">
                  <div className="col-md-8">
                    <h4> What you need to know </h4>
                      <ul>
                        <li><strong>Gamers:</strong> 30 </li>
                        <li><strong>Event:</strong> Fri 15th March 7pm – Sun 17th March 7pm (48 Hours)</li>
                        <li><strong>Address:</strong> 31st Pentland (Juniper Green) Scout Hall, 45 Lanark Rd W, Currie EH14 5JX</li>
                        <li><a href="https://www.facebook.com/events/259251014795130/"><strong>Facebook Event</strong></a></li>

                      </ul>

                      <span> <h4>Tournament Winners !! <i class="fas fa-trophy"></i> </h4></span>
                      <h6>PC <i class="fas fa-keyboard"></i></h6>
                      <ul>
                        <li>CS:GO 3v3 - Mount (Carb0n, Dobby, GMurray)</li>
                        <li>League of Legends 3v3 - Retired - (Magestical, SaltBadGuy, FlashySlashy)</li>
                        <li>Overwatch 1v1 - Carb0n  </li>
                      </ul>
                      <span> <h6>Console Corner <i class="fas fa-gamepad"></i></h6></span>
                      <ul>
                        <li>Tekken 7 - Magestical </li>
                      </ul>
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



          <div className="panel panel-default">
              <div className="panel-heading" role="tab" id="headingThree">
                <h4 className="panel-title" onClick={()=>{this.showPanel("collapseThree")}}>
                  <a className="collapsed">
                     ScotLAN #XMAS! Event info
                  </a>
                </h4>
              </div>
              <div id="collapseThree" className="panel-collapse" hidden="hidden">
                  <div className="panel-body">
                  <ul>
                    <li>Attendance: 32/32</li>
                    <li>Sponsors: GTOmega, ASRock</li>
                  </ul>

                    <h4>Tournaments:</h4>
                    <ul>
                    <li>3V3 League of Legends</li>
                    <li>2V2 Counter Strike:GO</li>
                    <li>3v3 Overwatch</li>
                    </ul>
                    <h4>Console Corner</h4>
                    <ul>
                      <li>1v1 INJUSTICE: Gods among us</li>
                    </ul>
                  </div>
              </div>
          </div>


              <div className="panel panel-default">
                  <div className="panel-heading" role="tab" id="headingTwo">
                    <h4 className="panel-title" onClick={()=>{this.showPanel("collapseTwo")}}>
                      <a className="collapsed">
                         ScotLAN #2! Event info
                      </a>
                    </h4>
                  </div>
                  <div id="collapseTwo" className="panel-collapse" hidden="hidden">
                      <div className="panel-body">
                      <ul>
                        <li>Attendance: 32/32</li>
                        <li>Sponsors: GTOmega, Crucial, ASRock</li>
                      </ul>
                        <h4>Tournaments:</h4>
                        <ul>
                          <li>Counter Strike Global Offensive 2v2 - Double Elimination.</li>
                          <li>Overwatch 3v3 - Double Elimination.</li>
                        </ul>
                        <h4>Console Corner</h4>
                        <ul>
                          <li>Nintendo 64 Mario Kart Tournament (TV - Retro Consoles)</li>
                        </ul>
                      </div>
                  </div>
              </div>

              <div className="panel panel-default">
                  <div className="panel-heading" role="tab" id="headingOne">
                    <h4 className="panel-title" onClick={()=>{this.showPanel("collapseOne")}}>
                      <a className="collapsed">
                       ScotLAN #1! Event info
                      </a>
                    </h4>
                  </div>
                  <div id="collapseOne" className="panel-collapse" hidden="hidden">
                      <div className="panel-body">
                      <ul>
                        <li>Attendance: 32/32</li>
                        <li>Sponsors: Crucial</li>
                      </ul>
                        <h4>Tournaments:</h4>
                        <ul>
                          <li>Trackmania Nations Forever - Fastest lap of the weekend</li>
                        <li>Overwatch 2v2's</li>
                        <li>Left 4 Dead 2</li>
                          <li>League of Legends</li>
                        </ul>
                        <h4>Console Corner</h4>
                        <ul>
                          <li>1v1 INJUSTICE: Gods among us</li>
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
    );
  }
}
