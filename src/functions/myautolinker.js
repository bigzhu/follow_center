import Autolinker from 'autolinker'
import replaceSocial from './replaceSocial.js'
export default function (text, type) {
  if (type === 'twitter' || type === 'instagram') {
    return Autolinker.link(text, {mention: type})
  } else {
    let link_text = Autolinker.link(text)
    link_text = replaceSocial(type, link_text)
    return link_text
  }
}
