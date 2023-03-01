;(function () {
    var oBtnGroup = document.getElementsByClassName('btn-group')[0],
        oStart = document.getElementsByClassName('j-start')[0],
        oPause = document.getElementsByClassName('j-pause')[0],
        oReset = document.getElementsByClassName('j-reset')[0],
        can = document.getElementById('gameCan'),
        ctx = can.getContext('2d'),
        t = null,
        dir = 'DOWN',
        cWidth = can.width,
        cHeight = can.height,
        bodyArr = [
            {x: 10, y: 10},
            {x: 10, y: 30},
            {x: 10, y: 50}
        ],
        [foodPosX, foodPosY] = createFoodPos(cWidth, cHeight),
        foodX = null;
        foodY = null;

    var init = function () {
        bindEvent();
        initSnake();
        run();
        createFood();
    }

    function bindEvent () {
        document.addEventListener('keydown', changeDir, false);
        oBtnGroup.addEventListener('click', handleBtnClick, false);
    }

    function initSnake () {
        var arr = bodyArr,
            len = arr.length,
            item;

        for (var i = 0; i < len; i++) {
            item = bodyArr[i];

            if (i === len - 1) {
                createCircle(item.x, item.y, 'orangered');
            } else {
                createCircle(item.x, item.y, 'aqua');
            }
        }
    }

    function createCircle (x, y, color) {
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(x, y, 10, 0, 2 * Math.PI, false);
        ctx.fill();
    }

    function run () {
        t = setInterval(() => {
            move();
        }, 100);
    }

    function move () {
        var arr = bodyArr,
            len = arr.length;

        for (var i = 0; i < len; i++) {
            removeSnake(arr[i]);

            if (i === len - 1) {
                setHeadXY(arr);
            } else {
                arr[i].x = arr[i + 1].x;
                arr[i].y = arr[i + 1].y;
            }
        }

        eatFood(arr);
        initSnake();
        headInBody(arr);
    }

    function setHeadXY (arr) {
        var head = arr[arr.length - 1];

        switch (dir) {
            case 'LEFT':
                if (head.x <= 10) {
                    head.x = cWidth - 10;
                } else {
                    head.x -= 20;
                }
                break;
            case 'UP':
                if (head.y <= 10) {
                    head.y = cHeight - 10;
                } else {
                    head.y -= 20;
                }
                break;
            case 'RIGHT':
                if (head.x >= cWidth - 10) {
                    head.x = 10;
                } else {
                    head.x += 20;
                }
                break;
            case 'DOWN':
                if (head.y >= cHeight - 10) {
                    head.y = 10;
                } else {
                    head.y += 20;
                }
                break;
            default:
                break;
        }
    }

    function removeSnake ({x, y}) {
        ctx.clearRect(x - 10, y - 10, 20, 20);
    }

    function changeDir (e) {
        var ev = e || window.event,
            code = e.keyCode;

        setDir(code);
    }

    function setDir (code) {
        switch (code) {
            case 37:
                if (dir !== 'RIGHT' && dir !== 'LEFT') {
                    dir = 'LEFT'
                }
                break;
            case 38:
                if (dir !== 'UP' && dir !== 'DOWN') {
                    dir = 'UP'
                }
                break;
            case 39:
                if (dir !== 'RIGHT' && dir !== 'LEFT') {
                    dir = 'RIGHT'
                }
                break;
            case 40:
                if (dir !== 'UP' && dir !== 'DOWN') {
                    dir = 'DOWN'
                }
                break;
            default:
                break;
        }
    }

    function createFood () {
        var arr = bodyArr,
            len = arr.length,
            item = null;

         foodX = foodPosX[Math.floor(Math.random() * foodPosX.length)];
         foodY = foodPosY[Math.floor(Math.random() * foodPosY.length)];

        for (var i = 0; i < len; i++) {
            item = arr[i];

            if (item.x === foodX && item.y === foodY) {
                createFood();
                return;
            }
        }

        createCircle(foodX, foodY, 'gold')
    }

    function createFoodPos (cWidth, cHeight) {
        var arrX = [],
            arrY = [];

        for (var x = 10; x < cWidth; x += 20) {
            arrX.push(x)

        }
        for (var y = 10; y < cHeight; y += 20) {
            arrY.push(y);
        }

        return [arrX, arrY];
    }

    function eatFood (arr) {
        var headX = arr[arr.length - 1].x,
            headY = arr[arr.length - 1].y,
            x,
            y;

        if (headX === foodX && headY === foodY) {
            createFood();

            if (arr[0].x === arr[1].x) {
                x = arr[0].x;

                if (arr[0].y > arr[1].y) {
                    y = arr[0].y + 20;
                } else if (arr[0].y < arr[1].y) {
                    y = arr[0].y - 20;
                }
            } else if (arr[0].y === arr[1].y) {
                y = arr[0].y;

                if (arr[0].x > arr[1].x) {
                    x = arr[0].x + 20;
                } else if (arr[0].x < arr[1].x) {
                    x = arr[0].x - 20;
                }
            }

            arr.unshift({x, y});
        }
    }

    function headInBody (arr) {
        var len = arr.length,
            headX = arr[len - 1].x,
            headY = arr[len - 1].y,
            item;

        for (let i = 0; i < len - 2; i++) {
            item = arr[i];

            if (headX === item.x && headY === item.y) {
                setTimeout(function () {
                    console.log('结束');
                    clearInterval(t);
                    removeSnake();
                }, 100);
            }
        }
    }

    function handleBtnClick (ev) {
        var e = ev || window.event,
            tar = e.target || e.srcElement,
            className = tar.className,
            field = tar.getAttribute('data-field');

            switch (field){
                case 'start':
                        // this.disabled = 'disabled';
                    // oStart.className = 'j-start'
                    // oPause.className += ' active'
                    // oReset.className += ' active'
                    break;
                case 'pause':
                    // oPause.className += ' active'
                    // this.disabled = '';

                    break;
                case 'reset':
                    // oReset.className = 'j-reset'

                    break;
                default:
                    break;
            }
    }

    init();
})();