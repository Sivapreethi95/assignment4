import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import NumInput from './NumInput.jsx';
import TextInput from './TextInput.jsx';

export default class ProductEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      product: {},
      redirect: false,
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  onChange(event, naturalValue) {
    const { name, value: textValue } = event.target;
    const value = naturalValue === undefined ? textValue : naturalValue;
    this.setState(prevState => ({
      product: { ...prevState.product, [name]: value },
    }));
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { product } = this.state;
    console.log('Product Editing');
    console.log(product);

    const query = `mutation productUpdate(
            $id: Int!
            $changes: ProductUpdateInputs!
        ) {
            productUpdate(
                id: $id
                changes: $changes
            ) {
                id
                category
                productName
                price 
                image
            }
        }`;
    console.log('A');
    const { id, created, ...changes } = product;
    console.log('B');
    const response = await fetch(window.ENV.UI_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables: { id, changes } }),
    });
    console.log('C');
    const result = await response.json();
    console.log(result);
    if (result) {
      this.setState({ product: result.data.productUpdate, redirect: true });
      console.log('Product Updated Successfully!!');
    }
  }

  async loadData() {
    const query = `query product($id: Int!) {
            product(id: $id){
                id
                category
                productName
                price 
                image
            }
        }`;
    const { match: { params: { id } } } = this.props;
    console.log('Yoyoyo');
    console.log(id);
    const response = await fetch(window.ENV.UI_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables: { id } }),
    });
    const result = await response.json();
    console.log(result);
    this.setState({ product: result.data.product });
  }

  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/" />;
    }
    const { product: { id } } = this.state;
    const { match: { params: { id: propsId } } } = this.props;
    if (id == null) {
      if (propsId != null) {
        return <h3>{`Product with ID ${propsId} not found`}</h3>;
      }
      return null;
    }

    const { product: { category, productName } } = this.state;
    const { product: { price, image } } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <h3>{`Editing Product: ${id}`}</h3>
        <table>
          <tbody>
            <tr>
              <td>Category:</td>
              <td>
                <select className="category-input" name="category" id="category" value={category} onChange={this.onChange}>
                  <option value="Shirts">Shirts</option>
                  <option value="Jeans">Jeans</option>
                  <option value="Jackets">Jackets</option>
                  <option value="Sweaters">Sweaters</option>
                  <option value="Accessories">Accessories</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Product Name:</td>
              <td><TextInput type="text" name="productName" value={productName} onChange={this.onChange} key={id} /></td>
            </tr>
            <tr>
              <td>Price:</td>
              <td><NumInput type="text" name="price" value={price} onChange={this.onChange} key={id} /></td>
            </tr>


            <tr>
              <td>Image URL:</td>
              <td><input type="text" name="image" value={image} onChange={this.onChange} /></td>
            </tr>

            <tr>
              <td />
              <td><button type="submit">Submit</button></td>
            </tr>
          </tbody>
        </table>
      </form>
    );
  }
}
