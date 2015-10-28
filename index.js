/**
 * Copyright (C) 2014 yanni4night.com
 * index.js
 *
 * changelog
 * 2015-10-28[23:25:33]:revised
 *
 * @author yanni4night@gmail.com
 * @version 0.1.0
 * @since 0.1.0
 */

var Nightmare = require('nightmare');
var vo = require('vo');

function* test() {
    var nightmare = Nightmare({
        width: 2560,
        height: 1600,
        show: true
    });
    
    var ready = false;
    
    yield nightmare.on('dom-ready', function() {
        ready = true;
    });

    while (!ready) {
        yield nightmare.wait(1e3);
    }

    //yield nightmare

}

vo(test())(function(err, result) {});