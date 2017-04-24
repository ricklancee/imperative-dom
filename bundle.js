(function () {
'use strict';

function getArgs(args) {
  if (args.length === 1) {
    return [ undefined, args[0] ]
  }

  return [ args[0], args[1] ]
}

function convertToTextNodeIfNodeIsString(possibleString) {
  return typeof possibleString === 'string' ?
    document.createTextNode(possibleString) :
    possibleString;
}

function camelToKebab(camel) {
  return camel.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
}

function createElement(tag, ...args) {
  const [ attributes, children ] = getArgs(args);

  const node = document.createElement(tag);

  if (attributes) {
    for (let attribute in attributes) {
      if (attribute === 'className') {
        node.classList.add(attributes[attribute]);
      } else {
        node.setAttribute(camelToKebab(attribute), attributes[attribute]);
      }
    }
  }

  if (children) {
    const childNodes = Array.isArray(children) ? children : [children];
    childNodes.forEach(child => node.appendChild(convertToTextNodeIfNodeIsString(child)));
  }

  return node
}

const div = createElement.bind(null, 'div');
const p = createElement.bind(null, 'p');
const ul = createElement.bind(null, 'ul');
const li = createElement.bind(null, 'li');
const a = createElement.bind(null, 'a');

const items = ['foo', 'bar', 'baz'];

const container = div({ className: 'hello'},
  div({ className: 'ul-container', dataRef: 'hello' }, ul(
    items.map(item => li(a({className: 'li-link', href: `${item}`}, item)))
  ))
);

document.body.appendChild(container);

}());
