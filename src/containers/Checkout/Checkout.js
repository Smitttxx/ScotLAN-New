import React, { Component } from "react";
import { Table } from "react-bootstrap";
import StripeCheckout from 'react-stripe-checkout';
import "./Checkout.css";
import config from '../../config';
import { Link, withRouter } from "react-router-dom";
import Iframe from 'react-iframe'
import { API, Auth } from "aws-amplify";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export default class Checkout extends Component {
  constructor(props) {
    super(props);
    this.onToken = this.onToken.bind(this);
    this.state = {
      isLoading: true,
      message: "",
      orderID: "",
      orderFailed: false,
      orderQuantityFailed: false,
      checkoutQuantityValid: true
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


      if(data.message === "Payment processed") {
        var orderID = data.charge.id;
        this.setState({ orderID: orderID });
        this.props.clearCheckout();
      } else if(data.error === "The quantity of tickets in the basket exceed the number of available tickets") {
        this.setState({ orderQuantityFailed: true });
        this.props.clearCheckout();
      } else {
        this.setState({ orderFailed: true });
      }


      this.setState({ isLoading: false });
  }

  async componentDidMount() {
    try {
        let quantityCheck = await this.checkQuantity();
        console.log(quantityCheck);
        if(quantityCheck) {
          this.setState({ isLoading: false });
          window.scrollTo(0, 0);
          this.alertPrompt("If you're under 16 years old you will need to bring a parental consent form to the event. <a href='https://s3-eu-west-1.amazonaws.com/scotlanassets/ScotLANParentalConsent.pdf' target='_blank'>You can find a copy of the form here</a>");
        } else {
          this.alertQuantityPrompt();
          this.props.clearCheckout();
          this.setState({ isLoading: false });
        }
    } catch (e) {
      alert(e);
    }
  }

  alertQuantityPrompt() {
    return Swal.fire({
      type: 'question',
      title: 'Basket quantity',
      html: "The quantity of tickets in your basket exceed the number of available tickets. Your basket has been cleared."
    })
  }

  alertPrompt(message) {
    return Swal.fire({
      type: 'question',
      title: 'Under 16?',
      html: message
    })
  }

  checkQuantity() {
    var basketJson = JSON.stringify(this.props.basket);
    var request = {
      body: {
        "Basket": this.props.basket
      }
    }

    return API.post("checkquantity", `/checkquantity`, request);
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

  clearCheckout = event => {
    this.props.clearCheckout();
  }

  removeItem = async productName => {
    await this.props.removeFromBasket(productName);
    await this.props.recalcBasket();
  }

  render() {

    var countDownDate = new Date("Nov 29, 2019 18:00:00").getTime();
    var now = new Date().getTime();
    var distance = countDownDate - now;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));


    if (this.state.isLoading) {
      return (
        <div className="keyboard-background">
          <div className="section-container">
            <div className="section-container-keyboard">
              <div className="container">
                <div className="loading--text">
                  <img src="..\..\Images\Pacman-1s-200px.gif" alt="loading" />
                  <h4>Please wait ... We are placing your order</h4>
                  <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
    else if (this.state.orderFailed) {
      return (
        <div className="sl--sitecontainer--background__keyboard">
          <div className="container">
            <div>Payment declined, please contact your card provider.</div>
          </div>
        </div>
      )
    }
    else if (this.state.orderQuantityFailed) {
      return (
        <div className="keyboard-background">
          <div className="section-container">
            <div className="section-container-keyboard">
              <div className="container container--404">
                <div class="row">
                    <h3>Oh no.</h3>
                    <p>It looks like someone snapped that ticket up before your payment went through, Dont worry your card has not been charged.</p>
                    <p>Would you like to go to the <Link to="/">Homepage</Link>?</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
    else if (this.state.orderID !== "") {
      return (

        <div className="keyboard-background">
          <div className="section-container">
            <div className="section-container-keyboard">
              <div className="container container--basketpage">

                <br />
                <div class="row">
                  <div class="col-md-8">
                    <div className="sl--confimation--header"><h3>Payment Sucessfull! </h3></div><br />
                    <div className="sl--confimation--header"><h4>You're going to ScotLAN #7!</h4></div><br />
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
                      allowFullScreen />
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
    if (this.props.basketTotal !== 0) {
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
                  <td class="justifyContent">£{item.Price} <button className="btn btn-danger" onClick={() => { this.removeItem(`${item.ProductName}`) }}><i class="far fa-trash-alt"></i></button></td>
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
      )
    } else {
      return (

      <div> <br/>Ohno <i class="far fa-sad-tear"></i> there are no items in your basket <br/><br/>
      Would you like to go back to the <Link to="/">Homepage</Link>?

      </div>
      )
    }
  }
}
