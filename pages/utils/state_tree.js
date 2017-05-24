"use strict";

import Baobab from "baobab";

const rootState = {
    page: "abc"
       
}

const tree = new Baobab(rootState, {
    immutable: true
});

window._tree = tree;

export default tree;