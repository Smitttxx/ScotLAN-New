import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import {  FormGroup, FormControl, ControlLabel, Label } from "react-bootstrap";
import "./Product.css";
import "../../components/Loading.css";
import { API } from "aws-amplify";

export default class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      message:"",
      quantityStd:"0",
      quantityVip:"0",
      redirectToCheckout: false
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
      [event.target.id]: event.target.value
    });
  }

  handleChangeVip = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmitStd = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

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
      this.setState({ redirectToCheckout: true });
    }
    else {
      if(!CheckNumber) {
        alert("Please enter a valid positive number");
      }
      else {
        alert("You have entered a number that exceeds the quantity available");
      }
    }

    this.setState({ isLoading: false });
  }


    handleSubmitVip = async event => {
      event.preventDefault();

      this.setState({ isLoading: true });

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
        this.setState({ redirectToCheckout: true });
      }
      else {
        if(!CheckNumber) {
          alert("Please enter a valid positive number");
        }
        else {
          alert("You have entered a number that exceeds the quantity available");
        }
      }

      this.setState({ isLoading: false });
    }


    handleStdQtyIncrease = async event => {
      this.setState({ quantityStd: parseInt(this.state.quantityStd,10) + 1});
    }

    handleStdQtyDecrease = async event => {
      this.setState({ quantityStd: parseInt(this.state.quantityStd,10) - 1});
    }

    handleVipQtyIncrease = async event => {
      this.setState({ quantityVip: parseInt(this.state.quantityVip,10) + 1});
    }

    handleVipQtyDecrease = async event => {
      this.setState({ quantityVip: parseInt(this.state.quantityVip,10) - 1});
    }


  render() {
    if(this.state.isLoading)
    {
      return (
        <div className="container">
          <div className="loading--text">
            <img src="..\..\Images\Pacman-1s-200px.gif" alt="loading" />
            <h4>Please wait ... We are loading the product</h4>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
          </div>
        </div>
      )
    }
    else if (this.state.redirectToCheckout === true) {
           return <Redirect to="/checkout" />
    }
    else {
    return (
      <div className="container">
      {!this.state.isLoading && this.renderProducts(this.state.product)}
      </div>
    );
  }
}

renderProducts(product){

    return <div>
              <br />
              { this.renderProductDetail() }
              <br />
           </div>
}

