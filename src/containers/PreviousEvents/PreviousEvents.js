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
          <h2 class="product-heading">Previous Events<span class="text-muted"></span></h2>
          <div>


          <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">

          <div className="panel panel-default">
              <div className="panel-heading" role="tab" id="headingOne">
                <h4 className="panel-title" onClick={()=>{this.showPanel("collapseOne")}}>
                  <a className="collapsed">
                     ScotLAN #XMAS! Event info + Tourny winners
                  </a>
                </h4>
              </div>
              <div id="collapseOne" className="panel-collapse" hidden="hidden">
                  <div className="panel-body">
                    Attendance: 32/33
                    Sponsors: GTOmega, ASRock

                    Tournaments:
                    PC
                    3V3 League of Legends
                    2V2 Counter Strike:GO
                    3v3 Overwatch

                    CONSOLE CORNER
                    1v1 INJUSTICE: Gods among us
                  </div>
              </div>
          </div>


              <div className="panel panel-default">
                  <div className="panel-heading" role="tab" id="headingTwo">
                    <h4 className="panel-title" onClick={()=>{this.showPanel("collapseTwo")}}>
                      <a className="collapsed">
                         ScotLAN #2! Event info + Tourny winners
                      </a>
                    </h4>
                  </div>
                  <div id="collapseTwo" className="panel-collapse" hidden="hidden">
                      <div className="panel-body">
                      Attendance: 32/33
                      Sponsors: GTOmega, Crucial, ASRock
                      Tournaments:
                      PC
                      Counter Strike Global Offensive 2v2 - Double Elimination.
                      Overwatch 3v3 - Double Elimination.

                      CONSOLE CORNER
                      Nintendo 64 Mario Kart Tournament (TV - Retro Consoles)
                      </div>
                  </div>
              </div>

              <div className="panel panel-default">
                  <div className="panel-heading" role="tab" id="headingThree">
                    <h4 className="panel-title" onClick={()=>{this.showPanel("collapseThree")}}>
                      <a className="collapsed">
                       ScotLAN #1! Event info + Tourny winners
                      </a>
                    </h4>
                  </div>
                  <div id="collapseThree" className="panel-collapse" hidden="hidden">
                      <div className="panel-body">
                      Attendance: 32/33
                      Sponsors: Crucial
                      Tournaments:

                      Trackmania Nations Forever - Fastest lap of the weekend
                      Overwatch 2v2's
                      Left 4 Dead 2
                      League of Legends

                      CONSOLE CORNER
                      1v1 INJUSTICE: Gods among us

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
