'use strict';

//* Create HTML element
function createElement(tagName, className, attributes = {}, textContent = '') {
  const element = document.createElement(tagName);

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });

  element.className = className;
  element.textContent = textContent;

  return element;
}

//* Add HTML element
const addElement = (element, elementContainer) => {
  elementContainer.append(element);
};

export { createElement };
export { addElement };
