import {div, ul, li, a} from './dom';

const items = ['foo', 'bar', 'baz']

const container = div({ className: 'hello'},
  div({ className: 'ul-container', dataRef: 'hello' }, ul(
    items.map(item => li(a({className: 'li-link', href: `${item}`}, item)))
  ))
)

document.body.appendChild(container)
