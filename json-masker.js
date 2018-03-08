const MASK_VALUE = '%%%%%%%%%%%%%%%%%%%%';

if (process.argv.length < 4) {
    console.log('Usage: node json-maskter (input_filename) (culmn_name) [(colmn_name) ...]');
    return;
}

var is_multiline_json = false;

for (var index in process.argv) {
    if (process.argv[index] === '-m') {
        is_multiline_json = true;
        process.argv.splice(index, 1)
    }
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
var data = null;
try {
    data = fs.readFileSync(source_filename, 'utf8');
} catch (e) {
    //nothing
}
if (json === null) {
    console.log('[ERROR]no such file.: ' + source_filename);
    return;
}
var jsons = [];
if (is_multiline_json) {
    jsons = data.split('\n');
} else {
    jsons = [data];
}
for (var json_index in jsons) {
    var json = jsons[json_index].trim();
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
                if (node.hasOwnProperty(key)) {
                    if (marked.indexOf(key) >= 0) {
                        node[key] = MASK_VALUE;
                    } else {
                        replace_marked(node[key]);
                    }
                }
            }
        }
    }

    replace_marked(data);

    console.log(JSON.stringify(data, null, tab));
}
