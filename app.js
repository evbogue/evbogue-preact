import { h, render } from 'https://esm.sh/preact'

const about = document.getElementById('about')

about.onclick = async (e) => {
  const aboutList = await fetch('/about')
  const reader = await aboutList.body.getReader()
  const read = await reader.read()
  const decoder = new TextDecoder()
  const div = h('p', {innerHTML: decoder.decode(read.value)})
  render(div, aboutDiv)
}

const contact = document.getElementById('contact')

contact.onclick = async (e) => {
  const contactList = await fetch('/contact')
  const reader = await contactList.body.getReader()
  const read = await reader.read()
  const decoder = new TextDecoder()
  const div = h('p', {innerHTML: decoder.decode(read.value)})
  render(div, contactDiv)
}
