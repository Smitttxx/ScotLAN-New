import React, { Component } from "react";
import {  FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Link } from "react-router-dom";
import LoaderButton from "../../components/LoaderButton";
import "./Login.css";
import { Auth } from "aws-amplify";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      email: "",
      password: ""
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
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
      await Auth.signIn(this.state.email, this.state.password);
      let user = await Auth.currentAuthenticatedUser();
      this.props.userHasAuthenticated({authenticated:true,username:user.username,email:user.attributes.name});
    } catch (e) {
      alert(e.message);
      this.setState({ isLoading: false });
    }
  }

  render() {
    return (
      <div class="sl-signup-background">
      <div className="container">
        <form onSubmit={this.handleSubmit}>
        <div class="sl-signup-header">Log In to your account</div>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
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
          <div class="sl-signup-buttons">
          <LoaderButton
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Login"
            loadingText="Logging in…"
          />
          <div className="Signup">
            <h3>Or</h3>
            <br/>
            <Link className="sl-btn sl-btn--secondary" to={`/Signup`}>Signup here</Link>
          </div>
          </div>
        </form>
      </div>
      </div>
    );
  }
}
