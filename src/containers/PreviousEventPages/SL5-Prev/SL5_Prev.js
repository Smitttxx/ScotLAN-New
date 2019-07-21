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

export default class SL5_Prev extends Component {
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
              <h2 class="product-heading">ScotLAN #5 Big Event!<span class="text-muted"></span></h2>
              <div>Sponsored by GT Omega, Corsair Gaming and Roxys Desserts</div>
              <br/>
              <p> This was ScotLAN's 1st 100+ Man event - Huge thank you to everyone who attended for making this possible.</p>
              <div className="row product--info">
                      <dl>
                        <dt>Gamers: 104 / 104</dt>
                        <dt>Event: Fri 5th July 7pm – Sun 7th July 7pm (48 Hours)</dt>
                        <dt>Address: Woodlands Games Hall, Cochrane St, Falkirk FK1 1QE</dt>
                        <dt><a href="https://www.facebook.com/events/386414302190930/"><strong>ScotLAN #5 Facebook Event</strong></a></dt>
                      </dl>
                </div>
                </div>
                  <div class="gradient-line"></div>
                  <div class="tournament-list">
                          <div class="tournament-list-pc">
                          <div class="sl-previousevents-pcheading header"><i class="fas fa-keyboard"></i> PC Tournaments </div>
                          <dl>
                            <dt>Rocket League 3v3</dt>
                            <dd>Winners - </dd>
                            <dt>CS:GO 5v5</dt>
                            <dd>Winners - </dd>
                            <dt>League of Legends 5v5</dt>
                            <dd>Winners - </dd>
                            <dt>Overwatch 6v6</dt>
                            <dd>Winners - </dd>
                          </dl>
                          </div>
                          <div class="tournament-list-console">
                          <div class="sl-previousevents-consoleheading header"><i class="fas fa-car"></i> Racing Sim provided by GTOmega</div>
                          <dl>
                            <dt>ProjectCars2</dt>
                            <dd>Winner - Unholy</dd>
                          </dl>
                          </div>
                          </div>

              <div class="gradient-line"></div>
              <div class="sl-previousevents-eventinfo">
              <div class="attendance-list">
              <div class="row">
              <div class="sl-previousevents-attendance header"><i class="fas fa-headset"></i> Gamers </div>
              <div className="col-md-8 sl-previousevents-attendance__list">
                <div className="attendance-col attendance-col-1">
                    <div>GigDug       </div>
                    <div>Alan       </div>
                    <div>HenrickCarsson       </div>
                    <div>naim109       </div>
                    <div>Scottish J </div>
                    <div>Tara       </div>
                    <div>GREX       </div>
                    <div>Captain Kirk       </div>
                    <div>KJW2804       </div>
                    <div>1-Man       </div>
                    <div>WJ04       </div>
                    <div>Keeko       </div>
                    <div>Unholy       </div>
                    <div>Renegade Master       </div>
                    <div>Septimvii       </div>
                    <div>Cole       </div>
                    <div>KYLEST       </div>
                    <div>hendo       </div>
                    <div>cthreestar       </div>
                    <div>meffew       </div>
                    <div>Wolfeinstein       </div>
                    <div>Gingie       </div>
                    <div>SGD Taafe       </div>
                    <div>SGD Finray       </div>
                    </div>
                  <div className="attendance-col attendance-col-2">
                    <div>SGD Pablo Escobar       </div>
                    <div>Diz       </div>
                    <div>Jarbjorn       </div>
                    <div>Magestical       </div>
                    <div>P Fitz       </div>
                    <div>Salt BadGuy       </div>
                    <div>Berryman       </div>
                    <div>Raika       </div>
                    <div>Dutchy       </div>
                    <div>Rana       </div>
                    <div>PleaseScanHere       </div>
                    <div>Cubixzz       </div>
                    <div>RenBobertson       </div>
                    <div>SGD Abhi       </div>
                    <div>SGD MattyBroon       </div>
                    <div>SGD Slipshod       </div>
                    <div>SGD Ghost^       </div>
                    <div>SGD Donut       </div>
                    <div>SGD Corin       </div>
                    <div>Baz       </div>
                    <div>Johnheden </div>
                    <div>Rampage       </div>
                    <div>Greeeeeeeeeno       </div>

