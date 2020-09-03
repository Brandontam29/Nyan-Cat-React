/* eslint-disable import/prefer-default-export */

export const findTrues = (array) => {
    let number = 0;
    array.forEach((bool) => {
        if (bool === true) {
            number += 1;
        }
    });

    return number;
};
