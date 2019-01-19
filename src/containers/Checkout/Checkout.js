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

  this.setState({ isLoading: true });

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

  this.setState({ isLoading: false });
}

  async componentDidMount() {
      try {
        this.setState({ isLoading: false });
        window.scrollTo(0, 0);
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

  removeItem = async productName => {
    await this.props.removeFromBasket(productName);
    await this.props.recalcBasket();
  }

  render() {
    if(this.state.isLoading)
    {
      return (
        <div class="sl--sitecontainer--background__keyboard">
        <div className="container">
          <div className="loading--text">
            <img src="..\..\Images\Pacman-1s-200px.gif" alt="loading" />
            <h4>Please wait ... We are placing your order</h4>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
          </div>
        </div>
        </div>
      )
    }
    else if(this.state.orderID !== ""){
      return (
        <div className="sl--sitecontainer--background__keyboard">
          <div className="container">
          <div className="sl--confimation--header"><h4>You're going to ScotLAN!</h4></div>
          <h4> Remember to head over to your account to pick your seat!</h4>
          <div className="timer">
            <div className="timer-days">
              <div className="timer-time"><span id="days"></span></div>
              <div className="timer-text">Days</div>
            </div>
            <div className="timer-hours">
              <div className="timer-time"><span id="hours"></span></div>
              <div className="timer-text">Hours</div>
            </div>
            <div className="timer-mins">
              <div className="timer-time"><span id="mins"></span></div>
              <div className="timer-text">Mins</div>
            </div>
            <div className="timer-seconds">
              <div className="timer-time"><span id="seconds"></span></div>
              <div className="timer-text">Secs</div>
            </div>
          </div>
          <h4>Come Join us on Discord for the pre-lan Hype and to get to know the people coming to the event!</h4>
        <h3>Your order ID is: {this.state.orderID}</h3></div>
        </div>
    )
    } else {
      return (
        <div class="sl--sitecontainer--background__keyboard">
        <div className="container">
        <h1>Checkout</h1>
        {!this.state.isLoading && this.renderCheckout()}
        </div>
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
        <button className="btn btn-danger" onClick={()=>{this.removeItem(`${item.ProductName}`)}}>Remove</button>
        </tr>
      ))}
      <tr>
      <td><b>Total</b></td>
      <td></td>
      <td><b>£{this.props.basketTotal}</b></td>
      </tr>
      </tbody>
      </Table>
      <div className="sl-payment-buttons">
        <p>*seat selection available after checkout</p>
        <div className="text--align--right">
        <button className="sl-btn sl-btn--secondary" onClick={this.clearCheckout}>Clear checkout</button>

        <StripeCheckout
           name="ScotLAN"
           token={this.onToken}
           amount={this.props.basketTotal * 100}
           ComponentClass="sl-btn sl-btn--primary"
           currency={config.stripe.CURRENCY}
           stripeKey={config.stripe.API_KEY}
           allowRememberMe={false}
         />
        </div>
      </div>
    </div>
    )} else {
      return (
      <div>No items in basket</div>
    )
    }
  }
}
