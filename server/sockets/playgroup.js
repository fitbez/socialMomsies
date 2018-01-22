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
			
			// send the client old messages
			db.Playgroup.findOne({_id: group}, {messages: {$slice: -50}}).populate({ 
				path: 'messages',
				populate: {
					path: 'sender',
					model: 'User'
				} 
			}).then(playgroup => {
				//console.log(playgroup);
				playgroups.to(client.id).emit('old messages', playgroup.messages.sort((a, b) => (a.timestamp.valueOf() < b.timestamp.valueOf() ? -1 : 1)));
			});
			
		});
		
		client.on('new message', (group, msg) => {
			var messageData = {
				id: client.id,
				group: group,
				message: msg,
			};
			messageData.message.timestamp = new Date();
			
			// save the message to the database
			new db.Message(messageData.message).save().then(message => {
				db.Playgroup.findOneAndUpdate({_id: group}, {'$push': {messages: message._id}}, {new: true}).then(result => {});
			});
			
			// Relay the message to all clients
			playgroups.in(group).emit('chat message', messageData);
		});
		
	});
};