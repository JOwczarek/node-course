const fs = require('fs');
const server = require('http').createServer();

const start = Date.now();

server.on('request', (req, res) => {
  //   //solution 1
  //   fs.readFile('../test-file.txt', (err, data) => {
  //     if (err) console.log(err);
  //     res.end(data);
  //   });
  //   //Solution 2 Streams Creates back pressure. file read is faster than response sending
  //   const readable = fs.createReadStream('../test-fsdfile.txt');
  //   readable.on('data', (chunk) => {
  //     res.write(
  //       `This is the time :${
  //         Date.now() - start
  //       } -----------------------------------------------------------\n`
  //     );
  //   });
  //   readable.on('end', () => {
  //     res.end('End Stream');
  //   });
  //   readable.on('error', (err) => {
  //     console.log(err);
  //     res.statusCode = 500;
  //     res.end('file not found!');
  //   });

  //Solution 3 pipe will control the data flow
  const readable = fs.createReadStream('../test-file.txt');
  readable.pipe(res);
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening on port 8000.');
});