                  </div>

                  <div className="attendance-col attendance-col-3">
                    <div>Cwj       </div>
                    <div>Kel       </div>
                    <div>Boltstrike11       </div>
                    <div>JMK       </div>
                    <div>EwenAird        </div>
                    <div>L1cas       </div>
                    <div>PresidentNR       </div>
                    <div>Falcon       </div>
                    <div>PiroNess       </div>
                    <div>db       </div>
                    <div>Syon       </div>
                    <div>BigDaddyBumSkelp       </div>
                    <div>Hannibal       </div>
                    <div>Sh4ft       </div>
                    <div>Everlasting       </div>
                    <div>PeterPastry       </div>
                    <div>SitDown       </div>
                    <div>Kyudo       </div>
                    <div>Muckin Finted       </div>
                    <div>Mith       </div>
                    <div>M3RKI       </div>
                    <div>Nocturnal       </div>
                    <div>Pimpatine       </div>
                    <div>DJ_Evil       </div>
                    <div>Chris       </div>
                  </div>

                  <div className="attendance-col attendance-col-4">
                    <div>Phreak       </div>
                    <div>Noblenosenobby       </div>
                    <div>1MyTh       </div>
                    <div>Ezicc       </div>
                    <div>chaos       </div>
                    <div>AndyH       </div>
                    <div>Duffé       </div>
                    <div>left-one       </div>
                    <div>Sunnuld       </div>
                    <div>BeccaHR        </div>
                    <div>crAB       </div>
                    <div>Anegni       </div>
                    <div>JawSlayeR       </div>
                    <div>Bell       </div>
                    <div>Meeky       </div>
                    <div>stephen900       </div>
                    <div>Bane       </div>
                    <div>Floydo       </div>
                    <div>CamDawg       </div>
                    <div>J4M3Z       </div>
                    <div>Kizashee      </div>
                    <div>squiff       </div>
                    <div>xH33PZz       </div>
                    <div>Murray       </div>
                  </div>

