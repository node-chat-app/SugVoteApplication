 var pp = {  "name" : " george", "add" : "ugb"}
var tt = JSON.stringify(pp);
console.log(tt);
var rr = JSON.parse(tt);
console.log(rr.name)
document.getElementById('put').addEventListener('click', putNames);
var pp = { 
  "name" : " george",
  "add" : "ugb"
}

// function putNames(){
//   var xhr = new XMLHttpRequest();
//   xhr.open('GET', './names.json', true);

//   xhr.onload = function(){
//     if (this.status === 200){
// var data  = JSON.stringify( this.responseText);
// var tt = data.name
// console.log(data)
//     }
//    else {
//     console.log('file not found')
//    }
//   }
//   xhr.send();
// }

// // var t ='';

// // console.log(t)