var fs = require('fs');

fs.readFile('./slaplog.txt', {encoding: 'ascii'}, function(error, data)
{
    if (error) throw error;

    // Statistics object
    var stats = {};

    // Split data into individual lines
    var events = data.toString().split("\n");

    for(var i = 0, l = events.length; i < l; i++)
    {
        var pattern =
        {
            day: /^--- Day changed [a-z]{3} (.*)/i,
            slap: /^(?:[0-9:]+)? ?<([^>]+)> (.*)/i
        }

        var line = events[i];

        var day = line.match(pattern.day);
        var slap = line.match(pattern.slap)

        if(day)
        {
            stats.currentDay = day[1];
            stats[day[1]] = [];
        }

        if(slap)
        {
            // Only log stats if a day has been found
            if(stats.currentDay)
            {
                // Make sure we only match !commands
                if(slap[2].charAt(0) != "!")
                {
                    var user = slap[1].trim();

                    // Split matched slap string so we only get the command, not targets
                    var command = slap[2].split(' ');
                    stats[stats.currentDay].push({user: user, command: command[0]});
                }
            }
        }
    }

    fs.writeFile("./static/slapstats.json", JSON.stringify(stats), function(error)
    {
        if(error) throw error;
        console.log("Slap stats saved!");
    }); 
});