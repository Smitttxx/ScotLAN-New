import React, { Component } from "react";
import {  FormGroup, FormControl, ControlLabel, Table, Button, Modal, Form } from "react-bootstrap";
import "./SeatPlan.css";
import "../../components/Loading.css";
import { API, Auth } from "aws-amplify";
import 'react-tippy/dist/tippy.css'
import {  Tooltip } from 'react-tippy';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

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
      authToken: "",
      sleeping: false
    };
    this.closeModal = this.closeModal.bind(this);
    this.submitSeat = this.submitSeat.bind(this);
  }

  async componentDidMount() {
      try {
        window.scrollTo(0, 0);
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
    let user = await Auth.currentAuthenticatedUser();
    let authHeader = {
      headers: { Authorization: user.signInUserSession.idToken.jwtToken }
    }
    return API.get("seatPlan", `/seatplan?EventName=${EventName.split(" - ")[0]}`, authHeader);
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

  handleChangeChk = event => {
    if(this.state.sleeping) {
      this.setState({sleeping: false});
    } else {
      this.setState({sleeping: true});
    }
  }

  selectSeat = seat => {
    this.setState({ selectedSeat: seat});
    this.setState({ showModal: true});
  }

  changeSeat = seat => {
    this.setState({ isLoading: true });
    this.setState({ selectedSeat: seat});

    var newSeatCount = parseInt(this.state.order[0].EventTicketUsedCount.S, 10) - 1;

    let request = {
        body: {
          "EventName": this.state.eventName.split(" - ")[0],
          "SeatName": seat,
          "OrderID": this.props.match.params.OrderID,
          "NewUsedCount": newSeatCount,
          "UserID": this.props.username,
        }
    }

    let authHeader = {
      headers: { Authorization: this.state.authToken }
    }

    API.post("editseat", `/editseat`, request, authHeader).then(response => {
      if(newSeatCount >= parseInt(this.state.order[0].EventTicketCount.S, 10)){
        this.setState({ canSelectSeats: false });
      } else {
        this.setState({ canSelectSeats: true });
      }
      this.setState({ gamerName: ""});
      this.setState({ selectedSeat: 0});
      this.setState({ showModal: false});
      this.setState({ isLoading: false });

      API.get("seatPlan", `/seatplan?EventName=${this.state.eventName.split(" - ")[0]}`, authHeader).then(response => {
        this.setState({ seatPlan: response });
        this.seatPlanSplit(response);
      });

      API.get("order", `/order?OrderID=${this.props.match.params.OrderID}&UserID=${this.props.username}`, authHeader).then(response => {
        this.setState({ order: response });
      });
    });

    this.alertPrompt("Please select a new seat.");

    this.setState({ isLoading: false });
  }

  alertPrompt(message) {
    return Swal.fire({
      title: '<strong><u>Seat unselected</u></strong>',
      icon: 'info',
      showCloseButton: true,
      showCancelButton: false,
      focusConfirm: false,
      confirmButtonText:
      message,
      confirmButtonAriaLabel: message,
    })
  }

  submitSeat() {
    if(this.state.gamerName !== "" && this.state.selectedSeat !== 0) {
      this.setState({ isLoading: true });

      var newSeatCount = parseInt(this.state.order[0].EventTicketUsedCount.S, 10) + 1;

      let request = {
          body: {
            "EventName": this.state.eventName.split(" - ")[0],
            "SeatName": this.state.selectedSeat,
            "Username": this.state.gamerName,
            "OrderID": this.props.match.params.OrderID,
            "NewUsedCount": newSeatCount,
            "UserID": this.props.username,
            "SleepingOnSite": this.state.sleeping
          }
      }

      let authHeader = {
        headers: { Authorization: this.state.authToken }
      }

      API.post("selectseat", `/selectseat`, request, authHeader).then(response => {
        if(newSeatCount >= parseInt(this.state.order[0].EventTicketCount.S, 10)){
          this.setState({ canSelectSeats: false });
        }
        this.setState({ gamerName: ""});
        this.setState({ selectedSeat: 0});
        this.setState({ showModal: false});
        this.setState({ isLoading: false });

        API.get("seatPlan", `/seatplan?EventName=${this.state.eventName.split(" - ")[0]}`, authHeader).then(response => {
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
        <div class="sl--sitecontainer--background__keyboard">
        <div className="container">
          <div className="loading--text">
            <img src="..\..\Images\Pacman-1s-200px.gif" alt="loading" />
            <h4>Please wait ... We are loading the seating plan for this event</h4>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
          </div>
        </div>
        </div>
      )
    }
    else {
    return (
      <div className="keyboard-background">
        <div className="section-container">
          <div className="section-container-keyboard">
      <div className=" sl-seatingplan-picker"><div className="container">
      {this.state.showModal &&
        <div className="static-modal static-modal--seatingplan ">
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>Confirm seat selection</Modal.Title>
                    <Button onClick={this.closeModal}><i class="fas fa-times"></i></Button>
            </Modal.Header>
            <Modal.Body>
            <FormGroup controlId="gamerName" bsSize="small">
            <p>You have selected seat {parseInt(this.state.selectedSeat, 10) + 1}</p>
            <ControlLabel>Please enter gamer name for this seat</ControlLabel>
            <div class="row">
              <div className="col-sm-8">
                <FormControl
                  value={this.state.gamerName}
                  type="gamerName"
                  onChange={this.handleChange}
                />

               </div>
               <div className="col-sm-4">
                 <Button bsStyle="primary" onClick={this.submitSeat}>Save seat selection</Button>
               </div>
             </div>
            </FormGroup>
            <FormGroup controlId="sleeping">
              <div class="sl-checkboxes">
                <div class="sl-option-input">
                  <p>Please note space in the dedicated sleeping areas are on a first come first server basis.</p>
                  <p><strong>No single occupancy double airbeds.</strong></p>
                  <br/>
                  <input class="sl-checkbox" type="checkbox" defaultChecked={this.state.sleeping} onChange={this.handleChangeChk} id="sleeping"/>
                  <ControlLabel >Will you be sleeping onsite?</ControlLabel>
                </div>
              </div>
            </FormGroup>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
          </Modal.Dialog>
        </div>
      }


      <div class="row">
      <div className="col-lg-6">
      <h3>{this.state.seatPlan[0].EventName.S}</h3>
      <p class="sl-seatingplan-picker--remainingseats">You have selected <strong>{this.state.order[0].EventTicketUsedCount.S} of {this.state.order[0].EventTicketCount.S}</strong> seats for this event</p>
      <p> To change your seat click on the grey icon to remove this selection and the pick another seat. </p>
      </div>
      <div className="col-lg-6">
        <div class="large-floorplan--rows">
          <div class="large-floorplan--key">
        <p> Seating Plan Key </p>
          <button class="seat seat--taken"></button> - Taken
          <button class="seat seat--avalible"></button> - Available
          <button class="seat seat--edit"></button> - Remove
        </div>
        </div>
          </div>
      </div>
      {!this.state.isLoading && this.renderSeatingPlan96Person()}
      </div></div>
      </div>
      </div>
      </div>
    );
  }
}

renderSeatingPlan32Person() {
  return (
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
  )
}

  renderSeatingPlan96Person() {
    return (
      <div className="large-floorplan">
       <div className="large-floorplan--image">
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
                 <div>
                  <span>| Support and Registration |</span>
                 </div>
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
            <button className="seat seat--avalible seat--avalible" onClick={()=>{this.selectSeat(`${seed + i}`)}}></button>
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
      else if(seat.S != "Available" && JSON.parse(seat.S).OrderID === this.props.match.params.OrderID) {
        return (
          <Tooltip title={"Seat " + (seed + i + 1) + " - " + JSON.parse(seat.S).Username}>
            <button className="seat seat--edit" onClick={()=>{this.changeSeat(`${seed + i}`)}}></button>
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
