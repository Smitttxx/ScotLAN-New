import React from 'react';

import { BasketContext } from '../context/BasketContext';

export default () => {
  return (
    <BasketContext.Consumer>
      {basketVal =>
        basketVal.locale === 'en' ? <h1>Welcome!</h1> : <h1>{basketVal.basketItems}</h1>
      }
    </BasketContext.Consumer>
  );
};
