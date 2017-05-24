"use strict";

import _ from "lodash";
import commons from "./commons.js";

const actions = {
    //show store select
    // showStoreSelect(tree, show){
    //     tree.select("page","showStoreSelect").set(show);
    // },
}

export default commons.promisifyActions(actions);