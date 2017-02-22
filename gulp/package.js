var assert = require('assert'),
    fs = require('fs'),
    lodash = require('lodash'),
    path = require('path');

function filter(object) {
    if (typeof object === 'object') {
        for (var key in object) {
            if (object.hasOwnProperty(key)) {
                if (object[key] !== '') {
                    object[key] = filter(object[key]);
                } else {
                    delete object[key];
                }
            }
        }
    }
    return object;
}

function get_config (path_to, cfg_json) {
    var cfg_path = path.join(path_to, '.generator-dizmo', 'config.json');
    try {
        cfg_json = lodash.merge(
            JSON.parse(fs.readFileSync(cfg_path)), cfg_json);
    } catch (ex) {
    }
    var parsed = path.parse(path_to);
    if (parsed.dir && parsed.base) {
        cfg_json = lodash.merge(
            cfg_json, get_config(parsed.dir, cfg_json));
    }
    return cfg_json;
}

var pkg = get_config(
    __dirname, filter(JSON.parse(fs.readFileSync('package.json'))));

assert.ok(pkg,
    'package JSON required');
assert.ok(pkg && pkg.description,
    'package.description required');
assert.ok(pkg && pkg.keywords.length > 0,
    'package.keywords required');
assert.ok(pkg && pkg.name,
    'pacakge.name required');
assert.ok(pkg && pkg.version,
    'package.version required');

assert.ok(pkg && pkg.dizmo,
    'package.dizmo required');
assert.ok(pkg && pkg.dizmo && pkg.dizmo.settings,
    'package.dizmo.settings required');
assert.ok(pkg && pkg.dizmo && pkg.dizmo.settings['bundle-identifier'],
    'package.dizmo.settings.bundle-identifier required');

pkg.dizmo.settings = lodash.assign({
    'bundle-display-name': pkg.name,
    'bundle-name': pkg.name,
    'bundle-version': pkg.version,
    'description': pkg.description,
    'tags': pkg.keywords
}, pkg.dizmo.settings);

module.exports = pkg;
