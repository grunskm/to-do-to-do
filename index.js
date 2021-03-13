var fs = require('fs');

var data = fs.readFileSync('list.json');
var list = JSON.parse(data);
console.log(list);

var express = require('express');
var app = express();

var server = app.listen(process.env.PORT || 3000, listen);

function listen(){
	var host = server.address().address;
	var port = server.address().port;
	console.log('App listening at http://' + host + port);
}

app.use(express.static('public'));

var io = require('socket.io')(server);

io.sockets.on('connection',(socket)=>{

	socket.on('request_list', (ID)=>{
		data = list;
		io.to(ID).emit('initial_list',data);
		console.log("sent list to: "+socket.id);
	});

	socket.on('submit_item',(data)=>{

		io.sockets.emit('update_list',data);
		list.push(data);

		let save = JSON.stringify(list,null,2);
		fs.writeFile('list.json',save, finished);

		console.log("list update to all");
		console.log(list);
	});
});

function finished(){
	console.log("list file updated");
}
