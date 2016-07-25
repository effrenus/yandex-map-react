'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = fetchScript;
function fetchScript(url) {
    return new Promise(function (resolve, reject) {
        var script = document.createElement('script');
        script.onload = resolve;
        script.onerror = reject;
        script.src = url;

        var beforeScript = document.getElementsByTagName('script')[0];
        beforeScript.parentNode.insertBefore(script, beforeScript);
    });
}