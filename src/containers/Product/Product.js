import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { Label, FormGroup, FormControl, ControlLabel, Table, Button, Modal } from "react-bootstrap";
import "./Product.css";
import "../../components/Loading.css";
import { API, Auth } from "aws-amplify";
import GoogleMapReact from 'google-map-react';
import { Link, withRouter } from "react-router-dom";
import {  Tooltip } from 'react-tippy';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const AnyReactComponent = ({ text }) => (
  <div style={{
    color: 'white',
    background: 'red',
    padding: '10px 10px',
    display: 'inline-flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100%',
    transform: 'translate(-50%, -50%)'
  }}>
    {text}
  </div>
);


export default class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      message:"",
      quantityStd:"0",
      quantityVip:"0",
      redirectToCheckout: false,
      center: {
        lat: 55.899629,
        lng: -3.296165
      },
      zoom: 16,
      showModal: false,
      seatPlan:[],
      seatPlanByRow:[],
    };
    this.closeModal = this.closeModal.bind(this);
  }
  async componentDidMount() {
      try {
        window.scrollTo(0, 0);
        const product = await this.product();
        this.setState({ product });

        var date = new Date();
        var onSale=new Date(this.state.product.Item.OnSaleDate.S);
        var now = new Date().getTime();
        var distance = onSale - now;
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        var onSaleCountdown = "";

        if ( days > 0) {
          var onSaleCountdown = days + " Days to go!";
        } else if ( days <= 0 && hours >= 1 ) {
          var onSaleCountdown = hours + " Hrs to go!";
        } else {
          var onSaleCountdown = minutes + " Mins to go!";
        }

        console.log(onSaleCountdown);

        this.setState({ onSaleNow: false });
        if(date > onSale) {
            this.setState({ onSaleNow: true });
        }

        this.setState({ soldOut: false });
        if(this.state.product.Item.AvailableQtyVip.N == 0 && this.state.product.Item.AvailableQtyStd.N == 0) {
            this.setState({ soldOut: true });
        }

        this.setState({ isLoading: false });
        const seatPlanData = await this.seatPlan(this.props.match.params.Name);
        this.seatPlanSplit(seatPlanData);
        this.setState({ seatPlan: seatPlanData });
        } catch (e) {
        this.alertPrompt(e);
      }
  }

  product() {
    return API.get("product", `/product?name=${this.props.match.params.Name}&type=${this.props.match.params.Type}`);
  }

  closeModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  seatPlanSplit(seatPlan){
    var seatPlanRowSplit = [];

    //Split seat plan array
    if(seatPlan[0].Seats.L.length === 32) {
      var seatPlanRow1 = seatPlan[0].Seats.L.slice(0,8);
      var seatPlanRow2 = seatPlan[0].Seats.L.slice(8,16);
      var seatPlanRow3 = seatPlan[0].Seats.L.slice(16,24);
      var seatPlanRow4 = seatPlan[0].Seats.L.slice(24,32);

      seatPlanRowSplit.push(seatPlanRow1, seatPlanRow2, seatPlanRow3, seatPlanRow4);
      this.setState({seatPlanByRow: seatPlanRowSplit});
    }
    else {
      var seatPlanRow1 = seatPlan[0].Seats.L.slice(0,16);
      var seatPlanRow2 = seatPlan[0].Seats.L.slice(16,32);
      var seatPlanRow3 = seatPlan[0].Seats.L.slice(32,48);
      var seatPlanRow4 = seatPlan[0].Seats.L.slice(48,64);
      var seatPlanRow5 = seatPlan[0].Seats.L.slice(64,80);
      var seatPlanRow6 = seatPlan[0].Seats.L.slice(80,96);

      //var seatPlanRow1 = seatPlan[0].Seats.L.slice(0,18);
     // var seatPlanRow2 = seatPlan[0].Seats.L.slice(18,36);
      //var seatPlanRow3 = seatPlan[0].Seats.L.slice(36,54);
     // var seatPlanRow4 = seatPlan[0].Seats.L.slice(54,72);
      //var seatPlanRow5 = seatPlan[0].Seats.L.slice(72,90);
      //var seatPlanRow6 = seatPlan[0].Seats.L.slice(90,108);

       seatPlanRowSplit.push(seatPlanRow1, seatPlanRow2, seatPlanRow3, seatPlanRow4, seatPlanRow5, seatPlanRow6);
       this.setState({seatPlanByRow: seatPlanRowSplit});
    }
  }

  async seatPlan(EventName) {
    return API.get("seatPlan", `/seatplan?EventName=${EventName.split(" - ")[0]}`);
  }

  handleChangeStd = event => {
    this.setState({
      quantityStd: event.target.value
    });
  }

  showSeatPlan = async event => {
    const seatPlanData = await this.seatPlan(this.props.match.params.Name);
    this.seatPlanSplit(seatPlanData);
    this.setState({ seatPlan: seatPlanData });
    this.setState({ showModal: true});
  }

  handleChangeVip = event => {
    this.setState({
      quantityVip: event.target.value
    });
  }

  handleSubmit = async event => {

  //product = await this.product();

    event.preventDefault();

    this.setState({ isLoading: true });

    var success = true;
    if(this.state.quantityStd !== "0" || this.state.quantityVip !== "0") {
        if(this.state.quantityStd !== "0") {
        var CheckNumber = /^\d+$/.test(this.state.quantityStd);
        var CheckQty = false;
        if(this.state.quantityStd <= parseInt(this.state.product.Item.AvailableQtyStd.N, 10)) {
          CheckQty = true;
        }
        var CheckPositive = false;

        if(parseInt(this.state.product.Item.AvailableQtyStd.N, 10) > 0) {
          CheckPositive = true;
        }

        if(CheckNumber && CheckQty && CheckPositive) {
          this.props.addToBasket(this.state.product.Item.Name.S + " - Standard;" + this.state.quantityStd + ";" + this.state.product.Item.PriceStd.N + ";" + this.state.product.Item.Type.S);
          this.setState({ message: "Item added to basket" });
        }
        else {
          if(!CheckNumber) {
            this.alertPrompt("Please enter a valid positive number");
            success = false;
          }
          else {
            this.alertPrompt("You have entered a number that exceeds the quantity of standard tickets available");
            success = false;
          }
        }
    }
  ///////////////vip

  if(this.state.quantityVip !== "0") {

      var CheckNumber = /^\d+$/.test(this.state.quantityVip);

      var CheckQty = false;

      if(this.state.quantityVip <= parseInt(this.state.product.Item.AvailableQtyVip.N, 10)) {
        CheckQty = true;
      }

      var CheckPositive = false;

      if(parseInt(this.state.product.Item.AvailableQtyVip.N, 10) > 0) {
        CheckPositive = true;
      }

      if(CheckNumber && CheckQty && CheckPositive) {
        this.props.addToBasket(this.state.product.Item.Name.S + " - VIP;" + this.state.quantityVip + ";" + this.state.product.Item.PriceVip.N + ";" + this.state.product.Item.Type.S);
        this.setState({ message: "Item added to basket" });
      }
      else {
        if(!CheckNumber) {
          this.alertPrompt("Please enter a valid positive number");
          success = false;
        }
        else {
          this.alertPrompt("You have entered a number that exceeds the quantity of VIP tickets available");
          success = false;
          console.log(this.state.quantityVip);
        }
      }
    }

      if(success) {
        this.setState({ redirectToCheckout: true });
      }
      else {
        this.props.clearCheckout();
      }
    }
    else {
      this.alertPrompt("Please use the dropdown to select a quantity of tickets");
    }
    this.setState({ isLoading: false });
  }

  alertPrompt(message) {
    return Swal.fire({
      type: 'warning',
      title: 'Oops...',
      text: message
    })
  }

  render() {
    if(this.state.isLoading)
    {
      return (
        <div class="sl--sitecontainer--background__keyboard">
        <div className="container">
          <div className="loading--text">
            <img src="..\..\Images\Pacman-1s-200px.gif" alt="loading" />
            <h4>Please wait ... We are loading the product</h4>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
          </div>
        </div>
        </div>
      )
    }
    else if(this.state.showModal) {
      return(
          <div>
        <div>
        {this.renderSeatingPlan96Person()}
        </div>
        <div>
        {this.renderProducts(this.state.product)}
        </div>
        </div>
      )
    }
    else if (this.state.redirectToCheckout === true) {
           return <Redirect to="/checkout" />
    }
    else {
    return (
      <div>
      {!this.state.isLoading && this.renderProducts(this.state.product)}
      </div>
    );
  }
}

  renderProducts(product){

      return <div>
                { this.renderProductDetail() }
             </div>
  }

