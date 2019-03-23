const dev = {
  apiGateway: {
    REGION: "EU-WEST-1",
    URL: "https://qlmra00b19.execute-api.eu-west-1.amazonaws.com/Test"
  },
  cognito: {
    REGION: "EU-WEST-1",
    USER_POOL_ID: "eu-west-1_gMRgwFaHL",
    APP_CLIENT_ID: "vj272lfh416fm13j88m71io73",
    IDENTITY_POOL_ID: "eu-west-1:611c7e0f-9e5c-489c-9e26-88fc59f82f01"
  },
  stripe: {
    API_URL: "https://qlmra00b19.execute-api.eu-west-1.amazonaws.com/Test/processorder",
    API_URL_FOOD: "https://qlmra00b19.execute-api.eu-west-1.amazonaws.com/Test/processfoodorder",
    API_KEY:"pk_test_A3NvjjIWb6uVbWUAjl8Vsm4y",
    CURRENCY: "GBP",
    REDIRECT: "https://newsite.scotlan.events/checkoutpayment"
  }
};

const prod = {
  apiGateway: {
    REGION: "EU-WEST-1",
    URL: "https://qlmra00b19.execute-api.eu-west-1.amazonaws.com/Production"
  },
  cognito: {
    REGION: "EU-WEST-1",
    USER_POOL_ID: "eu-west-1_gMRgwFaHL",
    APP_CLIENT_ID: "vj272lfh416fm13j88m71io73",
    IDENTITY_POOL_ID: "eu-west-1:611c7e0f-9e5c-489c-9e26-88fc59f82f01"
  },
  stripe: {
    API_URL: "https://qlmra00b19.execute-api.eu-west-1.amazonaws.com/Production/processorder",
    API_URL_FOOD: "https://qlmra00b19.execute-api.eu-west-1.amazonaws.com/Production/processfoodorder",
    API_KEY:"pk_live_4gBhYvQOO3dpUW9mryXE35G6",
    CURRENCY: "GBP",
    REDIRECT: "https://production.scotlan.events/checkoutpayment"
  }
};

const config = process.env.REACT_APP_STAGE === 'production '
  ? prod
  : dev;

export default {
  ...config
};
