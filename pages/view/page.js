"use strict";

import React, { Component } from 'react';
import { branch } from "baobab-react/higher-order";

import _ from "lodash";
import actions from "../utils/actions";
import commons from "../utils/commons";
import locale from "../utils/locale";
import ajax from "../utils/ajax";
class Page extends Component{
    constructor(props){
        super(props);
        // _.bindAll(this, "");
        commons.initComponent(this, { actions: actions });
    }

    render(){
        return (
            <div>index1111</div>
        )
    }
}

export default branch({
    data: ['page']
}, Page);