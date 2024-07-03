'use strict';

import fs from 'fs';
import bencode from 'bencode';

const torrent = bencode.decode(fs.readFileSync('puppy.torrent'));

// Convert the announce property to a buffer and then to a string
const announceUrl = Buffer.from(torrent.announce).toString('utf8');
console.log(announceUrl);


