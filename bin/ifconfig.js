'use strict';

var os = require('os');
var fs = require('fs');
var ifaces = os.networkInterfaces();
let address = 'localhost';


const writeConfigToFile = async (address) => {
  const config = {
    api: {
      url: `http://${address}:1337`
    }
  }
  
  const configString = JSON.stringify(config);
  
  fs.writeFile('config.json', configString, (success) => {
    console.log('finished writing address ' + address)
  });
}

Object.keys(ifaces).forEach(function (ifname) {
  var alias = 0;

  ifaces[ifname].forEach(function (iface) {
    if ('IPv4' !== iface.family || iface.internal !== false) {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      return;
    }
    if (address === 'localhost') {
      address = iface.address;
    }

    if (alias >= 1) {
      // this single interface has multiple ipv4 addresses
      consolse.log(ifname + ':' + alias, iface.address);
    } else {
      // this interface has only one ipv4 adress
      console.log(ifname, iface.address);
    }
    ++alias;
  });
});

const a = writeConfigToFile(address);





