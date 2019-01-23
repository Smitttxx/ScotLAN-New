import React, { Component } from "react";
import { Link } from "react-router-dom";
import {  Table, Modal, Button } from "react-bootstrap";
import "./Orders.css";
import "../../components/Loading.css";
import { API, Auth } from "aws-amplify";

export default class Orders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      orders:[],
      showModal: false,
      selectedOrder: []
    };

    this.closeModal = this.closeModal.bind(this);

  }

  async componentDidMount() {
      try {
          window.scrollTo(0, 0);
          const orderdata = await this.orders(this.props.username);
          this.setState({ orders: orderdata });
          this.setState({ isLoading: false });
        } catch (e) {
        alert(e);
      }
  }

  async orders(UserID) {
    let user = await Auth.currentAuthenticatedUser();
    let authHeader = {
      headers: { Authorization: user.signInUserSession.idToken.jwtToken }
    }
    return await API.get("orders", `/orders?UserID=${UserID}`, authHeader);
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    this.setState({ isLoading: false });
  }

  closeModal() {
    this.setState({ showModal: !this.state.showModal });
    this.setState({ selectedOrder: [] });
  }

  showModal = OrderID => {
    for(var i = 0; i < this.state.orders.length; i++)
    {
      if(this.state.orders[i].OrderID.S === OrderID)
      {
        this.setState({ selectedOrder: this.state.orders[i]});
      }
    }
    this.setState({ showModal: true });

  }


  render() {
    if(this.state.isLoading)
    {
      return (
        <div class="sl--sitecontainer--background__keyboard">
        <div className="container">
          <div className="loading--text">
            <img src="..\..\Images\Pacman-1s-200px.gif" alt="loading" />
            <h4>Please wait ... We are loading your previous orders</h4>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
          </div>
        </div>
        </div>
      )
    }
    else {
    return (
      <div class="sl--sitecontainer--background__keyboard">
      <div className="container sl-order-container">
      <div className="container">
      {this.state.showModal &&
        <div className="static-modal">
         <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>Order Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>Order ID: {this.state.selectedOrder.OrderID.S}</h4>
              <h4>Order Date: { new Intl.DateTimeFormat('en-GB').format(new Date(this.state.selectedOrder.CreateDate.S))}</h4>
              <h4>Order Email: {this.state.selectedOrder.PaymentEmail.S}</h4>
              <h4>Last 4 digits of card: {this.state.selectedOrder.CardLast4.S}</h4>
              <br/>
              <Table striped bordered condensed hover>
              <thead>
              <tr>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
              </tr>
              </thead>
              <tbody>
              {JSON.parse(this.state.selectedOrder.BasketData.S).map(item => (
                <tr>
                <td>{item.ProductName}</td>
                <td>{item.Quantity}</td>
                <td>£{item.Price}</td>
                </tr>
              ))}
              </tbody>
              </Table>
              <h4>Total Order Cost: £{this.state.selectedOrder.BasketTotal.S}</h4>
              {this.state.selectedOrder.EventTicketIncluded.BOOL ? [<h3><Link to={`/SeatPlan/${this.state.selectedOrder.OrderID.S}`}>Click here to select your seats</Link></h3>] : <div></div>}
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.closeModal}><i class="fas fa-times"></i></Button>
            </Modal.Footer>
           </Modal.Dialog>
        </div>

      }

      <h3>Orders info for Upcoming Events</h3>
      {!this.state.isLoading && this.renderOrders()}
      <h3>Order info for Previous Events</h3>
      <div>
      No events to show
      </div>
      </div>
      </div>
        </div>
    );
  }
}

  renderOrders()  {
    var countDownDate = new Date("Jul 5, 2019 18:00:00").getTime();
    var now = new Date().getTime();
    var distance = countDownDate - now;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));

    return (
      <div class="sl-orders-container">
        {this.state.orders.length > 0 ? [<span>Your going to <h4>ScotLAN #4!</h4></span>] : <h3>You have no orders.</h3>}
        {this.state.orders.map(item => (
          <div>
          <div class="order-row"><div class=""><a href="#" onClick={()=>{this.showModal(item.OrderID.S)}}>Order Details</a> - </div>{item.EventTicketIncluded.BOOL && item.EventTicketUsedCount.S === item.EventTicketCount.S ? [<div>You have chosen {item.EventTicketUsedCount.S} of {item.EventTicketCount.S} seats for this event. <Link to={`/SeatPlan/${item.OrderID.S}`}>Click here to view the seating plan</Link>.</div>] : <div>You have chosen {item.EventTicketUsedCount.S} of {item.EventTicketCount.S} seats for this event. Dont forget to <Link to={`/SeatPlan/${item.OrderID.S}`}>pick your seat!</Link>.</div>}</div>
          </div>
        ))}
{/*   {this.state.orders.length > 0 ? [ <span>Would you like to <Link to={`/SeatPlan/${this.state.orders[0].OrderID.S}`}>view the seating plan</Link> or <a href="/Product/Event/ScotLAN%20Event%205" role="button">buy more tickets</a>?</span>] : <div></div>} */}
        <div>Only {days} days to go!</div>
       </div>
    )
  }
}

//          <td>{new Intl.DateTimeFormat('en-GB').format(new Date(item.CreateDate.S))}</td>
