/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

var sendgrid;

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
	
	sendgrid = require('sendgrid')(
		"app20632661@heroku.com",
		"1owuh5wi"
	);
	
}else{
	
	sendgrid = require('sendgrid')(
		process.env.SENDGRID_USERNAME,
		process.env.SENDGRID_PASSWORD
	);
}

app.get('/', routes.index);

var server = http.createServer(app);

var io = require("socket.io").listen(server);

io.enable("browser client minification");
io.enable("browser client etag");
io.enable("browser client gzip");


server.listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});

io.on("connection", function(client){
	client.on("form-contato-submit", function(contato){
		sendgrid.send({
			to : 'bgl.bruno@gmail.com',
			from : contato.email,
			subject : contato.assunto,
			text : contato.mensagem
		}, function(err, json) {
			if (err) {
				return console.error(err);
			}
			console.log(json);
		});
	});
	
});