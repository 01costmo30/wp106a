const remote = require('electron').remote
const app = remote.app
const fs = require('fs')
const main = remote.require('./main.js')
// const Store = require('./store.js')
// const BrowserWindow = remote

var data = {name:[], time:[], todo:[]};

function writeFintoDS(filename, num, data) {
  var datastorage = app.getPath('userData') + `/${filename}.json`
  if ((num == 1 && data.name.length == 0) || num < 1) {
    fs.writeFileSync(datastorage, `${data}`)
  } else {
    fs.appendFileSync(datastorage, `,${data}`)
  }
}

function readFinDS(filename) {
  var datastorage = app.getPath('userData') + `/${filename}.json`
  var readline = fs.readFileSync(datastorage, 'utf8')
  return readline
}

function approachData() {
  var m = readFinDS('name');
  m = m.split(",");
  data.name = m;
  var m1 = readFinDS('time');
  m1 = m1.split(",");
  data.time = m1;
  var m2 = readFinDS('todo');
  m2 = m2.split(",");
  data.todo = m2;
  if (!(data.name.length < 2)) {
    for (i=0; i<data.name.length; i++) {
      var h = data.time[i].charAt(11)+data.time[i].charAt(12);
      document.getElementById(h).innerHTML += "<label id='" + data.time[i] + "'>"+ data.time[i].toString().substring(11,16) + " " + data.name[i] +"</label>";
    }
  }
}


function deleteData(k) {
  var arr = ['name', 'time', 'todo'];
  for (i=0; i<arr.length; i++) {
    var m = readFinDS(arr[i]);
    m = m.split(",");
    m.splice(k, 1);
    m = m.toString();
    writeFintoDS(arr[i], 0, m);
  }
}

/* 參考別人的存取本地資料程式碼
const store = new Store({
  configName: 'user-data',
  defaults: {
    list: {name:'good', time:'1', todo:'job'}
  }
})
*/

approachData()

function getchildwindow(a,b,c) {
  // child.showcontent()
  main.showchildwindow(a,b,c)
}

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
      deleteData(i);
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
  var isshow = document.getElementById('addschedulesetting');
  if (isshow.style.visibility  ==  ''||isshow.style.visibility == 'hidden') {
    isshow.style.visibility = 'visible';
  } else {
    isshow.style.visibility = 'hidden';
  }
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
  writeFintoDS("name", b, e);
  writeFintoDS("time", c, f);
  writeFintoDS("todo", d, g);
  document.getElementById('addschedulesetting').style.visibility = 'hidden';
  var h = data.time[c].charAt(11)+data.time[c].charAt(12);
  document.getElementById(h).innerHTML += "<label id='" + f + "'>"+ document.getElementById('chosetime1').value + " " + e +"</label>";
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