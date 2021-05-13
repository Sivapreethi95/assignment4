/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable react/destructuring-assignment */
/* eslint "react/react-in-jsx-scope": "off" */
/* global document */
/* eslint "react/jsx-no-undef": "off" */
/* eslint "no-alert": "off" */

import 'babel-polyfill';
import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import ProductList from './ProductList.jsx';
import Page from "./Page.jsx";



const element = (
    <Router>
        <Page/>
    </Router>
)
ReactDOM.render(element, document.getElementById('contents'));

if (module.hot) {
    module.hot.accept();
}