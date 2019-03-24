import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Amplify from "aws-amplify";
import config from "./config";
import ReactGA from 'react-ga';

ReactGA.initialize('UA-9881080-4');
ReactGA.pageview(window.location.pathname + window.location.search);

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
  },
  API: {
    endpoints: [
      {
        name: "products",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION
      },
      {
        name: "product",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION
      },
      {
        name: "orders",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION
      },
      {
        name: "seatPlan",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION
      },
      {
        name: "order",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION
      },
      {
        name: "seatplan",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION
      },
      {
        name: "selectseat",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION
      },
      {
        name: "contact",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION
      },
      {
        name: "foodproducts",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION
      },
      {
        name: "editseat",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION
      }
    ]
  }
});

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
registerServiceWorker();
