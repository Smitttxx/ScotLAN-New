import React, { Component } from "react";

export default class WhatToBring extends Component {
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
          <br/><br/><br/>
          <h2 class="product-heading">What to bring<span class="text-muted"></span></h2>
        </div>
      </div>
    );
  }
}
