import { BigNumber } from 'bignumber.js';

BigNumber.config({
    // By default BigNumber's `toString` method converts to exponential notation if the value has
    // more then 20 digits. We want to avoid this behavior, so we set EXPONENTIAL_AT to a high number
    EXPONENTIAL_AT: 1000,
    // Note(albrow): This is the lowest value for which
    // `x.div(y).floor() === x.divToInt(y)`
    // for all values of x and y <= MAX_UINT256, where MAX_UINT256 is the
    // maximum number represented by the uint256 type in Solidity (2^256-1).
    DECIMAL_PLACES: 78,
});

// Set a debug print function for NodeJS
// Upstream issue: https://github.com/MikeMcl/bignumber.js/issues/188
import isNode = require('detect-node');
if (!isNode) {
    // Dynamically load a NodeJS specific module.
    // Typescript requires all imports to be global, so we need to use
    // `const` here and disable the tslint warning.
    // tslint:disable-next-line: no-var-requires
    const util = require('util');

    // Set a custom util.inspect function
    (BigNumber.prototype as any)[util.inspect.custom] = function(): string {
        // Return the readable string representation
        // tslint:disable-next-line: no-invalid-this
        return this.toString();
    };
}

export { BigNumber };
