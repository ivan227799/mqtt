#!/usr/bin/env node
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Copyright (c) 2015-2015 MQTT.js contributors.
 * Copyright (c) 2011-2014 Adam Rudd.
 *
 * See LICENSE for more information
 */
var client_1 = require("./lib/client");
exports.MqttClient = client_1.MqttClient;
exports.Client = client_1.MqttClient;
var connect_1 = require("./lib/connect");
exports.connect = connect_1.connect;
var store_1 = require("./lib/store");
exports.Store = store_1.default;
function cli() {
    var commist = require('commist')();
    var helpMe = require('help-me')();
    // Files are relative to tsdist
    commist.register('publish', require('../bin/pub'));
    commist.register('subscribe', require('../bin/sub'));
    commist.register('version', function () {
        console.log('MQTT.js version:', require('../package.json').version);
    });
    commist.register('help', helpMe.toStdout);
    if (commist.parse(process.argv.slice(2)) !== null) {
        console.log('No such command:', process.argv[2], '\n');
        helpMe.toStdout();
    }
}
if (require.main === module) {
    cli();
}
//# sourceMappingURL=mqtt.js.map