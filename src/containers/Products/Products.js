import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Products.css";
import "../../components/Loading.css";
import { API } from "aws-amplify";

export default class Products extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }

  async componentDidMount() {
      try {
        const products = await this.products();
        this.setState({ products });
        this.setState({ isLoading: false });
        } catch (e) {
        alert(e);
      }
  }

  products() {
    return API.get("products", "/products");
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });
  }



  render() {
    if(this.state.isLoading)
    {
      return (
        <div class="sl--sitecontainer--background__keyboard">
        <div className="container">
          <div className="loading--text">
            <img src="..\..\Images\Pacman-1s-200px.gif" alt="loading" />
            <h4>Please wait ... We are loading the products</h4>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
          </div>
        </div>
        </div>
      )
    }
    else {
    return (
      <div className="container">
      <h1>Products</h1>
      {!this.state.isLoading && this.renderProducts(this.state.products)}
      </div>
    );
  }
  }

  renderProducts(products){
    return this.state.products.map(function(product, i) {
      return <li key={i}><Link to={`/Product/${product.Type.S}/${product.Name.S}`}>{product.Name.S}</Link></li>
    })
  }
}
