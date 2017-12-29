const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

let win, child

function createwindow () {
    win = new BrowserWindow({width: 200, height: 200, frame: true, resizable: false, show: false})
    win.setMenu(null)

    win.loadURL(`file://${__dirname}/index.html`)

    win.once('ready-to-show', () => {
        win.show()
    })
    win.once('close', () => {
        win.close()
    })
}

exports.childwin = () => {
    child = new BrowserWindow({width: 200, height: 200, frame: false, resizable: false,transparent: true, show: false, parent: win})
    child.setMenu(null)

    child.loadURL(`file://${__dirname}/child.html`)

    child.once('ready-to-show', () => {
        child.show()
    })
    child.once('close', () => {
        child.close()
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