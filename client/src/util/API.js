import axios from "axios";

export default {
	
	createPlaygroup: function(name, city, state) {
		return axios.post('/playgroups/new', {
			name: name,
			city: city,
			state: state,
		});
	},
	
	findPlaygroups: function(name, city, state) {
		let query = '';
		if (name) query += ('name=' + name);
		if (city) query += ((query.length > 0) ? '&' : '') + 'city=' + city;
		if (state) query += ((query.length > 0) ? '&' : '') + 'state=' + state;
		
		return axios.get('/playgroups/find?' + query);
	},
	
	getUserPlaygroups: function() {
		return axios.get('/playgroups/joined');
	},
	
	requestGroupJoin(groupId) {
		return axios.put('/playgroups/request?groupId=' + groupId);
	},
	
	confirmRequest(groupId, userId) {
		return axios.post('/playgroups/confirm-request?groupId=' + groupId + '&userId=' + userId);
	},
	
	denyRequest(groupId, userId) {
		return axios.post('/playgroups/deny-request?groupId=' + groupId + '&userId=' + userId);
	},
	
	getUser: function() {
    return axios.get('/auth/user');
  },
	
	logout: function() {
		return axios.post('/auth/logout');
	}
	
};