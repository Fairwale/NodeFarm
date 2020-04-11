const fs = require('fs');
const http = require('http');
const url = require('url');

/////////////////////////////////
///////////FILES/////////////////
/////////////////////////////////

// Blocking, sync way
const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
console.log(textIn);

const textOut = `This what we know about avocado: ${textIn}.\nCreated on ${Date.now()}`;
fs.writeFileSync('./txt/output.txt', textOut);
console.log('Process Complete!');

// Unblocking, async way
fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {

    if (err) return console.log('Error occurred!');

    fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
        console.log(data2);
        fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
            console.log(data3);

            fs.writeFile('./txt/final.txt', `${data2}\n${data3}`,'utf-8', err => {
                console.log('File writing is complete!');
            })

        });
    });
});
console.log(`Starting to read file!`);

/////////////////////////////////
///////////SERVER////////////////
/////////////////////////////////

const server = http.createServer((req, res) => {
    const pathName = req.url;

    if (pathName === '/' || pathName === '/overview') {
        res.end(`This is the overview!`)
    } else if (pathName === '/product') {
        res.end('This is the product!');
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello-world'
        });
        res.end('<h1>Page not found!</h1>');
    }
});

// listening to request
server.listen(8080, '127.0.0.1', () => {
    console.log('Listening to request on port 8080');
});