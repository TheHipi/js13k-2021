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
		this.author = 'Anonymous';
	}
	chat(message) {
		this.socket.emit("chat", message);
	}

	login_yes(username) {
		this.socket.emit('login_yes', username);
		this.author = username;
	}

	name_yes(username) {
		this.socket.emit('name_yes', username);
		this.author = username;
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

		socket.on("send", (message) => {
			console.log("[SEND] " + user.author + ":" + message);
			for (const member of users) {
				member.chat("<" + user.author + "> " + message);
			}
		});

		socket.on('login', (password) => {
			//check to see if we have the password in storage, if so return their name
			// otherwise return a placeholder name with random digits and let the user set it later
			storage.get(password, null).then(username => {
				if (!username) {
					console.log('This user hasnt logged in before');
					console.log("Password: " + password);
					storage.set(password, 'Anon' + password.substring(0,8));
					user.login_yes(username);
				}
				else {
					console.log("Returning user: " + username);
					user.login_yes(username);
				}
			})
		})

		socket.on('name', (new_name, password) => {
			console.log('This is the desired name: ' + new_name);

			if (new_name !== null) {
				storage.set(password, new_name);
				user.name_yes(new_name);
			}
		})

		console.log("Connected: " + socket.id);
		for (const user of users) {
			user.chat(socket.id + " has connected.")
		}
	},

	bread: (req, res) => {
		res.send('This is bread.');
	}

};
