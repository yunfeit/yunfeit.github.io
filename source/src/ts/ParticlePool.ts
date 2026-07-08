let particles: Particle[];
let firstActive = 0;
let firstFree = 0;
let duration = settings.particles.duration;

class ParticlePool {
    public constructor(length: number) {
        particles = new Array(length);
        for (let i = 0; i < particles.length; i++) {
            particles[i] = new Particle();
        }
    }

    public add(x: number, y: number, dx: number, dy: number) {
        particles[firstFree].initialize(x, y, dx, dy);
        // 定制排队
        firstFree++;
        if (firstFree == particles.length) {
            firstFree = 0;
        }
        if (firstActive == firstFree) {
            firstActive++;
        }
        if (firstActive == particles.length) {
            firstActive = 0;
        }
    }

    public update(deltaTime) {
        // 活性粒子的更新
        if (firstActive < firstFree) {
            for (let i = firstActive; i < firstFree; i++) {
                particles[i].update(deltaTime);
            }
        }
        if (firstFree < firstActive) {
            for (let i = firstActive; i < particles.length; i++) {
                particles[i].update(deltaTime);
            }
            for (let i = 0; i < firstFree; i++) {
                particles[i].update(deltaTime);
            }
        }

        // 去除不活
        while (particles[firstActive].age >= duration && firstActive != firstFree) {
            firstActive++;
            if (firstActive == particles.length) {
                firstActive = 0;
            }
        }
    }

    public draw(context, image) {
        // 活性粒子的建立
        if (firstActive < firstFree) {
            for (let i = firstActive; i < firstFree; i++) {
                particles[i].draw(context, image);
            }
        }
        if (firstFree < firstActive) {
            for (let i = firstActive; i < particles.length; i++) {
                particles[i].draw(context, image);
            }
            for (let i = 0; i < firstFree; i++) {
                particles[i].draw(context, image);
            }
        }
    }
}
