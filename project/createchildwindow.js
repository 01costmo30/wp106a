const remote = require('electron').remote
const main = remote.require('./main.js')
// const BrowserWindow = remote

function getchildwindow(a,b,c) {
  // child.showcontent()
  main.showchildwindow(a,b,c)
}

var data = {name:[], time:[], todo:[]};

function lpad(s, len) {
  var spad = "0000000000000000000" + s
  return spad.substring(spad.length - len)
}

function printTime() {
  var time = document.getElementById('time')
  var d = new Date()
  var h = d.getFullYear()+"-"+lpad(d.getMonth()+1,2)+"-"+lpad(d.getDate(),2)+"T"+lpad(d.getHours(),2)+":"+lpad(d.getMinutes(), 2);
  time.innerText = lpad(d.getHours(), 2) + ':' + lpad(d.getMinutes(), 2) + ':' + lpad(d.getSeconds(), 2);
  for (i=0; i<data.time.length; i++) {
    if (h == data.time[i]) {
      var j = data.time.splice(i,1);
       var k = data.name.splice(i,1);
      var l = data.todo.splice(i,1);
      var goodbye = document.getElementById(j);
      goodbye.parentNode.removeChild(goodbye);
      var sh = j.toString().substring(11,13);
      if (sh > 12) {
        sh = parseInt(sh)-12;
        var st = "下午" + sh.toString() + j.toString().substring(13,16);
      }
      else if (sh < 12) {
        var st = "上午" + sh.toString() + j.toString().substring(13,16);
      }
      else if (sh == 12) {
        var st = "下午" + sh.toString() + j.toString().substring(13,16);
      }
      getchildwindow(st, k, l);
    }
  }
  setTimeout(printTime, 1000);
}

function show() {
  document.getElementById('addschedulesetting').style.visibility = 'visible';
}
function hidecontent() {
  var b = data.name.length;
  var c = data.time.length;
  var d = data.todo.length;
  var e = document.getElementById('name').value;
  var f = document.getElementById('chosetime').value + "T" + document.getElementById('chosetime1').value;
  var g = document.getElementById('todo').value;
  data.name[b] = e;
  data.time[c] = f;
  data.todo[d] = g;
  document.getElementById('addschedulesetting').style.visibility = 'hidden';
  var h = data.time[c].charAt(11)+data.time[c].charAt(12);
  document.getElementById(h).innerHTML += "<br/><label id='" + f + "'>"+ document.getElementById('chosetime1').value + " " + e +"</label>";
}

setTimeout(printTime, 500);
for (i=1; i<=24; i++) {
  var d = new Date();
  var a = d.getHours();
  if (a == i) {
    a = "#" + a;
    window.location.href(a);
  }
}