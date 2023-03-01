;(function () {
    var canvas  =document.getElementById('canvas'),
        oTools = document.getElementsByClassName('J_toolsBar')[0],
        ctx = canvas.getContext('2d'),
        cWidth = ctx.canvas.width,
        cHeight = ctx.canvas.height,
        color = 'orangered',
        lineWidth = '4',
        x,
        y;

    var init = function () {
        bindEvent()
    }

    function bindEvent () {
        canvas.addEventListener('mousedown', function (e) {
            mouseDown(e);

            document.addEventListener('mousemove', moseMove, false);
            document.addEventListener('mouseup', moseUp, false);
        }, false);
        oTools.addEventListener('click', btnClick, false);
    }

    function mouseDown(e){
        _setXy(e);

        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.lineWidth = lineWidth;
        ctx.moveTo(x, y);
    }
    
    function moseMove (e) {
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
    
    function moseUp () {
        document.removeEventListener('mousemove', moseMove, false);
        document.removeEventListener('mouseup', moseUp, false);
    }

    function btnClick (ev) {
        var e = ev || window.event,
            tar = e.target || e.srcElement,
            className = tar.className;

        if (className.indexOf('color') === 0){
            color = tar.getAttribute('data-color');
        }

        if (className.indexOf('line') === 0){
            lineWidth = tar.getAttribute('data-line');
        }

        if (className === 'remove'){
            ctx.clearRect(0, 0, cWidth, cHeight);
        }
    }

    function _setXy (ev) {
        var e = ev || window.event;

        x = e.pageX - canvas.offsetLeft;
        y = e.pageY - canvas.offsetTop;

    }

    init();
})();