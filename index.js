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
    var i = 0;
    var nightmare = Nightmare({
        width: 2560,
        height: 1600,
        show: true
    });

    var ready = false;

    yield nightmare.on('dom-ready', function () {
        ready = true;
    }).goto('https://passport.baidu.com/v2/?login');

    while (!ready) {
        yield nightmare.wait(1e3);
    }

    yield nightmare.type('input[name="userName"]', '平台化测试').type('input[name="password"]', 'pingtaihua123').click(
        'input[type="submit"]');

    yield nightmare.wait(2e3);

    ready = false;
    yield nightmare.goto('http://tieba.baidu.com/f?ie=utf-8&kw=%E8%B4%B4%E5%90%A7%E5%9C%B0%E5%8C%BAtest');

    while (!ready) {
        yield nightmare.wait(1e3);
    }

    yield nightmare.evaluate(function () {
        var $ = window.$;
        $(document).scrollTop($('#rforum_mod').offset().top);

        return $('.j-local-category .j-cate-item').length;
    });

    yield nightmare.click('#forumEditBtn').click(1e3).wait(3e3);

    yield nightmare.type('#addForumArea', 'test').wait(1e3).click('#dialogJbody input[type="button"]').wait(3e3);

    var succeed = yield nightmare.evaluate(function () {
        var $ = window.$;
        var exist = Array.prototype.some.call($('#dialogJbody .forumGroup .item a'), function (a) {
            return $(a).text().trim() === 'test';
        });

        return exist;
    });

    yield nightmare.evaluate(function () {
        var $ = window.$;
        var exist = Array.prototype.forEach.call($('#dialogJbody .forumGroup .item'), function (item) {
            var $item = $(item);
            if ('test' === $item.find('a').text().trim()) {
                $item.find('button').click();
            }
        });

    });

    yield nightmare.wait(2e3);

    yield nightmare.evaluate(function (succeed) {
        document.write('<center><font size=+5 color=red>Test Result:' + succeed + '</font></center>');
    }, succeed);

    yield nightmare.wait(3e3);

    yield nightmare.end();

    return succeed;
}

vo(test)(function (err, result) {
    console.log(result);
});