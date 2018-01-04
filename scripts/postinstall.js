var path = require('path');
var prepend = require('prepend-file');
var findUp = require('find-up');
var replace = require('replace-in-file');

var FIXED_FILE = ['chart.js', 'src', 'core', 'core.helpers.js'];
var FIXED_CODE = '// < HACK >\n'
+'if (typeof window === \'undefined\') {\n'
+'  global.window = {};\n'
+'}\n// </ HACK >\n\n';

function hackChartJs() {
    findUp('node_modules')
    .then(nodeModules => {
        var completeFilePath = path.resolve.apply(path, [nodeModules].concat(FIXED_FILE))
        
        var replace_options = {
            files: completeFilePath,
            from: /\/\/ < HACK >[\s\S]*?\/\/ <\/ HACK >[\s]*/g,
            to: '',
        };

        try {
            var changes = replace.sync(replace_options);
            console.log('Modified files:', changes.join(', '));
        }
        catch (error) {
            console.error('Error occurred:', error);
        }

        prepend(
            completeFilePath,
            FIXED_CODE,
            console.log
        );
    });
}

hackChartJs();