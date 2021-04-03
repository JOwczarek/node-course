const fs = require('fs');
const http = require('http');
const url = require('url');
/** import 3rd party modules */
const slugify = require('slugify');
/** import custom modules */
const replaceTemplate = require('./modules/replaceTemplate');

/**
 * Not encluding to coding will just return a buffer.
 * Blocking Syncronous file read and write.
 */
// const textIn =fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);

// const textOut = `This is what we know about the avocado: ${textIn}.\n Created on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);

// const textIn2 =fs.readFileSync("./txt/output.txt", "utf-8");
// console.log(textIn2);

/**
 * Non-blocking Asynchronous way
 */
// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//     if(err) return console.log("error", err);
//     fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//         console.log("read-me file :\n", data2);
//         fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
//             console.log("appendix file:\n", data3);
//             fs.writeFile("./txt/final.txt",`${data2}\n${data3}`,  "utf-8", (err) => {
//                 fs.readFile("./txt/final.txt", "utf-8", (err, data) => {
//                     console.log("final File: \n", data);
//                 });
//             });
//         });
//     });
// });
// console.log("This prints first because of asnycronous file read.");

//////////////////////////////////////////////////////////////////////////

/**
 * Http Server
 * Every File is treated as a module in Node JS.
 *
 */

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));
console.log(slugs);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  /**
   * Routes to overview page
   */
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'Content-type': 'text/html' });

    /**
     * Map will create an array with the modified elements
     */
    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join('');
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
    res.end(output);

    /**
     * Routes to product page
     */
  } else if (pathname === '/product') {
    res.writeHead(200, { 'Content-type': 'text/html' });
    console.log(query);
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);

    /**
     * Routes to API page
     */
  } else if (pathname === '/api') {
    res.writeHead(200, { 'Content-type': 'application/json' });
    res.end(data);

    /**
     * Else not found
     */
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
    });
    res.end('<h1>404 Page Not Found</h1>');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to requests on port 8000');
});

/**
 * npm allows us to install and manage packages available in the npm
 * repository.
 * Version number format is majorversion.minorversion.patchversion
 * patch is for bug fixes
 * minor is for new featurs that should not break code
 * major version is a major change that will probably break code
 * * will update all versionsnpm
 * ^ will accept minor and patch releases
 * ~ will only accept patch releases
 * npm install slugify@1.0.0 to specify a different version to install
 */
