import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { Label } from "react-bootstrap";
import "./Product.css";
import "../../components/Loading.css";
import { API } from "aws-amplify";
import GoogleMapReact from 'google-map-react';
import { Link, withRouter } from "react-router-dom";

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
        lat: 55.995980,
        lng: -3.786270
      },
      zoom: 16
    };
  }

  async componentDidMount() {
      try {
        const product = await this.product();
        this.setState({ product });
        this.setState({ isLoading: false });
        } catch (e) {
        alert(e);
      }
  }

  product() {
    return API.get("product", `/product?name=${this.props.match.params.Name}&type=${this.props.match.params.Type}`);
  }

  handleChangeStd = event => {
    this.setState({
      quantityStd: event.target.value
    });
  }

  handleChangeVip = event => {
    this.setState({
      quantityVip: event.target.value
    });
  }

  handleSubmit = async event => {
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
            alert("Please enter a valid positive number");
            success = false;
          }
          else {
            alert("You have entered a number that exceeds the quantity of standard tickets available");
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

      if(parseInt(this.state.product.Item.AvailableQtyStd.N, 10) > 0) {
        CheckPositive = true;
      }

      if(CheckNumber && CheckQty && CheckPositive) {
        this.props.addToBasket(this.state.product.Item.Name.S + " - VIP;" + this.state.quantityVip + ";" + this.state.product.Item.PriceVip.N + ";" + this.state.product.Item.Type.S);
        this.setState({ message: "Item added to basket" });
      }
      else {
        if(!CheckNumber) {
          alert("Please enter a valid positive number");
          success = false;
        }
        else {
          alert("You have entered a number that exceeds the quantity of VIP tickets available");
          success = false;
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
      alert("Please select either a standard or VIP ticket");
    }
    this.setState({ isLoading: false });
  }


//    handleSubmitVip = async event => {
//      event.preventDefault();
//
//      this.setState({ isLoading: true });
//
//      var CheckNumber = /^\d+$/.test(this.state.quantityVip);
//
//      var CheckQty = false;
//
//      if(this.state.quantityVip <= parseInt(this.state.product.Item.AvailableQtyVip.N, 10)) {
//        CheckQty = true;
//      }
//
//      var CheckPositive = false;
//
//      if(parseInt(this.state.product.Item.AvailableQtyStd.N, 10) > 0) {
//        CheckPositive = true;
//      }
//
//      if(CheckNumber && CheckQty && CheckPositive) {
//        this.props.addToBasket(this.state.product.Item.Name.S + " - VIP;" + this.state.quantityVip + ";" + this.state.product.Item.PriceVip.N + ";" + this.state.product.Item.Type.S);
//        this.setState({ message: "Item added to basket" });
//        this.setState({ redirectToCheckout: true });
//      }
//      else {
//        if(!CheckNumber) {
//          alert("Please enter a valid positive number");
//        }
//        else {
//          alert("You have entered a number that exceeds the quantity available");
//        }
//      }
//
//      this.setState({ isLoading: false });
//    }

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
  if(this.state.product.Item.Type.S === "Event") {
    return (
      <div className="sl--sitecontainer--background__keyboard">
  <div className="container sl-products--container">
    <div className="container">
      <h2 className="product-heading">{this.state.product.Item.Name.S}<span className="text-muted"></span></h2>
    <div className="row product--info">
      <p className="lead">Events take place over a 3 day weekend starting on a Friday at 6 and finishing on a Sunday evening so games can be played 24hrs a day,
        if you have enough energy drinks.</p>
      <div className="col-md-8">
        <li> What you need to know </li>
          <ul>
            <li>Gamers : 96 ({parseInt(this.state.product.Item.AvailableQtyStd.N,10) + parseInt(this.state.product.Item.AvailableQtyVip.N,10)} tickets available)</li>
            <li>Event : 18:00, 01-03 March 2019</li>
            <li>Parking Avalible : Yes </li>
            <li>Ticket Price: from £40</li>
            <li>Address: Juniper Green Scout Hall, 45 Lanark Road W, Currie, EH14 5JX</li>
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
                lat={55.995980}
                lng={-3.786270}
                text={''}
              />
            </GoogleMapReact>
          </div>

      </div>
    </div>
    <h2 className="product-heading">Choose Your Tickets<span className="text-muted"></span></h2>
    <div className="product--info">
        <div className="accordion">
          <div className="row">
            <div className="col-md-6">
            <div id="ticket standard" className="ticket standard" aria-expanded="false">
            <div className="ticket--header">Buy Standard BYOC Tickets</div>
              <div>Quantity Avalibile : {this.state.product.Item.AvailableQtyStd.N}</div>
              This ticket includes:
              <ul>
                <li>48 Hour Access to the Event</li>
                <li>Indoor Sleeping Area</li>
                <li>1x Ethernet Cable</li>
                <li>3ft Desk</li>
              </ul>

              <label>Choose a quantity of Standard BYOC* Tickets</label>
              <div className="row">
              <div className="col-md-6">
              <label className="green"><strong>Price Per Ticket :</strong> £35</label>
              </div>
              <div className="col-md-6">
              <div className="sl-searchform__option">
                <span className="sl-select">
                  <select size="1" className="sl-component sl-select" onChange={this.handleChangeStd} value={this.state.quantityStd}>
                    <option value="Any" selected>0</option>
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
             <div class="ribbon"><span>V.I.P </span></div>
            <div id="vip" className="vip">
            <div className="ticket--header">Buy V.I.P BYOC Tickets</div>
              <div>Quantity Avalibile : {this.state.product.Item.AvailableQtyVip.N} </div>
              This ticket includes:
              <ul>
                <li>1x Standard Ticket</li>
                <li>1x GT Omega Racing Gaming Chair</li>
                <li>Free 5x Random Steam Keys</li>
                <li>Free ScotLAN Goodie Bag</li>
              </ul>
              <label>Choose a quantity of VIP BYOC* tickets</label>
              <div className="row">
              <div className="col-md-6">
              <label className="blue"><strong>Price Per Ticket :</strong> £50</label>
              </div>
              <div className="col-md-6">
              <div className="sl-searchform__option">
                <span className="sl-select">
                  <select size="1" className="sl-component sl-select" onChange={this.handleChangeVip} value={this.state.quantityVip}>
                  <option value="Any" selected>0</option>
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
          <div className="col-md-12">

            <div className="sl-but--header">
            Got a question? <Link to="/Contact" className="btn btn-lg btn-secondary sl-btn sl-btn--secondary">Contact Us</Link> or
            <form onSubmit={this.handleSubmit}>
                 <button type="submit" className="btn btn-lg btn-primary sl-btn sl-btn--primary">Go to Payment</button>
            </form>
            </div>
              <small><i>*BYOC - bring your own computer</i></small>
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
      <Label>Price</Label> £{this.state.product.Item.Price.N}
    </h2>
    <h2>
      <Label>Description</Label> {this.state.product.Item.Description.S}
    </h2>

    </div>
  )
}
}
}
