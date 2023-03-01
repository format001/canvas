
class Clock {
    constructor (option) {
         this.oClock = document.getElementById('canvas');
         this.ctx = this.oClock.getContext('2d');
         this.cWidth = this.ctx.canvas.width;
         this.cHeight = this.ctx.canvas.height;
         this.r = this.cWidth / 2;
         this.hours = [ 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2 ];
         this.t = null;

        this.init();
    }

    init () {
        this.draw()

        this.t = setInterval(function () {
            this.draw()
        }.bind(this), 1000);
    }

     draw () {
         this.ctx.clearRect(0, 0, this.cWidth, this.cHeight);
         const { hour, minutes, seconds } = this.getTime();

        this.ctx.save();
        this.drawPanel();
        this.drawHoursNum();
        this.drawHourIndicator(hour, minutes);
        this.drawMinutesIndicator(minutes);
        this.drawSecondsIndicator(seconds);
        this.drawCenterPoint();
        this.ctx.restore();
    }

    getTime () {
        const d = new Date();

        return {
            hour: d.getHours(),
            minutes: d.getMinutes(),
            seconds: d.getSeconds()
        }
    }

    drawPanel () {
        this.ctx.translate(this.r, this.r);
        this.ctx.beginPath();
        this.ctx.fillStyle = '#fff';
        this.ctx.arc(0, 0, this.r - 25, 0, 2 * Math.PI, false);
        this.ctx.fill()
    }

    drawHoursNum () {
        var hours = this.hours;

        this.ctx.font = '40px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillStyle = '#424242';

        hours.forEach(function (elem, index) {
            var hNumsAngle = 2 * Math.PI / 12 * index,
                x = Math.cos(hNumsAngle) * (this.r - 60),
                y = Math.sin(hNumsAngle) * (this.r - 60);

            this.ctx.beginPath();
            this.ctx.fillText(elem, x, y);
        }, this)
    }

    // 绘制中心圆点
    drawCenterPoint () {
        this.ctx.beginPath();
        this.ctx.fillStyle = '#666';
        this.ctx.arc(0, 0, 13, 0, 2 * Math.PI, false);
        this.ctx.fill()

        this.ctx.beginPath();
        this.ctx.fillStyle = '#ccc';
        this.ctx.arc(0, 0, 8, 0, 2 * Math.PI, false);
        this.ctx.fill();
    }

    // 绘制时针
    drawHourIndicator (hour, minutes) {
        var hAngle = 2 * Math.PI / 12 * hour,
            mAngle = 2 * Math.PI / 12 / 60 * minutes;

        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.lineWidth = 10;
        this.ctx.lineCap = 'round';
        this.ctx.strokeStyle = 'cadetblue';

        this.ctx.rotate(hAngle + mAngle);
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(0, -this.r * .45);
        this.ctx.stroke();
        this.ctx.restore();
    }

    // 绘制分针
    drawMinutesIndicator (minutes) {
        var mAngle2 = 2 * Math.PI / 60 * minutes;

        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.lineWidth = 10;
        this.ctx.lineCap = 'round';
        this.ctx.strokeStyle = 'cadetblue';

        this.ctx.rotate(mAngle2);
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(0, -this.r * .55);
        this.ctx.stroke();
        this.ctx.restore();
    }

    // 绘制秒针
    drawSecondsIndicator (seconds) {
        var sAngle = 2 * Math.PI / 60 * seconds;

        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.lineWidth = 10;
        this.ctx.lineCap = 'round';
        this.ctx.strokeStyle = 'salmon';

        this.ctx.rotate(sAngle);
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(0, -this.r * .65);
        this.ctx.stroke();
        this.ctx.restore();
    }
}