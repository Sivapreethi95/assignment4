import React from 'react';

export default class ProductImage extends React.Component {
  constructor() {
    super();
    this.state = {
      product: {},
      redirect: false,
    };
  }

  componentDidMount() {
    this.loadData();
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
      <div>
        <h3>{`Viewing image for Product: ${id}`}</h3>
        <br />
        <img src={image} alt={productName} width="500px" />
      </div>

    );
  }
}
