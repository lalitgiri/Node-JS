const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write(`<body>
                    <h1>Enter Message</h1><br/>
                    <form action="/message" method="POST">
                        <input type="text" name="message">
                        <button>Submit</button>
                    </form>
         </body>`);
        res.write('</html>');

        return res.end();
    } else if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', chunk => {
            body.push(chunk);
        });
        req.on('end', () => {
            const data = Buffer.concat(body).toString().split("=")[1];
            fs.writeFileSync('message.text', data);
            res.statusCode = 302; // redirection code
            res.setHeader('Location', '/'); // redirection header
            return res.end();
        })
    } else {
        res.statusCode = 302; // redirection code
        res.setHeader('Location', '/'); // redirection header
        return res.end();
    }

});

server.listen(3000);