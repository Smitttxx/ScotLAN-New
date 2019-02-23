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
      <div className="keyboard-background">
        <div className="section-container">
          <div className="section-container-keyboard">
        <div className="container">
          <h2 class="product-heading">Previous Events<span class="text-muted"></span></h2>
          <div>


          <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">

          <div className="panel panel-default">
              <div className="panel-heading" role="tab" id="headingOne">
                <h4 className="panel-title" onClick={()=>{this.showPanel("collapseOne")}}>
                  <a className="collapsed">
                     ScotLAN #XMAS! Event info
                  </a>
                </h4>
              </div>
              <div id="collapseOne" className="panel-collapse" hidden="hidden">
                  <div className="panel-body">
                  <ul>
                    <li>Attendance: 32/32</li>
                    <li>Sponsors: GTOmega, ASRock</li>
                  </ul>

                    <h4>Tournaments:</h4>
                    <ul>
                    <li>3V3 League of Legends</li>
                    <li>2V2 Counter Strike:GO</li>
                    <li>3v3 Overwatch</li>
                    </ul>
                    <h4>CONSOLE CORNER</h4>
                    <ul>
                    <li>1v1 INJUSTICE: Gods among us</li>
                    </ul>
                  </div>
              </div>
          </div>


              <div className="panel panel-default">
                  <div className="panel-heading" role="tab" id="headingTwo">
                    <h4 className="panel-title" onClick={()=>{this.showPanel("collapseTwo")}}>
                      <a className="collapsed">
                         ScotLAN #2! Event info
                      </a>
                    </h4>
                  </div>
                  <div id="collapseTwo" className="panel-collapse" hidden="hidden">
                      <div className="panel-body">
                      <ul>
                        <li>Attendance: 32/32</li>
                        <li>Sponsors: GTOmega, Crucial, ASRock</li>
                      </ul>
                        <h4>Tournaments:</h4>
                        <ul>
                        <li>Counter Strike Global Offensive 2v2 - Double Elimination.</li>
                        <li>Overwatch 3v3 - Double Elimination.</li>
                        </ul>
                        <h4>CONSOLE CORNER</h4>
                        <ul>
                        <li>Nintendo 64 Mario Kart Tournament (TV - Retro Consoles)</li>
                        </ul>
                      </div>
                  </div>
              </div>

              <div className="panel panel-default">
                  <div className="panel-heading" role="tab" id="headingThree">
                    <h4 className="panel-title" onClick={()=>{this.showPanel("collapseThree")}}>
                      <a className="collapsed">
                       ScotLAN #1! Event info
                      </a>
                    </h4>
                  </div>
                  <div id="collapseThree" className="panel-collapse" hidden="hidden">
                      <div className="panel-body">
                      <ul>
                        <li>Attendance: 32/32</li>
                        <li>Sponsors: Crucial</li>
                      </ul>
                        <h4>Tournaments:</h4>
                        <ul>
                        <li>Trackmania Nations Forever - Fastest lap of the weekend</li>
                        <li>Overwatch 2v2's</li>
                        <li>Left 4 Dead 2</li>
                        <li>League of Legends</li>
                        </ul>
                        <h4>CONSOLE CORNER</h4>
                        <ul>
                        <li>1v1 INJUSTICE: Gods among us</li>
                        </ul>
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
