import React, { Component } from "react";
import {  FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../../components/LoaderButton";
import { API, Auth } from "aws-amplify";
import Iframe from 'react-iframe'

export default class Contact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      message: "",
      submitted: false
    };
  }

  async componentDidMount() {
    window.scrollTo(0, 0)
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  validateForm() {
    return this.state.name.length > 0 && this.state.email.length > 0 && this.state.message.length > 0;
  }

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      let request = {
          body: {
            "Name": this.state.name,
            "Email": this.state.email,
            "Message": this.state.message
          }
      }

      API.post("contact", `/contact`, request).then(response => {
        this.setState({ isLoading: false });
        this.setState({ submitted:true });
      });

    } catch (e) {
      alert(e.message);
      this.setState({ isLoading: false });
    }
  }

  render() {
    if(this.state.submitted){
      return (
        <div class="sl--sitecontainer--background__keyboard">
          <div className="container">
            Thanks for your message.
          </div>
        </div>
        )
    } else {
    return (
      <div className="keyboard-background">
        <div className="section-container">
          <div className="section-container-keyboard">
          <div className="container">
        <div class="row">
          <div class="col-md-9">
            <form onSubmit={this.handleSubmit}>
            <div class="sl-signup-header">Contact us</div>
              <FormGroup controlId="name" bsSize="large">
                <ControlLabel>Name</ControlLabel>
                <FormControl
                  autoFocus
                  type="text"
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
              <FormGroup controlId="message" bsSize="large">
                <ControlLabel>Message</ControlLabel>
                <FormControl
                  componentClass="textarea"
                  value={this.state.message}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <div class="sl-signup-buttons">
              <LoaderButton
                block
                bsSize="large"
                disabled={!this.validateForm()}
                type="submit"
                isLoading={this.state.isLoading}
                text="Submit"
                loadingText="Submitting.."
              />
              </div>
            </form>
            </div>
            <div class="col-md-3">
              <Iframe url="https://ptb.discordapp.com/widget?id=132976447638863873&theme=dark"
              width="100%"
              height="450px"
              id="myId"
              className="Discord"
              display="initial"
              position="relative"
              allowFullScreen/>
                  </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    ); }
  }
}
