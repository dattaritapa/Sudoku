/*const csv = require('csv-parser');
const fs = require('fs');

fs.createReadStream('easy.csv')
  .pipe(csv())
  .on('data', (row) => {
   console.log(row);

  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });


class User{
  constructor(index,clues,difficuty,id,puzzle,solution){
    this.index=index;
    this.clues=clues;
    this.difficulty=difficuty;
    this.id=id;
    this.puzzle=puzzle;
    this.solution=solution;
  }
}
const csv = require('csv-parser')
const fs = require('fs')
const results = [];

fs.createReadStream('easy.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
   // console.log(results);
   var item = results[Math.floor(Math.random() * results.length)]; 
    console.log(item);
    String(item);
    console.log(item[0]);
  })


  
const http = require('http');

// Create an instance of the http server to handle HTTP requests
let app = http.createServer((req, res) => {
    // Set a response type of plain text for the response
    res.writeHead(200, {'Content-Type': 'text/plain'});

    // Send back a response and end the connection
    res.end('Hello World!\n');
});


// Start the server on port 3000
app.listen(3000, '127.0.0.1');
console.log('Node server running on port 3000');*/

  class Employee{
    set index(index){
        this._index=index;
    }
    set clues(clues){
        this._clues=clues;
    }
    set difficulty(difficulty){
        this._difficulty=difficulty;
    }
    set puzzle(puzzle){
      this._puzzle=puzzle;
   }
    get index(){
        return this._index;
    }
    get clues(){
        return this._clues;
    }
    get puzzle(){
        return this._puzzle;
    }
    constructor(){
    }
}

function api(){
let emp=[];// Array to store Employee Objects
const csv=require('csvtojson')
// Invoking csv returns a promise
const converter=csv()
.fromFile('easy.csv')
.then((json)=>{
    let e;
    json.forEach((row)=>{
        e=new Employee();// New Employee Object
        Object.assign(e,row);// Assign json to the new Employee
        emp.push(e);// Add the Employee to the Array
        
    });
}).then(()=>{
    // Output the names of the Employees
    /*emp.forEach((em)=>{
        console.log(em.puzzle);// Invoke the Name getter
    });*/
    var item = emp[Math.floor(Math.random() * emp.length)];
    console.log(item.puzzle);
    return item.puzzle;
});
}

var board = api();

const http = require('http');

// Create an instance of the http server to handle HTTP requests
let app = http.createServer((req, res) => {
    // Set a response type of plain text for the response
    res.writeHead(200, {'Content-Type': 'text/plain'});

    // Send back a response and end the connection
    res.end(board);
});


// Start the server on port 3000
app.listen(3000, '127.0.0.1');
console.log('Node server running on port 3000');
