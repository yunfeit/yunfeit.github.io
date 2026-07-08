(function () {
    let b = 0;
    let c = ["ms", "moz", "webkit", "o"];
    for (let a = 0; a < c.length && !window.requestAnimationFrame; ++a) {
        let k = c[a];
        window['AnimationFrame'] = window[k + "RequestAnimationFrame"];
        window.cancelAnimationFrame = window[k + "CancelAnimationFrame"] || window[k + "CancelRequestAnimationFrame"]
    }
    if (!window['AnimationFrame']) {
        window['AnimationFrame'] = function (cb: Function, e) {
            let time = new Date().getTime();
            let f = Math.max(0, 16 - (time - b));
            let g = setTimeout(function () {
                cb(time + f)
            }, f);
            b = time + f;
            return g;
        }
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function (d: number) {
            clearTimeout(d);
        }
    }
}());

(function () {
    let canvas = <HTMLCanvasElement>document.getElementById('heart');
    if (!canvas) {
        return;
    }
    let context = canvas.getContext('2d');
    let particles = new ParticlePool(settings.particles.length);
    let particleRate = settings.particles.length / settings.particles.duration; // particles/sec
    let time = 0;

    // 心形计算
    function pointOnHeart(t: number) {
        let x = settings.particles.width * Math.pow(Math.sin(t), 3);
        let y = settings.particles.height * Math.cos(t) - 50 * Math.cos(2 * t) - 20 * Math.cos(3 * t) - 10 * Math.cos(4 * t) + 25;
        return new Point(x, y);
    }

    // 建立一类粒子
    let image = (function () {
        let canvas = document.createElement('canvas');
        let context = canvas.getContext('2d');
        canvas.width = settings.particles.size;
        canvas.height = settings.particles.size;

        // 辅助部分
        function to(t: number) {
            let point = pointOnHeart(t);
            point.x = settings.particles.size / 2 + point.x * settings.particles.size / 350;
            point.y = settings.particles.size / 2 - point.y * settings.particles.size / 350;
            return point;
        }

        // 访问的建立
        context.beginPath();
        let t = -Math.PI;
        let point = to(t);
        context.moveTo(point.x, point.y);
        while (t < Math.PI) {
            t += 0.01; // 愚蠢的例行程序
            point = to(t);
            context.lineTo(point.x, point.y);
        }
        context.closePath();
        context.fillStyle = '#ea80b0';
        context.fill();
        let image = new Image();
        image.src = canvas.toDataURL();
        return image;
    })();

    //绘制
    function render() {
        // 动画帧
        requestAnimationFrame(render);
        // 时间同步
        let newTime = new Date().getTime() / 1000;
        let dt = newTime - (time || newTime);
        time = newTime;

        context.clearRect(0, 0, canvas.width, canvas.height);

        let amount = particleRate * dt;
        for (let i = 0; i < amount; i++) {
            let pos = pointOnHeart(Math.PI - 2 * Math.PI * Math.random());
            let dir = pos.clone().length(settings.particles.velocity);
            particles.add(canvas.width / 2 + pos.x, canvas.height / 2 - pos.y, dir.x, -dir.y);
        }

        //绘制更新
        particles.update(dt);
        particles.draw(context, image);
    }

    // 大小调整
    function onResize() {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
    }

    window.onresize = onResize;

    // 延迟渲染
    setTimeout(function () {
        onResize();
        render();
    }, 10);
})();
