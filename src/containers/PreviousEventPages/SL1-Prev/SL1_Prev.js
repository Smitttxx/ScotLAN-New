import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import GoogleMapReact from 'google-map-react';
import { Link, withRouter } from "react-router-dom";
import {  Tooltip } from 'react-tippy';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Label, FormGroup, FormControl, ControlLabel, Table, Button, Modal } from "react-bootstrap";
import ImageGallery from 'react-image-gallery';
import "../../../../node_modules/react-image-gallery/styles/css/image-gallery.css";

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

export default class SL1_Prev extends Component {
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
    const images1 = [
      {
        original: 'https://scotlansiteimages.s3.eu-west-2.amazonaws.com/sltest/ScotLAN%231/DeskPlacemat.jpg',
        thumbnail: 'https://scotlansiteimages.s3.eu-west-2.amazonaws.com/sltest/ScotLAN%231/DeskPlacemat.jpg',
      },
      {
        original: 'http://lorempixel.com/1000/600/nature/2/',
        thumbnail: 'http://lorempixel.com/250/150/nature/2/'
      },
      {
        original: 'http://lorempixel.com/1000/600/nature/3/',
        thumbnail: 'http://lorempixel.com/250/150/nature/3/'
      }
    ]
    return (
      <div className="keyboard-background">
        <div className="section-container">
          <div className="section-container-keyboard">
            <div className="container sl-previousevents">

            <div class="event-detail-list">
              <h2 class="product-heading">ScotLAN #1<span class="text-muted"></span></h2>
              <div>Sponsored by GT Omega and ASRock</div>

              <div className="row product--info">
                      <dl>
                        <dt>Gamers: 30/32</dt>
                        <dt>Event: Fri 11th May 7pm – Sun 13th May 7pm (48 Hours)</dt>
                        <dt>Address: 31st Pentland (Juniper Green) Scout Hall, 45 Lanark Rd W, Currie EH14 5JX</dt>
                      </dl>
                </div>
                </div>
                  <div class="gradient-line"></div>
                  <div class="tournament-list">
                          <div class="tournament-list-pc">
                          <div class="sl-previousevents-pcheading header"><i class="fas fa-keyboard"></i> PC Tournaments </div>
                          <dl>
                            <dt>Trackmania Nations Forever - Fastest lap of the weekend</dt>
                            <dt>League of Legends 3v3</dt>
                            <dt>Left4Dead2</dt>
                            <dt>Overwatch 2v2</dt>
                          </dl>
                          </div>
                          <div class="tournament-list-console">
                          <div class="sl-previousevents-consoleheading header"><i class="fas fa-gamepad"></i> Console Corner Tournament</div>
                          <dl>
                            <dt>NJUSTICE: Gods among us</dt>
                              <dd>Winner - DotShotGun</dd>
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
                    <div>AndyH </div>
                    <div>Floydo </div>
                    <div>Chaos </div>
                    <div>xH33PZz</div>
                    <div>GMurray</div>
                    <div>DJ_Evil</div>
                    <div>Unholy</div>
                    <div>YTyrellium</div>
                    </div>
                  <div className="attendance-col attendance-col-2">

                    <div>Emperor</div>
                    <div>Rampage</div>
                    <div>Chris</div>
                    <div>Duffy</div>
                    <div>Gnarkill</div>
                    <div>Naim</div>
                    <div>HenrickCarsson</div>
                    <div>Mackenzie</div>
                    <div>CrackerGram</div>
                    <div>SazzleFraz</div>
                  </div>

                  <div className="attendance-col attendance-col-4">
                    <div>Lemming</div>
                    <div>Phreak</div>
                    <div>ScottishJay</div>
                    <div>DarkNinjaZelda</div>
                    <div>Clown Prince</div>
                    <div>Gotty </div>
                    <div>DotShotGun</div>
                    <div>Scott</div>
                    <div>KayCee</div>
                    <div>Carb0n</div>
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
             <Tooltip title='A.4 AndyH'>
                 <button class="seat seat--taken"></button>
             </Tooltip>
             <Tooltip title='A.5 Floydo'>
                 <button class="seat seat--taken"></button>
             </Tooltip>
             <Tooltip title='A.6 Chaos'>
                 <button class="seat seat--taken"></button>
             </Tooltip>
             <Tooltip title='A.7 xH33PZz'>
                 <button class="seat seat--taken"></button>
             </Tooltip>
             <Tooltip title='A.8 GMurray'>
                 <button class="seat seat--taken"></button>
             </Tooltip>
             </div>
             <div className="small-floorplan--row large-floorplan--row-2">
             <Tooltip title='B.1 DJ_Evile'>
                 <button class="seat seat--taken"></button>
             </Tooltip>
             <Tooltip title='B.2 Unholy'>
                 <button class="seat seat--taken"></button>
             </Tooltip>
             <Tooltip title='B.3 YTyrellium'>
                 <button class="seat seat--taken"></button>
             </Tooltip>
             <Tooltip title='B.4 Emperor'>
                 <button class="seat seat--taken"></button>
             </Tooltip>
             <Tooltip title='B.5 Rampage'>
                 <button class="seat seat--taken"></button>
             </Tooltip>
             <Tooltip title='B.6 Chris'>
                 <button class="seat seat--taken"></button>
             </Tooltip>
             <Tooltip title='B.7 A.F.K'>
                 <button class="seat seat--avalible"></button>
             </Tooltip>
             <Tooltip title='B.8 Duffy'>
                 <button class="seat seat--taken"></button>
             </Tooltip>
             </div>
           </div>
           <div className="small-floorplan--block large-floorplan--block--B">
             <div className="small-floorplan--row large-floorplan--row-3 ">
             <Tooltip title='C.1 Gnarkill'>
                 <button class="seat seat--taken"></button>
             </Tooltip>
             <Tooltip title='C.2 Naim'>
                 <button class="seat seat--taken"></button>
             </Tooltip>
             <Tooltip title='C.3 HenrickCarsson'>
                 <button class="seat seat--taken"></button>
             </Tooltip>
             <Tooltip title='C.4 Mackenzie'>
                 <button class="seat seat--taken"></button>
             </Tooltip>
             <Tooltip title='C.5 CrackerGram'>
                 <button class="seat seat--taken"></button>
             </Tooltip>
             <Tooltip title='C.6 SazzleFraz'>
                 <button class="seat seat--taken"></button>
             </Tooltip>
             <Tooltip title='C.7 Lemming'>
                 <button class="seat seat--taken"></button>
             </Tooltip>
             <Tooltip title='C.8 Phreak'>
                 <button class="seat seat--taken"></button>
             </Tooltip>
             </div>
             <div className="small-floorplan--row large-floorplan--row-4">
             <Tooltip title='D.1 ScottishJay'>
                 <button class="seat seat--taken"></button>
             </Tooltip>
             <Tooltip title='D.2 DarkNinjaZelda'>
                 <button class="seat seat--taken"></button>
             </Tooltip>
             <Tooltip title='D.3 Clown Prince'>
                 <button class="seat seat--taken"></button>
             </Tooltip>
             <Tooltip title='D.4 Gotty'>
                 <button class="seat seat--taken"></button>
             </Tooltip>
             <Tooltip title='D.5 DotShotGun'>
                 <button class="seat seat--taken"></button>
             </Tooltip>
             <Tooltip title='D.6 Scott'>
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

                  <div class="gradient-line"></div>
                  <div className="sl-previousevents-gallery">
                  <div class="sl-previousevents-attendance header"><i class="fas fa-camera"></i> ScotLAN #1 Photos! </div>
                                  <ImageGallery items={images1}
                                  slideOnThumbnailOver='true'
                                  showBullets='true'
                                  showIndex='true' />
                                  </div>
              </div>
          </div>
          </div>
        </div>
    );
  }
}
