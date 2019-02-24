import React, {Component} from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';
import config from '../../config';
import "./Checkout.css";

class CheckoutPayment extends Component {
  render() {
    return (
      <div className="sl--sitecontainer--background__keyboard">
        <div className="container">
          <StripeProvider apiKey={config.stripe.API_KEY}>
            <div className="example">
              <Elements>
                <CheckoutForm />
              </Elements>
            </div>
          </StripeProvider>
      </div>
      </div>
    );
  }
}

export default CheckoutPayment;
