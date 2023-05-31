import { serve } from "https://deno.land/std@0.188.0/http/server.ts"
import { serveDir } from "https://deno.land/std@0.188.0/http/file_server.ts"
import { h } from 'https://esm.sh/preact'
import { render } from 'https://esm.sh/preact-render-to-string'

const bio = `
Hi, I'm Everett Bogue.  I've been coding JavaScript since 1999.
`

serve((req) => {
  const url = new URL(req.url)
  if (url.pathname == '/') {
    const app =  h('html', null,
      h('head', null,
        h('title', null, 'Everett Bogue | Website'),
        h('link', {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Source+Sans+Pro', type: 'text/css'}),
        h('link', {rel: 'stylesheet', href: 'style.css', type: 'text/css'})
      ),
      h('body', null,
        h('img', {src: 'ev.jpg', style: 'width: 33%; float: right;'}),
        h('h1', null, 'Ev\'s Website'),
        h('p', null, bio),
        h('br'), 
        h('button', {id: 'contact'}, 'Contact me'),
        h('div', {id: 'contactDiv'}),
        h('script', {src: 'app.js', type: 'module'})
      )
    )

    return new Response(render(app), {headers: {"Content-Type" : "text/html"}})
  } if (url.pathname == '/contact') {
    const contact = h('a', {href: 'mailto:ev@evbogue.com'}, 'ev@evbogue.com')
    return new Response(render(contact), {headers: {"Content-Type" : "text/html"}})
  } else {
    return serveDir(req, {fsRoot: '', showDirListing: true, quiet: true})
  }
})

