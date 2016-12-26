let btoa
if (global.window) btoa = window.btoa
else btoa = require('btoa')
export default function (url) {
  return btoa(btoa(url))
}
