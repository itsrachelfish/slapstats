var slapstats = {};

function getValidSlaps(stats)
{
    // Clone the stats we recieved so the original doesn't get modified
    stats = JSON.parse(JSON.stringify(stats));
    
    // Only display valid slaps
    stats.slaps = ['!slapanus', '!superslapanus', '!superslapanusv2', '!supersuckurdick', '!supersuckaniggasdick'];

    return getAllSlaps(stats);
}

function getAllSlaps(stats)
{
    var rows = [];

    // Set list of all slap types as the first row in our dataset
    // Concatenated to 'x' to define our axis
    // And total to define the computed total of each day
    rows.unshift(['x', 'Total'].concat(stats.slaps));

    // Loop through statistics to generate graph columns
    $.each(stats.days, function(dayIndex, current)
    {
        // Create a new row with this day as the first value and the total as 0
        var row = [current.day, 0];

        // Loop through all slap types
        $.each(stats.slaps, function(slapIndex, slap)
        {
            // Look to see if this slap happened on this day
            if(current.slaps[slap])
            {
                row.push(current.slaps[slap])

                // Update the total
                row[1] += current.slaps[slap];
            }
            else
                row.push(0);
        });

        rows.push(row);
    });

    return rows;
}

function getTopSlappers(stats)
{
    // Clone the stats we recieved so the original doesn't get modified
    stats = JSON.parse(JSON.stringify(stats));

    var users = {};
    var topUsers = [];
    var threshold = 10;

    // Loop through all days to determine total slap counts
    $.each(stats.days, function(dayIndex, current)
    {
        // Loop through current slap users
        $.each(current.users, function(user, slaps)
        {
            // Did this user already reach the threshold?
            if(topUsers.indexOf(user) > -1) return;

            if(users[user])
                users[user] += slaps;
            else
                users[user] = slaps;

            if(users[user] > threshold)
                topUsers.push(user);
                
        });
    });

    stats.users = topUsers;
    return getAllSlappers(stats);
}

function getAllSlappers(stats)
{
    var rows = [];

    // Set list of all slap types as the first row in our dataset
    // Concatenated to 'x' to define our axis
    // And total to define the computed total of each day
    rows.unshift(['x', 'Total'].concat(stats.users));

    // Loop through statistics to generate graph columns
    $.each(stats.days, function(dayIndex, current)
    {
        // Create a new row with this day as the first value and the total as 0
        var row = [current.day, 0];

        // Loop through all slap users
        $.each(stats.users, function(slapIndex, user)
        {
            // Look to see if this user slapped on this day
            if(current.users[user])
            {
                row.push(current.users[user])

                // Update the total
                row[1] += current.users[user];
            }
            else
                row.push(0);
        });

        rows.push(row);
    });

    return rows;
}

function generateChart(rows)
{
    var options =
    {
        bindto: '#chart',
        data:
        {
            x: 'x',
            rows: rows,
            type: 'area-spline',

            colors:
            {
                Total: '#ccc'
            },

            types:
            {
                Total: 'spline'
            }
        },

        axis:
        {
            x:
            {
                type: 'timeseries',
                tick:
                {
                    format: '%Y-%m-%d'
                }
            }
        },

        tooltip:
        {
            format:
            {
                // Only display values > 0 in tooltips
                value: function (value, ratio, id)
                {
                    if(value)
                        return value;
                }
            }
        }
    };

    var chart = c3.generate(options);
}

// Event bindings
$(document).ready(function()
{
    $('body').on('click', '.show-valid', function()
    {
        var rows = getValidSlaps(slapstats);
        generateChart(rows);
    });

    $('body').on('click', '.show-all', function()
    {
        var rows = getAllSlaps(slapstats);
        generateChart(rows);
    });

    $('body').on('click', '.show-all-slappers', function()
    {
        var rows = getAllSlappers(slapstats);
        generateChart(rows);
    });

    $('body').on('click', '.show-top-slappers', function()
    {
        var rows = getTopSlappers(slapstats);
        generateChart(rows);
    });


    // Load slapstats json
    $.getJSON('slapstats.json', function(days)
    {
        // Send the stats to the slap counter before generating graphs
        slapstats = slapCounter(days);

        // Show valid slaps by default
        $('.show-valid').trigger('click');
    });
});
