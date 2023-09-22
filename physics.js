class Model {
}
class Pendulum extends Model {
    m;
    l;
    ω_;
    θ_;
    constructor(m, l, θ = 0, ω_ = 0) {
        super();
        this.m = m;
        this.l = l;
        this.ω_ = ω_;
        this.θ_ = θ;
    }
    get θ() { return this.θ_; }
    get ω() { return this.ω_; }
    update(dt = 1) {
        this.θ_ += dt * this.ω_;
        this.ω_ -= dt * 3 / 2 * Math.sin(this.θ_) / this.l;
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
    drawCircle(x, y, r, fillStyle = '#111') {
        this.ctx.beginPath();
        this.ctx.arc(x, y, r, 0, 2 * Math.PI);
        this.ctx.fillStyle = fillStyle;
        this.ctx.fill();
        this.ctx.closePath();
    }
}
class PendulumView extends View {
    model;
    wmax = 0;
    constructor(model) {
        super();
        this.model = model;
    }
    cb = this.run.bind(this);
    run() {
        this.step();
        requestAnimationFrame(this.cb);
    }
    step() {
        for (let i = 0; i < 100; ++i) {
            this.model.update(0.001);
        }
        this.draw();
    }
    draw() {
        this.drawBackground();
        this.drawPendulum();
        this.drawReadout();
    }
    drawBackground() {
        this.ctx.fillStyle = '#eee';
        this.ctx.fillRect(0, 0, this.w, this.h);
    }
    drawPendulum() {
        const x = this.w / 2;
        this.ctx.strokeStyle = '#202020';
        this.drawCircle(x, 0, 2);
        this.ctx.strokeStyle = '#303030';
        this.ctx.lineCap = 'round';
        this.ctx.beginPath();
        this.ctx.moveTo(x, 0);
        this.ctx.lineTo(x + this.model.l * Math.sin(this.model.θ), this.model.l * Math.cos(this.model.θ));
        this.ctx.stroke();
    }
    drawReadout() {
        const T = this.model.m * this.model.ω * this.model.ω * this.model.l * this.model.l / 6;
        const V = (1 - Math.cos(this.model.θ)) * this.model.m * this.model.l / 2;
        const E = T + V;
        this.wmax = Math.max(this.wmax, this.model.ω);
        this.ctx.font = "16px Segoe UI";
        this.ctx.fillStyle = "#202020";
        this.drawReadoutText(`θ = ${this.model.θ.toFixed(1)}`, `° = ${(180 * this.model.θ / Math.PI).toFixed(0)}`, `ω = ${this.model.ω.toFixed(3)}`, `ωmax = ${this.wmax.toFixed(3)}`, `T = ${T.toFixed(3)}`, `V = ${V.toFixed(3)}`, `E = ${E.toFixed(3)}`);
    }
    drawReadoutText(...ss) {
        let y = 24;
        for (const s of ss) {
            this.ctx.fillText(s, 10, y);
            y += 20;
        }
    }
}
//const c = new Pendulum(0.001, 300, 40 * Math.PI / 180);
const c = new Pendulum(0.1, 300, Math.PI / 4);
const v = new PendulumView(c);
//v.draw();
v.run();
//v.draw();
document.addEventListener('keydown', (event) => {
    if (event.key === ' ') {
        v.step();
    }
});
