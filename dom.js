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
  const [ attributes, children ] = getArgs(args)

  const node = document.createElement(tag)

  if (attributes) {
    for (let attribute in attributes) {
      if (attribute === 'className') {
        node.classList.add(attributes[attribute])
      } else {
        node.setAttribute(
          camelToKebab(attribute),
          attributes[attribute]
        )
      }
    }
  }

  if (children) {
    const childNodes = Array.isArray(children) ? children : [children]
    childNodes.forEach(child => node.appendChild(convertToTextNodeIfNodeIsString(child)))
  }

  return node
}

export const div = createElement.bind(null, 'div');
export const p = createElement.bind(null, 'p');
export const ul = createElement.bind(null, 'ul');
export const li = createElement.bind(null, 'li');
export const a = createElement.bind(null, 'a');

export default {
  div,
  p,
  ul,
  li,
  a
}
