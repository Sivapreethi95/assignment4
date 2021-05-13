import React from 'react';
// import { NavLink } from 'react-router-dom';
import {
  Navbar, Nav, NavItem, NavDropdown,
  MenuItem, Glyphicon, Tooltip, OverlayTrigger, Grid,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Contents from './Contents.jsx';


function NavBar() {
  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>Inventory Management</Navbar.Brand>
      </Navbar.Header>
      <Nav>
        <LinkContainer exact to="/">
          <NavItem>Home</NavItem>
        </LinkContainer>
        <LinkContainer exact to="/products">
          <NavItem>Product List</NavItem>
        </LinkContainer>
        <LinkContainer exact to="/image">
          <NavItem>Image</NavItem>
        </LinkContainer>
      </Nav>
      <Nav pullRight>
        <NavItem>
          <OverlayTrigger
            placement="left"
            delayShow={1000}
            overlay={<Tooltip id="creat-product">Create product</Tooltip>}
          >
            <Glyphicon glyph="plus" />
          </OverlayTrigger>
        </NavItem>
        <NavDropdown
          id="user-dropdown"
          title={<Glyphicon glyph="option-vertical" />}
          noCaret
        >
          <MenuItem>About</MenuItem>
        </NavDropdown>
      </Nav>
    </Navbar>
  );
}

export default function Page() {
  return (
    // <div>
    //   <NavBar />
    //   <Contents />
    // </div>
    <Grid fluid>
      <NavBar />
      <Contents />
    </Grid>
  );
}
