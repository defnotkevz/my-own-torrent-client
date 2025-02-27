'use strict';

// Send a connect request
// Get the connect response and extract the connection id
// Use the connection id to send an announce request - this is where we tell the tracker which files we’re interested in
// Get the announce response and extract the peers list


import dgram from 'dgram'
import { Buffer } from 'buffer';

const getPeers = (torrent, callback) => {
  const socket = dgram.createSocket('udp4'); //creating a socket
  const url = torrent.announce.toString('utf8'); //get the announce url

  // 1. send connect request
  udpSend(socket, buildConnReq(), url);

  socket.on('message', response => {
    if (respType(response) === 'connect') {
      // 2. receive and parse connect response
      const connResp = parseConnResp(response);
      // 3. send announce request
      const announceReq = buildAnnounceReq(connResp.connectionId);
      udpSend(socket, announceReq, url);
    } else if (respType(response) === 'announce') {
      // 4. parse announce response
      const announceResp = parseAnnounceResp(response);
      // 5. pass peers to callback
      callback(announceResp.peers);
    }
  });
};

function udpSend(socket, message, rawUrl, callback=()=>{}) {
  const url = new URL(rawUrl);
  socket.send(message, 0, message.length, url.port, url.host, callback);
}

function respType(resp) {
}

function buildConnReq() {
}

function parseConnResp(resp) {
}

function buildAnnounceReq(connId) {
}

function parseAnnounceResp(resp) {
}

export default getPeers;