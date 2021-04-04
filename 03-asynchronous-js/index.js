const fs = require('fs');
const superagent = require('superagent');

// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//   console.log(`Breed: ${data}`);

//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .end((err, res) => {
//       if (err) return console.log(err.message);
//       console.log(res.body.message);

//       fs.writeFile('dog-img.txt', res.body.message, (err) => {
//         if (err) return console.log(err.message);
//         console.log('Saved dog image to file');
//       });
//     });
// });

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('Could not find the file⚙');
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject('Issue writing image to file.');
      resolve('Saved dog image to file');
    });
  });
};

// readFilePro(`${__dirname}/dog.txt`)
//   .then((data) => {
//     console.log(`Breed: ${data}`);

//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   .then((res) => {
//     return writeFilePro('dog-img.txt', res.body.message);
//   })
//   .then((resolve) => {
//     console.log(resolve);
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });

/**
 * Pending promise before it gets data and a
 * resolved promise after it gets data
 */

const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    const res1pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const all = await Promise.all([res1pro, res2pro, res3pro]);

    const imgs = all.map((el) => el.body.message);

    console.log(imgs);

    await writeFilePro('dog-img.txt', imgs.join('\n'));

    console.log('File written');
  } catch (err) {
    console.log(err.message);
    throw err;
  }
  return 'ready with image';
};

(async () => {
  try {
    console.log('1:Getting dog pics');
    const resolve = await getDogPic();
    console.log(resolve);
    console.log('3:Got dog pics');
  } catch (err) {
    console.log(err.message);
  }
})();
