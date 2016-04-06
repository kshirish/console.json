// arguments to JSON.stringify described in standard
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify

// Usage:
// `replacer` and `space` are optional

// Browser
// returnExports(replacer, space);

// Node.js
// require('console.json')(replacer, space);

(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define([], factory);
    } else if (typeof exports === 'object') {
        // Node, CommonJS-like
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.returnExports = factory();
    }
}(this, function() {

    function setConsoleJson(replacer, space) {

        // checking type of space: should be a number
        if (typeof space === 'number') {
            console.assert(space >= 0, 'invalid space number ' + space);
        } else if (typeof space !== 'string') {
            throw new Error('space argument should be either number of string, not ' + space);
        }

        // defining console.json function
        console.json = function consoleJsonWorker() {

            var args = [].slice.call(arguments);

            args = args.map(function(k) {

                if (typeof k === 'object' || Array.isArray(k)) {
                    return JSON.stringify(k, replacer, space);
                }

                return k;
            });

            console.log.apply(console, args);
        };
    }

    return function(replacer, space) {

        // using replacer's value as space
        if (typeof replacer === 'number') {
            space = replacer;
            replacer = null;
        }

        // default value of space
        if (typeof space === 'undefined') {
            space = 2;
        }

        setConsoleJson(replacer, space);
    };
}));
