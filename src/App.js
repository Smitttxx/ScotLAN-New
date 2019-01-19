import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
//import { Nav, Navbar, NavItem } from "react-bootstrap";
//import './App.css';
import './main.css';
import Routes from "./Routes";
import { Auth } from "aws-amplify";
//import Iframe from 'react-iframe'


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
      Authorization: ""
    };
  }

  async componentDidMount() {
  try {
    if (await Auth.currentSession()) {
       this.userHasAuthenticated(true);
       let user = await Auth.currentAuthenticatedUser();
       this.setState({ email: user.attributes.name });
       this.setState({ username: user.username });
       this.setState({ Authorization: user.signInUserSession.idToken.jwtToken })
    }
  }
  catch(e) {
    if (e !== 'No current user') {
      alert(e);
    }
  }

  this.hydrateStateWithLocalStorage();

  window.addEventListener(
    "beforeunload",
    this.saveStateToLocalStorage.bind(this)
  );

  this.setState({ isAuthenticating: false });
}

componentWillUnmount() {
    window.removeEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );

    this.saveStateToLocalStorage();
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
    for(let i = 0; i < this.state.basket.length; i++)
    {
      basketTotalCalc = basketTotalCalc + (parseInt(this.state.basket[i].Quantity,10) * parseInt(this.state.basket[i].Price,10));
    }

    this.setState({ basketTotal: basketTotalCalc });
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
    this.setState({basketTotal: 0})
    this.setState({IncludesEventTicket: false})
    this.setState({EventTicketCount: 0})
  }

  handleLogout = async event => {
    await Auth.signOut();

    this.userHasAuthenticated({authenticated:false,username:"",email:""});

    this.props.history.push("/login");
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
      <div>
      <div className="SL-header-background">
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <Link className="navbar-brand" to="/"><img className="img-logo"  src="/Images/Scotlan_logo-nongrid-text--NoLogo.png" alt="Generic placeholder image" /></Link>
            </div>
            <nav className="col-lg-7 navbar navbar-default navbar-static-top">
              <ul className="nav nav-pills">
                <li className="nav-item">
                  <a className="nav-link" >About Us <i className="fas fa-chevron-down"></i></a>
                    <ul>
                      <Link to="/AboutUs"><li>Meet the team</li></Link>
                      <Link to="/Contact"><li>Contact Us</li></Link>
                      <Link to="/Partners"><li>Our Partners</li></Link>
                    </ul>
                </li>
                <li className="nav-item">
                  <a className="nav-link" >Our Events <i className="fas fa-chevron-down"></i></a>
                    <ul>
                      <Link to="/PreviousEvents"><li>Previous Events</li></Link>
                      <Link to="/NextEvents"><li>Next Events</li></Link>
                      <Link to="/Gallery"><li>Gallery</li></Link>
                    </ul>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/FAQS">FAQ's</Link>
                </li>
                {this.state.isAuthenticated
                      ? [<li class="nav-item"><Link className="nav-link" to="/orders">My Account <i class="fas fa-chevron-down"></i></Link><ul><Link className="nav-link" to="/orders">My Orders</Link><a href="#" className="nav-link" onClick={this.handleLogout}>Logout</a></ul></li>]
                      : <Fragment>
                          <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                          </li>
                        </Fragment>
                    }
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <Routes childProps={childProps} />
      <footer className="SL-footer-background" >
                <div className="container">
                  <div className="row">
                    <div className="col-lg-3">
                      <a href=""><li><i className="fab fa-facebook"> </i> Facebook</li></a>
                      <a href=""><li><i className="fab fa-twitter-square"> </i> Twitter</li></a>
                      <a href=""><li><i className="fab fa-instagram"></i> Instagram</li></a>
                      <a href=""><li><i className="fab fa-discord"></i> Discord</li></a>
                      <a href=""><li><i className="fab fa-linkedin"></i>LinkedIn</li></a>
                      <a href=""><li><i className="fab fa-snapchat-square"></i>SnapChat</li></a>
                    </div>
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
