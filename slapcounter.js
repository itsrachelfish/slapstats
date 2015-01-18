var fs = require('fs');

fs.readFile('./slaplog.txt', {encoding: 'ascii'}, function(err, data)
{
    if (err) throw err;
    console.log(data);
});
