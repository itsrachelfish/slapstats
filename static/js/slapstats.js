$.getJSON('slapstats.json', function(days)
{
    var rows = [];

    // Send the stats to the slap counter before generating graphs
    stats = slapCounter(days);

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
});
