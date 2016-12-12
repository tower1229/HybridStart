/*
 * name:img-ready
 * vertion: v1.0
 * update: 去掉jQuery依赖
 * date: 2014-10-29
 */
define('img-ready',function(require, exports, module) {

    var list = [],
        intervalId = null,
        tick = function() {
            var i = 0;
            for (; i < list.length; i++) {
                list[i].end ? list.splice(i--, 1) : list[i]()
            };
            !list.length && stop()
        },
        stop = function() {
            clearInterval(intervalId);
            intervalId = null
        };

    function imgReady(url, ready, load, error) {
        var check, width, height, newWidth, newHeight, img = new Image();
        img.src = url;
        if (img.complete) {
            ready(img.width, img.height);
            load && load(img.width, img.height);
            return
        };
        width = img.width;
        height = img.height;
        check = function() {
            newWidth = img.width;
            newHeight = img.height;
            if (newWidth !== width || newHeight !== height || newWidth * newHeight > 1024) {
                ready(newWidth, newHeight);
                check.end = true
            }
        };
        check();
        img.onerror = function() {
            error && error();
            check.end = true;
            img = img.onload = img.onerror = null
        };
        img.onload = function() {
            load && load(img.width, img.height);
            !check.end && check();
            img = img.onload = img.onerror = null
        };
        if (!check.end) {
            list.push(check);
            if (intervalId === null) intervalId = setInterval(tick, 40)
        }
    }

    return imgReady;

})
