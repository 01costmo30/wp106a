const {remote} = require('electron');
const wind = remote.getCurrentWindow()

var closeapp = document.getElementById("close")
// var maximizeapp = document.getElementById("maximize")
var minimizeapp = document.getElementById("minimize")

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