import { h, render } from 'https://esm.sh/preact'

const about = document.getElementById('about')
const decoder = new TextDecoder()

about.onclick = async (e) => {
  const aboutList = await fetch('/about')
  const reader = await aboutList.body.getReader()
  const read = await reader.read()
  const div = h('p', {innerHTML: decoder.decode(read.value)})
  render(div, aboutDiv)
}

const contact = document.getElementById('contact')

contact.onclick = async (e) => {
  const contactList = await fetch('/contact')
  const reader = await contactList.body.getReader()
  const read = await reader.read()
  const div = h('p', {innerHTML: decoder.decode(read.value)})
  render(div, contactDiv)
}

const text = document.getElementById('text')

text.onclick = async (e) => {
  const textList = await fetch('/text')
  const reader = await textList.body.getReader()
  const read = await reader.read()
  const div = h('p', {innerHTML: decoder.decode(read.value)})
  render(div, textDiv)
  const email = document.getElementById('contactinfo')
  const textarea = document.getElementById('textarea')
  const send = document.getElementById('send')

  send.onclick = async (e) => {
    if (email.value && textarea.value) {
      fetch('https://ntfy.sh/evbogue', {
        method: 'POST',
        body: 'Text from ' + email.value + ' | ' + textarea.value
      })
      email.value = ''
      textarea.value = ''
    } else {
      alert('Please provide contact info and/or a message.')
    }
  }
} 
