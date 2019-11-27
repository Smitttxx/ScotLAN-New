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
              <p> Click on any of the events below to find out more details about this event and the view the gallery :)! </p>
              <div class="sl-previousevents-grid">
              <a className="sl-previousevents-grid--tile" href="/PreviousEvents/ScotLAN5" role="button">
                <div class="sl-previousevents-card--container">
                <div class="sl-previousevents-card sl-previousevents-card--scotlan5">
                  <div class="sl--backgroundgradient">  </div>
                  <div class="sl-previousevents-card--content">
                    <div class="sl-previousevents-card--header">ScotLAN #5 Big Event!</div>
                    <div class="sl-previousevents-card--info">This event took place on 5th - 7th July 2019</div>
                    <div class="sl-previousevents-card--arrow">
                      <i class="fas fa-long-arrow-alt-right"></i>
                    </div>
                  </div>
                  </div>
                  </div>
                </a>

                <a className="sl-previousevents-grid--tile" href="/PreviousEvents/ScotLAN4" role="button">
                  <div class="sl-previousevents-card--container">
                  <div class="sl-previousevents-card sl-previousevents-card--scotlan4">
                    <div class="sl--backgroundgradient">  </div>
                    <div class="sl-previousevents-card--content">
                      <div class="sl-previousevents-card--header">ScotLAN #4 LevelUP!</div>
                      <div class="sl-previousevents-card--info">This event took place on 15th - 17th Mar 2019</div>
                      <div class="sl-previousevents-card--arrow">
                        <i class="fas fa-long-arrow-alt-right"></i>
                      </div>
                    </div>
                    </div>
                    </div>
                  </a>
                  <a className="sl-previousevents-grid--tile" href="/PreviousEvents/ScotLAN3" role="button">
                    <div class="sl-previousevents-card--container">
                    <div class="sl-previousevents-card sl-previousevents-card--scotlan3">
                      <div class="sl--backgroundgradient">  </div>
                      <div class="sl-previousevents-card--content">
                        <div class="sl-previousevents-card--header">ScotLAN #3 XMAS!</div>
                        <div class="sl-previousevents-card--info">This event took place on 30th Dec - 2nd Nov 2018</div>
                        <div class="sl-previousevents-card--arrow">
                          <i class="fas fa-long-arrow-alt-right"></i>
                        </div>
                      </div>
                      </div>
                      </div>
                    </a>

                <a className="sl-previousevents-grid--tile" href="/PreviousEvents/ScotLAN2" role="button">
                  <div class="sl-previousevents-card--container">
                  <div class="sl-previousevents-card sl-previousevents-card--scotlan2">
                    <div class="sl--backgroundgradient">  </div>
                    <div class="sl-previousevents-card--content">
                      <div class="sl-previousevents-card--header">ScotLAN #2</div>
                      <div class="sl-previousevents-card--info">This event took place on 5th – Sun 7th Oct 2018</div>
                      <div class="sl-previousevents-card--arrow">
                        <i class="fas fa-long-arrow-alt-right"></i>
                      </div>
                    </div>
                    </div>
                    </div>
                  </a>
                  <a className="sl-previousevents-grid--tile" href="/PreviousEvents/ScotLAN1" role="button">
                      <div class="sl-previousevents-card--container">
                      <div class="sl-previousevents-card sl-previousevents-card--scotlan1">
                        <div class="sl--backgroundgradient">  </div>
                        <div class="sl-previousevents-card--content">
                          <div class="sl-previousevents-card--header">ScotLAN #1</div>
                          <div class="sl-previousevents-card--info">This event took place on 11th – 13th May</div>
                          <div class="sl-previousevents-card--arrow">
                            <i class="fas fa-long-arrow-alt-right"></i>
                          </div>
                        </div>
                        </div>
                        </div>
                      </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
