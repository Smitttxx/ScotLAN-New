import React, { Component } from "react";
import {  FormGroup, FormControl, ControlLabel, Table, Button, Modal } from "react-bootstrap";
import "./SeatPlan.css";
import "../../components/Loading.css";
import { API, Auth } from "aws-amplify";
import 'react-tippy/dist/tippy.css'
import {  Tooltip } from 'react-tippy';


const $ = window.$;

export default class SeatPlan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      seatPlan:[],
      seatPlanByRow:[],
      order:[],
      canSelectSeats: false,
      showModal: false,
      selectedSeat: 0,
      gamerName: "",
      eventName: "",
      authToken: ""
    };
    this.closeModal = this.closeModal.bind(this);
    this.submitSeat = this.submitSeat.bind(this);
  }

  async componentDidMount() {
      try {
        const orderData = await this.order(this.props.match.params.OrderID);
        this.setState({ order: orderData });

        var basketData = JSON.parse(orderData[0].BasketData.S);

        for(var i = 0; i < basketData.length; i++)
        {
          if(basketData[i].Type === "Event")
          {
            this.setState({eventName: basketData[i].ProductName});
          }
        }

        const seatPlanData = await this.seatPlan(this.state.eventName);

        this.seatPlanSplit(seatPlanData);

        this.setState({ seatPlan: seatPlanData });
        this.setState({ isLoading: false });

        if(parseInt(orderData[0].EventTicketUsedCount.S, 10) < parseInt(orderData[0].EventTicketCount.S, 10)){
          this.setState({ canSelectSeats: true });
        }

        } catch (e) {
        alert(e);
      }
  }

  seatPlanSplit(seatPlan){
    var seatPlanRowSplit = [];

    //Split seat plan array
    if(seatPlan.Length === 32) {
      //TODO: split array for 32
    }
    else {
       var seatPlanRow1 = seatPlan[0].Seats.L.slice(0,16);
       var seatPlanRow2 = seatPlan[0].Seats.L.slice(16,32);
       var seatPlanRow3 = seatPlan[0].Seats.L.slice(32,48);
       var seatPlanRow4 = seatPlan[0].Seats.L.slice(48,64);
       var seatPlanRow5 = seatPlan[0].Seats.L.slice(64,80);
       var seatPlanRow6 = seatPlan[0].Seats.L.slice(80,96);

       seatPlanRowSplit.push(seatPlanRow1, seatPlanRow2, seatPlanRow3, seatPlanRow4, seatPlanRow5, seatPlanRow6);
       this.setState({seatPlanByRow: seatPlanRowSplit});
    }
  }

  async seatPlan(EventName) {
    let user = await Auth.currentAuthenticatedUser();
    let authHeader = {
      headers: { Authorization: user.signInUserSession.idToken.jwtToken }
    }
    return API.get("seatPlan", `/seatplan?EventName=${EventName}`, authHeader);
  }

  async order(OrderID) {
    let user = await Auth.currentAuthenticatedUser();
    let authHeader = {
      headers: { Authorization: user.signInUserSession.idToken.jwtToken }
    }
    this.setState({authToken: user.signInUserSession.idToken.jwtToken});
    return API.get("order", `/order?OrderID=${OrderID}&UserID=${this.props.username}`, authHeader);
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  selectSeat = seat => {
    this.setState({ selectedSeat: seat});
    this.setState({ showModal: true});
  }

  submitSeat() {
    if(this.state.gamerName !== "" && this.state.selectedSeat !== 0) {
      this.setState({ isLoading: true });

      var newSeatCount = parseInt(this.state.order[0].EventTicketUsedCount.S, 10) + 1;

      let request = {
          body: {
            "EventName": this.state.eventName,
            "SeatName": this.state.selectedSeat,
            "Username": this.state.gamerName,
            "OrderID": this.props.match.params.OrderID,
            "NewUsedCount": newSeatCount,
            "UserID": this.props.username
          }
      }

      let authHeader = {
        headers: { Authorization: this.state.authToken }
      }
      console.log(authHeader);
      console.log(request);


      API.post("selectseat", `/selectseat`, request, authHeader).then(response => {
        if(newSeatCount >= parseInt(this.state.order[0].EventTicketCount.S, 10)){
          this.setState({ canSelectSeats: false });
        }
        this.setState({ gamerName: ""});
        this.setState({ selectedSeat: 0});
        this.setState({ showModal: false});
        this.setState({ isLoading: false });

        API.get("seatPlan", `/seatplan?EventName=${this.state.eventName}`, authHeader).then(response => {
          this.setState({ seatPlan: response });
          this.seatPlanSplit(response);
        });

        API.get("order", `/order?OrderID=${this.props.match.params.OrderID}&UserID=${this.props.username}`, authHeader).then(response => {
          this.setState({ order: response });
        });
      });
    } else {
      //todo:show message in modal
    }
  }

  closeModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  render() {
    if(this.state.isLoading)
    {
      return (
        <div className="loading--text">
          <img src="..\..\Images\Pacman-1s-200px.gif" alt="loading" />
          <h4>Please wait ... We are loading the seat plan</h4>
        </div>
      )
    }
    else {
    return (
      <div className="container">
      <br />
      {this.state.showModal &&
        <div className="static-modal">
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>Confirm seat selection</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <FormGroup controlId="gamerName" bsSize="small">
            <h4>You have selected seat {parseInt(this.state.selectedSeat, 10) + 1}</h4><br/>
            <ControlLabel>Please enter gamer name for this seat</ControlLabel>
            <FormControl
              value={this.state.gamerName}
              type="gamerName"
              onChange={this.handleChange}
            />
             </FormGroup>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.closeModal}>Cancel</Button>
              <Button bsStyle="primary" onClick={this.submitSeat}>Save seat selection</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </div>
      }

      <h3>{this.state.seatPlan[0].EventName.S} (You have selected {this.state.order[0].EventTicketUsedCount.S} of {this.state.order[0].EventTicketCount.S} seats for this event)</h3>

      {!this.state.isLoading && this.renderSeatingPlan96Person()}
      </div>
    );
  }
}

  renderSeatingPlan96Person() {
    return (
      <div class="large-floorplan">
       <div class="large-floorplan--image">
         <img src="/Images/ScotLAN-BIG.JPG" alt="Seating-plan-image" />
       </div>
       <div class="row large-floorplan--areas">
         <div class="col-lg-7">
           <div class="large-floorplan--rows">
             <div class="large-floorplan--block large-floorplan--block--A">
               <div class="large-floorplan--row large-floorplan--row-1">
                {this.renderSeatRow(this.state.seatPlanByRow[0], 0)}
               </div>
               <div class="large-floorplan--row large-floorplan--row-2">
                 {this.renderSeatRow(this.state.seatPlanByRow[1], 16)}
               </div>
             </div>
             <div class="large-floorplan--block large-floorplan--block--B">
               <div class="large-floorplan--row large-floorplan--row-3">
                 {this.renderSeatRow(this.state.seatPlanByRow[2], 32)}
               </div>
               <div class="large-floorplan--row large-floorplan--row-4">
                {this.renderSeatRow(this.state.seatPlanByRow[3], 48)}
               </div>
             </div>
             <div class="large-floorplan--block large-floorplan--block--C">
               <div class="large-floorplan--row large-floorplan--row-5">
                 {this.renderSeatRow(this.state.seatPlanByRow[4], 64)}
               </div>
               <div class="large-floorplan--row large-floorplan--row-6">
                {this.renderSeatRow(this.state.seatPlanByRow[5], 80)}
               </div>
             </div>
             <div class="large-floorplan--row-admin">
               <button class="large-floorplan--support"> | Support and Registration | </button>
             </div>
             <div class="large-floorplan--console-corner">
               <button class="large-floorplan--console-corner-design"> | Console Area | </button>
             </div>
           </div>
         </div>
         <div class="col-lg-5">
           <div class="large-floorplan--sleeping-area">
             <button class="large-floorplan--sleeping-area-design"> | Sleeping Area | </button>
           </div>
           <div class="large-floorplan--boardgames-area">
             <button class="large-floorplan--boardgames-area-design"> | Board Game Area | </button>
           </div>
         </div>
       </div>
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
          <Tooltip title={seat.S}>
            <button class="seat seat--avalible" onClick={()=>{this.selectSeat(`${seed + i}`)}} title={seat.S}></button>
          </Tooltip>
        )
      }
      else if(seat.S === "Available" && !this.state.canSelectSeats)
      {
        return (
          <Tooltip title={seat.S}>
            <button class="seat seat--avalible" data-toggle="tooltip" data-placement="top" title={seat.S}></button>
          </Tooltip>
        )
      }
      else {
        return (
          <Tooltip title={seat.S}>
            <button class="seat seat--taken"></button>
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
