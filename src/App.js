import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { Table } from "react-bootstrap";
//import { Nav, Navbar, NavItem } from "react-bootstrap";
//import './App.css';
import './main.css';
import Routes from "./Routes";
import { Auth } from "aws-amplify";
//import Iframe from 'react-iframe'
import {  Tooltip } from 'react-tippy';



class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true,
      email: "",
      username: "",
      basket: [],
      basketTotal: 0,
      IncludesEventTicket: false,
      EventTicketCount: 0,
      Authorization: "",
      basketQtyTotal: 0
    };
    this.handleMenuClick = this.handleMenuClick.bind(this);
  }

  async componentDidMount() {
  try {
    if (await Auth.currentSession()) {
       this.userHasAuthenticated(true);
       let user = await Auth.currentAuthenticatedUser();

       this.hydrateStateWithLocalStorage();  //moved here to maybe fix old cached login issue

       //console.log(user.signInUserSession.accessToken.payload['cognito:groups'][0]);
       this.setState({ email: user.attributes.name });
       this.setState({ username: user.username });
       this.setState({ Authorization: user.signInUserSession.idToken.jwtToken })
    } else {
      this.userHasAuthenticated(false);
          //console.log(user.signInUserSession.accessToken.payload['cognito:groups'][0]);
      this.setState({ email: "" });
      this.setState({ username: "" });
      this.setState({ Authorization: "" })
    }
  }
  catch(e) {

    if (e !== 'No current user') {
      alert(e);
    }
  }

  //was here

  window.addEventListener(
    "beforeunload",
    this.saveStateToLocalStorage.bind(this)
  );

  this.setState({ isAuthenticating: false });
}

componentWillMount() {
  document.addEventListener('mousedown', this.handleClick, false);
}

