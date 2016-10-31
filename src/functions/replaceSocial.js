import _ from 'underscore'
export default function (social_type, text) {
  let pattern = /\B@[a-z0-9_-]+/gi
  let list = text.match(pattern)
  list = _.uniq(list)
  list.map(
    function (key) {
      let name = key.replace(/@/g, '')
      let a = getLinkStr(social_type, name)
      text = text.replace(new RegExp(key, 'g'), a)
    }
  )
  return text
}

// 组出a来
function getLinkStr (social_type, name) {
  let a = ''
  if (social_type === 'instagram') {
    a = `<a target="_blank" href="https://instagram.com/${name}"> @${name}</a>`
  }
  // if (social_type === 'github') {
  //   a = `<a target="_blank" href="https://github.com/${name}"> @${name}</a>`
  // }
  if (social_type === 'tumblr') {
    a = `<a target="_blank" href="http://${name}.tumblr.com"> @${name}</a>`
  }
  if (social_type === 'facebook') {
    a = `<a target="_blank" href="https://facebook.com/${name}"> @${name}</a>`
  }
  return a
}
