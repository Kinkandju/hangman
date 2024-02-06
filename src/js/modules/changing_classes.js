'use strict';

//* Adds class for the element
const addClass = (element, someClass) => {
  element.classList.add(someClass);
};

//* Removes the class from the element
const removeClass = (element, someClass) => {
  element.classList.remove(someClass);
};

export { addClass };
export { removeClass };
