class Model {

}

class Pendulum extends Model {
   angle_: number;

    constructor(public readonly length: number, angle: number = 0) {
        super();
        this.angle_ = angle;
    }

    update() {
        const pe0 = this.energy();
        console.log('pe0', pe0);
        // Compute PE change for changing angles of items.
        // Item 0
        /*
        const da = Math.PI / 180;
        const e = this.elements[0];
        const a0 = Math.atan2(e.y1 - e.y0, e.x1 - e.x0);
        const a1 = a0 + da;
        const 
        */
    }

    energy() {
        //return this.elements
        //.map(e => -(e.y0 + e.y1) / 2)
        //.reduce((a, b) => a + b);
    }
}

class PendulumView {
    private readonly ctx: CanvasRenderingContext2D;
    private readonly w: number;
    private readonly h: number;

    constructor(private model: Pendulum) {
        const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;    
        canvas.width = this.w = window.innerWidth * 0.8;
        canvas.height = this.h = window.innerHeight * 0.8;

        this.ctx = canvas.getContext("2d")!;
    }

    draw() {
        this.ctx.fillStyle = '#e0e0e0';
        this.ctx.fillRect(0, 0, this.w, this.h);
        
        this.ctx.strokeStyle = '#303030';
        this.ctx.moveTo(this.w / 2, 0);
        this.ctx.lineTo(this.w / 2, this.model.length);
    }
}

const c = new Pendulum(100);
const v = new PendulumView(c);
v.draw();

//c.update();