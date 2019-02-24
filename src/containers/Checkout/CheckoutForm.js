import React, {Component} from 'react';
import {CardElement, injectStripe, CardNumberElement, CardExpiryElement, CardCVCElement, PostalCodeElement} from 'react-stripe-elements';
import config from '../../config';
import "./Checkout.css";

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.create3dsource = this.create3dsource.bind(this);
  }

  async submit(ev) {
    //let {token} = await this.props.stripe.createToken({name: "Name"});
  //  console.log(token.id);

    let source = await this.props.stripe.createSource({
      type: 'card',
        currency: config.stripe.CURRENCY,
        owner: {
          email: 'test.test@test.com'
        },
        amount:2000
    }).then((sourceresponse) => {
          this.create3dsource(sourceresponse.source);
          console.log(sourceresponse);
        }
    );
  }

  async create3dsource(sourceid) {
    //3d source
    let dsource = await this.props.stripe.createSource({
      type: 'three_d_secure',
      amount: 2000,
      currency: config.stripe.CURRENCY,
      three_d_secure: {
        card: sourceid.id
      },
      owner: {
        email: 'test.test@test.com'
      },
      redirect: {
        return_url: config.stripe.REDIRECT
      }
    }).then((dsourceresponse) => {
      if (dsourceresponse.error) {
                                this.setState({messageError: dsourceresponse.error.message});
                            } else {
                                let redirect = dsourceresponse.source.redirect;
                                // REDIRECT USER TO redirect.url
                                // CALLBACK ??
                                window.location =redirect.url;

                                console.log(redirect);
                            }
      console.log(dsourceresponse);
    })
  }

  render() {
      return (
        <div className="checkout">
          <h2>3D secure test</h2>
          <div className="CardNumber">
            <label>
               Card number
               <CardNumberElement />
             </label>
           </div>
           <div className="CardExpiry">
             <label>
               Expiration date
               <CardExpiryElement />
             </label>
           </div>
           <div className="CardCVC">
             <label>
               CVC
               <CardCVCElement />
             </label>
           </div>
           <div className="CardPostcode">
             <label>
               Postal code
               <PostalCodeElement />
             </label>
           </div>
          <button onClick={this.submit}>Send</button>
        </div>
      );
  }
}

export default injectStripe(CheckoutForm);