renderProductDetail(){
  if(this.state.product.Item.Type.S === "Event" && this.state.onSaleNow === true) {
    return (
      <div className="keyboard-background">
        <div className="section-container">
          <div className="section-container-keyboard">
  <div className="sl-products--container">
    <div className="container">
      <h2 className="product-heading">{this.state.product.Item.Name.S}<span className="text-muted"></span> {this.state.soldOut && '- SOLD OUT' }</h2>
    <div className="row product--info">
      <p className="lead">Events take place over a 3 day weekend starting on a Friday at 6PM and finishing on a Sunday 6PM so games can be played 24hrs a day, if you have enough energy drinks.</p>
      <div className="col-md-8">
        <li> What you need to know </li>
          <ul>
            <li><strong>Gamers:</strong> {this.state.product.Item.TotalGamers.N} ({parseInt(this.state.product.Item.AvailableQtyStd.N,10) + parseInt(this.state.product.Item.AvailableQtyVip.N,10)} tickets available)</li>
            <li><strong>Event:</strong> {this.state.product.Item.StartDate.S} ??? {this.state.product.Item.EndDate.S} (48 Hours)</li>
            <li><strong>Parking Avalible:</strong> {this.state.product.Item.ParkingAvalible.S} </li>
            <li><strong>Ticket Price:</strong> from ??{this.state.product.Item.PriceStd.N}</li>
            <li><strong>Address:</strong>{this.state.product.Item.Address.S}</li>
          </ul>
      </div>
      <div className="col-md-4">

        <div style={{ height: '200px', width: '100%', border: '5px solid #73D14C' }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key:"AIzaSyBtEhwgBGXTswLFsTCbAFoycaUqby6Irlo" }}
              defaultCenter={this.state.center}
              defaultZoom={this.state.zoom}
            >
              <AnyReactComponent
                lat={55.899629}
                lng={-3.296165}
                text={''}
              />
            </GoogleMapReact>
          </div>
      <button className="btn btn-lg btn-secondary sl-btn sl-btn--secondary sl-btn--seatingplan" onClick={()=>{this.showSeatPlan()}}>View seating plan <i class="fas fa-chair"></i></button>
      </div>
    </div>
      {this.state.soldOut ? (
              <div>
              <br/>
              <br/>
              <h2> SORRY! THIS EVENT IS NOW SOLD OUT - IT'S NO LONGER POSSIBLE TO PURCHASE TICKETS.</h2>
              <br/>
              <p> Sorry you just missed out on all the tickets to the next event but feel free to post in our <a href="https://discordapp.com/invite/pMxdGfk"> Discord </a></p>
              <br/>
              <p>If you managed to secure a ticket for this event, Remember to head over to your account to <Link to={`/orders`}>pick your seat!</Link>.</p>
              <br/>

              </div>
      ) : (
              <div>
              <h2 className="product-heading product-heading-tickets">Choose Your Tickets<span className="text-muted"></span></h2>
              <div className="product--info">
                  <div className="accordion">
                    <div className="row">
                      <div className="col-md-6">
                      <div id="ticket standard" className="ticket standard" aria-expanded="false">
                      <div className="ticket--header">Buy Standard BYOC Tickets</div>
                        <div>Quantity Available : {this.state.product.Item.AvailableQtyStd.N} / {this.state.product.Item.MaxQtyStd.N}</div>
                        This ticket includes:
                        <ul>
                          <li>48 Hour Access to the Event</li>
                          <li>Indoor Sleeping Area</li>
                          <li>1x Ethernet Cable</li>
                          <li>3ft Desk</li>
                        </ul>

                        <label>Choose a quantity of Standard BYOC* tickets</label>
                        <div className="row">
                        <div className="col-md-7">
                        <div class="ribbon-wrapper">
                        <div class="ribbon-front">
                          EARLYBIRD PRICING
                        </div>
                        <div class="ribbon-edge-topleft"></div>
                        <div class="ribbon-edge-topright"></div>
                        <div class="ribbon-edge-bottomleft"></div>
                        <div class="ribbon-edge-bottomright"></div>
                        <div class="ribbon-back-left"></div>
                        <div class="ribbon-back-right"></div>
                        </div>

                        <label className="green ticket--price">Price Per Ticket: <span class="strike"><small>??</small>{this.state.product.Item.DiscountStdPrice.N}</span> <strong><small>??</small>{this.state.product.Item.PriceStd.N}</strong></label>
                        </div>
                        <div className="col-md-5">
                        <div className="sl-searchform__option">
                          <span className="sl-select">
                            <select size="1" className="sl-component sl-select" onChange={this.handleChangeStd} value={this.state.quantityStd}>
                              <option value="0" selected>0</option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                              <option value="6">6</option>
                              <option value="7">7</option>
                              <option value="8">8</option>
                              <option value="9">9</option>
                              <option value="10">10</option>
                            </select>
                        </span>
                        </div>
                        </div>
                        </div>
                        </div>
                    </div>
                      <div className="col-md-6">
                       <div class="ribbon ribbon-red "><span>V I P</span></div>
                      <div id="vip" className="vip">
                      <div className="ticket--header">Buy V.I.P BYOC Tickets</div>
                        <div>Quantity Available : {this.state.product.Item.AvailableQtyVip.N} / {this.state.product.Item.MaxQtyVip.N}</div>
                        This ticket includes:
                        <ul>
                          <li>1x Standard Ticket</li>
                          <li>1x 48 Hour Rental GT Omega Chair</li>
                          <li>Free ScotLAN gift</li>
                        </ul>
                        <br/>
                        <label>Choose a quantity of VIP BYOC* tickets</label>
                        <div className="row">
                        <div className="col-md-7">
                        <div class="ribbon-wrapper ribbon-wrapper--blue">
                          <div class="ribbon-front">
                              EARLYBIRD PRICING
                          </div>
                          <div class="ribbon-edge-topleft"></div>
                          <div class="ribbon-edge-topright"></div>
                          <div class="ribbon-edge-bottomleft"></div>
                          <div class="ribbon-edge-bottomright"></div>
                          <div class="ribbon-back-left"></div>
                          <div class="ribbon-back-right"></div>
                        </div>
                        <label className="blue ticket--price">Price Per Ticket: <span class="strike"><small>??</small>{this.state.product.Item.DiscountVipPrice.N}</span> <strong><small>??</small>{this.state.product.Item.PriceVip.N}</strong></label>
                        </div>
                        <div className="col-md-5">
                        <div className="sl-searchform__option">
                          <span className="sl-select" >
                            <select size="1" className="sl-component sl-select" onChange={this.handleChangeVip} value={this.state.quantityVip}>
                            <option value="0" selected>0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            </select>
                        </span>
                        </div>
                    </div>
                      </div>
                        </div>
                      </div>
                    </div>

                    <div className="row sl-product-gotopayment">
                    <div className="col-md-4">
                      <small><i>*BYOC - bring your own computer</i></small><br/>
                      <small><i>*EARLYBIRD pricing ends {this.state.product.Item.EarlybirdEndDate.S}</i></small>
                    </div>
                    <div className="col-md-8">
                      <div className="sl-but--header">
                      Got a question? <Link to="/Contact" className="sl-button-contact"> Contact Us </Link> or
                      <form onSubmit={this.handleSubmit}>
                           <button type="submit" className="btn btn-lg btn-primary sl-btn sl-btn--primary">Add to Basket</button>
                      </form>
                      </div>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
      )}

        </div>
      </div>
        </div>
        </div>
          </div>
    )
  }
  else if(this.state.onSaleNow === false) {
    return (
      <div>
      <div className="keyboard-background">
        <div className="section-container">
          <div className="section-container-keyboard">
            <div className="sl-products--container">
              <div className="container">
                <h2 className="product-heading">{this.state.product.Item.Name.S}<span className="text-muted"></span></h2>
                  <div className="row product--info">
                    <p className="lead">Events take place over a 3 day weekend starting on a Friday at 6PM and finishing on a Sunday 6PM so games can be played 24hrs a day, if you have enough energy drinks.</p>
                      <li> What you need to know </li>
                      <br/>
                        <ul>
                          <li><strong>Gamers:</strong> {this.state.product.Item.TotalGamers.N} ({parseInt(this.state.product.Item.AvailableQtyStd.N,10) + parseInt(this.state.product.Item.AvailableQtyVip.N,10)} tickets available)</li>
                          <li><strong>Event:</strong> {this.state.product.Item.StartDate.S} ??? {this.state.product.Item.EndDate.S} (48 Hours)</li>
                          <li><strong>Parking Avalible:</strong> {this.state.product.Item.ParkingAvalible.S} </li>
                          <li><strong>Ticket Price:</strong> from ??{this.state.product.Item.PriceStd.N}</li>
                          <li><strong>Address:</strong>{this.state.product.Item.Address.S}</li>
                        </ul>
                        <div className="gradient-line"></div>
                        <div class="product--info--not-onsale">
                          <div> Tickets for this event are not yet on sale! </div>
                          <div>Please check back soon! </div>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    )
  }
  else {
    return (
      <div><h2>
        <Label>Name</Label> {this.state.product.Item.Name.S}
      </h2>
      <h2>
        <Label>Price</Label> ??{this.state.product.Item.Price.N}
      </h2>
      <h2>
        <Label>Description</Label> {this.state.product.Item.Description.S}
      </h2>

      </div>
    )
  }
}

