import React, { Component } from "react";
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
      quantity:""
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

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });



    var CheckNumber = /^\d+$/.test(this.state.quantity);

    var CheckQty = false;

    if(this.state.quantity <= parseInt(this.state.product.Item.AvailableQty.N, 10)) {
      CheckQty = true;
    }

    if(CheckNumber && CheckQty) {
      this.props.addToBasket(this.state.product.Item.Name.S + ";" + this.state.quantity + ";" + this.state.product.Item.Price.N + ";" + this.state.product.Item.Type.S);
      this.setState({ message: "Item added to basket" })
    }
    else {
      if(!CheckNumber) {
        this.setState({ message: "Please enter a valid number" })
      }
      else {
        this.setState({ message: "You have enter a number that exceeds the quantity available" })
      }
    }

    this.setState({ isLoading: false });
  }

  render() {
    if(this.state.isLoading)
    {
      return (
        <div className="loading--text">
          <img src="..\..\Images\Pacman-1s-200px.gif" alt="loading" />
          <h4>Please wait ... We are loading the product</h4>
        </div>
      )
    }
    else {
    return (
      <div className="container">
      <h1>Product Information</h1>
      {!this.state.isLoading && this.renderProducts(this.state.product)}
      </div>
    );
  }
}

  renderProducts(product){

      return <form onSubmit={this.handleSubmit}>
                <br />
                { this.renderProductDetail() }
                <br />
               <FormGroup controlId="quantity" bsSize="small">
                 <ControlLabel>Quantity</ControlLabel>
                 <FormControl
                   value={this.state.quantity}
                   type="quantity"
                   onChange={this.handleChange}
                 />
               </FormGroup>
                <button type="submit">Add to basket</button>
                <p>{this.state.message}</p>
             </form>

  }

  renderProductDetail(){
    if(this.state.product.Item.Type.S === "Event") {
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
        <h2>
          <Label>Event Date</Label> {this.state.product.Item.EventDate.S}
        </h2>
        <h2>
          <Label>Tickets available</Label> {this.state.product.Item.AvailableQty.N}
        </h2>
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
