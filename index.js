const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World!\n');
// });


const server = http.createServer((req, res) => {
  // ./
  if (req.url === '/') {
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/html');
    res.write('<h1 style="color: red">Hello World!</h1>');
    res.write('<p>I wonder what else we can send...</p>');
    res.end();
  }

  // Bye
  if (req.url === '/bye') {
    console.log(`\nCurrent Route: http://${hostname}:${port}${req.url}`);
    res.writeHead(200, {'Content-type': 'text/plain'});
    res.write('Bye World!');
    res.end();
  }

  // Write
  if (req.url === '/write') {
    console.log(`\nCurrent route: http://${hostname}:${port}${req.url}`);
    res.writeHead(200, {'Content-type': 'text/plain'});
    
    let data = 'Written file';
    fs.writeFile('writeFile.txt', data, (err) => {
      if (err) {console.log(err)}
      console.log('Written file');
    });

    // Or
    data = 'Written file sync';
    fs.writeFileSync('writeFileSync.txt', data);
    console.log('Written file sync');
    res.end('Written')
  }

  // Read
  if (req.url === '/read') {
    console.log(`\nCurrent route: http://${hostname}:${port}${req.url}`);
    res.writeHead(200, {'Content-type': 'text/plain'});

    fs.readFile('writeFile.txt', 'utf8', (err, fileData) => {
      if (err) {console.log(err)}
      console.log(fileData);
    });

    // Or
    let fileData = fs.readFileSync('writeFileSync.txt', 'utf8');
    console.log(fileData);
    res.end('Read')
  }
});


server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});