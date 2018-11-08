import React, { Component } from "react";
import {  FormGroup, FormControl, ControlLabel, Table, Button, Modal } from "react-bootstrap";
import "./SeatPlan.css";
import "../../components/Loading.css";
import { API } from "aws-amplify";

export default class SeatPlan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      seatPlan:[],
      order:[],
      canSelectSeats: false,
      showModal: false,
      selectedSeat: 0,
      gamerName: "",
      eventName: ""
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
        this.setState({ seatPlan: seatPlanData });
        this.setState({ isLoading: false });

        if(parseInt(orderData[0].EventTicketUsedCount.S, 10) < parseInt(orderData[0].EventTicketCount.S, 10)){
          this.setState({ canSelectSeats: true });
        }

        } catch (e) {
        alert(e);
      }
  }

  seatPlan(EventName) {
    return API.get("seatPlan", `/seatplan?EventName=${EventName}`);
  }

  order(OrderID) {
    return API.get("order", `/order?OrderID=${OrderID}&UserID=${this.props.username}`);
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
      API.post("selectseat", `/selectseat`, request).then(response => {
        if(newSeatCount >= parseInt(this.state.order[0].EventTicketCount.S, 10)){
          this.setState({ canSelectSeats: false });
        }
        this.setState({ gamerName: ""});
        this.setState({ selectedSeat: 0});
        this.setState({ showModal: false});
        this.setState({ isLoading: false });

        API.get("seatPlan", `/seatplan?EventName=${this.state.eventName}`).then(response => {
          this.setState({ seatPlan: response });
        });

        API.get("order", `/order?OrderID=${this.props.match.params.OrderID}&UserID=${this.props.username}`).then(response => {
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
        <div className="Loading"></div>
      )
    }
    else {
    return (
      <div className="SeatPlan">

      {this.state.showModal &&
        <div className="static-modal">
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>Confirm seat selection</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <FormGroup controlId="gamerName" bsSize="small">
            <h4>You have selected seat {this.state.selectedSeat}</h4><br/>
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

      <h1>Seating Plan - {this.state.seatPlan[0].EventName.S}</h1>
      <h2>You have selected {this.state.order[0].EventTicketUsedCount.S} of {this.state.order[0].EventTicketCount.S} seats for this event</h2>
      {!this.state.isLoading && this.renderSeatingPlan()}
      </div>
    );
  }
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
            <tr>
              <td>Seat 1</td>
              <td>{this.state.seatPlan[0].Seat1.S}</td>
              <td>
              {this.state.seatPlan[0].Seat1.S === "Available" && this.state.canSelectSeats && <Button onClick={()=>{this.selectSeat("1")}}>Select Seat</Button> }
              </td>
            </tr>
            <tr>
              <td>Seat 2</td>
              <td>{this.state.seatPlan[0].Seat2.S}</td>
              <td>
              {this.state.seatPlan[0].Seat2.S === "Available" &&  this.state.canSelectSeats && <Button onClick={()=>{this.selectSeat("2")}}>Select Seat</Button> }
              </td>
            </tr>
            <tr>
              <td>Seat 3</td>
              <td>{this.state.seatPlan[0].Seat3.S}</td>
              <td>
              {this.state.seatPlan[0].Seat3.S === "Available" && this.state.canSelectSeats && <Button onClick={()=>{this.selectSeat("3")}}>Select Seat</Button> }
              </td>
            </tr>
            <tr>
              <td>Seat 4</td>
              <td>{this.state.seatPlan[0].Seat4.S}</td>
              <td>
              {this.state.seatPlan[0].Seat4.S === "Available" && this.state.canSelectSeats && <Button onClick={()=>{this.selectSeat("4")}}>Select Seat</Button> }
              </td>
            </tr>
            <tr>
              <td>Seat 5</td>
              <td>{this.state.seatPlan[0].Seat5.S}</td>
              <td>
              {this.state.seatPlan[0].Seat5.S === "Available" && this.state.canSelectSeats && <Button onClick={()=>{this.selectSeat("5")}}>Select Seat</Button> }
              </td>
            </tr>
            <tr>
              <td>Seat 6</td>
              <td>{this.state.seatPlan[0].Seat6.S}</td>
              <td>
              {this.state.seatPlan[0].Seat6.S === "Available" && this.state.canSelectSeats && <Button onClick={()=>{this.selectSeat("6")}}>Select Seat</Button> }
              </td>
            </tr>
            <tr>
              <td>Seat 7</td>
              <td>{this.state.seatPlan[0].Seat7.S}</td>
              <td>
              {this.state.seatPlan[0].Seat7.S === "Available" && this.state.canSelectSeats && <Button onClick={()=>{this.selectSeat("7")}}>Select Seat</Button> }
              </td>
            </tr>
            <tr>
              <td>Seat 8</td>
              <td>{this.state.seatPlan[0].Seat8.S}</td>
              <td>
              {this.state.seatPlan[0].Seat8.S === "Available" && this.state.canSelectSeats && <Button onClick={()=>{this.selectSeat("8")}}>Select Seat</Button> }
              </td>
            </tr>
            <tr>
              <td>Seat 9</td>
              <td>{this.state.seatPlan[0].Seat9.S}</td>
              <td>
              {this.state.seatPlan[0].Seat9.S === "Available" && this.state.canSelectSeats && <Button onClick={()=>{this.selectSeat("9")}}>Select Seat</Button> }
              </td>
            </tr>
            <tr>
              <td>Seat 10</td>
              <td>{this.state.seatPlan[0].Seat10.S}</td>
              <td>
              {this.state.seatPlan[0].Seat10.S === "Available" && this.state.canSelectSeats && <Button onClick={()=>{this.selectSeat("10")}}>Select Seat</Button> }
              </td>
            </tr>
            <tr>
              <td>Seat 11</td>
              <td>{this.state.seatPlan[0].Seat11.S}</td>
              <td>
              {this.state.seatPlan[0].Seat11.S === "Available" && this.state.canSelectSeats && <Button onClick={()=>{this.selectSeat("11")}}>Select Seat</Button> }
              </td>
            </tr>
            <tr>
              <td>Seat 12</td>
              <td>{this.state.seatPlan[0].Seat12.S}</td>
              <td>
              {this.state.seatPlan[0].Seat12.S === "Available" && this.state.canSelectSeats && <Button onClick={()=>{this.selectSeat("12")}}>Select Seat</Button> }
              </td>
            </tr>
            <tr>
              <td>Seat 13</td>
              <td>{this.state.seatPlan[0].Seat13.S}</td>
              <td>
              {this.state.seatPlan[0].Seat13.S === "Available" && this.state.canSelectSeats && <Button onClick={()=>{this.selectSeat("13")}}>Select Seat</Button> }
              </td>
            </tr>
            <tr>
              <td>Seat 14</td>
              <td>{this.state.seatPlan[0].Seat14.S}</td>
              <td>
              {this.state.seatPlan[0].Seat14.S === "Available" && this.state.canSelectSeats && <Button onClick={()=>{this.selectSeat("14")}}>Select Seat</Button> }
              </td>
            </tr>
            <tr>
              <td>Seat 15</td>
              <td>{this.state.seatPlan[0].Seat15.S}</td>
              <td>
              {this.state.seatPlan[0].Seat15.S === "Available" && this.state.canSelectSeats && <Button onClick={()=>{this.selectSeat("15")}}>Select Seat</Button> }
              </td>
            </tr>
            <tr>
              <td>Seat 16</td>
              <td>{this.state.seatPlan[0].Seat16.S}</td>
              <td>
              {this.state.seatPlan[0].Seat16.S === "Available" && this.state.canSelectSeats && <Button onClick={()=>{this.selectSeat("16")}}>Select Seat</Button> }
              </td>
            </tr>
            <tr>
              <td>Seat 17</td>
              <td>{this.state.seatPlan[0].Seat17.S}</td>
              <td>
              {this.state.seatPlan[0].Seat17.S === "Available" && this.state.canSelectSeats && <Button onClick={()=>{this.selectSeat("17")}}>Select Seat</Button> }
              </td>
            </tr>
            <tr>
              <td>Seat 18</td>
              <td>{this.state.seatPlan[0].Seat18.S}</td>
              <td>
              {this.state.seatPlan[0].Seat18.S === "Available" && this.state.canSelectSeats && <Button onClick={()=>{this.selectSeat("18")}}>Select Seat</Button> }
              </td>
            </tr>
            <tr>
              <td>Seat 19</td>
              <td>{this.state.seatPlan[0].Seat19.S}</td>
              <td>
              {this.state.seatPlan[0].Seat19.S === "Available" && this.state.canSelectSeats && <Button onClick={()=>{this.selectSeat("19")}}>Select Seat</Button> }
              </td>
            </tr>
            <tr>
              <td>Seat 20</td>
              <td>{this.state.seatPlan[0].Seat20.S}</td>
              <td>
              {this.state.seatPlan[0].Seat20.S === "Available" && this.state.canSelectSeats && <Button onClick={()=>{this.selectSeat("20")}}>Select Seat</Button> }
              </td>
            </tr>
            <tr>
              <td>Seat 21</td>
              <td>{this.state.seatPlan[0].Seat21.S}</td>
              <td>
              {this.state.seatPlan[0].Seat21.S === "Available" && this.state.canSelectSeats && <Button onClick={()=>{this.selectSeat("21")}}>Select Seat</Button> }
              </td>
            </tr>
            <tr>
              <td>Seat 22</td>
              <td>{this.state.seatPlan[0].Seat22.S}</td>
              <td>
              {this.state.seatPlan[0].Seat22.S === "Available" && this.state.canSelectSeats && <Button onClick={()=>{this.selectSeat("22")}}>Select Seat</Button> }
              </td>
            </tr>
            <tr>
              <td>Seat 23</td>
              <td>{this.state.seatPlan[0].Seat23.S}</td>
              <td>
              {this.state.seatPlan[0].Seat23.S === "Available" && this.state.canSelectSeats && <Button onClick={()=>{this.selectSeat("23")}}>Select Seat</Button> }
              </td>
            </tr>
            <tr>
              <td>Seat 24</td>
              <td>{this.state.seatPlan[0].Seat24.S}</td>
              <td>
              {this.state.seatPlan[0].Seat24.S === "Available" && this.state.canSelectSeats && <Button onClick={()=>{this.selectSeat("24")}}>Select Seat</Button> }
              </td>
            </tr>
            <tr>
              <td>Seat 25</td>
              <td>{this.state.seatPlan[0].Seat25.S}</td>
              <td>
              {this.state.seatPlan[0].Seat25.S === "Available" && this.state.canSelectSeats && <Button onClick={()=>{this.selectSeat("25")}}>Select Seat</Button> }
              </td>
            </tr>
            <tr>
              <td>Seat 26</td>
              <td>{this.state.seatPlan[0].Seat26.S}</td>
              <td>
              {this.state.seatPlan[0].Seat26.S === "Available" && this.state.canSelectSeats && <Button onClick={()=>{this.selectSeat("26")}}>Select Seat</Button> }
              </td>
            </tr>
            <tr>
              <td>Seat 27</td>
              <td>{this.state.seatPlan[0].Seat27.S}</td>
              <td>
              {this.state.seatPlan[0].Seat27.S === "Available" && this.state.canSelectSeats && <Button onClick={()=>{this.selectSeat("27")}}>Select Seat</Button> }
              </td>
            </tr>
            <tr>
              <td>Seat 28</td>
              <td>{this.state.seatPlan[0].Seat28.S}</td>
              <td>
              {this.state.seatPlan[0].Seat28.S === "Available" && this.state.canSelectSeats && <Button onClick={()=>{this.selectSeat("28")}}>Select Seat</Button> }
              </td>
            </tr>
            <tr>
              <td>Seat 29</td>
              <td>{this.state.seatPlan[0].Seat29.S}</td>
              <td>
              {this.state.seatPlan[0].Seat29.S === "Available" && this.state.canSelectSeats && <Button onClick={()=>{this.selectSeat("29")}}>Select Seat</Button> }
              </td>
            </tr>
            <tr>
              <td>Seat 30</td>
              <td>{this.state.seatPlan[0].Seat30.S}</td>
              <td>
              {this.state.seatPlan[0].Seat30.S === "Available" && this.state.canSelectSeats && <Button onClick={()=>{this.selectSeat("30")}}>Select Seat</Button> }
              </td>
            </tr>
            <tr>
              <td>Seat 31</td>
              <td>{this.state.seatPlan[0].Seat31.S}</td>
              <td>
              {this.state.seatPlan[0].Seat31.S === "Available" && this.state.canSelectSeats && <Button onClick={()=>{this.selectSeat("31")}}>Select Seat</Button> }
              </td>
            </tr>
            <tr>
              <td>Seat 32</td>
              <td>{this.state.seatPlan[0].Seat32.S}</td>
              <td>
              {this.state.seatPlan[0].Seat32.S === "Available" && this.state.canSelectSeats && <Button onClick={()=>{this.selectSeat("32")}}>Select Seat</Button> }
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    )
  }
}
