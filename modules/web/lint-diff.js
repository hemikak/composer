/*eslint-disable */
const argv = require('yargs').argv;
const shell = require('shelljs');
var commandExistsSync = require('command-exists').sync;
var os = require('os');

if (commandExistsSync('git') || commandExistsSync('xargs')) {
    if (/^linux/.test(os.platform()) || /^darwin/.test(os.platform()) || /^freebsd/.test(os.platform())) {
        shell.exec("LIST='git diff-index --diff-filter=AMTU --name-only --relative=modules/web/ HEAD | grep -o -E '.*\.js$|.*\.jsx$' --color=never' | xargs -I {} eslint -c .eslintrc.js {}")
    } else if (/^win32/.test(os.platform())){
        // TODO : Implement
    }
}
/*eslint-enable */
