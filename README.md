# preloader
提供預載圖片、聲音、影片功能
支援格式包含 jpg png mp3 mp4

# Download
[preloader.js](https://cgh20xx.github.io/preloader.js/preloader.js)

# Example
```javascript
var cache; // to save loaded sources

preloader({
    manifest : [
        {id: 'img_1', src: 'images/img1.png'}, // 圖片預設可省略 type: 'image' 
        {id: 'img_2', src: 'images/img2.png'},
        {id: 'img_3', type: 'image', src: 'images/img3.png'},
        {id: 'audio', type: 'audio', src: 'audio/ado.mp3'},
        {id: 'video', type: 'video', src: 'video/vdo.mp4'},
    ],
    onEachLoad: function(info) {
        console.log('讀取中(' + info.index + '/' + info.total + ')');
    },
    onAllLoad: function(source) {
        console.log('preload all completed');
        cache = source;
    }
});
```