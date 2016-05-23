/**
 *  preloader.js
 *
 *  Author : Hank Hsiao
 *  Version: 0.9.2
 *  Create : 2015.8.18
 *  Update : 2015.11.17
 *  License: MIT
 */

window.preloader = function(option) {
    'use strict';
    var queue = {}; //儲存載完的檔案
    var settings = {
        manifest: [],
        onEachLoad: function(info) { console.log('[imagePreloader] image:' + info.index + ' loaded');},
        onAllLoad: function(queue) { console.log('[imagePreloader] all images loaded:' + queue);}
    };

    // 模擬 option extend settings (淺拷貝)
    var k;
    for (k in settings) {
        if (option[k]) { settings[k] = option[k]; }
    }

    var imgQty = settings.manifest.length; //圖片數量(未載入)
    var loadedImgQty = 0; //已經載入完成的圖片數量
    var img;
    var i;

    for (i = 0; i < imgQty; i += 1) {
        img = new Image();
        img.addEventListener('load', (function(index, image, id) {
            return function(e) {
                loadedImgQty++;
                var imgInfo = {
                    index: loadedImgQty,
                    image: image,
                    imgQty: imgQty
                };
                settings.onEachLoad(imgInfo);
                queue[id] = imgInfo;
                //如果已載入的圖片數量等於圖片總數，表全部載入完成
                if (loadedImgQty == imgQty) {
                    settings.onAllLoad(queue);
                }
            }
        })(i, img, settings.manifest[i].id), false);
        img.src = settings.manifest[i].src;
    }
}