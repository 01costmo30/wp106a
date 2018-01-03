const {remote} = require('electron');
const wind = remote.getCurrentWindow()

var closeapp = document.getElementById("close")
// var maximizeapp = document.getElementById("maximize")
var minimizeapp = document.getElementById("minimize")

require('electron').ipcRenderer.on('itwork', (event, message) => {
    document.getElementById('time').innerHTML = message.work[0]
    document.getElementById('title').innerHTML = message.work[1]
    document.getElementById('todo').innerHTML = message.work[2]

})

closeapp.addEventListener('click', () => {
    wind.close()
})
/*
maximizeapp.addEventListener('click', () => {
    if (!wind.isMaximized()) {
        wind.maximize()
    } else {
        wind.unmaximize()
    }
})
*/
minimizeapp.addEventListener('click', () => {
    wind.minimize()
})