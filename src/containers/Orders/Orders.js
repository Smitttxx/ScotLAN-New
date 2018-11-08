import React, { Component } from "react";
import { Link } from "react-router-dom";
import {  Table, Modal, Button } from "react-bootstrap";
import "./Orders.css";
import "../../components/Loading.css";
import { API } from "aws-amplify";

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
        const orderdata = await this.orders(this.props.username);
        this.setState({ orders: orderdata });
        this.setState({ isLoading: false });
        } catch (e) {
        alert(e);
      }
  }

  orders(UserID) {
    return API.get("orders", `/orders?UserID=${UserID}`);
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
        <div className="Loading"></div>
      )
    }
    else {
    return (
      <div className="Orders">
      {this.state.showModal &&
        <div className="static-modal">
         <Modal show={this.state.showModal} onHide={this.closeModal}>
            <Modal.Header>
              <Modal.Title>Order Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>Order ID: {this.state.selectedOrder.OrderID.S}</h4>
              <h4>Order Date: {this.state.selectedOrder.CreateDate.S}</h4>
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
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleClose}>Close</Button>
            </Modal.Footer>
           </Modal>
        </div>
      }

      <h1>Previous Orders</h1>
      {!this.state.isLoading && this.renderOrders()}
      </div>
    );
  }
}

  renderOrders()  {
    return (
      <div>
      <Table striped bordered condensed hover>
      <thead>
      <tr>
      <th>Order ID</th>
      <th>Cost</th>
      <th>Date</th>
      <th>Comment</th>
      </tr>
      </thead>
      <tbody>
      {this.state.orders.map(item => (
        <tr>
        <td><a onClick={()=>{this.showModal(item.OrderID.S)}}>{item.OrderID.S}</a></td>
        <td>£{item.BasketTotal.S}</td>
        <td>{item.CreateDate.S}</td>
        {item.EventTicketIncluded.BOOL ? [<td>You have chosen {item.EventTicketUsedCount.S} of {item.EventTicketCount.S} seats for this event. <Link to={`/SeatPlan/${item.OrderID.S}`}>Click here to select your seats.</Link>.</td>] : <td>This order did not contain an event ticket.</td>}
        </tr>
      ))}
      </tbody>
      </Table>
       </div>
    )
  }
}
