// Function to ensure an array of arrays are all the same length
function padArray(array, length)
{
    // Loop through array
    $.each(array, function(index, children)
    {
        if(children.length != length)
        {
            // Loop through the difference between the required length
            for(var i = 0, l = length - children.length; i < l; i++)
            {
                children.push(0);
            }

            // Save new array to the original value
            array[index] = children;
        }
    });

    // Return formatted array
    return array;
}

$.getJSON('slapstats.json', function(days)
{
    var columns = ['x'];
    var rows = [];

    // Send the stats to the slap counter before generating graphs
    stats = slapCounter(days);

    console.log(stats);

/*
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

    // Set list of all columns as the first row in our dataset
    rows.unshift(columns);

    rows = padArray(rows, columns.length);

    console.log(rows);
*/

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
