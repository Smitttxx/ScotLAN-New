import React, { Component } from "react";
import "./Food.css";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {  FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "react-tabs/style/react-tabs.css";


export default class Food extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      key: 'home',
    };
  }

  async componentDidMount() {
    window.scrollTo(0, 0);
  }


  render() {
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
                    <Tab>Pizza Order <i class="fas fa-pizza-slice"></i></Tab>
                    <Tab>Roll Order <i class="fas fa-bacon"></i></Tab>
                  </TabList>
                  <TabPanel>
                  <h2> Pizzas </h2>
                    <div class="row">
                      <div class="col-lg-10">
                        <div class="product">
                          <div class="information">
                              <h4 class="name ">Pizza 1</h4>
                              <div class="description ">Topping, Topping Topping</div>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-2">
                        <div class="details">
                            <div class="price ">£15.50
                              <button aria-label="Add" class="addButton " type="submit">+</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    <div class="row">
                      <div class="col-lg-10">
                        <div class="product">
                          <div class="information">
                              <h4 class="name ">Pizza 1</h4>
                              <div class="description ">Topping, Topping Topping</div>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-2">
                        <div class="details">
                            <div class="price ">£15.50
                              <button aria-label="Add" class="addButton " type="submit">+</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    <div class="row">
                      <div class="col-lg-10">
                        <div class="product">
                          <div class="information">
                              <h4 class="name ">Pizza 1</h4>
                              <div class="description ">Topping, Topping Topping</div>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-2">
                        <div class="details">
                            <div class="price ">£15.50
                              <button aria-label="Add" class="addButton " type="submit">+</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    <div class="row">
                      <div class="col-lg-10">
                        <div class="product">
                          <div class="information">
                              <h4 class="name ">Pizza 1</h4>
                              <div class="description ">Topping, Topping Topping</div>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-2">
                        <div class="details">
                            <div class="price ">£15.50
                              <button aria-label="Add" class="addButton " type="submit">+</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    <br/>
                  <h2> Sides </h2>
                    <div class="row">
                      <div class="col-lg-10">
                        <div class="product">
                          <div class="information">
                              <h4 class="name ">Side 1</h4>
                              <div class="description ">Side Description</div>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-2">
                        <div class="details">
                            <div class="price ">£15.50
                              <button aria-label="Add" class="addButton " type="submit">+</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    <div class="row">
                      <div class="col-lg-10">
                        <div class="product">
                          <div class="information">
                              <h4 class="name ">Side 2</h4>
                              <div class="description ">Side Description</div>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-2">
                        <div class="details">
                            <div class="price ">£15.50
                              <button aria-label="Add" class="addButton " type="submit">+</button>
                            </div>
                          </div>
                        </div>
                      </div>
                  <h2> Desserts </h2>
                    <div class="row">
                      <div class="col-lg-10">
                        <div class="product">
                          <div class="information">
                              <h4 class="name ">Dessert 1</h4>
                              <div class="description ">Side Description</div>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-2">
                        <div class="details">
                            <div class="price ">£15.50
                              <button aria-label="Add" class="addButton " type="submit">+</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    <div class="row">
                      <div class="col-lg-10">
                        <div class="product">
                          <div class="information">
                              <h4 class="name ">Dessert 2</h4>
                              <div class="description ">Side Description</div>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-2">
                        <div class="details">
                            <div class="price ">£15.50
                              <button aria-label="Add" class="addButton " type="submit">+</button>
                            </div>
                          </div>
                        </div>
                      </div>
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
                          value="option1"
                          checked={true}
                          className="form-check-input"
                        />
                        Saturday Morning
                      </label>
                    </div>
                    <div className="form-check col-lg-4">
                      <label>
                        <input
                          type="radio"
                          name="react-tips"
                          value="option2"
                          className="form-check-input"
                        />
                        Sunday Morning
                      </label>
                    </div>
                    <div className="form-check col-lg-4">
                      <label>
                        <input
                          type="radio"
                          name="react-tips"
                          value="option3"
                          className="form-check-input"
                        />
                        Same Order Both Mornings
                      </label>
                    </div>
                  </form>
                  <h5> Select Roll Type: </h5>
                  <form class="row">
                    <div className="form-check col-lg-4">
                      <label>
                        <input
                          type="radio"
                          name="react-tips"
                          value="option1"
                          checked={true}
                          className="form-check-input"
                        />
                        Single
                      </label>
                    </div>
                    <div className="form-check col-lg-4">
                      <label>
                        <input
                          type="radio"
                          name="react-tips"
                          value="option2"
                          className="form-check-input"
                        />
                        Double
                      </label>
                    </div>
                    <div className="form-check col-lg-4">
                      <label>
                        <input
                          type="radio"
                          name="react-tips"
                          value="option3"
                          className="form-check-input"
                        />
                        Tripple
                      </label>
                    </div>
                  </form>

                  Topping 1:

                  <div className="sl-searchform__option">
                    <span className="sl-select" >
                      <select size="1" className="sl-component sl-select">
                      <option value="" selected>Choose Topping 1</option>
                      <option value="1">Sausage</option>
                      <option value="2">Fried Egg</option>
                      <option value="3">Bacon</option>
                      <option value="4">Haggis</option>
                      <option value="5">Black Pudding</option>
                      <option value="6">Tattie Scone</option>
                      </select>
                  </span>
                  </div>
                  Topping 2:

                  <div className="sl-searchform__option">
                    <span className="sl-select" >
                      <select size="1" className="sl-component sl-select">
                      <option value="" selected>Choose Topping 2</option>
                      <option value="1">Sausage</option>
                      <option value="2">Fried Egg</option>
                      <option value="3">Bacon</option>
                      <option value="4">Haggis</option>
                      <option value="5">Black Pudding</option>
                      <option value="6">Tattie Scone</option>
                      </select>
                  </span>
                  </div>
                  Topping 3:

                  <div className="sl-searchform__option">
                    <span className="sl-select" >
                      <select size="1" className="sl-component sl-select">
                      <option value="" selected>Choose Topping 3</option>
                      <option value="1">Sausage</option>
                      <option value="2">Fried Egg</option>
                      <option value="3">Bacon</option>
                      <option value="4">Haggis</option>
                      <option value="5">Black Pudding</option>
                      <option value="6">Tattie Scone</option>
                      </select>
                  </span>
                  </div>

                    <a class="btn btn-lg btn-secondary sl-btn sl-btn--secondary"  role="button">Add Roll to Basket</a>
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
                  <br/>
                  <h4>Rolls</h4>
                  <br/>
                  <li>
                    Radio option : Saturday
                  </li>
                  <li>
                    Doubler : Sauasge, Bacon £3.99
                  </li>
                  <li>
                    Single : Sausage £3.99
                  </li>
                  <br/>
                  <h4>Pizza</h4>
                  <li>
                    Peperoni passion x1 £3.99
                  </li>
                  <li>
                    Chicken Strips x1 £3.99
                  </li>
                  <li>
                    Cookies x2 £3.99
                  </li>
                  <br/>
                  Total Price : £40
                </ul>
                Seat Number:
                <div className="sl-searchform__option">
                  <span className="sl-select" >
                    <select size="1" className="sl-component sl-select">
                    <option value="" selected>from 1-114</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    </select>
                </span>
                </div>

                <FormGroup controlId="email" bsSize="large">
                  <ControlLabel>Gamer Name:</ControlLabel>
                  <FormControl
                    autoFocus
                    type="email"
                    required
                  />
                </FormGroup>
                <a class="btn btn-lg btn-secondary sl-btn sl-btn--secondary"  role="button">Purchase Food</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
