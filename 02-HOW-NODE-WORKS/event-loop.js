/**
 * Event loop is
 * 1. Expired Timers
 * 2. I/O polling and callbacks
 * 3. setImmediate callbacks
 * 4. Close callbacks
 *
 * Microtasks queue and nexttick queue is checked between each phase
 *
 * If there are pending timers or I/O repeat loop
 * If not the exit program
 */
const fs = require('fs');
const crypto = require('crypto');

const start = Date.now();
process.env.UV_THREADPOOL_SIZE = 1;

setTimeout(() => console.log(Date.now() - start, 'Timer 1 finished'), 0);
setImmediate(() => console.log(Date.now() - start, 'Immediate 1 finished'));

fs.readFile('test-file.txt', () => {
  console.log(Date.now() - start, 'I/O finished');
  console.log('-------------------------');

  setTimeout(() => console.log(Date.now() - start, 'Timer 2 finished'), 0);
  setTimeout(() => console.log(Date.now() - start, 'Timer 3 finished'), 3000);
  /** Set immediate will execute immediatly after polling phase
   * before the expired timer executes.
   */
  setImmediate(() => console.log(Date.now() - start, 'Immediate 2 finished'));

  /** Part of the microprocess phase that is executed after each phase
   * of the event loop. Set imediatly will occur once per tick(one event loop cycle) and nextTick will occur immediatly(between each phase of the event loop)
   */
  process.nextTick(() => console.log(Date.now() - start, 'Process.nextTick'));

  /** Heavy tasks should be offloaded from main thread. Crypto
   * is automatically offloaded by the event loop to process. There
   * are 4 threads by default.
   */
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'password 1 encrypted');
  });
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'password 2 encrypted');
  });
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'password 3 encrypted');
  });
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'password 4 encrypted');
  });
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'password 5 encrypted');
  });
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'password 6 encrypted');
  });
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'password 7 encrypted');
  });
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'password 8 encrypted');
  });
});

console.log(Date.now() - start, 'Hello From top level code');

/**
 * Event emitters emit an event when something important happens(server
 * receiving request, timer expiring, file finish loading). Programmer
 * implements a callback which acts as an event listener. When the event
 * finishes the callback function is executed.
 * This is called the observer pattern.
 */
