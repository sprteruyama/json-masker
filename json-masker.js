const MASK_VALUE = '%%%%%%%%%%%%%%%%%%%%';

if (process.argv.length < 4) {
    console.log('Usage: node json-maskter (input_filename) (culmn_name) [(colmn_name) ...]');
    return;
}

let is_multiline_json = false;
let tab = null;

let index = 2;
while (index < process.argv.length) {
    let param = process.argv[index];
    switch (param) {
        case '-m': {
            is_multiline_json = true;
            break;
        }
        case '-t': {
            try {
                tab = ' '.repeat(process.argv[index + 1]);
                process.argv.splice(index + 1, 1);
            } catch (e) {
                console.log('ERROR: -t option must have a more parameter.');
                return;
            }
            break;
        }
    }
    if (param.indexOf('-') === 0) {
        process.argv.splice(index, 1)
    } else {
        index++;
    }

}

let source_filename = process.argv[2];
if (source_filename.indexOf('/') !== 0) {
    source_filename = process.cwd() + '/' + process.argv[2];
}
if (!source_filename.match(/\.[^.]+$/)) {
    source_filename += '.json';
}

let fs = require('fs');
let data = null;
try {
    data = fs.readFileSync(source_filename, 'utf8');
} catch (e) {
    //nothing
}
if (data === null) {
    console.log('[ERROR]no such file.: ' + source_filename);
    return;
}
let jsons = [];
if (is_multiline_json) {
    jsons = data.split('\n');
} else {
    jsons = [data];
}
for (let json_index in jsons) {
    let json = jsons[json_index].trim();
    if (json) {
        if (tab == null) {
            let matched = json.match(/\n([\t ]+?)[^\t ]/);
            if (matched) {
                tab = matched[1];
            }
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
        let marked = process.argv.slice(3, process.argv.length);
        replace_marked(data, marked);
        console.log(JSON.stringify(data, null, tab));
    }
}

function replace_marked(node, marked) {
    if (node !== null && typeof node === "object") {
        for (let key in node) {
            if (node.hasOwnProperty(key)) {
                if (marked.indexOf(key) >= 0) {
                    node[key] = MASK_VALUE;
                } else {
                    replace_marked(node[key], marked);
                }
            }
        }
    }
}
