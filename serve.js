import { serve } from "https://deno.land/std@0.188.0/http/server.ts"
import { serveDir } from "https://deno.land/std@0.188.0/http/file_server.ts"
import { h } from 'https://esm.sh/preact'
import { render } from 'https://esm.sh/preact-render-to-string'

const bio = `
Hi, I'm Everett Bogue.  I've been coding JavaScript since 1999. Follow me on 
`

const blocklist = ['NetNewsWire', 'Sogou']

function checker (string, list) {
  let check = false
  list.forEach(word => {
    if (string.includes(word)) {
      check = true
    }
  })
  return check
}

serve((req, conn) => {
  const url = new URL(req.url)
  const ip = conn.remoteAddr.hostname
  const useragent = req.headers.get("user-agent")
  const check = checker(useragent, blocklist)

  if (url.pathname == '/') {
    if (!check) { 
      fetch('https://ntfy.sh/evbogue', {
        method: 'POST',
        body: 'Visit from ' + ip + ' ' + useragent
      })
    }
    const app =  h('html', null,
      h('head', null,
        h('title', null, 'Everett Bogue | Website'),
        h('link', {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Source+Sans+Pro', type: 'text/css'}),
        h('link', {rel: 'stylesheet', href: 'style.css', type: 'text/css'})
      ),
      h('body', null,
        h('img', {src: 'ev.jpg', style: 'width: 33%; float: right;'}),
        h('h1', null, 'Ev\'s Website'),
        h('img', {src: './organize.jpg'}),
        h('p', null, '8/14/23 | Trying to organize my life.'),
        h('br'),
        h('button', {id: 'about'}, 'About me [New!]'),
        h('div', {id: 'aboutDiv'}),
        h('br'), 
        h('button', {id: 'contact'}, 'Email me'),
        h('div', {id: 'contactDiv'}),
        h('br'), 
        h('button', {id: 'text'}, 'Text me'),
        h('div', {id: 'textDiv'}),
        h('script', {src: 'app.js', type: 'module'})
      )
    )

    return new Response(render(app), {headers: {"Content-Type" : "text/html"}})
  } if (url.pathname == '/contact') {
    fetch('https://ntfy.sh/evbogue', {
      method: 'POST',
      body: 'Contact from ' + ip
    })
    const contact = h('a', {href: 'mailto:ev@evbogue.com'}, 'ev@evbogue.com')
    return new Response(render(contact), {headers: {"Content-Type" : "text/html"}})
  } if (url.pathname == '/about') {
    fetch('https://ntfy.sh/evbogue', {
      method: 'POST',
      body: 'About from ' + ip
    })
    const about = h('p', null, bio, h('a', {href: 'https://www.threads.net/@everettbogue'}, 'Threads'))
    return new Response(render(about), {headers: {"Content-Type": "text/html"}})
  } if (url.pathname == '/text') {
    fetch('https://ntfy.sh/evbogue', {
      method: 'POST',
      body: 'Text from ' + ip
    })
    const text = h('div', null,
      h('input', {id: 'contactinfo', placeholder: 'Your contact info'}),
      h('br'),
      h('textarea', {id: 'textarea', placeholder: 'Write a message'}),
      h('br'),
      h('button', {id: 'send'}, 'Send')
    )
    return new Response(render(text), {headers: {"Content-Type": "text/html"}}) 
  } else {
    return serveDir(req, {fsRoot: '', showDirListing: true, quiet: true})
  }
})

