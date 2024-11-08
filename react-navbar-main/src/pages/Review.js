/*import React from 'react';

export default function Review() {
    return
    (
        <div>
         <h1>Alle med små hjerner kører i Stjerner</h1>
         <img src= "./Images/logo.png"/>
         </div>
    )    
};

var SerialPort = require("serialport");

const parsers = new SerialPort.parsers;
const parser = new parsers.Readline({
    delimeter: '\r\n'
});

var port = new SerialPort('', {
    baudRate: 9600,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl:false
});

port.pipe(parser);

parser.on('data', function(data){
    console.log(data);
});*/