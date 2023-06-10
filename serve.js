import { serve } from "https://deno.land/std@0.188.0/http/server.ts"
import { serveDir } from "https://deno.land/std@0.188.0/http/file_server.ts"
import { h } from 'https://esm.sh/preact'
import { render } from 'https://esm.sh/preact-render-to-string'

const bio = `
Hi, I'm Everett Bogue.  I've been coding JavaScript since 1999.
`

serve((req, conn) => {
  const url = new URL(req.url)
  const ip = conn.remoteAddr.hostname
  //const ip = addr.hostname
  //console.log(ip)
  if (url.pathname == '/') {
    fetch('https://ntfy.sh/evbogue', {
      method: 'POST',
      body: 'Visit from ' + ip
    })
    const app =  h('html', null,
      h('head', null,
        h('title', null, 'Everett Bogue | Website'),
        h('link', {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Source+Sans+Pro', type: 'text/css'}),
        h('link', {rel: 'stylesheet', href: 'style.css', type: 'text/css'})
      ),
      h('body', null,
        h('img', {src: 'ev.jpg', style: 'width: 33%; float: right;'}),
        h('h1', null, 'Ev\'s Website'),
        h('br'),
        h('button', {id: 'about'}, 'About me'),
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
    const about = h('p', null, bio)
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

