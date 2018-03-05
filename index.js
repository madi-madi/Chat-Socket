var app = require('express')();
var server = require('http').Server(app);
//var io = require('socket.io')(server);
var io = require('socket.io')(server);


server.listen(3000);


app.get('/',function(request , response){
	response.sendFile(__dirname+'/index.html');
});


io.on('connection', function(socket){
	console.log('New User Conected here');
	//recive datat from the client 
	socket.on('newMessage',function(data,room,username){
		//console.log("this is New Message form the Clinet "+data+ 'ob Room'+room);
	socket.to(room).emit('clientMessage',{"name":username,"msg":data , "type":"message"});

	});

	socket.on('joinRoom', function(room , username){
		//console.log('Join in  this Room '+ room);
		socket.join(room);
		io.sockets.emit('clientMessage',
			{"msg":socket.conn.server.clientsCount , "type":"online"});
		io.sockets.emit('clientMessage',{"name":"Forsan Technology","msg":username+" Join in  this Room"+room , "type":"message"});
	});


	socket.on('leaveRoom', function(room , username){
		//console.log('leve this Room '+ room);
	io.sockets.emit('clientMessage',{"name":"Forsan Technology","msg":username+" Leave this Room"+room , "type":"message"});

		socket.leave(room);

	});

	socket.on('disconnect', function(){
		io.sockets.emit('clientMessage',{"msg":socket.conn.server.clientsCount , "type":"online"});

	});

});

/*
1-create file packge.json
2- > npm install --save express
3- create file index.js and configration the server in this file
4- > npm install --save socket.io
*/
// // // io.on('connection',function(){
// // // 	console.log('A connection was made');
// // // });

// // io.on('connection',function(socket){
// // 	socket.on('chat.message', function(message){
// // 		//console.log('New Message:'+ message);
// // 		io.emit('chat.message',message);
// // 	});
// // });