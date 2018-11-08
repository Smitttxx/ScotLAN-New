import React, { Component } from "react";
import { Table } from "react-bootstrap";
import StripeCheckout from 'react-stripe-checkout';
import "./Checkout.css";
import config from '../../config';

export default class Checkout extends Component {
  constructor(props) {
    super(props);
    this.onToken = this.onToken.bind(this);
    this.state = {
      isLoading: true,
      message:"",
      orderID: ""
    };
  }

async onToken(token) {
  const res = await fetch(config.stripe.API_URL, {
    method: 'POST',
    body: JSON.stringify({
      token,
      charge: {
        amount: this.props.basketTotal * 100,
        currency: config.stripe.currency,
      },
      basket: this.props.basket,
      basketTotal: this.props.basketTotal,
      email: this.props.email,
      username: this.props.username,
      includesEventTicket: this.props.IncludesEventTicket,
      eventTicketCount: this.props.EventTicketCount
    }),
  });
  const data = await res.json();

  if(data.message === "Payment processed")
  {
      var orderID = data.charge.id;
      this.setState({ orderID: orderID });
      this.props.clearCheckout();
  }
}

  async componentDidMount() {
      try {
        this.setState({ isLoading: false });
        } catch (e) {
        alert(e);
      }
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

  clearCheckout  = event => {
    this.props.clearCheckout();
  }

  render() {
    if(this.state.orderID !== ""){
      return (
      <div className="Checkout">
      <h1>Order Confirmation</h1>
      <h2>Thank you for your order.</h2>
      <h3>Your order ID is: {this.state.orderID}</h3>
      </div>
    )
    } else {
      return (
        <div className="Checkout">
        <h1>Checkout</h1>
        {}
        {!this.state.isLoading && this.renderCheckout()}
        </div>
      );
    }
  }

  renderCheckout() {
    if(this.props.basketTotal !== 0) {
    return (
      <div>
      <Table striped bordered condensed hover>
      <thead>
      <tr>
      <th>Product</th>
      <th>Quantity</th>
      <th>Price(each)</th>
      </tr>
      </thead>
      <tbody>
      {this.props.basket.map(item => (
        <tr>
        <td>{item.ProductName}</td>
        <td>{item.Quantity}</td>
        <td>£{item.Price}</td>
        </tr>
      ))}
      <tr>
      <td><b>Total</b></td>
      <td></td>
      <td><b>£{this.props.basketTotal}</b></td>
      </tr>
      </tbody>
      </Table>
      <StripeCheckout
         name="ScotLAN"
         token={this.onToken}
         amount={this.props.basketTotal * 100}
         currency={config.stripe.CURRENCY}
         stripeKey={config.stripe.API_KEY}
         allowRememberMe={false}
       />
       <button onClick={this.clearCheckout}>Clear checkout</button>
       </div>
    )} else {
      return (
      <div>No items in basket</div>
    )
    }
  }
}
