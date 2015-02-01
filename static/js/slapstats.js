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
    rows.unshift(['x'].concat(stats.slaps));

    // Loop through statistics to generate graph columns
    $.each(stats.days, function(dayIndex, current)
    {
        // Create a new row with this day as the first value
        var row = [current.day];

        // Loop through all slap types
        $.each(stats.slaps, function(slapIndex, slap)
        {
            // Look to see if this slap happened on this day
            if(current.slaps[slap])
                row.push(current.slaps[slap])
            else
                row.push(0);
        });

        rows.push(row);
    });

    return rows;
}

function getSlappers()
{
    // Clone the stats we recieved so the original doesn't get modified
    stats = JSON.parse(JSON.stringify(stats));

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
            type: 'area-spline'
        },

        axis: {
            x: {
                type: 'timeseries',
                tick: {
                    format: '%Y-%m-%d'
                }
            }
        }
    }

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

    $('body').on('click', '.show-slappers', function()
    {
        var rows = [];
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