renderProductDetail(){
  if(this.state.product.Item.Type.S === "Event") {
    return (
      <div>
        <div className="container">
          <ul className="breadcrumbs">
            <li className="crumb crumb--past"><span>Choose your event</span></li>
            <li className="crumb crumb--active"><span>View Basket</span></li>
            <li className="crumb crumb--next"><span>Payment</span></li>
            <li className="crumb crumb--next"><span>Choose Seats</span></li>
          </ul>
        </div>
          <h2 className="product-heading">{this.state.product.Item.Name.S}<span className="text-muted"></span></h2>
        <div className="row product--info">
          <p className="lead">Events take place over a 3 day weekend starting on a Friday at 6 and finishing on a Sunday evening so games can be played 24hrs a day,
            if you have enough energy drinks.</p>
          <div className="col-md-8">
            <li> What you need to know </li>
              <ul>
                <li>Gamers : 96 ( {parseInt(this.state.product.Item.AvailableQtyStd.N,10) + parseInt(this.state.product.Item.AvailableQtyVip.N,10)} tickets available)</li>
                <li>Event : 18:00, 01-03 March 2019</li>
                <li>Parking Avalible : Yes </li>
                <li>Ticket Price: from £40</li>
                <li>Address: Juniper Green Scout Hall, 45 Lanark Road W, Currie, EH14 5JX</li>
              </ul>
          </div>
          <div className="col-md-4">
            <div id="falkirkMaplocation"></div>
          </div>
        </div>
        <h2 className="product-heading">Choose Your Tickets<span className="text-muted"></span></h2>
        <div className="product--info">
            <div className="accordion row">
              <div className="col-md-6">
                <div className="accordion-standard">
                  <a href="#standard" data-toggle="collapse" aria-expanded="false">
                <div>Buy Standard Ticket</div>
                  <div>Quantity Avalibile : {this.state.product.Item.AvailableQtyStd.N} <i className="fas fa-chevron-down"></i></div>
                </a>
                </div>
                <div id="standard" className="standard" aria-expanded="false">
                  This ticket includes:
                  <ul>
                    <li>48 Hour Access to the Event</li>
                    <li>Indoor Sleeping Area</li>
                    <li>1x Ethernet Cable</li>
                    <li>3ft Desk</li>
                  </ul>
                  <div className="buy buy--standardtickets">
                    <div className="sl-inputspinner">
                    <form onSubmit={this.handleSubmitStd}>
                      <FormGroup controlId="quantityStd">
                      <div className="sl-inputspinner">
                        <input value="-"  onClick={this.handleStdQtyDecrease} className="sl-btn-inputspinner sljs-paxminus sl-btn--inputspinner sl-inputspinner__btn sl-inputspinner--minus" type="button" />
                        <FormControl value={this.state.quantityStd} type="quantityStd" onChange={this.handleChangeStd} bsClass="sl-spinnerinput sl-pax-adults sljs-passengerchange sl-inputspinner__input" min="1" disabled="" type="text" />
                        <input value="+" onClick={this.handleStdQtyIncrease} className="sl-btn-inputspinner sljs-paxplus sl-btn--inputspinner sl-inputspinner__btn sl-inputspinner--plus" type="button" />
                      </div>
                      </FormGroup>
                      <button type="submit" className="buy--standard--payment">Payment</button>
                    </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="accordion-vip">
                  <a href="#vip" data-toggle="collapse">
                  <div>Buy V.I.P Ticket</div>
                    <div>Quantity Avalibile : {this.state.product.Item.AvailableQtyVip.N} <i className="fas fa-chevron-down"></i></div>
                  </a>
                </div>
                <div id="vip" className="vip">
                  This ticket includes:
                  <ul>
                    <li>1x Standard Ticket</li>
                    <li>1x GT Omega Racing Gaming Chair</li>
                  </ul>
                  <div className="buy buy--viptickets">
                  <form onSubmit={this.handleSubmitVip}>
                    <FormGroup controlId="quantityVip" bsSize="small">
                    <div className="sl-inputspinner">
                      <input value="-" onClick={this.handleVipQtyDecrease} className="sl-btn-inputspinner sljs-paxminus sl-btn--inputspinner sl-inputspinner__btn sl-inputspinner--minus" type="button" />
                      <FormControl  value={this.state.quantityVip} type="quantityVip" onChange={this.handleChangeVip} bsClass="sl-spinnerinput sl-pax-adults sljs-passengerchange sl-inputspinner__input" min="1" disabled="" type="text" />
                      <input value="+" onClick={this.handleVipQtyIncrease} className="sl-btn-inputspinner sljs-paxplus sl-btn--inputspinner sl-inputspinner__btn sl-inputspinner--plus" type="button" />
                    </div>
                    </FormGroup>
                    <button type="submit" className="buy--viptickets--payment">Payment</button>
                  </form>
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

  // renderProducts(product){
  //
  //     return <form onSubmit={this.handleSubmit}>
  //               <br />
  //               { this.renderProductDetail() }
  //               <br />
  //              <FormGroup controlId="quantity" bsSize="small">
  //                <ControlLabel>Quantity</ControlLabel>
  //                <FormControl
  //                  value={this.state.quantity}
  //                  type="quantity"
  //                  onChange={this.handleChange}
  //                />
  //              </FormGroup>
  //               <button type="submit">Add to basket</button>
  //               <p>{this.state.message}</p>
  //            </form>
  //
  // }
  //
  // renderProductDetail(){
  //   if(this.state.product.Item.Type.S === "Event") {
  //     return (
  //       <div><h2>
  //         <Label>Name</Label> {this.state.product.Item.Name.S}
  //       </h2>
  //       <h2>
  //         <Label>Price</Label> £{this.state.product.Item.Price.N}
  //       </h2>
  //       <h2>
  //         <Label>Description</Label> {this.state.product.Item.Description.S}
  //       </h2>
  //       <h2>
  //         <Label>Event Date</Label> {this.state.product.Item.EventDate.S}
  //       </h2>
  //       <h2>
  //         <Label>Tickets available</Label> {this.state.product.Item.AvailableQty.N}
  //       </h2>
  //       </div>
  //     )
  // }
  // else {
  //   return (
  //     <div><h2>
  //       <Label>Name</Label> {this.state.product.Item.Name.S}
  //     </h2>
  //     <h2>
  //       <Label>Price</Label> £{this.state.product.Item.Price.N}
  //     </h2>
  //     <h2>
  //       <Label>Description</Label> {this.state.product.Item.Description.S}
  //     </h2>
  //     </div>
  //   )
  // }
  // }
}
