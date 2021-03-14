var fs = require('fs');

var init_data = fs.readFileSync('list.json');
var list = JSON.parse(init_data);
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
		io.to(ID).emit('initial_list',list);
		console.log("sent list to: "+socket.id);
	});

	socket.on('submit_item',(data)=>{

		io.sockets.emit('update_list',data);
		list.push(data);

		let save_data = JSON.stringify(list,null,2);
		fs.writeFile('list.json',save_data, finished);
		function finished(){
			console.log("list file updated");
		}

		console.log("list update to all");
		console.log(list);
	});
});

