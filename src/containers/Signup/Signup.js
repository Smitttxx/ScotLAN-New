import React, { Component } from "react";
import {
  HelpBlock,
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
import LoaderButton from "../../components/LoaderButton";
import "./Signup.css";
import { Auth } from "aws-amplify";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)


export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      name: "",
      email: "",
      password: "",
      gamername:"",
      confirmPassword: "",
      confirmationCode: "",
      newUser: null
    };
  }

  validateForm() {
    return (
      this.state.name.length > 0 &&
      this.state.email.length > 0 &&
      this.state.gamername.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
    );
  }

  async componentDidMount() {
    window.scrollTo(0, 0);
  }


  validateConfirmationForm() {
    return this.state.confirmationCode.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      const newUser = await Auth.signUp({
        username: this.state.email,
        password: this.state.password,
        attributes: {
          'name': this.state.name,
          'custom:GamerName': this.state.gamername
        }
      });
      this.setState({
        newUser
      });
    } catch (e) {
        if(e.message.includes("password")) {
        this.alertPrompt("Please ensure your password contains at least 1 uppercase, lowercase, number and special character");
      } else {
        this.alertPrompt(e.message);
      }
    }

    this.setState({ isLoading: false });
  }

  handleConfirmationSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      await Auth.confirmSignUp(this.state.email, this.state.confirmationCode);
      await Auth.signIn(this.state.email, this.state.password);

      this.props.userHasAuthenticated(true);
      this.props.history.push("/");
    } catch (e) {
      this.alertPrompt(e.message);
      this.setState({ isLoading: false });
    }
  }

  alertPrompt(message) {
    return Swal.fire({
      type: 'warning',
      title: 'Oops...',
      text: message
    })
  }

  renderConfirmationForm() {
    return (
      <form onSubmit={this.handleConfirmationSubmit}>
        <FormGroup controlId="confirmationCode" bsSize="large">
          <ControlLabel>Confirmation Code</ControlLabel>
          <FormControl
            autoFocus
            type="tel"
            value={this.state.confirmationCode}
            onChange={this.handleChange}
          />
          <HelpBlock>Please check your email for the code.</HelpBlock>
        </FormGroup>
        <LoaderButton
          block
          bsSize="large"
          disabled={!this.validateConfirmationForm()}
          type="submit"
          isLoading={this.state.isLoading}
          text="Verify"
          loadingText="Verifying…"
        />
      </form>
    );
  }

  renderForm() {
    return (
      <form onSubmit={this.handleSubmit}>
      <FormGroup controlId="name" bsSize="large">
        <ControlLabel>Name</ControlLabel>
        <FormControl
          autoFocus
          type="name"
          value={this.state.name}
          onChange={this.handleChange}
        />
      </FormGroup>
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="gamername" bsSize="large">
          <ControlLabel>Gamer Name</ControlLabel>
          <FormControl
            type="gamername"
            value={this.state.gamername}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            value={this.state.password}
            onChange={this.handleChange}
            type="password"
          />
        </FormGroup>
        <FormGroup controlId="confirmPassword" bsSize="large">
          <ControlLabel>Confirm Password</ControlLabel>
          <FormControl
            value={this.state.confirmPassword}
            onChange={this.handleChange}
            type="password"
          />
        </FormGroup>
        <LoaderButton
          block
          bsSize="large"
          disabled={!this.validateForm()}
          type="submit"
          isLoading={this.state.isLoading}
          text="Signup"
          loadingText="Signing up…"
        />
      </form>
    );
  }

  render() {
    return (
      <div className="keyboard-background">
        <div className="section-container">
          <div className="section-container-keyboard sl-login-container">
      <div className="container">
      <p> Welcome to ScotLAN</p>
          {this.state.newUser === null
            ? this.renderForm()
            : this.renderConfirmationForm()}
        </div>
      </div>
      </div>
    </div>
    );
  }
}
