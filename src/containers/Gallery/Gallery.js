import React, { Component } from "react";
import "./Gallery.css";

export default class Gallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div class="sl--sitecontainer--background__keyboard">
        <div className="container">
        <div class="flickrwrap">
        <a data-flickr-embed="true" data-context="true"  href="https://www.flickr.com/photos/169239453@N02/45826757145/in/album-72157704281720421/" title="ScotLAN1-1-3"><img src="https://farm5.staticflickr.com/4915/45826757145_d99d7c50cb_z.jpg" width="100%" height="600" alt="ScotLAN1-1-3"/></a>
        </div>
        </div>
      </div>
    );
  }
}
