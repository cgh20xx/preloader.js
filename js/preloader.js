/**
 *  preloader.js
 *
 *  Author : Hank Hsiao
 *  Version: 1.1.1
 *  Create : 2015.8.18
 *  Update : 2018.09.12
 *  License: MIT
 */

var preloader = function(option) {
    var queue = {}; //儲存載完的檔案
    var settings = {
        manifest: [],
        onEachLoad: function(info) { console.log('[Preloader] ' + info.index + ' loaded');},
        onAllLoad: function(queue) { console.log('[Preloader] all completed:' + queue);}
    };

    // option extend settings (淺拷貝)
    var key;
    for (key in settings) {
        if (option[key]) { settings[key] = option[key]; }
    }

    var allQty = settings.manifest.length; // 資源數量(未載入)
    var loadedQty = 0; // 已經載入完成的資源數量

    function handleLoadEvent(data) {
        settings.onEachLoad(data);
        queue[data.id] = data;
        if (loadedQty === allQty) {
            settings.onAllLoad(queue);
        }
    }

    var handler = {
        image: function(id, e) {
            loadedQty++;
            var data = {
                id: id,
                index: loadedQty,
                total: allQty,
                img: this
            };
            handleLoadEvent(data)
        },
        audio: function(id, e) {
            if (e.target.status === 200) {
                loadedQty++;
                var data = {
                    id: id,
                    index: loadedQty,
                    total: allQty,
                    audio: this
                };
                this.src = URL.createObjectURL(e.target.response);
                handleLoadEvent(data)
            } else {
                onError(id);
            }
        },
        video: function(id, e) {
            if (e.target.status === 200) {
                loadedQty++;
                var data = {
                    id: id,
                    index: loadedQty,
                    total: allQty,
                    video: this
                };
                this.src = URL.createObjectURL(e.target.response);
                handleLoadEvent(data)
            } else {
                onError(id);
            }
        },
    };

    function onError(id) {
        console.error('[Preloader] not found : ' + id);
    }

    for (var i = 0; i < allQty; i += 1) {
        var preloadObj = settings.manifest[i];
        if (preloadObj.type === 'audio') {
            var audio = document.createElement('audio');
            if (preloadObj.crossOrigin) {
                audio.crossOrigin = preloadObj.crossOrigin;
            }
            var xhr = new XMLHttpRequest();
            xhr.open('GET', preloadObj.src, true);
            xhr.responseType = 'blob';
            xhr.addEventListener('load', handler.audio.bind(audio, preloadObj.id), false);
            xhr.addEventListener('error', onError.bind(audio, preloadObj.id), false);
            xhr.send();
        } else if (preloadObj.type === 'video') {
            var video = document.createElement('video');
            if (preloadObj.crossOrigin) {
                video.crossOrigin = preloadObj.crossOrigin;
            }
            var xhr = new XMLHttpRequest();
            xhr.open('GET', preloadObj.src, true);
            xhr.responseType = 'blob';
            xhr.addEventListener('load', handler.video.bind(video, preloadObj.id), false);
            xhr.addEventListener('error', onError.bind(video, preloadObj.id), false);
            xhr.send();
        } else {
            var img = document.createElement('img');
            if (preloadObj.crossOrigin) {
                img.crossOrigin = preloadObj.crossOrigin;
            }
            img.addEventListener('load', handler.image.bind(img, preloadObj.id), false);
            img.addEventListener('error', onError.bind(img, preloadObj.id), false);
            img.src = preloadObj.src;
        }
    }
};