const http = require('http')
const path = require('path')
const fs = require('fs')


// THIS IS FUCKING GOLDEN
// DON'T EVER TOUCH IT





const server = http.createServer( (req, res) => {


    // creating a path to file of the file we are on
    // so if on /app/page.html
    // path will be website.com/app/page.html AND website.com/app/page.css

    let file;

    // this is a bit weird
    // for index which is req.url == '/'
    // you will have to check if it is so and if so you have to grab the index.html file
    // however when loading the css for this particular page the req.url will NOT be '/'
    // instead it will be '/style.css'

    // lesson: html is bad.

    if (req.url === '/') {
        file = "index.html";
    } else {
        file = req.url;
    }

    let filePath = path.join(__dirname, "public", file);







    // extension of the file
    let extname = path.extname(filePath);

    // initial contenttype
    let let_contenttype = "text/html";




    // check to see if contenttype must be changed due to file extension
    switch (extname) {
        case ".js":
            let_contenttype = "text/javascript";
            break;
        case ".css":
            let_contenttype = "text/css";
            break;
        case ".json":
            let_contenttype = "application/json";
            break;
        case ".png":
            let_contenttype = "image/png";
            break;
        case ".jpg":
            let_contenttype = "image/jpg";
            break;
        case ".svg":
            let_contenttype = "image/svg+xml";
            break;
        // case ".ico":
        //     let_contenttype = "image/x-icon";
        //     break;
    }






    // check if contentType is text/html AND there is no .html file extension
    // at the file path
    if (let_contenttype == "text/html" && extname == "") filePath += ".html";





    // log the filePath
    console.log(filePath);










    fs.readFile(filePath, (err, data) => {
        if (err) {
            throw err;
        }

        res.writeHead(200, { 'Content-Type': let_contenttype } );

        res.write(data, "utf8");




        res.end();
    });








    /*
    if (req.url === '/') {




        



        fs.readFile(filePath, (err, data) => {
            if (err) {
                throw err;
            }

            res.writeHead(200, { 'Content-Type': let_contenttype } );

            //var fileContents = fs.readFileSync('public/cascade.css');
            //res.write(fileContents);

            res.write(data, "utf8");




            res.end();
        });




    } else if (req.url === '/article/division2.html') {
        fs.readFile(path.join(__dirname, "public", "division2.html"), (err, data) => {
            if (err) {
                throw err;
            }

            res.writeHead(200, { 'Content-Type': 'text/html' } );
            res.write(data);
            res.end();
        });
    } else {
        res.writeHead(400);
        res.end();
    }
    */
















})





server.listen(80, () => {
    console.log("Server is running.");
});








