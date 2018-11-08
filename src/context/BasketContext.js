import React from 'react';

export const BasketContext = React.createContext();

class BasketProvider extends React.Component {
  constructor(props) {
    super(props);

    this.addItem = (item) => {
      this.setState({basketItems: [item]});
    };

    this.state = {
      basketItems: ["Product1"],
      addItem: this.addItem
    };
  }

  render() {
    return (
      <BasketContext.Provider value={this.state}>
        {this.props.children}
      </BasketContext.Provider>
    );
  }
}

export default BasketProvider;