componentWillUnmount() {
    window.removeEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );

    this.saveStateToLocalStorage();

    document.removeEventListener('mousedown', this.handleClick, false);
}

  userHasAuthenticated = authenticatedDetail => {
    this.setState({ isAuthenticated: authenticatedDetail.authenticated });
    this.setState({ email: authenticatedDetail.email });
    this.setState({ username: authenticatedDetail.username });
    this.setState({ Authorization: authenticatedDetail.jwtToken })
  }

  hydrateStateWithLocalStorage() {
      for (let key in this.state) {
        if (localStorage.hasOwnProperty(key)) {
          let value = localStorage.getItem(key);

          try {
            value = JSON.parse(value);
            this.setState({ [key]: value });
          } catch (e) {
            this.setState({ [key]: value });
          }
        }
      }
    }

  saveStateToLocalStorage() {
  for (let key in this.state) {
      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  }

  addToBasket = basketItem => {
    var splitBasketItem = basketItem.split(";");
    //var basketTotalCalc = parseInt(this.state.basketTotal,10) + (parseInt(splitBasketItem[1],10) * parseInt(splitBasketItem[2],10));

    const index = this.state.basket.findIndex(bsk => bsk.ProductName === splitBasketItem[0]);

    if(index === -1) {
      this.state.basket.push({"ProductName":splitBasketItem[0], "Quantity": splitBasketItem[1], "Price": splitBasketItem[2], "Type": splitBasketItem[3]});
    }
    else {
      const basketCopy = [...this.state.basket];
      basketCopy[index].Quantity = parseInt(basketCopy[index].Quantity, 10) + parseInt(splitBasketItem[1], 10);
      this.setState({basket: basketCopy});
    }

    if(splitBasketItem[3] === "Event")
    {
      const eventIndex = this.state.basket.findIndex(bsk => bsk.Type === "Event");
      this.setState({ IncludesEventTicket: true });
      this.setState({ EventTicketCount: this.state.basket[eventIndex].Quantity });
      //console.log(parseInt(this.state.EventTicketCount,10) + parseInt(splitBasketItem[1],10));
      this.setState({ EventTicketCount: parseInt(this.state.EventTicketCount,10) + parseInt(splitBasketItem[1],10) });
    }

    //this.setState({ basketTotal: basketTotalCalc });
    this.recalcBasket();
  }

  recalcBasket = event => {

    var basketTotalCalc = 0;
    var basketQtyTotal = 0;
    var includesEventTicket = false;
    var eventTicketCount = 0;
    for(let i = 0; i < this.state.basket.length; i++)
    {
      if(this.state.basket[i].Type === "Event")
      {
        includesEventTicket = true;
        eventTicketCount = eventTicketCount + parseInt(this.state.basket[i].Quantity,10);
      }

      basketTotalCalc = basketTotalCalc + (parseInt(this.state.basket[i].Quantity,10) * parseInt(this.state.basket[i].Price,10));
      basketQtyTotal = basketQtyTotal + parseInt(this.state.basket[i].Quantity,10);
    }

    this.setState({ basketTotal: basketTotalCalc });
    this.setState({ basketQtyTotal: basketQtyTotal });
    this.setState({ IncludesEventTicket: includesEventTicket });
    this.setState({ EventTicketCount: eventTicketCount });
  }

  removeFromBasket = basketItemName => {
    const index = this.state.basket.findIndex(bsk => bsk.ProductName === basketItemName);
    if(index > -1) {
      const basketCopy = [...this.state.basket];
      //var basketTotalCalc = parseInt(this.state.basketTotal,10) - parseInt(basketCopy[index].Price,10);
      basketCopy.splice(index, 1);
      this.setState({basket: basketCopy});
      //this.setState({ basketTotal: basketTotalCalc });
    }
  }

  clearCheckout = event => {
    this.setState({basket: []});
    this.setState({basketTotal: 0});
    this.setState({IncludesEventTicket: false});
    this.setState({EventTicketCount: 0});
    this.setState({basketQtyTotal: 0});
  }

  handleLogout = async event => {
    await Auth.signOut();

    this.userHasAuthenticated({authenticated:false,username:"",email:""});

    this.props.history.push("/login");
  }

  //Dont look here, bad things happen
  handleClick = async (e) => {
    if(this.state.displayMenu){
      this.setState({displayMenu: false});
      document.getElementById("SLHeader").classList.toggle("mobile-menu-expanded");

      if(e.target.className === "fas fa-sign-out-alt")
      {
        await Auth.signOut();

        this.userHasAuthenticated({authenticated:false,username:"",email:""});

        this.props.history.push("/login");
      }

      if(e.target.pathname != undefined) {
        //console.log(e);
        this.props.history.push(e.target.pathname);
        //window.location = e.target.href;
      }
    }
  }

  handleMenuClick() {
    this.setState({displayMenu: true});
    document.getElementById("SLHeader").classList.toggle("mobile-menu-expanded");
  }

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
      basket: this.state.basket,
      addToBasket: this.addToBasket,
      basketTotal: this.state.basketTotal,
      clearCheckout: this.clearCheckout,
      email: this.state.email,
      username: this.state.username,
      IncludesEventTicket: this.state.IncludesEventTicket,
      EventTicketCount: this.state.EventTicketCount,
      authorization: this.state.Authorization,
      removeFromBasket: this.removeFromBasket,
      recalcBasket: this.recalcBasket
    };

    return (
      !this.state.isAuthenticating &&
      <div className="SL-height-100">
      <div id="SLHeader" className="SL-header-background">
        <div className="container">
          <div className="row">
            <div className="col-sm-4">
              <Link className="navbar-brand" to="/"><img className="img-logo"  src="/Images/Scotlan_logo-nongrid-text--NoLogo.png" alt="Generic placeholder image" /></Link>
            </div>
            <nav className="col-sm-8 navbar navbar-default navbar-static-top">
            <div class="mobile-menu-logos">
              <button class="mobile-menu" onClick={this.handleMenuClick}><i class="fas fa-bars"></i></button>
              <div class="nav-item">
              {this.state.basketQtyTotal > 0 ? [
                  <Link className="nav-link" to="/checkout"><i class="fas fa-shopping-basket"><span class="basket-count">{this.state.basketQtyTotal}</span></i></Link>
              ]
              : <span></span>
            }</div>
            </div>
              <ul className="nav nav-pill">
              <button class="mobile-menu-close" onClick={this.handleClick}><i class="fas fa-times"></i></button>

              <li className="nav-item">
                <Link className="nav-link" to="/ProductSoldOut/Event/ScotLAN%20Event%207">#7</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Product/Event/ScotLAN%20Event%208">#8</Link>
              </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/PreviousEvents">Previous Events</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/NextEvents">What is ScotLAN?</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Gallery">Gallery</Link>
                </li>
                {this.state.isAuthenticated
                      ? [ <Fragment>
                            <li class="nav-item">
                              <Link className="nav-link" to="/orders">Orders</Link>
                            </li>
                            <li class="nav-item">
                              <a href="#" className="nav-link" onClick={this.handleLogout}><i class="fas fa-sign-out-alt"></i></a>
                            </li>
                        </Fragment>
                        ]
                      : <Fragment>
                          <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                          </li>
                        </Fragment>
                    }
                    <li className="nav-item nav-item-mobilehide ">
                    {this.state.basketQtyTotal > 0 ? [
                        <Link className="nav-link" to="/checkout"><i class="fas fa-shopping-basket"><span class="basket-count">{this.state.basketQtyTotal}</span></i></Link>
                    ]
                    : <span></span>
                    }
                    </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <Routes childProps={childProps} />
      <footer className="SL-footer-background" >
                <div className="container">
                  <div className="row">
                  <div class="col-md-3">
                  <img src="/Images/Scotlan_Re-work-1.png" alt="scotlan-logo" />
                  </div>
                  <div class="col-md-3">
                  <h4>Information</h4>
                  <ul>
                    <Link to="/AboutUs"><li>Meet the team</li></Link>
                    <Link to="/Contact"><li>Contact Us</li></Link>
                    <Link to="/Partners"><li>Our Partners</li></Link>
                    <Link to="/FAQS"><li>FAQ's</li></Link>
                  </ul>
                  </div>
                    <div class="col-md-6">
                    <h4>Follow us on </h4>
                    <div className="sl-footer-social-media">
                      <a href="https://www.facebook.com/ScotLAN.Events/"><i className="fab fa-facebook"></i></a>
                      <a href="https://twitter.com/ScotLANevents?fbclid=IwAR0q5DSDNcm57QCgkQuTEQuL4va5s4q4lGUH6umG8Hi6JYvFvKfaNC0FtdU"><i className="fab fa-twitter-square"> </i></a>
                      <a href="https://discord.gg/pMxdGfk" target="_blank"><i className="fab fa-discord"></i></a>
                      <a href="https://steamcommunity.com/groups/ScotLANEvents"><i class="fab fa-steam"></i></a>
                    </div>
                </div>
                <small><p>ScotLAN Events Limited (SC620678)</p></small>
                </div>
                  </div>
            </footer>
      </div>
    );
  }
}

//<Iframe url="https://ptb.discordapp.com/widget?id=132976447638863873&theme=dark"
//width="300px"
//height="450px"
//id="myId"
//className="Discord"
//display="initial"
//position="relative"
//allowFullScreen/>

export default withRouter(App);