                </div>
                <div className="col-md-4 sl-previousevents-attendance__seats">
                      <div className="small-floorplan big-event">
                       <div className="row small-floorplan--areas">
                         <div className="col-lg-12">
                           <div className="small-floorplan--rows">
                             <div className="small-floorplan--block small-floorplan--block--A">
                               <div className="small-floorplan--row small-floorplan--row-1">
                               <Tooltip title='Seat 1 - GigDug'>
                                   <button class="seat seat--taken"></button>
                               </Tooltip>
                               <Tooltip title='Seat 2 - Alan'>
                                   <button class="seat seat--taken"></button>
                               </Tooltip>
                               <Tooltip title='Seat 3 - HenrickCarsson'>
                                   <button class="seat seat--taken"></button>
                               </Tooltip>
                               <Tooltip title='Seat 4 - naim109'>
                                   <button class="seat seat--taken"></button>
                               </Tooltip>
                               <Tooltip title='Seat 5 - Scottish J'>
                                   <button class="seat seat--taken"></button>
                               </Tooltip>
                               <Tooltip title='Seat 6 - Tara'>
                                   <button class="seat seat--taken"></button>
                               </Tooltip>
                               <Tooltip title='Seat 7 - GREX'>
                                   <button class="seat seat--taken"></button>
                               </Tooltip>
                               <Tooltip title='Seat 8 - Captain Kirk'>
                                   <button class="seat seat--taken"></button>
                               </Tooltip>
                               <Tooltip title='Seat 9 - KJW2804'>
                                   <button class="seat seat--taken"></button>
                               </Tooltip>
                               <Tooltip title='Seat 10 - 1-Man'>
                                   <button class="seat seat--taken"></button>
                               </Tooltip>
                               <Tooltip title='Seat 11 - WJ04'>
                                   <button class="seat seat--taken"></button>
                               </Tooltip>
                               <Tooltip title='Seat 12 - Keeko'>
                                   <button class="seat seat--taken"></button>
                               </Tooltip>
                               <Tooltip title='Seat 13 - Unholy'>
                                   <button class="seat seat--taken"></button>
                               </Tooltip>
                               <Tooltip title='Seat 14 - Renegade Master'>
                                   <button class="seat seat--taken"></button>
                               </Tooltip>
                               <Tooltip title='Seat 15 - Septimvii'>
                                   <button class="seat seat--taken"></button>
                               </Tooltip>
                               <Tooltip title='Seat 16 - Cole'>
                                   <button class="seat seat--taken"></button>
                               </Tooltip>
                               </div>
                               <div className="small-floorplan--row large-floorplan--row-2">
                               <Tooltip title='Seat 17 - KYLEST'>
                                   <button class="seat seat--taken"></button>
                               </Tooltip>
                               <Tooltip title='Seat 18 - hendo'>
                                   <button class="seat seat--taken"></button>
                               </Tooltip>
                               <Tooltip title='Seat 19 - cthreestar'>
                                   <button class="seat seat--taken"></button>
                               </Tooltip>
                               <Tooltip title='Seat 20 - meffew'>
                                   <button class="seat seat--taken"></button>
                               </Tooltip>
                               <Tooltip title='Seat 21 - Wolfeinstein'>
                                   <button class="seat seat--taken"></button>
                               </Tooltip>
                               <Tooltip title='Seat 22 - Gingie'>
                                   <button class="seat seat--taken"></button>
                               </Tooltip>
                               <Tooltip title='Seat 23 - SGD Taafe'>
                                   <button class="seat seat--taken"></button>
                               </Tooltip>
                               <Tooltip title='Seat 24 - SGD Finray'>
                                   <button class="seat seat--taken"></button>
                               </Tooltip>
                               <Tooltip title='Seat 25 - SGD Pablo Escobar'>
                                   <button class="seat seat--taken"></button>
                               </Tooltip>
                               <Tooltip title='Seat 26 - Diz'>
                                   <button class="seat seat--taken"></button>
                               </Tooltip>
                               <Tooltip title='Seat 27 - Jarbjorn'>
                                   <button class="seat seat--taken"></button>
                               </Tooltip>
                               <Tooltip title='Seat 28 - Magestical'>
                                   <button class="seat seat--taken"></button>
                               </Tooltip>
                               <Tooltip title='Seat 29 - P Fitz'>
                                   <button class="seat seat--taken"></button>
                               </Tooltip>
                               <Tooltip title='Seat 30 - Salt BadGuy'>
                                   <button class="seat seat--taken"></button>
                               </Tooltip>
                               <Tooltip title='Seat 31 - Berryman'>
                                   <button class="seat seat--taken"></button>
                               </Tooltip>
                               <Tooltip title='Seat 32 - Raika'>
                                   <button class="seat seat--taken"></button>
                               </Tooltip>
                               </div>
                             </div>
                             <div className="small-floorplan--block large-floorplan--block--B">
                               <div className="small-floorplan--row large-floorplan--row-3 ">
                               <Tooltip title='Seat 33 - Dutchy'>
                                   <button class="seat seat--taken"></button>
                               </Tooltip>
                               <Tooltip title='Seat 34 - Rana'>
                                   <button class="seat seat--taken"></button>
                               </Tooltip>
                               <Tooltip title='Seat 35 - PleaseScanHere'>
                                   <button class="seat seat--taken"></button>
                               </Tooltip>
                               <Tooltip title='Seat 36 - Cubixzz'>
                                   <button class="seat seat--taken"></button>
                               </Tooltip>
                               <Tooltip title='Seat 37 - RenBobertson'>
                                   <button class="seat seat--taken"></button>
                               </Tooltip>
                               <Tooltip title='Seat 38 - SGD Abhi'>
                                   <button class="seat seat--taken"></button>
                               </Tooltip>
                               <Tooltip title='Seat 39 - SGD MattyBroon'>
                                   <button class="seat seat--taken"></button>
                               </Tooltip>
                               <Tooltip title='Seat 40 - SGD Slipshod'>
                                   <button class="seat seat--taken"></button>
                               </Tooltip>
                               <Tooltip title='Seat 41 - SGD Ghost^'>
                                   <button class="seat seat--taken"></button>
                               </Tooltip>
                               <Tooltip title='Seat 42 - SGD Donut'>
                                   <button class="seat seat--taken"></button>
                               </Tooltip>
                               <Tooltip title='Seat 43 - SGD Corin'>
                                   <button class="seat seat--taken"></button>
                               </Tooltip>
                               <Tooltip title='Seat 44 - Baz'>
                                   <button class="seat seat--taken"></button>
                               </Tooltip>
                               <Tooltip title='Seat 45 - Johnheden#'>
                                   <button class="seat seat--taken"></button>
                               </Tooltip>
                               <Tooltip title='Seat 46 - Rampage'>
                                   <button class="seat seat--taken"></button>
                               </Tooltip>
                               <Tooltip title='Seat 47 - Greeeeeeeeeno'>
                                   <button class="seat seat--taken"></button>
                               </Tooltip>
                               <Tooltip title='Seat 48 - Cwj'>
                                   <button class="seat seat--taken"></button>
                               </Tooltip>
                               </div>
                               <div className="small-floorplan--row large-floorplan--row-4">
                               <Tooltip title='Seat 49 - Kel'>
                                   <button class="seat seat--taken"></button>
                               </Tooltip>
                               <Tooltip title='Seat 50 - Boltstrike11'>
                                   <button class="seat seat--taken"></button>
                               </Tooltip>
                               <Tooltip title='Seat 51 - JMK'>
                                   <button class="seat seat--taken"></button>
                               </Tooltip>
                               <Tooltip title='Seat 52 - EwenAird '>
                                   <button class="seat seat--taken"></button>
                               </Tooltip>
                               <Tooltip title='Seat 53 - L1cas'>
                                   <button class="seat seat--taken"></button>
                               </Tooltip>
                               <Tooltip title='Seat 54 - PresidentNR'>
                                   <button class="seat seat--taken"></button>
                               </Tooltip>
                               <Tooltip title='Seat 55 - Falcon'>
                                   <button class="seat seat--taken"></button>
                               </Tooltip>
                               <Tooltip title='Seat 56 - PiroNess'>
                                   <button class="seat seat--taken"></button>
                               </Tooltip>
                               <Tooltip title='Seat 57 - db'>
                                   <button class="seat seat--taken"></button>
                               </Tooltip>
                               <Tooltip title='Seat 58 - Syon'>
                                   <button class="seat seat--taken"></button>
                               </Tooltip>
                               <Tooltip title='Seat 59 - BigDaddyBumSkelp'>
                                   <button class="seat seat--taken"></button>
                               </Tooltip>
                               <Tooltip title='Seat 60 - Hannibal'>
                                   <button class="seat seat--taken"></button>
                               </Tooltip>
                               <Tooltip title='Seat 61 - Sh4ft'>
                                   <button class="seat seat--taken"></button>
                               </Tooltip>
                               <Tooltip title='Seat 62 - Everlasting'>
                                   <button class="seat seat--taken"></button>
                               </Tooltip>
                               <Tooltip title='Seat 63 - PeterPastry'>
                                   <button class="seat seat--taken"></button>
                               </Tooltip>
                               <Tooltip title='Seat 64 - SitDown'>
                                   <button class="seat seat--taken"></button>
                               </Tooltip>
                               </div>
                               </div>
                               <div className="small-floorplan--block small-floorplan--block--C">
                                 <div className="small-floorplan--row small-floorplan--row-1">
                                 <Tooltip title='Seat 65 - Kyudo'>
                                     <button class="seat seat--taken"></button>
                                 </Tooltip>
                                 <Tooltip title='Seat 66 - Muckin Finted'>
                                     <button class="seat seat--taken"></button>
                                 </Tooltip>
                                 <Tooltip title='Seat 67 - Mith'>
                                     <button class="seat seat--taken"></button>
                                 </Tooltip>
                                 <Tooltip title='Seat 68 - M3RKI'>
                                     <button class="seat seat--taken"></button>
                                 </Tooltip>
                                 <Tooltip title='Seat 69 - Nocturnal'>
                                     <button class="seat seat--taken"></button>
                                 </Tooltip>
                                 <Tooltip title='Seat 70 - Pimpatine'>
                                     <button class="seat seat--taken"></button>
                                 </Tooltip>
                                 <Tooltip title='Seat 71 - DJ_Evil'>
                                     <button class="seat seat--taken"></button>
                                 </Tooltip>
                                 <Tooltip title='Seat 72 - Chris'>
                                     <button class="seat seat--taken"></button>
                                 </Tooltip>
                                 <Tooltip title='Seat 73 - Phreak'>
                                     <button class="seat seat--taken"></button>
                                 </Tooltip>
                                 <Tooltip title='Seat 74 - Noblenosenobby'>
                                     <button class="seat seat--taken"></button>
                                 </Tooltip>
                                 <Tooltip title='Seat 75 - 1MyTh'>
                                     <button class="seat seat--taken"></button>
                                 </Tooltip>
                                 <Tooltip title='Seat 76 - Ezicc'>
                                     <button class="seat seat--taken"></button>
                                 </Tooltip>
                                 <Tooltip title='Seat 77 - chaos'>
                                     <button class="seat seat--taken"></button>
                                 </Tooltip>
                                 <Tooltip title='Seat 78 - AndyH'>
                                     <button class="seat seat--taken"></button>
                                 </Tooltip>
                                 <Tooltip title='Seat 79 - Duffé'>
                                     <button class="seat seat--taken"></button>
                                 </Tooltip>
                                 <Tooltip title='Seat 80 - left-one'>
                                     <button class="seat seat--taken"></button>
                                 </Tooltip>
                                 </div>
                                 <div className="small-floorplan--row large-floorplan--row-2">
                                 <Tooltip title='Seat 81 - Sunnuld'>
                                     <button class="seat seat--taken"></button>
                                 </Tooltip>
                                 <Tooltip title='Seat 82 - BeccaHR '>
                                     <button class="seat seat--taken"></button>
                                 </Tooltip>
                                 <Tooltip title='Seat 83 - crAB'>
                                     <button class="seat seat--taken"></button>
                                 </Tooltip>
                                 <Tooltip title='Seat 84 - Anegni'>
                                     <button class="seat seat--taken"></button>
                                 </Tooltip>
                                 <Tooltip title='Seat 85 - JawSlayeR'>
                                     <button class="seat seat--taken"></button>
                                 </Tooltip>
                                 <Tooltip title='Seat 86 - Bell'>
                                     <button class="seat seat--taken"></button>
                                 </Tooltip>
                                 <Tooltip title='Seat 87 - Meeky'>
                                     <button class="seat seat--taken"></button>
                                 </Tooltip>
                                 <Tooltip title='Seat 88 - stephen900'>
                                     <button class="seat seat--taken"></button>
                                 </Tooltip>
                                 <Tooltip title='Seat 89 - Bane'>
                                     <button class="seat seat--taken"></button>
                                 </Tooltip>
                                 <Tooltip title='Seat 90 - Floydo'>
                                     <button class="seat seat--taken"></button>
                                 </Tooltip>
                                 <Tooltip title='Seat 91 - CamDawg'>
                                     <button class="seat seat--taken"></button>
                                 </Tooltip>
                                 <Tooltip title='Seat 92 - J4M3Z'>
                                     <button class="seat seat--taken"></button>
                                 </Tooltip>
                                 <Tooltip title='Seat 93 - Kizashee'>
                                     <button class="seat seat--taken"></button>
                                 </Tooltip>
                                 <Tooltip title='Seat 94 - squiff'>
                                     <button class="seat seat--taken"></button>
                                 </Tooltip>
                                 <Tooltip title='Seat 95 - xH33PZz'>
                                     <button class="seat seat--taken"></button>
                                 </Tooltip>
                                 <Tooltip title='Seat 96 - Murray'>
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
