import React, { Component } from "react";
import "./Gallery.css";
import {  FormGroup, FormControl, ControlLabel, PanelGroup, Panel } from "react-bootstrap";


export default class Gallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accordian: "collapse1"
    };
  }

  async componentDidMount() {
    window.scrollTo(0, 0);
  }

  showPanel = index => {
    //var hasAttribute = document.getElementById(index).classList.contains('hdn');

    //document.getElementById(index).classList.toggle('hdn');

    //if(hasAttribute) {
  //    document.getElementById(index).removeAttribute("hidden");
  //  } else {
  //    document.getElementById(index).setAttribute("hidden", "hidden");
  //  }

    if(index === "collapse1") {
      document.getElementById("collapse2").classList.add('hdn');
      document.getElementById("collapse3").classList.add('hdn');
      document.getElementById("collapse1").classList.remove('hdn');
      document.getElementById("collapse1").removeAttribute("hidden");
      document.getElementById("collapse2").setAttribute("hidden", "hidden");
      document.getElementById("collapse3").setAttribute("hidden", "hidden");
    } else if(index === "collapse2") {
      document.getElementById("collapse1").classList.add('hdn');
      document.getElementById("collapse3").classList.add('hdn');
      document.getElementById("collapse2").classList.remove('hdn');
      document.getElementById("collapse2").removeAttribute("hidden");
      document.getElementById("collapse1").setAttribute("hidden", "hidden");
      document.getElementById("collapse3").setAttribute("hidden", "hidden");
    } else if(index === "collapse3") {
      document.getElementById("collapse2").classList.add('hdn');
      document.getElementById("collapse1").classList.add('hdn');
      document.getElementById("collapse3").classList.remove('hdn');
      document.getElementById("collapse3").removeAttribute("hidden");
      document.getElementById("collapse2").setAttribute("hidden", "hidden");
      document.getElementById("collapse1").setAttribute("hidden", "hidden");
    }
  }


  render() {
    return (
      <div className="keyboard-background">
        <div className="section-container">
          <div className="section-container-keyboard">
          <div className="container">
            <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                <div className="panel panel-default">
                    <div className="panel-heading" role="tab" id="heading1">
                      <h4 className="panel-title" onClick={()=>{this.showPanel("collapse1")}}>
                        <a className="collapsed">
                         ScotLAN #XMAS!
                        </a>
                      </h4>
                    </div>
                    <div id="collapse1" className="panel-collapse">
                        <div className="panel-body">
                        <p> This event was hosted on 30th November 2018 until 2nd December 2018 for more info on this visit our <a href="https://newsite.scotlan.events/PreviousEvents">previous events</a> page. </p>
                          <div class="flickrwrap">
                          <a data-flickr-embed="true" data-context="true"  href="https://www.flickr.com/photos/169239453@N02/46457647384/in/album-72157689914909123/lightbox/" title="1P5A6538-edit"><img src="https://farm8.staticflickr.com/7891/46457647384_548c870aca_b.jpg" width="100%" height="658" alt="1P5A6538-edit"/></a>
                          </div>
                        </div>
                    </div>
                </div>

                <div className="panel panel-default">
                    <div className="panel-heading" role="tab" id="heading2">
                      <h4 className="panel-title" onClick={()=>{this.showPanel("collapse2")}}>
                        <a className="collapsed">
                          ScotLAN #2!
                        </a>
                      </h4>
                    </div>
                    <div id="collapse2" className="panel-collapse hdn">
                        <div className="panel-body">
                        <p> This event was hosted on 5th October 2018 until 7th October 2018 for more info on this visit our <a href="https://newsite.scotlan.events/PreviousEvents">previous events</a> page. </p>
                          <div class="flickrwrap">
                            <a data-flickr-embed="true" data-context="true"  href="https://www.flickr.com/photos/169239453@N02/47180943371/in/album-72157706887224065/lightbox/" title="1P5A6387"><img src="https://farm8.staticflickr.com/7846/47180943371_22dcb0b701_b.jpg" width="100%" height="683" alt="1P5A6387"/></a>
                          </div>
                        </div>
                    </div>
                </div>

                <div className="panel panel-default">
                    <div className="panel-heading" role="tab" id="heading3">
                      <h4 className="panel-title" onClick={()=>{this.showPanel("collapse3")}}>
                        <a className="collapsed">
                          ScotLAN #1!
                        </a>
                      </h4>
                    </div>
                    <div id="collapse3" className="panel-collapse hdn">
                        <div className="panel-body">
                          <p> This event was hosted on 11th May 2018 until 13th May 2018 for more info on this visit our <a href="https://newsite.scotlan.events/PreviousEvents">previous events</a> page. </p>
                          <div class="flickrwrap">
                          <a data-flickr-embed="true" data-context="true"  href="https://www.flickr.com/photos/169239453@N02/32239129327/in/album-72157703583427312/lightbox/" title="ScotLAN1-1-3"><img src="https://farm8.staticflickr.com/7890/32239129327_12cbd06905_b.jpg" width="100%" height="600" alt="ScotLAN1-1-3"/></a>
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
