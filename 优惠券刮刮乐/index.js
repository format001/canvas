;(function () {
    var canvas = document.getElementById('J_canvas'),
        ctx = canvas.getContext('2d'),
        cWidth = ctx.canvas.width,
        cHeight = ctx.canvas.height,
        offset = canvas.getBoundingClientRect(),
        couponCover = new Image(),
        x,
        y;

        couponCover.src = '2.jpg';

    var init = function () {
        bindEvent();
    }

    function bindEvent () {
        couponCover.addEventListener('load', drawMark, false);
        canvas.addEventListener('mousedown', function (e) {
            mouseDown(e);

            document.addEventListener('mousemove', moseMove, false);
            document.addEventListener('mouseup', moseUp, false);
        }, false);
    }
    
    function drawMark () {
        ctx.drawImage(couponCover, 0, 0, cWidth, cHeight);
    }
    
    function mouseDown (e) {
        _setXy(e);

        ctx.beginPath();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.lineWidth = '20';
        ctx.moveTo(x, y);
    }
    
    function moseMove (e) {
        ctx.globalCompositeOperation = 'destination-out';
        
        _setXy(e);

        if (x <= 0){
            x = 0;
        }else if (x >= canvas.offsetWidth) {
            x = canvas.offsetWidth;
        }else if (y <= 0){
            y = 0;
        }else if (y >= canvas.offsetHeight) {
            y = canvas.offsetHeight;
        }

        ctx.lineTo(x, y);
        ctx.stroke();
    }
    
    function revealImage () {
        var res = ctx.getImageData(0, 0, cWidth, cHeight),
            imageData = res.data,
            width = res.width,
            height = res.height,
            len = imageData.length,
            count = 0,
            item;

        for (var i = 0; i < len; i++) {
            item = imageData[i]
            if ((i + 1) % 4 === 0 && item === 0) {
                count ++;
            }
        }

        if (count > width * height * 0.5) {
            ctx.clearRect(0, 0, cWidth, cHeight);
        }
    }
    
    function moseUp () {
        revealImage();

        document.removeEventListener('mousemove', moseMove, false);
        document.removeEventListener('mouseup', moseUp, false);
    }

    function _setXy (ev) {
        var e = ev || window.event;

        x = e.pageX - offset.left;
        y = e.pageY - offset.top;
    }

    init();
})();