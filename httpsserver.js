const tls = require('tls');
const next = require('next');
const crypto = require('crypto');
const fs = require('fs');

var privateKey = fs.readFileSync('./certs/localhost.key').toString();
var certificate = fs.readFileSync('./certs/localhost.crt').toString();

var credentials = tls.createSecureContext({key: privateKey, cert: certificate, secureProtocol: 'TLSv1_2_method' });

const app = next({
	dev: process.env.NODE_ENV !== 'production'
});

const routes = require('./routes');
const handler = routes.getRequestHandler(app);

app.prepare().then(() => {
	var server = tls.createServer(credentials, handler);
	//server.setSecure(credentials);
	server.listen(443, (err) => {
			if (err) throw err;
			console.log('Ready on localhost:443');
		});
});

