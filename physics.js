class Model {
}
class Pendulum extends Model {
    l;
    ω;
    θ_;
    constructor(l, θ = 0, ω = 0) {
        super();
        this.l = l;
        this.ω = ω;
        this.θ_ = θ;
    }
    get θ() { return this.θ_; }
    update() {
        this.θ_ += this.ω;
        this.ω -= 0.001 * Math.sin(this.θ) / this.l * this.l;
    }
}
class View {
    ctx;
    w;
    h;
    constructor() {
        const canvas = document.getElementById("myCanvas");
        canvas.width = this.w = window.innerWidth * 0.8;
        canvas.height = this.h = window.innerHeight * 0.8;
        this.ctx = canvas.getContext("2d");
    }
}
class PendulumView extends View {
    model;
    constructor(model) {
        super();
        this.model = model;
    }
    cb = this.run.bind(this);
    run() {
        this.model.update();
        this.draw();
        requestAnimationFrame(this.cb);
    }
    draw() {
        this.ctx.fillStyle = '#eee';
        this.ctx.fillRect(0, 0, this.w, this.h);
        this.ctx.strokeStyle = '#303030';
        this.ctx.lineCap = 'round';
        this.ctx.beginPath();
        this.ctx.moveTo(this.w / 2, 0);
        this.ctx.lineTo(this.w / 2 + this.model.l * Math.sin(this.model.θ), this.model.l * Math.cos(this.model.θ));
        this.ctx.stroke();
    }
}
const c = new Pendulum(300, 40 * Math.PI / 180);
const v = new PendulumView(c);
v.run();
