const db = require('../db/models/');

module.exports = function(io) {
	const playgroups = io.of('/playgroups');
	playgroups.on('connection', client => {
	
		client.on('join group', group => {
			let rooms = Object.keys(client.rooms);
			rooms.forEach(room => {
				if (room !== client.id) client.leave(room);
			});
			
			client.join(group);
		});
		
		client.on('new message', (group, msg) => {
			var messageData = {
				id: client.id,
				group: group,
				message: msg,
			};

			// Relay the message to all clients
			playgroups.in(group).emit('chat message', messageData);
		});
		
	});
};