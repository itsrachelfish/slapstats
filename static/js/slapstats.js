// Function to ensure an array of arrays are all the same length
function pad_array(array, length)
{

}

$.getJSON('slapstats.json', function(stats)
{
    var columns = ['x'];
    var rows = [];

    // Loop through statistics to generate graph columns
    $.each(stats, function(key, data)
    {
        // Only pay attention to properties containing arrays of data
        if(Array.isArray(data))
        {
            // Create a new row with this date as the first value
            var row = [key];
            var commands = {};
            
            $.each(data, function(commandKey, command)
            {
                // If this command doesn't exist as a column
                if(columns.indexOf(command) < 0)
                {
                    // Add it!
                    columns.push(command);
                }

                if(commands[command])
                    commands[command]++;
                else
                    commands[command] = 1;
            });

            // Loop through all columns and to save final row values
            $.each(columns, function(columnKey, column)
            {
                // Ignore the x axis
                if(column == 'x') return;
                
                // If statistics have been generated for this column
                if(commands[column])
                {
                    row.push(commands[column]);
                }
                else
                {
                    row.push(0);
                }
            });

            // Save this row
            rows.push(row);
        }
    });

    console.log(rows);

    // Set list of all columns as the first row in our dataset
    rows.unshift(columns);

    var options =
    {
        bindto: '#chart',
        data:
        {
            x: 'x',
            rows:
            [
                ['x', '!slapanus', '!superslapanus', '!example'],
                ['2015-1-1', 5, 2],
                ['2015-1-2', 7, 3],
                ['2015-1-3', 2, 2, 1],
                ['2015-1-4', 1, 6, 2],
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
