const http = require('http');
const request = require('request');
const port = 8080;

const requestHandler = (req, response) => {
    console.log(req.url);

    if (req.url.endsWith('.jar') || req.url.endsWith('.jar.md5')) {
        var pathArr = req.url.split('/');
        var jarName = pathArr[pathArr.length - 1];
        var groupId = pathArr[pathArr.length - 3];

        var lastDotIdx = jarName.lastIndexOf('.jar');
        var lastMinusIdx = jarName.lastIndexOf('-');

        var artifactId = jarName.substring(0, lastMinusIdx);
        var jarVersion = jarName.substring(lastMinusIdx + 1, lastDotIdx);

        console.log(` Group Id : ${groupId} : ${artifactId} : ${jarVersion} `);
        console.log(`Fetching jar with group Id ${groupId} and jarName ${jarName}`);
        var httpLocation = `http://central.maven.org/maven2/${groupId}/${artifactId}/${jarVersion}/${jarName}`;
        console.log(httpLocation);

        request.get(httpLocation).pipe(response);


    } else {
        response.end();
    }

    //

}

const server = http.createServer(requestHandler);

server.listen(port, (err) => {

    if (err) {
        return console.log(`Could not start server ${port}`);
    }

    console.log(`Started server on ${port}`);

});