
		let list = [];
		let socket;


		socket = io.connect('https://to-do-to-do.herokuapp.com/');

		socket.on('connect',()=>{
			socket.emit('request_list',socket.id);
			console.log("requested_list");
		});

		function setup(){
			createCanvas(100,100);
		}

		socket.on('initial_list',(data)=>{
			list = data;
			for(i=0;i<list.length;i++){
				let item = document.createElement("LI");
				item.innerText = list[i];
				document.getElementById("big_list").appendChild(item);
			}
		});

		socket.on('update_list',(data)=>{
			list.push(data);
			let item = document.createElement("LI");
			item.innerText = data;
			document.getElementById("big_list").appendChild(item);
		});
		
		function buttonclick(){
				let newItem = document.getElementById("input_field");
				let data = newItem.value;
				if(data.length > 1){
					socket.emit("submit_item",data);
					newItem.value = null;
				}
		}

		function keyPressed(){
			if(keyCode==ENTER){
				buttonclick();
				return false;
			}
		}



