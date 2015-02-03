function slapCounter(days)
{
    // Output object
    var stats =
    {
        slaps: [],
        users: [],
        days: [],
        total: {slaps: {}, users: {}}
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
            // Save overall total for this type
            if(stats.total.slaps[slap.command] === undefined)
                stats.total.slaps[slap.command] = 0;

            stats.total.slaps[slap.command]++;

            // Save overall total for this user
            if(stats.total.users[slap.user] === undefined)
                stats.total.users[slap.user] = 0;

            stats.total.users[slap.user]++;

            // Save daily total for this type
            if(current.slaps[slap.command] === undefined)
            {
                // Is this is a new slap type?
                // Save it in the slap list
                if(stats.slaps.indexOf(slap.command) < 0)
                    stats.slaps.push(slap.command);

                current.slaps[slap.command] = 0;
            }

            current.slaps[slap.command]++;

            // Save daily total for this user
            if(current.users[slap.user] === undefined)
            {
                // Is this is a new slap user?
                // Save their name in the user list
                if(stats.users.indexOf(slap.user) < 0)
                    stats.users.push(slap.user);
                
                current.users[slap.user] = 0;
            }

            current.users[slap.user]++;
        });

        // Push the current day into the stats since we're all done looping!
        stats.days.push(current);
    });

    return stats;
}
