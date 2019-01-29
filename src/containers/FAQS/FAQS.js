import React, { Component } from "react";
import {  FormGroup, FormControl, ControlLabel, PanelGroup, Panel } from "react-bootstrap";
import { Link } from "react-router-dom";
import LoaderButton from "../../components/LoaderButton";

export default class FAQS extends Component {
  constructor(props) {
    super(props);

    this.state = {
       show1: false
    };
  }

  async componentDidMount() {
    window.scrollTo(0, 0)
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
        <h2> FAQ </h2>

          <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">

              <div className="panel panel-default">
                  <div className="panel-heading" role="tab" id="headingOne">
                    <div className="panel-title" onClick={()=>{this.showPanel("collapseOne")}}>
                      <a className="collapsed">
                       What is a LAN Party ?
                      </a>
                    </div>
                  </div>
                  <div id="collapseOne" className="panel-collapse" hidden="hidden">
                      <div className="panel-body">A LAN Party is an event where you take your computer to our venue, hook them up on a high speed network and play video games with and against each other for a weekend.</div>
                  </div>
              </div>


              <div className="panel panel-default">
                  <div className="panel-heading" role="tab" id="headingTwo">
                    <div className="panel-title" onClick={()=>{this.showPanel("collapseTwo")}}>
                      <a className="collapsed">
                        What games do you play ?
                      </a>
                    </div>
                  </div>
                  <div id="collapseTwo" className="panel-collapse" hidden="hidden">
                      <div className="panel-body">Feel free to play any game you like, hop over to our <a href="https://www.facebook.com/groups/555722601438031/">Facebook</a>
          page or jump on <a href="https://discordapp.com/invite/RMvrJr?utm_source=Discord%20Widget&amp;utm_medium=Connect">Discord</a> if you would like to suggest any tournaments or group games!</div>
                  </div>
              </div>


              <div className="panel panel-default">
                  <div className="panel-heading" role="tab" id="headingThree">
                    <div className="panel-title" onClick={()=>{this.showPanel("collapseThree")}}>
                      <a className="collapsed">
                        What about board games?
                      </a>
                    </div>
                  </div>
                  <div id="collapseThree" className="panel-collapse" hidden="hidden">
                      <div className="panel-body">We bring a selection of board games but feel free to bring any board games with you, just keep calm when someone beats you at your own game!</div>
                  </div>
              </div>


              <div className="panel panel-default">
                  <div className="panel-heading" role="tab" id="headingFour">
                    <div className="panel-title" onClick={()=>{this.showPanel("collapseFour")}}>
                      <a className="collapsed">
                      Can I take two monitors ?
                      </a>
                    </div>
                  </div>
                  <div id="collapseFour" className="panel-collapse" hidden="hidden">
                      <div className="panel-body">Yes. For a small fee of £5, we allow certain extra appliances that other LAN’s do not. You can have one extra low current device at your desk, such as a second monitor,
          a laptop, a mini fridge, a desk fan, an xbox 360. This is also providing that you don’t intrude onto your neighbours desk.
          If you are unsure if your device is low current or not, ask.</div>
                  </div>
              </div>



              <div className="panel panel-default">
                  <div className="panel-heading" role="tab" id="headingFive">
                    <div className="panel-title" onClick={()=>{this.showPanel("collapseFive")}}>
                      <a className="collapsed">
                        Can I bring my own server?
                      </a>
                    </div>
                  </div>
                  <div id="collapseFive" className="panel-collapse" hidden="hidden">
                      <div className="panel-body"> Yes. For a fee of £5 to cover electricity and network connection we can provide space for your server at the event. Please contact the staff prior to the event before doing this however.</div>
                  </div>
              </div>



              <div className="panel panel-default">
                  <div className="panel-heading" role="tab" id="headingSix">
                    <div className="panel-title" onClick={()=>{this.showPanel("collapseSix")}}>
                      <a className="collapsed" data-toggle="collapse">
                        Who runs ScotLAN ?
                      </a>
                    </div>
                  </div>
                  <div id="collapseSix" className="panel-collapse" hidden="hidden">
                      <div className="panel-body"> ScotLAN is run by a group volunteers who give up their time freely to plan, organise and run the event.</div>
                  </div>
              </div>



              <div className="panel panel-default">
                  <div className="panel-heading" role="tab" id="headingSeven">
                    <div className="panel-title" onClick={()=>{this.showPanel("collapseSeven")}}>
                      <a className="collapsed">
                        Are there any age limits?
                      </a>
                    </div>
                  </div>
                  <div id="collapseSeven" className="panel-collapse" hidden="hidden">
                      <div className="panel-body">There are no age limits to the event however anyone under 16 will require a signed parental consent form prior to attending the event.
            Please send a message to us on Facebook or e-mail info@scotlan.events for more information.</div>
                  </div>
              </div>



              <div className="panel panel-default">
                  <div className="panel-heading" role="tab" id="headingEight">
                    <div className="panel-title" onClick={()=>{this.showPanel("collapseEight")}}>
                      <a className="collapsed">
                        CWhat facilities are there available ?
                      </a>
                    </div>
                  </div>
                  <div id="collapseEight" className="panel-collapse" hidden="hidden">
                      <div className="panel-body">
                        We have a wide range of facilities available for your convenience. We have all the following available.
                                  <ul>
                                    <li>
                                      Kitchen with access to a kettle and microwave, open 24/7 for your convenience.
                                    </li>
                                    <li>
                                      Background music
                                    </li>
                                    <li>
                                      Pizza Delivery on Saturday Nights Which is delivered to your desk.
                                    </li>
                                    <li>
                                      Fridge space is available but limited only to those who need to keep medicine or other essential items chilled.
                                    </li>
                                  </ul>
                      </div>
                  </div>
              </div>



              <div className="panel panel-default">
                  <div className="panel-heading" role="tab" id="headingNine">
                    <div className="panel-title" onClick={()=>{this.showPanel("collapseNine")}}>
                      <a className="collapsed">
                        Does Steam work on your LAN ?
                      </a>
                    </div>
                  </div>
                  <div id="collapseNine" className="panel-collapse" hidden="hidden">
                      <div className="panel-body"> Yes. Steam works on our LAN just fine. Our Internet connection should mean that you always have access to your games collection.
          However, you must update all your games before coming to the LAN. The number one cause of lost game time at LAN’s is software that is not up to date.
          So do your part by updating your games before the event. You may not get a chance to do it at the event, as I shall now explain.</div>
                  </div>
              </div>



              <div className="panel panel-default">
                  <div className="panel-heading" role="tab" id="headingTen">
                    <div className="panel-title" onClick={()=>{this.showPanel("collapseTen")}}>
                      <a className="collapsed">
                        Can you tell me more about your Internet connection?
                      </a>
                    </div>
                  </div>
                  <div id="collapseTen" className="panel-collapse" hidden="hidden">
                      <div className="panel-body"> At ScotLAN we have an FTTC internet connection which is exclusively used by us.This means that we are able to have a fairly large download limit but this is monitored by the staff as we can quite easily and quickly go through the bandwidth that we have allocated.
            Priority for download usage is given to games that require an online log in and also to any updates to games that may take place over the course of the event.
            While attending a ScotLAN event the staff have the right to refuse internet connection to anyone who is caught misusing or abusing our connection.this may also result in the guilty party being asked to leave the event.</div>
                  </div>
              </div>



              <div className="panel panel-default">
                  <div className="panel-heading" role="tab" id="headingEleven">
                    <div className="panel-title" onClick={()=>{this.showPanel("collapseEleven")}}>
                      <a className="collapsed">
                        What if I need to download a large patch for a game.
                      </a>
                    </div>
                  </div>
                  <div id="collapseEleven" className="panel-collapse" hidden="hidden">
                      <div className="panel-body"> Please approach a member of staff and let us know as Supported games will be available for install from our local Steam content cache or available from a backup folder.</div>
                  </div>
              </div>



              <div className="panel panel-default">
                  <div className="panel-heading" role="tab" id="headingTwelve">
                    <div className="panel-title" onClick={()=>{this.showPanel("collapseTwelve")}}>
                      <a className="collapsed">
                        What electrical appliances are not allowed at ScotLAN?
                      </a>
                    </div>
                  </div>
                  <div id="collapseTwelve" className="panel-collapse" hidden="hidden">
                      <div className="panel-body">
                        Certain high current electrical devices are not allowed in the main hall. Devices such as.
               <ul>
                 <li>
                     Kettles
                 </li>
                 <li>
                     Fan Heaters
                 </li>
                 <li>
                     Hairdryers / Hair straighteners
                 </li>
               </ul>
             </div>
                  </div>
              </div>



              <div className="panel panel-default">
                  <div className="panel-heading" role="tab" id="headingThirteen">
                    <div className="panel-title" onClick={()=>{this.showPanel("collapseThirteen")}}>
                      <a className="collapsed">
                        Can I take my own food and drink ?
                      </a>
                    </div>
                  </div>
                  <div id="collapseThirteen" className="panel-collapse" hidden="hidden">
                      <div className="panel-body"> You need to take your own food and drink for the entire event. Keep in mind that the only things available to cook with is the microwave and kettle,
              and there is no chilled storage available for food. So plan accordingly.There is also plenty space outside to have a BBQ if you want.
              ScotLAN do provide a ordering facility for one of the nights and a link is posted online closer to the event</div>
                  </div>
              </div>



              <div className="panel panel-default">
                  <div className="panel-heading" role="tab" id="headingFourteen">
                    <div className="panel-title" onClick={()=>{this.showPanel("collapseFourteen")}}>
                      <a className="collapsed">
                        Is alcohol allowed?
                      </a>
                    </div>
                  </div>
                  <div id="collapseFourteen" className="panel-collapse" hidden="hidden">
                      <div className="panel-body"> Providing you’re of legal drinking age then you may bring your own alcohol however no alcohol is sold at the event.</div>
                  </div>
              </div>



              <div className="panel panel-default">
                  <div className="panel-heading" role="tab" id="headingFifteen">
                    <div className="panel-title" onClick={()=>{this.showPanel("collapseFifteen")}}>
                      <a className="collapsed">
                        Will my equipment be safe ?
                      </a>
                    </div>
                  </div>
                  <div id="collapseFifteen" className="panel-collapse" hidden="hidden">
                      <div className="panel-body"> We do our best to look after you and your possessions, but ultimately your belongings are your responsibility. Access to the event is closely monitored by staff and only through the one set of doors.</div>
                  </div>
              </div>

              <div className="panel panel-default">
                  <div className="panel-heading" role="tab" id="headingSixteen">
                    <div className="panel-title" onClick={()=>{this.showPanel("collapseSixteen")}}>
                      <a className="collapsed">
                        Is my equipment insured?
                      </a>
                    </div>
                  </div>
                  <div id="collapseSixteen" className="panel-collapse" hidden="hidden">
                      <div className="panel-body">
                        We hold public liability but insurance is not provided for your equipment, you are advised to make your own insurance arrangements.
                              Some home contents providers will extend policies to cover you at such events. Public Liability insurance is provided, but this is for people not equipment.<br/>
                              Our Public Liability insurance can be found <a href="http://scotlan.events/ScotLAN%20Events-Insurance.pdf" target="_blank" rel="noopener">here</a>.
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
