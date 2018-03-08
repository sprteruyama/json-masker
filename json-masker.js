const MASK_VALUE = '%%%%%%%%%%%%%%%%%%%%';

if (process.argv.length < 4) {
    console.log('Usage: node json-maskter (input_filename) (culmn_name) [(colmn_name) ...]');
    return;
}

var source_filename = process.argv[2];
if (source_filename.indexOf('/') !== 0) {
    source_filename = process.cwd() + '/' + process.argv[2];
}
if (!source_filename.match(/\.[^.]+$/)) {
    source_filename += '.json';
}

var fs = require('fs');
data = null;
tab = '';
var json = null;
try {
    json = fs.readFileSync(source_filename, 'utf8');
} catch (e) {
    //nothing
}
if (json === null) {
    console.log('[ERROR]no such file.: ' + source_filename);
    return;
}
var matched = json.match(/\n([\t ]+?)[^\t ]/);
if (matched) {
    tab = matched[1];
}
try {
    data = JSON.parse(json);
} catch (e) {
    data = null;
}
if (data === null) {
    console.log('ERROR: json format is invalid.');
    return;
}
var marked = process.argv.slice(3, process.argv.length);

function replace_marked(node) {
    if (node !== null && typeof node === "object") {
        for (var key in node) {
            if (marked.indexOf(key) >= 0) {
                node[key] = MASK_VALUE;
            } else {
                replace_marked(node[key]);
            }
        }
    }
}

replace_marked(data);

console.log(JSON.stringify(data, null, tab));