renderSeatingPlan32Person() {
  return (
    <div className="static-modal">
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Seating plan - {this.state.product.Item.Name.S}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="small-floorplan">
           <div className="row small-floorplan--areas">
               <div className="small-floorplan--rows">
                 <div className="small-floorplan--block small-floorplan--block--A">
                   <div className="small-floorplan--row small-floorplan--row-1">
                    {this.renderSeatRow(this.state.seatPlanByRow[0], 0)}
                   </div>
                   <div className="small-floorplan--row small-floorplan--row-2">
                     {this.renderSeatRow(this.state.seatPlanByRow[1], 8)}
                   </div>
                 </div>
                 <div className="small-floorplan--block small-floorplan--block--B">
                   <div className="small-floorplan--row small-floorplan--row-3">
                     {this.renderSeatRow(this.state.seatPlanByRow[2], 16)}
                   </div>
                   <div className="small-floorplan--row small-floorplan--row-4">
                    {this.renderSeatRow(this.state.seatPlanByRow[3], 24)}
                   </div>
                 </div>
             </div>
           </div>
         </div>
       </Modal.Body>
       <Modal.Footer>
         <Button className="btn btn-lg btn-primary sl-btn sl-btn--primary" onClick={this.closeModal}><i class="fas fa-times"></i></Button>
       </Modal.Footer>
     </Modal.Dialog>
  </div>
  )
}

