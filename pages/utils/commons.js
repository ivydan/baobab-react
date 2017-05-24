"use strict";

import locale from "./locale.js";
import _ from "lodash";

const assert = function(condition, error){
    if (condition !== true) {
        throw new Error(error);
    }
}

/**
 *  mapping array
 *
 *  example:
 *  --------------
 *  let array = [{
 *      a: 1,
 *      b: 2
 *  }];
 *
 *  let result = mappingArray({c: "a", d: "b"}, array);
 *  // result will be: [{ c: 1, d: 2 }]
 */
function mappingArray(mapObj, array) {
    if (array == null) {
        array = [];
    }

    return array.map(function(item) {
        var result = {};
        _.forEach(mapObj, function(value, key) {
            result[key] = item[value];
        });
        return result;
    });
}

/**
 *  transform action handle to accept promise, when promise resolved,
 *  call action handler
 *
 *  @param actions: the actions object
 */
function promisifyActions(actions){
    return _.mapValues(actions, function(fun){
        return _.wrap(fun, function(handler){
            let params = Array.prototype.slice.call(arguments, 1);
            // first param is tree, param after that is passed data
            let dataOrPromise = params[1];

            // if first param is promise, call action handler after promise resolved
            if (dataOrPromise != null && _.isFunction(dataOrPromise.then)) {
                dataOrPromise.then( data => {
                    params[1] = data;
                    handler.apply(this, params);
                });

            }else{
                handler.apply(this, params);
            }
        });
    });
}

/**
 *  init component, do two things:
 *
 *  1). add dispatch() method to component, so inside component, use
 *      `this.dispatch("action_name", params)` to dispatch an action
 *
 *  2). add getData() method to component, so inside component, use it to get data from baobob tree.
 *      the return value of `component.getData("a.b.c")` is equivalent to `component.props.data.a.b.c`.
 */
function initComponent(component, options){
    let actions = options.actions;
    assert(_.isObjectLike(actions), "expect options.actions to be an object, but get " + typeof actions);

    // assign dispatch() method to component
    component.dispatch = function(name){
        let actionHandler = actions[name];
        let args = Array.prototype.slice.call(arguments, 0);
        assert(actionHandler != null, "action not found: " + name);
        args[0] = actionHandler;
        this.props.dispatch.apply(this, args);
    }.bind(component);

    // assign getData() method to component
    assert(component.getData === undefined,  // check method existence
           "component's 'getData' property already defined, fail to assign getData() method to component");
    component.getData = function(path){
        return _.at(this.props.data, path)[0];
    }.bind(component);
}

export default {
    mappingArray: mappingArray,
    assert: assert,
    promisifyActions: promisifyActions,
    initComponent: initComponent
};

