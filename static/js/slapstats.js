$.getJSON('slapstats.json', function(stats)
{
    var columns = [];
    var rows = [];

    // Loop through statistics to generate graph columns
    $.each(stats, function(key, data)
    {
        // Only pay attention to properties containing arrays of data
        if(Array.isArray(data))
        {
            // Create this column with the date as the first value
            var column = [key];
            
            $.each(data, function(eventKey, event)
            {
                
            });
        }
    })


    var options =
    {
        bindto: '#chart',
        data:
        {
            x: 'x',
            rows:
            [
                ['x', '!slapanus', '!superslapanus', '!example'],
                ['2015-1-1', 5, 2, 3],
                ['2015-1-2', 7, 3, 1],
                ['2015-1-3', 2, 2, 0],
                ['2015-1-4', 1, 6, 0],
            ],

            types:
            {
                '!slapanus': 'area-spline',
                '!superslapanus': 'area-spline',
                '!example': 'area-spline'
            }
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
