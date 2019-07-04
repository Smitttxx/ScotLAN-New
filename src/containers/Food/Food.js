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
    var newTotal = parseFloat(this.state.foodBasketTotalValue, 10) + parseFloat(splitBasketItem[1], 10);
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
    for (var i = 0; i < 96; i++) {
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
              <div className="">
                <Tabs>
                  <TabList>
                    <Tab class="tab-pizza">Evening Pizza Order <i class="fas fa-pizza-slice"></i></Tab>
                    <Tab class="tab-rolls">Morning Roll Order <i class="fas fa-bacon"></i></Tab>
                  </TabList>
                    {this.renderPizza()}
                    <TabPanel>
                    <div class="food-panel-intro">
                      <p><i class="fas fa-chair"></i> Order Breakfast rolls here for it to be delivered straight to your desk!</p>
                      <p><i class="fas fa-utensils"></i> Our Rolls are delivered from <a href="https://www.tripadvisor.co.uk/ShowUserReviews-g186528-d5422814-r193245852-Jo_s2go-Grangemouth_Falkirk_District_Scotland.html">Mamas Rolls</a></p>
                      <p><b><i class="fas fa-stopwatch"></i> Roll Order closes @ <u>04:00</u> on the morning of delivery </b></p>
                      <p><b><i class="fas fa-truck"></i> Rolls will be delivered between 09:00 and 10:00 on your chosen morning</b></p>
                    </div>
                    <div class="container food-products-panel">
                    <div class="food-product-header-rolls"><i class="fas fa-sun"></i> What Morning ?</div>

                      {this.renderRollRadioButtons()}

                    <div class="food-product-header-rolls"><i class="fas fa-utensils"></i> How many fillings ? </div>
                    <form class="row food-product-rolls-items">
                      {this.renderRollType()}
                    </form>

                      {this.renderToppingOptions()}

                      <button className="btn btn-lg btn-secondary sl-btn sl-btn--secondary sl-btn-addrolltobasket" onClick={()=>this.addRollToBasket()}>
                       Add Roll to Basket
                      </button>
                      </div>
                    </TabPanel>
                </Tabs>
              </div>
            </div>
          </div>
          <div className="section-container-keyboard col-lg-4">
            <div className="sl-products--container food-basket-sticky">
              <div className="container">
              <h3>BASKET</h3>
                <ul>
                  {this.renderBasket()}
                  <br/>
                  Total Price : £{this.state.foodBasketTotalValue}
                </ul>
                <div class="sl-form-flex">
                <label className="control-label"><i class="fas fa-chair"></i> Seat Number:</label>
                  <div className="sl-searchform__option">
                    <span className="sl-select" >
                      <select size="1" className="sl-component sl-select" onChange={this.handleSeatChange} value={this.state.seatNumber}>
                      <option value="" selected>Please select</option>
                      {this.createTable()}
                      </select>
                  </span>
                  </div>
                </div>


                <FormGroup controlId="gamerName" bsSize="large">
                  <ControlLabel><i class="fas fa-user-circle"></i> Gamer Name:</ControlLabel>
                  <FormControl
                    autoFocus
                    type="gamerName"
                    required
                    onChange={this.handleChange}
                    value={this.state.gamerName}
                    className="sl-form-gamername"
                  />
                </FormGroup>
                <button className="btn btn-lg btn-secondary sl-btn sl-btn--secondary sl-btn--clearbasket" onClick={()=>this.clearFoodBasket()}>
                 <i class="fas fa-times"></i> Clear basket
                </button>
                {this.renderPaymentButton()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    }
  }

  renderRollRadioButtons() {
    var date = new Date();
    var lastOrder=new Date('2019-07-06 04:00');
    var lastOrder2=new Date('2019-07-07 04:00');
  //  var lastOrder=new Date('2019-06-29 22:47');
  //  var lastOrder2=new Date('2019-06-29 22:48');

    if(date < lastOrder) {
      return (
        <form class="row food-product-rolls-items">
        <div className="form-check">
          <label class="radio-buttons-custom">
            <input
              type="radio"
              name="react-tips"
              value="Saturday"
              className="form-check-input"
              onChange={this.handleMorningChange}
            />
             <span class="checkmark"></span>
            <span class="food-label-text">Saturday Morning</span>
          </label>
        </div>
        <div className="form-check">
          <label class="radio-buttons-custom">
            <input
              type="radio"
              name="react-tips"
              value="Sunday"
              className="form-check-input"
              onChange={this.handleMorningChange}
            />
             <span class="checkmark"></span>
          <span class="food-label-text">Sunday Morning</span>
          </label>
        </div>
        </form>
      )
    } else if (date < lastOrder2) {
      return (
        <form class="row food-product-rolls-items">
        <div className="form-check">
          <label class="radio-buttons-custom">
            <input
              type="radio"
              name="react-tips"
              value="Sunday"
              className="form-check-input"
              onChange={this.handleMorningChange}
            />
             <span class="checkmark"></span>
          <span class="food-label-text">Sunday Morning</span>
          </label>
        </div>
        </form>
      )
    } else {
      return(
        <div>Too late</div>
      )
    }
  }

  renderPizza(){
    var date = new Date();
    //var lastOrder=new Date('2019-06-20 23:34'); //Testing
    var lastOrder=new Date('2019-07-06 17:00');

    if(date < lastOrder) {
      return (
        <TabPanel>
        <div class="food-panel-intro">
          <p><i class="fas fa-chair"></i> Order food here for it to be delivered straight to your desk!</p>
          <p><i class="fas fa-utensils"></i> Our Pizzas are delivered from Domino's</p>
          <p><b><i class="fas fa-stopwatch"></i> Pizza Order closes @ <u>17:00</u> on Saturday Evening </b></p>
          <p><b><i class="fas fa-truck"></i> Pizza will be delivered between 19:00 and 20:00</b></p>
        </div>
          <div class="container food-products-panel">
            <div class="food-product-header"> Pizzas </div>
              {this.renderPizzaProducts()}
              <br/>
            <div class="food-product-header"> Sides </div>
              {this.renderSideProducts()}
            <div class="food-product-header"> Desserts </div>
              {this.renderDessertProducts()}
            </div>
          </TabPanel>
      )
    } else {
      return (
        <TabPanel>
            <div>Too late</div>
        </TabPanel>
      )
    }
  }

  renderPizzaProducts(){
    return this.state.foodproducts.map(function(product, i) {
      if(product.Type.S === "Pizza") {
      return (
        <div class="row food-item-row">
          <div class="col-lg-10">
            <div class="product">
              <div class="information">
                  <div class="name food-product-title">{product.Name.S}</div>
                  <div class="description food-product-description">{product.Description.S}</div>
              </div>
            </div>
          </div>
          <div class="col-lg-2">
            <div class="details">
                <div class="price ">
                  <button aria-label="Add" class="addButton " type="submit" onClick={()=>{this.addProductToBasket(`${product.Name.S};${product.Price.N};Pizza`)}}><span class="food-item-price">£ {product.Price.N}</span><i class="fas fa-plus"></i></button>
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
        <div class="row food-item-row">
          <div class="col-lg-10">
            <div class="product">
              <div class="information">
                  <div class="name food-product-title">{product.Name.S}</div>
                  <div class="description food-product-description">{product.Description.S}</div>
              </div>
            </div>
          </div>
          <div class="col-lg-2">
            <div class="details">
                <div class="price ">
                <button aria-label="Add" class="addButton " type="submit" onClick={()=>{this.addProductToBasket(`${product.Name.S};${product.Price.N};Side`)}}><span class="food-item-price">£ {product.Price.N}</span><i class="fas fa-plus"></i></button>
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
        <div class="row food-item-row">
          <div class="col-lg-10">
            <div class="product">
              <div class="information">
                  <div class="name food-product-title">{product.Name.S}</div>
                  <div class="description food-product-description ">{product.Description.S}</div>
              </div>
            </div>
          </div>
          <div class="col-lg-2">
            <div class="details">
                <div class="price ">
                  <button aria-label="Add" class="addButton " type="submit" onClick={()=>{this.addProductToBasket(`${product.Name.S};${product.Price.N};Desset`)}}><span class="food-item-price">£ {product.Price.N}</span><i class="fas fa-plus"></i></button>
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
          <label class="radio-buttons-custom">
            <input
              type="radio"
              name="react-tips"
              value={product.Name.S}
              className="form-check-input"
              onChange={this.handleTypeChange}
            />
            <span class="checkmark"></span>
           <span class="food-label-text">{product.Name.S} - £{product.Price.N}</span>
          </label>
        </div>
      )
    }
    }.bind(this))
  }

  renderPaymentButton() {
    if(this.state.gamerName === "" || this.state.seatNumber === "" || this.state.foodBasket.length < 1) {
      return(
        <button className="btn btn-lg btn-secondary sl-btn sl-btn--secondary sl-btn--basketpayment" onClick={()=>this.validateOrder()}>
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
         <button className="btn btn-lg btn-secondary sl-btn sl-btn--secondary sl-btn--basketpayment">
          Purchase Food
         </button>
         </StripeCheckout>
      )
    }
  }

  renderToppingOptions() {
    if(this.state.rollType === "Single") {
      return(
        <div class="food-rolls-options">
          <div class="food-rolls-options-toppings">
        Filling 1:

        <div className="sl-searchform__option">
          <span className="sl-select" >
            <select size="1" className="sl-component sl-select" onChange={this.handleTopping1Change} value={this.state.rollTopping1}>
            <option value="" selected>Choose filling 1</option>
            {this.createRollToppingTable()}
            </select>
        </span>
        </div>
        </div>
        </div>
        )
    } else if(this.state.rollType === "Double") {
      return(
        <div class="food-rolls-options">
          <div class="food-rolls-options-toppings">
            Filling 1:

            <div className="sl-searchform__option">
              <span className="sl-select" >
                <select size="1" className="sl-component sl-select" onChange={this.handleTopping1Change} value={this.state.rollTopping1}>
                <option value="" selected>Choose filling 1</option>
                {this.createRollToppingTable()}
                </select>
            </span>
          </div>
        </div>
        <div class="food-rolls-options-toppings">
          Filling 2:

          <div className="sl-searchform__option">
            <span className="sl-select" >
              <select size="1" className="sl-component sl-select" onChange={this.handleTopping2Change} value={this.state.rollTopping2}>
              <option value="" selected>Choose filling 2</option>
              {this.createRollToppingTable()}
              </select>
          </span>
        </div>
        </div>
        </div>
        )
    } else if(this.state.rollType === "Triple") {
      return(
        <div class="food-rolls-options">
          <div class="food-rolls-options-toppings">
            Filling 1:

            <div className="sl-searchform__option">
              <span className="sl-select" >
                <select size="1" className="sl-component sl-select" onChange={this.handleTopping1Change} value={this.state.rollTopping1}>
                <option value="" selected>Choose filling 1</option>
                {this.createRollToppingTable()}
                </select>
            </span>
            </div>
            </div>
            <div class="food-rolls-options-toppings">
            Filling 2:


          <div className="sl-searchform__option">
            <span className="sl-select" >
              <select size="1" className="sl-component sl-select" onChange={this.handleTopping2Change} value={this.state.rollTopping2}>
              <option value="" selected>Choose filling 2</option>
              {this.createRollToppingTable()}
              </select>
          </span>
          </div>
                </div>
          <div class="food-rolls-options-toppings">
          Filling 3:

            <div className="sl-searchform__option">
              <span className="sl-select" >
                <select size="1" className="sl-component sl-select" onChange={this.handleTopping3Change} value={this.state.rollTopping3}>
                <option value="" selected>Choose filling 3</option>
                {this.createRollToppingTable()}
                </select>
            </span>
            </div>
          </div>
        </div>
        )
      }
  }
}
