import React, { Component } from "react";
import { Table } from "react-bootstrap";
import StripeCheckout from 'react-stripe-checkout';
import "./Checkout.css";
import config from '../../config';
import { Link, withRouter } from "react-router-dom";
import Iframe from 'react-iframe'
import { API, Auth } from "aws-amplify";

export default class Checkout extends Component {
  constructor(props) {
    super(props);
    this.onToken = this.onToken.bind(this);
    this.state = {
      isLoading: true,
      message:"",
      orderID: "",
      orderFailed: false
    };
  }

async onToken(token) {

  this.setState({ isLoading: true });

  let user = await Auth.currentAuthenticatedUser();

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
      email: user.attributes.email,
      username: user.username,
      includesEventTicket: this.props.IncludesEventTicket,
      eventTicketCount: this.props.EventTicketCount
    }),
  });
  const data = await res.json();

  console.log(data);

  if(data.message === "Payment processed")
  {
      var orderID = data.charge.id;
      this.setState({ orderID: orderID });
      this.props.clearCheckout();
  } else {
    this.setState({ orderFailed: true });
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

    var countDownDate = new Date("Jul 5, 2019 18:00:00").getTime();
    var now = new Date().getTime();
    var distance = countDownDate - now;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));


    if(this.state.isLoading)
    {
      return (
        <div className="keyboard-background">
          <div className="section-container">
            <div className="section-container-keyboard">
              <div className="container">
                <div className="loading--text">
                  <img src="..\..\Images\Pacman-1s-200px.gif" alt="loading" />
                    <h4>Please wait ... We are placing your order</h4>
                      <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                  </div>
                  </div>
        </div>
        </div>
        </div>
      )
    }
    else if(this.state.orderFailed)
    {
      return (
        <div className="sl--sitecontainer--background__keyboard">
          <div className="container">
            <div>Payment declined, please contact your card provider.</div>
          </div>
        </div>
      )
    }
    else if(this.state.orderID !== ""){
      return (

        <div className="keyboard-background">
          <div className="section-container">
            <div className="section-container-keyboard">
              <div className="container container--basketpage">

                <br/>
                  <div class="row">
                    <div class="col-md-8">
                    <div className="sl--confimation--header"><h3>Payment Sucessfull! </h3></div><br/>
                      <div className="sl--confimation--header"><h4>You're going to ScotLAN #5!</h4></div><br/>
                      <p> You will receive an email with your order details and if you have any queries about your order please do not hesitate to email payments@scotlan.events</p>
                    <p> Remember to head over to your account to <Link to={`/SeatPlan/${this.state.orderID}`}>pick your seat!</Link></p>

                    <p>Come Join us on <a href="https://discord.gg/BTVZBed" target="_blank">Discord</a> for the pre-lan Hype and to get to know the people coming to the event!</p>

                    <strong><p> Only {days} Days to go! </p></strong>
                    </div>
                    <div class="col-md-4">
                      <Iframe url="https://ptb.discordapp.com/widget?id=132976447638863873&theme=dark"
                      width="100%"
                      height="450px"
                      id="myId"
                      className="Discord"
                      display="initial"
                      position="relative"
                      allowFullScreen/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    )
    } else {
      return (
        <div className="keyboard-background">
          <div className="section-container">
            <div className="section-container-keyboard">
            <div className="container container--basketpage">

        <h2>Your Basket</h2>
        {!this.state.isLoading && this.renderCheckout()}
        </div>
        </div>
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
        <td class="justifyContent">£{item.Price} <button className="btn btn-danger" onClick={()=>{this.removeItem(`${item.ProductName}`)}}><i class="far fa-trash-alt"></i></button></td>
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
           ComponentClass="span"
           currency={config.stripe.CURRENCY}
           stripeKey={config.stripe.API_KEY}
           allowRememberMe={false}
         >
         <button className="sl-btn sl-btn--primary">
          Payment
         </button>
         </StripeCheckout>
        </div>
      </div>
    </div>
    )} else {
      return (
      <div> Ohno <i class="far fa-sad-tear"></i> there are no items in your basket <br/>
      Would you like to go back to the <Link to="/">Homepage</Link> or the <a href="/Product/Event/ScotLAN%20Event%205" >Events Page</a>?
      </div>
    )
    }
  }
}
