import * as _ from "lodash";

export const shallowEqual = (objA: any, objB: any) => {
    if (objA === objB) {
        return true;
    }
    if (!objA || !objB) {
        return false;
    }

    const aKeys = Object.keys(objA);
    const bKeys = Object.keys(objB);

    if (bKeys.length !== aKeys.length) {
        return false;
    }

    return _.every(aKeys, (key) => objA[key] === objB[key]);
};
