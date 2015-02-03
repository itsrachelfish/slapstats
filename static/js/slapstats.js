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

    return c3.generate(options);
}

function getSlapTotals(stats)
{    
    var slaps = _.pairs(stats.total.slaps);
    var users = _.pairs(stats.total.users);

    slaps.sort(function(a, b) {return a[1] - b[1]}).reverse();
    users.sort(function(a, b) {return a[1] - b[1]}).reverse();

    // Slice off top 10 of each
    slaps = slaps.slice(0, 10);
    users = users.slice(0, 10);

    // Label the x-axis
    slaps.unshift(['x', 'Total Slaps']);
    users.unshift(['x', 'Top Slappers']);

    return {slaps: slaps, users: users};
}

function generateBarChart(id, columns)
{    
    var options =
    {
        bindto: id,
        data:
        {
            x: 'x',
            columns: columns,
            type: 'bar',
        },

        axis:
        {
            x:
            {
                type: 'category' // this needed to load string x value
            }
        }
    };

    return c3.generate(options);
}

// Event bindings
$(document).ready(function()
{
    function lineChart()
    {
        $('.halfchart').hide();
        $('.fullchart').show();
    }

    function barChart()
    {
        $('.fullchart').hide();
        $('.halfchart').show();
    }
    
    $('body').on('click', '.show-valid', function()
    {
        lineChart();
        var rows = getValidSlaps(slapstats);
        generateChart(rows);
    });

    $('body').on('click', '.show-all', function()
    {
        lineChart();
        var rows = getAllSlaps(slapstats);
        generateChart(rows);
    });

    $('body').on('click', '.show-all-slappers', function()
    {
        lineChart();
        var rows = getAllSlappers(slapstats);
        generateChart(rows);
    });

    $('body').on('click', '.show-top-slappers', function()
    {
        lineChart();
        var rows = getTopSlappers(slapstats);
        generateChart(rows);
    });

    $('body').on('click', '.show-totals', function()
    {
        barChart();
        var rows = getSlapTotals(slapstats);

        generateBarChart('#chart-1', rows.slaps);
        generateBarChart('#chart-2', rows.users);        
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
