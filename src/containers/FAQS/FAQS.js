import React, { Component } from "react";
import {  FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Link } from "react-router-dom";
import LoaderButton from "../../components/LoaderButton";

export default class FAQS extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div class="sl--sitecontainer--background__keyboard">
        <div className="container">
      <div className="container SL-FAQS">
        <h2> FAQ </h2>
          <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">

              <div className="panel panel-default">
                  <div className="panel-heading" role="tab" id="headingOne">
                    <h4 className="panel-title">
                      <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                       What is a LAN Party ?
                      </a>
                    </h4>
                  </div>
                  <div id="collapseOne" className="panel-collapse" role="tabpanel" aria-labelledby="headingOne">
                      <div className="panel-body">A LAN Party is an event where you take your computer to our venue, hook them up on a high speed network and play video games with and against each other for a weekend.</div>
                  </div>
              </div>


              <div className="panel panel-default">
                  <div className="panel-heading" role="tab" id="headingTwo">
                    <h4 className="panel-title">
                      <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                        What games do you play ?
                      </a>
                    </h4>
                  </div>
                  <div id="collapseTwo" className="panel-collapse" role="tabpanel" aria-labelledby="headingTwo">
                      <div className="panel-body">Feel free to play any game you like, hop over to our <a href="https://www.facebook.com/groups/555722601438031/">Facebook</a>
          page or jump on <a href="https://discordapp.com/invite/RMvrJr?utm_source=Discord%20Widget&amp;utm_medium=Connect">Discord</a> if you would like to suggest any tournaments or group games!</div>
                  </div>
              </div>


              <div className="panel panel-default">
                  <div className="panel-heading" role="tab" id="headingThree">
                    <h4 className="panel-title">
                      <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="true" aria-controls="collapseThree">
                        What about board games?
                      </a>
                    </h4>
                  </div>
                  <div id="collapseThree" className="panel-collapse" role="tabpanel" aria-labelledby="headingThree">
                      <div className="panel-body">We bring a selection of board games but feel free to bring any board games with you, just keep calm when someone beats you at your own game!</div>
                  </div>
              </div>


              <div className="panel panel-default">
                  <div className="panel-heading" role="tab" id="headingFour">
                    <h4 className="panel-title">
                      <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseFour" aria-expanded="true" aria-controls="collapseFour">
                      Can I take two monitors ?
                      </a>
                    </h4>
                  </div>
                  <div id="collapseFour" className="panel-collapse" role="tabpanel" aria-labelledby="headingFour">
                      <div className="panel-body">Yes. For a small fee of £5, we allow certain extra appliances that other LAN’s do not. You can have one extra low current device at your desk, such as a second monitor,
          a laptop, a mini fridge, a desk fan, an xbox 360. This is also providing that you don’t intrude onto your neighbours desk.
          If you are unsure if your device is low current or not, ask.</div>
                  </div>
              </div>



              <div className="panel panel-default">
                  <div className="panel-heading" role="tab" id="headingFive">
                    <h4 className="panel-title">
                      <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseFive" aria-expanded="true" aria-controls="collapseFive">
                        Can I bring my own server?
                      </a>
                    </h4>
                  </div>
                  <div id="collapseFive" className="panel-collapse" role="tabpanel" aria-labelledby="headingFive">
                      <div className="panel-body"> Yes. For a fee of £5 to cover electricity and network connection we can provide space for your server at the event. Please contact the staff prior to the event before doing this however.</div>
                  </div>
              </div>



              <div className="panel panel-default">
                  <div className="panel-heading" role="tab" id="headingSix">
                    <h4 className="panel-title">
                      <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseSix" aria-expanded="true" aria-controls="collapseSix">
                        Who runs ScotLAN ?
                      </a>
                    </h4>
                  </div>
                  <div id="collapseSix" className="panel-collapse" role="tabpanel" aria-labelledby="headingSix">
                      <div className="panel-body"> ScotLAN is run by a group volunteers who give up their time freely to plan, organise and run the event.</div>
                  </div>
              </div>



              <div className="panel panel-default">
                  <div className="panel-heading" role="tab" id="headingSeven">
                    <h4 className="panel-title">
                      <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseSeven" aria-expanded="true" aria-controls="collapseSeven">
                        Are there any age limits?
                      </a>
                    </h4>
                  </div>
                  <div id="collapseSeven" className="panel-collapse" role="tabpanel" aria-labelledby="headingSeven">
                      <div className="panel-body">There are no age limits to the event however anyone under 16 will require a signed parental consent form prior to attending the event.
            Please send a message to us on Facebook or e-mail info@scotlan.events for more information.</div>
                  </div>
              </div>



              <div className="panel panel-default">
                  <div className="panel-heading" role="tab" id="headingEight">
                    <h4 className="panel-title">
                      <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseEight" aria-expanded="true" aria-controls="collapseEight">
                        CWhat facilities are there available ?
                      </a>
                    </h4>
                  </div>
                  <div id="collapseEight" className="panel-collapse" role="tabpanel" aria-labelledby="headingEight">
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
                    <h4 className="panel-title">
                      <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseNine" aria-expanded="true" aria-controls="collapseNine">
                        Does Steam work on your LAN ?
                      </a>
                    </h4>
                  </div>
                  <div id="collapseNine" className="panel-collapse" role="tabpanel" aria-labelledby="headingNine">
                      <div className="panel-body"> Yes. Steam works on our LAN just fine. Our Internet connection should mean that you always have access to your games collection.
          However, you must update all your games before coming to the LAN. The number one cause of lost game time at LAN’s is software that is not up to date.
          So do your part by updating your games before the event. You may not get a chance to do it at the event, as I shall now explain.</div>
                  </div>
              </div>



              <div className="panel panel-default">
                  <div className="panel-heading" role="tab" id="headingTen">
                    <h4 className="panel-title">
                      <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseTen" aria-expanded="true" aria-controls="collapseTen">
                        Can you tell me more about your Internet connection?
                      </a>
                    </h4>
                  </div>
                  <div id="collapseTen" className="panel-collapse" role="tabpanel" aria-labelledby="headingTen">
                      <div className="panel-body"> At ScotLAN we have an FTTC internet connection which is exclusively used by us.This means that we are able to have a fairly large download limit but this is monitored by the staff as we can quite easily and quickly go through the bandwidth that we have allocated.
            Priority for download usage is given to games that require an online log in and also to any updates to games that may take place over the course of the event.
            While attending a ScotLAN event the staff have the right to refuse internet connection to anyone who is caught misusing or abusing our connection.this may also result in the guilty party being asked to leave the event.</div>
                  </div>
              </div>



              <div className="panel panel-default">
                  <div className="panel-heading" role="tab" id="headingEleven">
                    <h4 className="panel-title">
                      <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseEleven" aria-expanded="true" aria-controls="collapseEleven">
                        What if I need to download a large patch for a game.
                      </a>
                    </h4>
                  </div>
                  <div id="collapseEleven" className="panel-collapse" role="tabpanel" aria-labelledby="headingEleven">
                      <div className="panel-body"> Please approach a member of staff and let us know as Supported games will be available for install from our local Steam content cache or available from a backup folder.</div>
                  </div>
              </div>



              <div className="panel panel-default">
                  <div className="panel-heading" role="tab" id="headingTwelve">
                    <h4 className="panel-title">
                      <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseTwelve" aria-expanded="true" aria-controls="collapseTwelve">
                        What electrical appliances are not allowed at ScotLAN?
                      </a>
                    </h4>
                  </div>
                  <div id="collapseTwelve" className="panel-collapse" role="tabpanel" aria-labelledby="headingTwelve">
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
                    <h4 className="panel-title">
                      <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseThirteen" aria-expanded="true" aria-controls="collapseThirteen">
                        Can I take my own food and drink ?
                      </a>
                    </h4>
                  </div>
                  <div id="collapseThirteen" className="panel-collapse" role="tabpanel" aria-labelledby="headingThirteen">
                      <div className="panel-body"> You need to take your own food and drink for the entire event. Keep in mind that the only things available to cook with is the microwave and kettle,
              and there is no chilled storage available for food. So plan accordingly.There is also plenty space outside to have a BBQ if you want.
              ScotLAN do provide a ordering facility for one of the nights and a link is posted online closer to the event</div>
                  </div>
              </div>



              <div className="panel panel-default">
                  <div className="panel-heading" role="tab" id="headingFourteen">
                    <h4 className="panel-title">
                      <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseFourteen" aria-expanded="true" aria-controls="collapseFourteen">
                        Is alcohol allowed?
                      </a>
                    </h4>
                  </div>
                  <div id="collapseFourteen" className="panel-collapse" role="tabpanel" aria-labelledby="headingFourteen">
                      <div className="panel-body"> Providing you’re of legal drinking age then you may bring your own alcohol however no alcohol is sold at the event.</div>
                  </div>
              </div>



              <div className="panel panel-default">
                  <div className="panel-heading" role="tab" id="headingFifteen">
                    <h4 className="panel-title">
                      <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseFifteen" aria-expanded="true" aria-controls="collapseFifteen">
                        Will my equipment be safe ?
                      </a>
                    </h4>
                  </div>
                  <div id="collapseFifteen" className="panel-collapse" role="tabpanel" aria-labelledby="headingFifteen">
                      <div className="panel-body"> We do our best to look after you and your possessions, but ultimately your belongings are your responsibility. Access to the event is closely monitored by staff and only through the one set of doors.</div>
                  </div>
              </div>

              <div className="panel panel-default">
                  <div className="panel-heading" role="tab" id="headingSixteen">
                    <h4 className="panel-title">
                      <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseSixteen" aria-expanded="true" aria-controls="collapseSixteen">
                        Is my equipment insured?
                      </a>
                    </h4>
                  </div>
                  <div id="collapseSixteen" className="panel-collapse" role="tabpanel" aria-labelledby="headingSixteen">
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
    );
  }
}
