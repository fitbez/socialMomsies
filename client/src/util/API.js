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
	
	getUser: function() {
    return axios.get('/auth/user');
  },
	
	logout: function() {
		return axios.post('/auth/logout');
	}
	
};