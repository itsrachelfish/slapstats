var fs = require('fs');

fs.readFile('./slaplog.txt', {encoding: 'ascii'}, function(error, data)
{
    if (error) throw error;

    // Split data into individual lines
    var events = data.toString().split("\n");

    for(var i = 0, l = events.length; i < l; i++)
    {
        console.log(events[i]);
    }
});
