#!/usr/bin/env node

import { throws } from "assert";

const { program } = require('commander');

program
    .option('-d, --decimal <number>', 'decimal mode', parseDecInput)
    .option('-b, --binary <string>', 'binary mode', parseBinInput)
    .option('-h, --hex <string>', 'hex mode', parseHexInput)
    .option('-o, --octal <string>', 'octal mode', parseOctalInput)

class App {
    // Inputs
    private inputValueString:string = "";
    private inputBase:number = 10; 

    // Outputs 
    private outputDecimal:number = 0;
    private outputBinary:string = "0"
    private outputHex:string = "0x0";
    private outputOctal:string = "0";

    constructor(inBase:number, inValue:string) {
        this.inputBase = inBase; 
        this.inputValueString = inValue;
    }

    dec2base(dec: number, base:number) {
        return (dec >>> 0).toString(base);
    }

    convert() {
        if (!isNaN(parseInt(this.inputValueString, this.inputBase))) {
            this.outputDecimal = parseInt(this.inputValueString, this.inputBase);
            this.outputBinary = this.dec2base(this.outputDecimal, 2);
            this.outputOctal = this.dec2base(this.outputDecimal, 8);
            this.outputHex = "0x" + this.dec2base(this.outputDecimal, 16);
        } else {
            console.log("You have entered an invlaid input; please try again.");
        }
    }

    display() {
        console.log(`Decimal: ${this.outputDecimal}`);
        console.log(`Binary: ${this.outputBinary}`);
        console.log(`Octal: ${this.outputOctal}`);
        console.log(`Hexadecimal: ${this.outputHex}`);
    }
}

program.parse(process.argv);


function parseDecInput(value:number) {
    let app = new App(10, value.toString());
    app.convert();
    app.display(); 
}

function parseBinInput(value:string) {
    let app = new App(2, value);
    app.convert();
    app.display();
}

function parseHexInput(value:string) {
    let app = new App(16, value);
    app.convert();
    app.display();
}

function parseOctalInput(value:string) {
    let app = new App(8, value);
    app.convert();
    app.display();
}