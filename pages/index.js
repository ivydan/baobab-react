'use strict';
/**
 * Start Time: 2017-02-24
 * des: index
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { root } from "baobab-react/higher-order";
import Page from "./view/page";
import tree from "./utils/state_tree";
import "./index.less";

class App extends Component {
    render(){
        console.info('render App');
        return (<Page/>);
    }
}

const AppRoot = root(tree, App);
ReactDOM.render(<AppRoot/>, document.getElementById('container'));
