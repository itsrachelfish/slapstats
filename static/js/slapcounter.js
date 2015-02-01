function slapCounter(days)
{
    // Output object
    var stats =
    {
        slaps: [],
        users: [],
        days: []
    };
    
    // Loop through all days
    $.each(days, function(day, slaps)
    {
        // Make sure there's an array of slaps
        if(!Array.isArray(slaps)) return;
        
        var current =
        {
            day: day,
            slaps: {},
            users: {}
        };
        
        // Loop through all of the current day's slaps
        $.each(slaps, function(slapIndex, slap)
        {
            if(current.slaps[slap.command])
                current.slaps[slap.command]++;
            else
            {
                if(stats.slaps.indexOf(slap.command) < 0)
                {
                    stats.slaps.push(slap.command);
                }

                current.slaps[slap.command] = 1;
            }
            
            if(current.users[slap.user])
                current.users[slap.user]++;
            else
            {
                if(stats.users.indexOf(slap.user) < 0)
                {
                    stats.users.push(slap.user);
                }
                
                current.users[slap.user] = 1;
            }
        });

        // Push the current day into the stats since we're all done looping!
        stats.days.push(current);
    });

    return stats;
}
