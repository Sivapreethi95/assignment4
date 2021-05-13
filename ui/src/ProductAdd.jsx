/* eslint-disable react/prefer-stateless-function */

import React from 'react';
import {
  Form, FormControl, FormGroup, ControlLabel, Button,
} from 'react-bootstrap';
import NumInput from './NumInput.jsx';
import TextInput from './TextInput.jsx';

export default class ProductAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.productAdd;
    const product = {
      productName: form.productName.value,
      price: form.price.value.replace('$', ''),
      category: form.category.value,
      image: form.image.value,
    };
    this.props.createProduct(product);

    form.productName.value = '';
    form.price.value = '$';
    form.category.value = 'Shirts';
    form.image.value = '';
  }

  render() {
    return (
      <Form inline name="productAdd" onSubmit={this.handleSubmit}>
        <label className="category-label" htmlFor="category">Category</label>
        <label className="price-label" htmlFor="price">Price Per Unit</label>

        <br />
        <select className="category-input" name="category" id="category">
          <option value="Shirts">Shirts</option>
          <option value="Jeans">Jeans</option>
          <option value="Jackets">Jackets</option>
          <option value="Sweaters">Sweaters</option>
          <option value="Accessories">Accessories</option>
        </select>

        <NumInput className="price-input" type="text" name="price" placeholder="Price" defaultValue="$" />
        <br />
        <br />
        {/* <label className="productName-label" htmlFor="productName">Product Name</label>
        <label className="image-label" htmlFor="image">Image URL</label> */}
        <br />
        {/* <TextInput className="productName-input" type="text" name="productName" placeholder="Product Name" />
        <input className="image-input" type="text" name="image" placeholder="Image" />
        <br />
        <br />
        <button type="submit">Add Product</button> */}
        <FormGroup>
          <ControlLabel>Product Name </ControlLabel>
          <br />
          <br />
          {''}
          
          <FormControl type="text" name="productName" />
        </FormGroup>
        {''}
        <FormGroup>
        <br />
          <br />
          <ControlLabel>Image </ControlLabel>
          <br />
          <br />
          {''}
          <FormControl type="text" name="image" />
        </FormGroup>
        <br />
          <br />
        <Button bsStyle="primary" type="submit">Add product</Button>
      </Form>
    );
  }
}
