import React from 'react';

import { BasketContext } from '../context/BasketContext';

export default () => {
  return (
    <BasketContext.Consumer>
      {basketVal => (
        <button onClick={() => basketVal.addItem("test")}>Add to basket</button>
      )}
    </BasketContext.Consumer>
  );
};