renderSeatingPlan96Person() {
  return (
    <div className="static-modal">
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Seating plan - {this.state.product.Item.Name.S}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="large-floorplan">
           <div className="large-floorplan--image">
             <img src="/Images/ScotLAN-BIG.JPG" />
           </div>
           <div className="row large-floorplan--areas">
             <div className="col-lg-8">
               <div className="large-floorplan--rows">
                 <div className="large-floorplan--block large-floorplan--block--A">
                   <div className="large-floorplan--row large-floorplan--row-1">
                    {this.renderSeatRow(this.state.seatPlanByRow[0], 0)}
                   </div>
                   <div className="large-floorplan--row large-floorplan--row-2">
                     {this.renderSeatRow(this.state.seatPlanByRow[1], 16)}
                   </div>
                 </div>
                 <div className="large-floorplan--block large-floorplan--block--B">
                   <div className="large-floorplan--row large-floorplan--row-3">
                     {this.renderSeatRow(this.state.seatPlanByRow[2], 32)}
                   </div>
                   <div className="large-floorplan--row large-floorplan--row-4">
                    {this.renderSeatRow(this.state.seatPlanByRow[3], 48)}
                   </div>
                 </div>
                 <div className="large-floorplan--block large-floorplan--block--C">
                   <div className="large-floorplan--row large-floorplan--row-5">
                     {this.renderSeatRow(this.state.seatPlanByRow[4], 64)}
                   </div>
                   <div className="large-floorplan--row large-floorplan--row-6">
                    {this.renderSeatRow(this.state.seatPlanByRow[5], 80)}
                   </div>
                 </div>
                 <div className="large-floorplan--row-admin">
                    <div className="large-floorplan--support">
                     <div class="">
                     <Tooltip title='Gratz'>
                           <button class="seat seat--staff"></button>
                       </Tooltip>
                       <Tooltip title='Grandy'>
                           <button class="seat seat--staff"></button>
                       </Tooltip>
                       <Tooltip title='Carb0n'>
                           <button class="seat seat--staff"></button>
                       </Tooltip>
                       <Tooltip title='Carvid'>
                           <button class="seat seat--staff"></button>
                       </Tooltip>
                       <Tooltip title='MuckinFinted'>
                           <button class="seat seat--staff"></button>
                       </Tooltip>
                       <Tooltip title='Kyudo'>
                           <button class="seat seat--staff"></button>
                       </Tooltip>
                       <Tooltip title='Smitttxx'>
                           <button class="seat seat--staff"></button>
                       </Tooltip>
                       <Tooltip title='Rob'>
                           <button class="seat seat--staff"></button>
                       </Tooltip>
                       <Tooltip title='J4M3S'>
                           <button class="seat seat--staff"></button>
                       </Tooltip>
                       <Tooltip title='Gingie'>
                           <button class="seat seat--staff"></button>
                       </Tooltip>
                       <Tooltip title='Slipshod'>
                           <button class="seat seat--staff"></button>
                       </Tooltip>
                      </div>
                        <span>| Support and Registration |</span>
                    </div>
                 </div>
                 <div className="large-floorplan--console-corner">
                   <button className="large-floorplan--console-corner-design"> | Console Area | </button>
                 </div>
               </div>
             </div>
             <div className="col-lg-4">
               <div className="large-floorplan--sleeping-area">
                 <button className="large-floorplan--sleeping-area-design"> | Sleeping Area | </button>
               </div>
               <div className="large-floorplan--boardgames-area">
                 <button className="large-floorplan--boardgames-area-design"> | Board Game Area | </button>
               </div>
             </div>
           </div>
         </div>
       </Modal.Body>
       <Modal.Footer>
         <Button className="btn btn-lg btn-primary sl-btn sl-btn--primary" onClick={this.closeModal}><i class="fas fa-times"></i></Button>
       </Modal.Footer>
     </Modal.Dialog>
</div>
  )
}

