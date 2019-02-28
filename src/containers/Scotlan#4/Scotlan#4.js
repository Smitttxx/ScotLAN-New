import React, { Component } from "react";
import "./Scotlan#4.css";
import { Redirect } from 'react-router-dom';
import "../../components/Loading.css";
import { API, Auth } from "aws-amplify";
import GoogleMapReact from 'google-map-react';
import { Link, withRouter } from "react-router-dom";
import {  Tooltip } from 'react-tippy';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default class Scotlan4 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      message:"",
      center: {
        lat: 55.995980,
        lng: -3.786270
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

            </div>
          </div>
          </div>
      </div>
    );
  }
}
