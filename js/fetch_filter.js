var worker = new Worker('/dist/worker.js')
let jsonData;

//fetching
fetch('/json/generated.json').then((res) => {
  return res.json();
}).then(data => {
  jsonData = data;
  buildTable(data);
})

//build Table
const buildTable = (__data) => {
  var table = document.getElementById("data");
  table.innerText = "";
  for (let i = 0; i < __data.length; i++){
    var row =  `
    <tr>
      <td> ${__data[i].age}</td>
      <td> ${__data[i].name}</td>
      <td> ${__data[i].gender}</td>         
      <td> ${__data[i].email}</td> 
    </tr>  
    `
    table.innerHTML += row;
  }
}

// //filtering 
var input = document.getElementById("search-field");
document.getElementById('search-field').addEventListener("keyup", ()=>{ 
  worker.postMessage([input.value,jsonData])
  worker.onmessage = function(e){    
    if(e.data[1] === 'second'){
      let _data = e.data[0];
      buildTable(_data)      
    }
  }
})