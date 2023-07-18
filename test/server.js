const net = require('net')
const tls = require('tls')
const Connection = require('mqtt-connection')

/**
 * MqttServer
 *
 * @param {Function} listener - fired on client connection
 */
class MqttServer extends net.Server {
	constructor(listener) {
		super()
		this.connectionList = []

		this.on('connection', (duplex) => {
			this.connectionList.push(duplex)
			const connection = new Connection(duplex, () => {
				this.emit('client', connection)
			})
		})

		if (listener) {
			this.on('client', listener)
		}
	}
}

/**
 * MqttServerNoWait (w/o waiting for initialization)
 *
 * @param {Function} listener - fired on client connection
 */
class MqttServerNoWait extends net.Server {
	constructor(listener) {
		super()
		this.connectionList = []

		this.on('connection', (duplex) => {
			this.connectionList.push(duplex)
			const connection = new Connection(duplex)
			// do not wait for connection to return to send it to the client.
			this.emit('client', connection)
		})

		if (listener) {
			this.on('client', listener)
		}
	}
}

/**
 * MqttSecureServer
 *
 * @param {Object} opts - server options
 * @param {Function} listener
 */
class MqttSecureServer extends tls.Server {
	constructor(opts, listener) {
		if (typeof opts === 'function') {
			listener = opts
			opts = {}
		}

		// sets a listener for the 'connection' event
		super(opts)
		this.connectionList = []

		this.on('secureConnection', (socket) => {
			this.connectionList.push(socket)
			const connection = new Connection(socket, () => {
				this.emit('client', connection)
			})
		})

		if (listener) {
			this.on('client', listener)
		}
	}

	setupConnection(duplex) {
		const connection = new Connection(duplex, () => {
			this.emit('client', connection)
		})
	}
}

exports.MqttServer = MqttServer
exports.MqttServerNoWait = MqttServerNoWait
exports.MqttSecureServer = MqttSecureServer
