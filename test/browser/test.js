import { expect } from '@esm-bundle/chai';
import mqtt from '../../dist/mqtt.esm.js';

// needed to test no-esm version /dist/mqtt.js
/** @type { import('../../src/mqtt').MqttClient }*/
const mqtt2 = window.mqtt

function run(proto, port, cb) {

	describe('MQTT.js browser test with ' + proto.toUpperCase(), () => {
		after(() => {
			if (cb) {
				cb()
			}
		})

		const client = mqtt.connect(`${proto}://localhost:${port}`, {
			// log: console.log.bind(console),
		})
		client.on('offline', () => {
			console.log('client offline')
		})
		client.on('connect', () => {
			console.log('client connect')
		})
		client.on('reconnect', () => {
			console.log('client reconnect')
		})

		it('should connect-publish-subscribe', (done) => {
			client.on('connect', () => {
				client.on('message', (topic, msg) => {
					expect(topic).to.equal('hello');
					expect(msg.toString()).to.equal('Hello World!');
					client.end(() => {
						done();
					});
				});

				client.subscribe('hello', (err) => {
					expect(err).to.not.exist;
					if (!err) {
						client.publish('hello', 'Hello World!', (err2) => {
							expect(err2).to.not.exist;
						});
					}
				});
			});

			client.on('error', (err) => {
				done(err);
			});
		})
	})
}

it('should work with non-ESM version', () => {
	expect(mqtt2).to.exist
	expect(mqtt2.connect).to.exist
	expect(mqtt2.connect).to.be.a('function')
})


run('ws', window.wsPort, () => {
	run('wss', window.wssPort)
})
