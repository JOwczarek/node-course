// console.log(arguments);
// console.log(require('module').wrapper);

//modules and exports
const C = require('./test-module-1');
const calc1 = new C();

console.log(calc1.add(2, 5));

//exports

const calc2 = require('./test-module-2');

console.log(calc2.multiply(2, 5));
console.log(calc2.divide(4, 2));

//destructuring

const { add, multiply, divide } = require('./test-module-2');

console.log(add(2, 5));
console.log(multiply(4, 2));
console.log(divide(8, 2));

//caching

require('./test-module-3')();
require('./test-module-3')();
require('./test-module-3')();
