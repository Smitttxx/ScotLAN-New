import React, { Component } from "react";
import "./Gallery.css";
import {  FormGroup, FormControl, ControlLabel, PanelGroup, Panel } from "react-bootstrap";


export default class Gallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  showPanel = index => {
    var hasAttribute = document.getElementById(index).hasAttribute("hidden");

    if(hasAttribute) {
      document.getElementById(index).removeAttribute("hidden");
    } else {
      document.getElementById(index).setAttribute("hidden", "hidden");
    }
  }


  render() {
    return (
      <div class="sl--sitecontainer--background__keyboard">
        <div className="container">


        <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">

            <div className="panel panel-default">
                <div className="panel-heading" role="tab" id="heading1">
                  <h4 className="panel-title" onClick={()=>{this.showPanel("collapse1")}}>
                    <a className="collapsed">
                     What is a LAN Party ?
                    </a>
                  </h4>
                </div>
                <div id="collapse1" className="panel-collapse" hidden="hidden">
                    <div className="panel-body">
                    <div class="flickrwrap">
                    <a data-flickr-embed="true" data-context="true"  href="https://www.flickr.com/photos/169239453@N02/45826757145/in/album-72157704281720421/" title="ScotLAN1-1-3"><img src="https://farm5.staticflickr.com/4915/45826757145_d99d7c50cb_z.jpg" width="100%" height="600" alt="ScotLAN1-1-3"/></a>
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
