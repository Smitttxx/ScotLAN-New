import React, { Component } from "react";
import "./Food.css";
import {  FormGroup, FormControl, ControlLabel, PanelGroup, Panel } from "react-bootstrap";


export default class Food extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  async componentDidMount() {
    window.scrollTo(0, 0);
  }



  render() {
    return (
        <div class="sl--sitecontainer--background__keyboard">
          <div className="container">

          </div>
        </div>
    );
  }
}
