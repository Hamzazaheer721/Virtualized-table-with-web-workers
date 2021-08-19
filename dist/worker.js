onmessage = function(e){
	let dataArray = [];
	let data = e.data[1];
	let value = e.data[0];
	for (let i = 0; i < data.length; i++){
		value = value.toLowerCase().trim();
		var name = data[i].name.toLowerCase().trim();
		if(name.includes(value)){
			dataArray.push(data[i])
		}
	}
	postMessage([dataArray,'second']);
}
