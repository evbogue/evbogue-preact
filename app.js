import { h, render } from 'https://esm.sh/preact'

const clickme = document.getElementById('contact')

clickme.onclick = async (e) => {
  const contactList = await fetch('/contact')
  const reader = await contactList.body.getReader()
  const read = await reader.read()
  const decoder = new TextDecoder()
  const div = h('p', {innerHTML: decoder.decode(read.value)})
  render(div, contactDiv)
}
