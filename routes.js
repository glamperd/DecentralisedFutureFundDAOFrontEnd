const routes = require('next-routes')();

routes
	.add('/members/new', '/members/new')
	.add('/members/:address', '/members/show')
	.add('/proposals/new', '/proposals/new')

module.exports = routes;
