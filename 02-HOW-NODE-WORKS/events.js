const EventEmitter = require('events');
const http = require('http');

const myEmitter = new EventEmitter();
/**
 * Observer pattern. Event listener listens for events and does something
 * when they occur.
 */
myEmitter.on('newSale', () => {
  console.log('There was a new Sale!');
});

myEmitter.on('newSale', () => {
  console.log('Customer Name: Josh');
});

myEmitter.on('newSale', (stock) => {
  console.log(`There are now ${stock} items left in stock.`);
});
/**
 * The code runs lexically from top down.
 */
myEmitter.emit('newSale', 9);

const server = http.createServer();

server.on('request', (req, res) => {
  console.log('Request Recieved');
  console.log(req.url);
  res.end('Request Recieved');
});

server.on('request', (req, res) => {
  console.log('Another Request');
});

server.on('close', () => {
  console.log('Server Closed.');
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Waiting for request...');
});
