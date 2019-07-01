var http = require("http");
var fs = require("fs");
var path = require("path");

const hostname = 'localhost';
const port = 1234;

const server = http.createServer((req, res) => {
    console.log(`Request for ${req.url} by method ${req.method}`);

    res.setHeader('Content-Type', 'text/html');

    if (req.method == 'GET') {

        var fileUrl;

        if (req.url == '/')
            fileUrl = '/index.html'
        else fileUrl = req.url;

        var filePath = path.resolve('./public' + fileUrl);
        const fileExt = path.extname(fileUrl);
        if (fileExt == '.html') {
            fs.exists(filePath, (exists) => {
                if (!exists) {
                    res.statusCode = 404;
                    res.end(`
                        <html>
                            <body>
                                <h1> Error 404: ${fileUrl} not found.
                            </body>
                        </html>
                    `);
                    return;
                }
                res.statusCode = 200;
                fs.createReadStream(filePath).pipe(res);
            });
        }
        else {
            res.statusCode = 404;
            res.end(`
                        <html>
                            <body>
                                <h1> Error 404: ${fileUrl} not a HTML file.
                            </body>
                        </html>
                    `);
        }

    }
    else {
        res.statusCode = 404;
        res.end(`
                    <html>
                        <body>
                            <h1> Error 404: ${req.method} not a Supported.
                        </body>
                    </html>
                `);
    }





});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
});