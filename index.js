'use strict';

import fs from 'fs';
import bencode from 'bencode'; //can write our own bencode parser

import dgram from 'dgram'
import { Buffer } from 'buffer';

//parsing the bencoded metainfo file
const torrent = bencode.decode(fs.readFileSync('puppy.torrent'));

// Convert the announce property to a buffer and then to a string
const announceUrl = new URL(Buffer.from(torrent.announce).toString('utf8'));
console.log(announceUrl)

const socket = dgram.createSocket('udp4'); //creating a socket connection
const myMsg = Buffer.from('hello?', 'utf8'); //messages can be only sent as a buffer

socket.send(myMsg, 0, myMsg.length, announceUrl.port, announceUrl.host, () => {});

//handling incoming messages
socket.on('message', msg => {
    console.log('message is', msg);
  });
