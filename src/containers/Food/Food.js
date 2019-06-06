import React, { Component } from "react";
import "./Food.css";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {  FormGroup, FormControl, ControlLabel, Table, Button, Modal, Form } from "react-bootstrap";
import "react-tabs/style/react-tabs.css";
import { API,Auth } from "aws-amplify";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import StripeCheckout from 'react-stripe-checkout';
import config from '../../config';

const MySwal = withReactContent(Swal)

export default class Food extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isLoading: true,
      key: 'home',
      foodBasket: [],
      foodBasketTotalValue: 0.00,
      seatNumber: "",
      gamerName: "",
      orderID: "",
      orderFailed: false,
      rollMorning:"",
      rollType:"",
      rollTopping1:"",
      rollTopping2:"",
      rollTopping3:"",
      rollPrice:0.00
    };

    this.validateOrder = this.validateOrder.bind(this);
    this.onToken = this.onToken.bind(this);
  }

  async componentDidMount() {
    try {
        window.scrollTo(0, 0);
        const foodproducts = await this.foodproducts();
        this.setState({ foodproducts });
        this.setState({ isLoading: false });
      } catch (e) {
      this.alertPrompt(e);
    }
  }

  async onToken(token) {

    this.setState({ isLoading: true });

    let user = await Auth.currentAuthenticatedUser();

    const res = await fetch(config.stripe.API_URL_FOOD, {
      method: 'POST',
      body: JSON.stringify({
        token,
        charge: {
          amount: this.state.foodBasketTotalValue * 100,
          currency: config.stripe.currency,
        },
        basket: this.state.foodBasket,
        basketTotal: this.state.foodBasketTotalValue,
        email: user.attributes.email,
        username: user.username,
        gamerName: this.state.gamerName,
        seatNumber: this.state.seatNumber
      }),
    });
    const data = await res.json();

    if(data.message === "Payment processed")
    {
        var orderID = data.charge.id;
        this.setState({ orderID: orderID });
        this.clearFoodBasket();
    } else {
      this.setState({ orderFailed: true });
    }

    this.setState({ isLoading: false });
  }

  foodproducts() {
    return API.get("foodproducts", `/foodproducts`);
  }

  clearFoodBasket() {
    this.setState({foodBasket: []});
    this.setState({foodBasketTotalValue: 0.00});
  }

  addRollToBasket() {
    var validated = true;

    if(this.state.rollMorning === "") {
      this.alertPrompt("Please select roll morning")
      validated = false;
    } else if(this.state.rollType === "") {
      this.alertPrompt("Please select roll type")
      validated = false;
    } else if(this.state.rollType === "Single") {
      if(this.state.rollTopping1 === "") {
        this.alertPrompt("Please select a topping")
        validated = false;
      }
    } else if(this.state.rollType === "Double") {
      if(this.state.rollTopping1 === "" || this.state.rollTopping2 === "") {
        this.alertPrompt("Please select your toppings");
        validated = false;
      }
    } else if(this.state.rollType === "Triple") {
      if(this.state.rollTopping1 === "" || this.state.rollTopping2 === "" || this.state.rollTopping3 === "") {
        this.alertPrompt("Please select your toppings");
        validated = false;
      }
    }

    if(validated) {
      this.addProductToBasket(`${this.state.rollMorning} Roll;${this.state.rollPrice};${this.state.rollType};${this.state.rollTopping1};${this.state.rollTopping2};${this.state.rollTopping3}`);
    }
  }

  validateOrder() {
    if(this.state.seatNumber === "") {
      this.alertPrompt("Please select a seat")
    } else if(this.state.gamerName === "") {
      this.alertPrompt("Please enter a gamer name")
    } else if(this.state.foodBasket.length < 1) {
      this.alertPrompt("Please add something to your basket")
    }
  }

  addProductToBasket = basketItem => {
    var splitBasketItem = basketItem.split(";");
    if(splitBasketItem[2] === "Single" || splitBasketItem[2] === "Double" || splitBasketItem[2] === "Triple") {
      this.state.foodBasket.push({"ProductName":splitBasketItem[0], "Price": splitBasketItem[1], "Type": splitBasketItem[2], "Topping1": splitBasketItem[3], "Topping2": splitBasketItem[4], "Topping3": splitBasketItem[5]});
    } else {
      this.state.foodBasket.push({"ProductName":splitBasketItem[0], "Price": splitBasketItem[1], "Type": splitBasketItem[2]});
    }
    var newTotal = parseInt(this.state.foodBasketTotalValue, 10) + parseInt(splitBasketItem[1], 10);
    this.setState({foodBasketTotalValue: newTotal});
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSeatChange = event => {
    this.setState({
      seatNumber: event.target.value
    });
  }

  handleTopping1Change = event => {
    this.setState({
      rollTopping1: event.target.value
    });
  }

  handleTopping2Change = event => {
    this.setState({
      rollTopping2: event.target.value
    });
  }

  handleTopping3Change = event => {
    this.setState({
      rollTopping3: event.target.value
    });
  }

  handleMorningChange = event => {
    this.setState({
      rollMorning: event.target.value
    });
  }

  handleTypeChange = event => {
    this.setState({
      rollType: event.target.value
    });

    for(var i=0;i<this.state.foodproducts.length;i++)
    {
      if(this.state.foodproducts[i].Name.S === event.target.value) {
        this.setState({rollPrice:this.state.foodproducts[i].Price.N});
      }
    }
  }

  createTable = () => {
    let table = []
    for (var i = 0; i < 114; i++) {
      table.push(<option value={i + 1}>{i + 1}</option>)
    }
    return table
  }

  createRollToppingTable = () => {
    let table = []
    for (var i = 0; i < this.state.foodproducts.length; i++) {
      if(this.state.foodproducts[i].Type.S === "RollTopping") {
        table.push(<option value={this.state.foodproducts[i].Name.S}>{this.state.foodproducts[i].Name.S}</option>)
      }
    }
    return table
  }

  alertPrompt(message) {
    return Swal.fire({
      type: 'warning',
      title: 'Oops...',
      text: message
    })
  }

  render() {
    if(this.state.isLoading)
    {
      return (
        <div class="sl--sitecontainer--background__keyboard">
        <div className="container">
          <div className="loading--text">
            <img src="..\..\Images\Pacman-1s-200px.gif" alt="loading" />
            <h4>Please wait ... We are loading the product list</h4>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
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
                      <div className="sl--confimation--header"><h4>Your food has been ordered!</h4></div><br/>
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
        <div className="section-container row">
          <div className="section-container-keyboard col-lg-8">
            <div className="sl-products--container">
              <div className="container">
              <h2 class="product-heading">Food Order for SL5 <i class="fas fa-bacon"></i><i class="fas fa-pizza-slice"></i></h2>
              <p> Order food here for it to be delivered straight to your desk! </p>
                <Tabs>
                  <TabList>
                    <Tab class="tab-pizza">Pizza Order <i class="fas fa-pizza-slice"></i></Tab>
                    <Tab class="tab-rolls">Roll Order <i class="fas fa-bacon"></i></Tab>
                  </TabList>
                  <TabPanel>
                  <h2> Pizzas </h2>
                    {this.renderPizzaProducts()}
                    <br/>
                  <h2> Sides </h2>
                    {this.renderSideProducts()}
                  <h2> Desserts </h2>
                    {this.renderDessertProducts()}
                  </TabPanel>
                  <TabPanel>
                  <h2> Roll </h2>
                  <h5> Select the Morning/Mornings you want to roll to be delivered </h5>
                  <form class="row">
                    <div className="form-check col-lg-4">
                      <label>
                        <input
                          type="radio"
                          name="react-tips"
                          value="Saturday"
                          className="form-check-input"
                          onChange={this.handleMorningChange}
                        />
                        Saturday Morning
                      </label>
                    </div>
                    <div className="form-check col-lg-4">
                      <label>
                        <input
                          type="radio"
                          name="react-tips"
                          value="Sunday"
                          className="form-check-input"
                          onChange={this.handleMorningChange}
                        />
                        Sunday Morning
                      </label>
                    </div>
                  </form>
                  <h5> Select Roll Type: </h5>
                  <form class="row">
                    {this.renderRollType()}
                  </form>

                    {this.renderToppingOptions()}

                    <button className="btn btn-lg btn-secondary sl-btn sl-btn--secondary" onClick={()=>this.addRollToBasket()}>
                     Add Roll to Basket
                    </button>
                  </TabPanel>
                </Tabs>
              </div>
            </div>
          </div>
          <div className="section-container-keyboard col-lg-4">
            <div className="sl-products--container">
              <div className="container">
              <h3>BASKET</h3>
                <ul>
                  {this.renderBasket()}
                  <br/>
                  Total Price : £{this.state.foodBasketTotalValue}
                </ul>
                Seat Number:
                <div className="sl-searchform__option">
                  <span className="sl-select" >
                    <select size="1" className="sl-component sl-select" onChange={this.handleSeatChange} value={this.state.seatNumber}>
                    <option value="" selected>Please select</option>
                    {this.createTable()}
                    </select>
                </span>
                </div>

                <FormGroup controlId="gamerName" bsSize="large">
                  <ControlLabel>Gamer Name:</ControlLabel>
                  <FormControl
                    autoFocus
                    type="gamerName"
                    required
                    onChange={this.handleChange}
                    value={this.state.gamerName}
                  />
                </FormGroup>
                {this.renderPaymentButton()}
                <button className="btn btn-lg btn-secondary sl-btn sl-btn--secondary" onClick={()=>this.clearFoodBasket()}>
                 Clear basket
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    }
  }

  renderPizzaProducts(){
    return this.state.foodproducts.map(function(product, i) {
      if(product.Type.S === "Pizza") {
      return (
        <div class="row">
          <div class="col-lg-10">
            <div class="product">
              <div class="information">
                  <h4 class="name ">{product.Name.S}</h4>
                  <div class="description ">{product.Description.S}</div>
              </div>
            </div>
          </div>
          <div class="col-lg-2">
            <div class="details">
                <div class="price ">£{product.Price.N}
                  <button aria-label="Add" class="addButton " type="submit" onClick={()=>{this.addProductToBasket(`${product.Name.S};${product.Price.N};Pizza`)}}>+</button>
                </div>
              </div>
            </div>
          </div>
      )
    }
    }.bind(this))
  }

  renderSideProducts(){
    return this.state.foodproducts.map(function(product, i) {
      if(product.Type.S === "Side") {
      return (
        <div class="row">
          <div class="col-lg-10">
            <div class="product">
              <div class="information">
                  <h4 class="name ">{product.Name.S}</h4>
                  <div class="description ">{product.Description.S}</div>
              </div>
            </div>
          </div>
          <div class="col-lg-2">
            <div class="details">
                <div class="price ">£{product.Price.N}
                  <button aria-label="Add" class="addButton " type="submit" onClick={()=>{this.addProductToBasket(`${product.Name.S};${product.Price.N};Side`)}}>+</button>
                </div>
              </div>
            </div>
          </div>
      )
    }
    }.bind(this))
  }

  renderDessertProducts(){
    return this.state.foodproducts.map(function(product, i) {
      if(product.Type.S === "Dessert") {
      return (
        <div class="row">
          <div class="col-lg-10">
            <div class="product">
              <div class="information">
                  <h4 class="name ">{product.Name.S}</h4>
                  <div class="description ">{product.Description.S}</div>
              </div>
            </div>
          </div>
          <div class="col-lg-2">
            <div class="details">
                <div class="price ">£{product.Price.N}
                  <button aria-label="Add" class="addButton " type="submit" onClick={()=>{this.addProductToBasket(`${product.Name.S};${product.Price.N};Dessert`)}}>+</button>
                </div>
              </div>
            </div>
          </div>
      )
    }
    }.bind(this))
  }

  renderBasket(){
    if(this.state.foodBasket.length < 1) {
      return(<li>Basket empty</li>)
    } else {
      return this.state.foodBasket.map(function(item, i) {
        console.log(this.state.foodBasket);
        if(item.Type === "Single") {
          return (
            <li>
              {item.ProductName} : £{item.Price}
              <br/>
              {item.Topping1}
            </li>
          )
        }
        else if(item.Type === "Double") {
          return (
            <li>
              {item.ProductName} : £{item.Price}
              <br/>
              {item.Topping1}
              <br/>
              {item.Topping2}
            </li>
          )
        }
        else if(item.Type === "Triple") {
          return (
            <li>
              {item.ProductName} : £{item.Price}
              <br/>
              {item.Topping1}
              <br/>
              {item.Topping2}
              <br/>
              {item.Topping3}
            </li>
          )
        } else {
        return (
          <li>
            {item.ProductName} : £{item.Price}
          </li>
        ) }
      }.bind(this))
    }
  }

  renderRollType(){
    return this.state.foodproducts.slice(0).reverse().map(function(product, i) {
      if(product.Type.S === "Roll") {
      return (
        <div className="form-check col-lg-4">
          <label>
            <input
              type="radio"
              name="react-tips"
              value={product.Name.S}
              className="form-check-input"
              onChange={this.handleTypeChange}
            />
            {product.Name.S} - £{product.Price.N}
          </label>
        </div>
      )
    }
    }.bind(this))
  }

  renderPaymentButton() {
    if(this.state.gamerName === "" || this.state.seatNumber === "" || this.state.foodBasket.length < 1) {
      return(
        <button className="btn btn-lg btn-secondary sl-btn sl-btn--secondary" onClick={()=>this.validateOrder()}>
         Purchase Food
        </button>
      )
    } else {
      return(
        <StripeCheckout
           name="ScotLAN"
           token={this.onToken}
           amount={this.state.foodBasketTotalValue * 100}
           ComponentClass="span"
           currency={config.stripe.CURRENCY}
           stripeKey={config.stripe.API_KEY}
           allowRememberMe={false}
         >
         <button className="btn btn-lg btn-secondary sl-btn sl-btn--secondary">
          Purchase Food
         </button>
         </StripeCheckout>
      )
    }
  }

  renderToppingOptions() {
    if(this.state.rollType === "Single") {
      return(
        <div>
        Topping 1:

        <div className="sl-searchform__option">
          <span className="sl-select" >
            <select size="1" className="sl-component sl-select" onChange={this.handleTopping1Change} value={this.state.rollTopping1}>
            <option value="" selected>Choose Topping 1</option>
            {this.createRollToppingTable()}
            </select>
        </span>
        </div>
        </div>
        )
    } else if(this.state.rollType === "Double") {
      return(
        <div>
        Topping 1:

        <div className="sl-searchform__option">
          <span className="sl-select" >
            <select size="1" className="sl-component sl-select" onChange={this.handleTopping1Change} value={this.state.rollTopping1}>
            <option value="" selected>Choose Topping 1</option>
            {this.createRollToppingTable()}
            </select>
        </span>
        </div>
        Topping 2:

        <div className="sl-searchform__option">
          <span className="sl-select" >
            <select size="1" className="sl-component sl-select" onChange={this.handleTopping2Change} value={this.state.rollTopping2}>
            <option value="" selected>Choose Topping 2</option>
            {this.createRollToppingTable()}
            </select>
        </span>
        </div>
        </div>
        )
    } else if(this.state.rollType === "Triple") {
      return(
        <div>
        Topping 1:

        <div className="sl-searchform__option">
          <span className="sl-select" >
            <select size="1" className="sl-component sl-select" onChange={this.handleTopping1Change} value={this.state.rollTopping1}>
            <option value="" selected>Choose Topping 1</option>
            {this.createRollToppingTable()}
            </select>
        </span>
        </div>
        Topping 2:

        <div className="sl-searchform__option">
          <span className="sl-select" >
            <select size="1" className="sl-component sl-select" onChange={this.handleTopping2Change} value={this.state.rollTopping2}>
            <option value="" selected>Choose Topping 2</option>
            {this.createRollToppingTable()}
            </select>
        </span>
        </div>
        Topping 3:

        <div className="sl-searchform__option">
          <span className="sl-select" >
            <select size="1" className="sl-component sl-select" onChange={this.handleTopping3Change} value={this.state.rollTopping3}>
            <option value="" selected>Choose Topping 3</option>
            {this.createRollToppingTable()}
            </select>
        </span>
        </div>
        </div>
        )
      }
  }
}
