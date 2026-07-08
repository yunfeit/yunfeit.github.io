const settings = {
    particles: {
        length: 2000, // 粒子数
        duration: 2, // 延迟
        velocity: 100, // 剪切颗粒对像素每秒
        effect: -0.75, // 半径的剪影
        size: 20, // 颗粒的大小,
        width: 180,
        height: 180
    }
};

class Point {
    public x = 0;
    public y = 0;

    public constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    public clone(): Point {
        return new Point(this.x, this.y);
    }

    public length(length: number = null): any {
        if (length == null) {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        }
        this.normalize();
        this.x *= length;
        this.y *= length;
        return this;
    }

    public normalize(): this {
        let length = this.length();
        this.x /= length;
        this.y /= length;
        return this;
    }
}
