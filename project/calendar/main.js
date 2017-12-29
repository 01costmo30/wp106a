const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

let win

function createwindow () {
    win = new BrowserWindow({width: 290, height: 400, frame: true, resizable: false, show: false})
    win.setMenu(null)

    win.loadURL(`file://${__dirname}/index.html`)

    // showchildwindow()

    win.once('ready-to-show', () => {
        win.show()
    })

    win.on('close', () => {
        win = null
    })
}
exports.showchildwindow = () => {
    let child = new BrowserWindow({parent: win ,width: 235, height: 200, frame: false, transparent: true, show: false})
    child.setMenu(null)
    
    child.loadURL(`file://${__dirname}/child.html`)

    child.once('ready-to-show', () => {
        child.show()
    })

    child.once('close', () => {
        child = null
    })
}

app.on('ready', createwindow)

app.on('window-all-close', () => {
    if (process.platform !== 'drawin') {
        app.quit()
    }
})

app.on('active', () => {
    if (win === null) {
        createwindow()
    }
})