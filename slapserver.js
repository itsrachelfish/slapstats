var express =   require('express'),
    app     =   express(),
    server  =   require('http').Server(app);

server.listen(7331);
console.log("Slap Stats Server Started!~");

app.use(express.static(__dirname + '/static'));

app.get('/', function(req, res)
{
    res.sendFile(__dirname + '/static/index.html');
});
