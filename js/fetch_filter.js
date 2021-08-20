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
  worker.postMessage([__data])
  worker.onmessage = function (e) {
    if(e.data[1] === "build"){
      let row = e.data[0];
      table.innerHTML = row;
    }
  }
}

// //filtering 
var input = document.getElementById("search-field");
document.getElementById('search-field').addEventListener("keyup", ()=>{ 
  worker.postMessage([input.value,jsonData,"filter"])
  worker.onmessage = function(e){    
    if(e.data[1] === 'filter'){
      let _data = e.data[0];
      buildTable(_data)      
    }
  }
})