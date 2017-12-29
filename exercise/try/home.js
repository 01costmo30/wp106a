const remote = require('electron').remote
const main = remote.require('./main.js')

var button = document.getElementById('open')
button.addEventListener('click', () => {
    main.childwin()
}, false)