//{seat === "Available" && this.state.canSelectSeats && <Button class="seat seat--taken" onClick={()=>{this.selectSeat(`${seed + i}`)}}></Button> }
//<button class="seat seat--taken" onClick={()=>{this.selectSeat(`${seed + i}`)}}></button>
//{ seat === "Available" && this.state.canSelectSeats && <button class="seat seat--taken" onClick={()=>{this.selectSeat(`${seed + i}`)}}></button> }

renderSeatRow(seatRow, seed) {

  return seatRow.map(function(seat, i) {

    if(seat.S === "Available" && this.state.canSelectSeats) {
      return (
        <Tooltip title={"Seat " + (seed + i + 1) + " - " + seat.S}>
          <button className="seat seat--avalible seat--avalible--maxlimitreached"></button>
        </Tooltip>
      )
    }
    else if(seat.S === "Available" && !this.state.canSelectSeats)
    {
      return (
        <Tooltip title={"Seat " + (seed + i + 1) + " - " + seat.S}>
          <button className="seat seat--avalible seat--avalible--maxlimitreached" data-toggle="tooltip" data-placement="top"></button>
        </Tooltip>
      )
    }
    else {
      return (
        <Tooltip title={"Seat " + (seed + i + 1) + " - " + JSON.parse(seat.S).Username}>
          <button className="seat seat--taken"></button>
        </Tooltip>
      )
    }

  }.bind(this))
}

renderSeatingPlan()  {
  return (
    <div>
      <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th>Seat</th>
            <th>Occupied by</th>
            <th>Seat selection</th>
          </tr>
        </thead>
        <tbody>
          {this.renderSeats()}
        </tbody>
      </Table>
    </div>
  )
}

renderSeats() {
  return this.state.seatPlan[0].Seats.L.map(function(seat, i) {
    return (
    <tr>
      <td>Seat {parseInt(i, 10) + 1}</td>
      <td>{seat.S}</td>
      <td>
        {seat.S === "Available" && this.state.canSelectSeats && <Button onClick={()=>{this.selectSeat(`${i}`)}}>Select Seat</Button> }
      </td>
    </tr>
  )
  }.bind(this))
}
}
