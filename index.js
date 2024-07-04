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