import React, { Component } from "react";

export default class PreviousEvents extends Component {
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
          <h2 class="product-heading">Previous Events<span class="text-muted"></span></h2>
        </div>
      </div>
    );
  }
}
