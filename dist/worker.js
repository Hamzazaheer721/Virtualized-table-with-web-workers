onmessage = function(e){
	if(e.data.length == 2){
		let dataArray = [];
		let value = e.data[0];
		let data = e.data[1];
		for (let i = 0; i < data.length; i++){
				value = value.toLowerCase().trim();
				var name = data[i].name.toLowerCase().trim();
				if(name.includes(value)){
					dataArray.push(data[i])
				}
			}
		postMessage([dataArray,'filter']);
	}
	else{
		let data = e.data[0];
		let row = ""
		for (let i = 0; i < data.length; i++){
			row +=  `
			<tr>
				<td> ${data[i].age}</td>
				<td> ${data[i].name}</td>
				<td> ${data[i].gender}</td>         
				<td> ${data[i].email}</td> 
			</tr>`
		}
		postMessage([row,'build'])
	}
}
