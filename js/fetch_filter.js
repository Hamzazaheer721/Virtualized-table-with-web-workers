var worker = new Worker('/dist/worker.js')
var pagination_element = document.getElementById('pagination')
var table = document.getElementById("data");
var input = document.getElementById("search-field");
var selector = document.getElementById("drop-down")

let jsonData;
let GlobalData;
let rows_number = 60;
let currentPage = 1;
let no_of_pages;
let data_length;

//fetching
fetch('/json/generated.json').then((res) => {
  return res.json();
}).then(data => {
  paginatedTable(data,rows_number,1,true)
})

// Select options
selector.addEventListener('click', ()=>{
  var getVal = document.getElementById("drop-down").selectedOptions[0].value;
  rows_number = String(getVal);
  paginatedTable(GlobalData, rows_number, currentPage, true)
})

//setupPagination
const SetupPagination = (data, pagination_element, rows_number) =>{
  pagination_element.innerHTML = "";
  let no_of_pages = Math.ceil(data.length/rows_number);
  for(let i = 1 ; i < no_of_pages + 1; i++){
    let button = document.createElement("button")
    button.setAttribute('id', 'pagination_buttons')
    button.innerText = String(i);
    if(currentPage === i){
      button.classList.add('active')
    }
    button.addEventListener('click', ()=>{
      currentPage = i;
      paginatedTable(data,rows_number,currentPage,true)
    })
    pagination_element.appendChild(button)
  }
}

//paginatedTable
const paginatedTable = (_data, rows_number, currentPage, firstBuild) => {
  if(firstBuild){
    GlobalData = _data;
    SetupPagination(_data, pagination_element, rows_number)      
  }
  table.innerText = "";
  let startIndex = rows_number * (currentPage - 1);
  let endIndex = startIndex + rows_number;
  let paginated_data = _data.slice(startIndex, endIndex);
  jsonData = paginated_data; //for filter
  worker.postMessage([paginated_data])
  worker.onmessage = function (e) {
    if(e.data[1] === "build"){
      let row = e.data[0];
      table.innerHTML = row;
    }
  }
}

//build Table
const buildTable = (__data) => {
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
document.getElementById('search-field').addEventListener("keyup", ()=>{ 
  worker.postMessage([input.value,jsonData])
  worker.onmessage = function(e){    
    if(e.data[1] === 'filter'){
      let _data = e.data[0];
      buildTable(_data)      
    }
  }
})