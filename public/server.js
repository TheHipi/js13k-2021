"use strict";

/**
 * User sessions
 * @param {Array} users
 */
const users = [];

/**
 * User session class
 */
class User {

	/**
	 * @param {Socket} socket
	 */
	constructor(socket) {
		this.socket = socket;
	}
	chat(message) {
		this.socket.emit("chat", message);
	}
}


/**
 * Socket.IO on connect event
 * @param {Socket} socket
 */
module.exports = {
	io: (socket) => {
		const user = new User(socket);
		users.push(user);
		user.chat("Welcome to the chat room!")

		socket.on("disconnect", () => {
			console.log("Disconnected: " + socket.id);
			user.chat(socket.id + " has disconnected.")
		});

		socket.on("send", (author, message) => {
			console.log("[SEND] " + author + ":" + message);
			for (const user of users) {
				user.chat("<" + author + "> " + message);
			}
		});

		console.log("Connected: " + socket.id);
		for (const user of users) {
			user.chat(socket.id + " has connected.")
		}
	},

	bread: (req, res) => {
		res.send('This is bread.');
	}

};
