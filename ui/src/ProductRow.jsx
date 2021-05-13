/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Button, Glyphicon, Tooltip, OverlayTrigger,
} from 'react-bootstrap';

export default class ProductRow extends React.Component {
  render() {
    const { product, deleteProduct, index } = this.props;
    const editTooltip = (
      <Tooltip id="edit-tooltip" placement="top">Edit</Tooltip>
    );
    const deleteTooltip = (
      <Tooltip id="delete-tooltip" placement="top">Delete Product</Tooltip>
    );

    // function onEdit(e) {
    //   e.preventDefault();
    //   editProduct(index);
    // }

    function onDelete(e) {
      e.preventDefault();
      deleteProduct(index);
    }
    return (
      <tr>
        <td>{product.productName}</td>
        <td>
          $
          {product.price}
        </td>
        <td>{product.category}</td>
        <td><Link to={`/image/${product.id}`}>View</Link></td>
        <td>
          { /* <Link to={`/edit/${product.id}`}>Edit</Link> */}
          {/* {' '}
        </td> */}
          <LinkContainer to={`/edit/${product.id}`}>
            <OverlayTrigger delayShow={1000} overlay={editTooltip}>
              <Button bsSize="xsmall">
                <Glyphicon glyph="edit" />
              </Button>
            </OverlayTrigger>
          </LinkContainer>
        </td>
        <td>
          <OverlayTrigger delayShow={1000} overlay={deleteTooltip}>
            <Button bsSize="xsmall" onClick={onDelete}>
              <Glyphicon glyph="trash" />
            </Button>
          </OverlayTrigger>
        </td>
      </tr>
    );

    // return (
    // // <LinkContainer to={selectLocation}>
    //   <ProductRowValue />
    // // </LinkContainer>
    // );
  }
}
