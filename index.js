#!/usr/bin/env node
"use strict";
exports.__esModule = true;
var program = require('commander').program;
program
    .option('-d, --decimal <number>', 'decimal mode', parseDecInput)
    .option('-b, --binary <string>', 'binary mode', parseBinInput)
    .option('-h, --hex <string>', 'hex mode', parseHexInput)
    .option('-o, --octal <string>', 'octal mode', parseOctalInput);
var App = /** @class */ (function () {
    function App(inBase, inValue) {
        // Inputs
        this.inputValueString = "";
        this.inputBase = 10;
        // Outputs 
        this.outputDecimal = 0;
        this.outputBinary = "0";
        this.outputHex = "0x0";
        this.outputOctal = "0";
        this.inputBase = inBase;
        this.inputValueString = inValue;
    }
    App.prototype.dec2base = function (dec, base) {
        return (dec >>> 0).toString(base);
    };
    App.prototype.convert = function () {
        if (!isNaN(parseInt(this.inputValueString, this.inputBase))) {
            this.outputDecimal = parseInt(this.inputValueString, this.inputBase);
            this.outputBinary = this.dec2base(this.outputDecimal, 2);
            this.outputOctal = this.dec2base(this.outputDecimal, 8);
            this.outputHex = "0x" + this.dec2base(this.outputDecimal, 16);
        }
        else {
            console.log("You have entered an invlaid input; please try again.");
        }
    };
    App.prototype.display = function () {
        console.log("Decimal: " + this.outputDecimal);
        console.log("Binary: " + this.outputBinary);
        console.log("Octal: " + this.outputOctal);
        console.log("Hexadecimal: " + this.outputHex);
    };
    return App;
}());
program.parse(process.argv);
function parseDecInput(value) {
    var app = new App(10, value.toString());
    app.convert();
    app.display();
}
function parseBinInput(value) {
    var app = new App(2, value);
    app.convert();
    app.display();
}
function parseHexInput(value) {
    var app = new App(16, value);
    app.convert();
    app.display();
}
function parseOctalInput(value) {
    var app = new App(8, value);
    app.convert();
    app.display();
}
