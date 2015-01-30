var fs = require('fs');

fs.readFile('./slaplog.txt', {encoding: 'ascii'}, function(error, data)
{
    if (error) throw error;

    // Split data into individual lines
    var events = data.toString().split("\n");

    for(var i = 0, l = events.length; i < l; i++)
    {
        var pattern =
        {
            day: /--- Day changed [a-z]{3} (.*)/i,
            slap: /.*> (.*)/i
        }

        var line = events[i];

        var day = line.match(pattern.day);
        var slap = line.match(pattern.slap)

        if(day)
        {
            console.log("Day:", day[1]);
        }

        if(slap)
        {
            console.log("Slap:", slap[1]);
        }
    }
});
