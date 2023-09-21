class Model {

}

class Catenary extends Model {
    readonly elements: CatenaryElement[] = [];

    constructor(elements: number, public span: number, elementLength: number) {
        super();
        if (elements % 2 == 1) throw new Error('ni odd elements');
        if (elements * elementLength < span) throw new Error('too short to span');

        const midpoint = span / 2;
        const halfLength = elements * elementLength / 2;
        const dxElement = span / elements;
        const dyElement = Math.sqrt(halfLength*halfLength - midpoint*midpoint) / elements;

        let x0 = 0;
        let y0 = 0;

        for (let i = 0; i < elements / 2; ++i) {
            const x1 = x0 + dxElement;
            const y1 = y0 + dyElement;
            const e = new CatenaryElement(x0, y0, x1, y1);
            this.elements.push(e);

            x0 = x1;
            y0 = y1;
        }

        for (let i = elements / 2 - 1; i >= 0; --i) {
            const c = this.elements[i];
            const e = new CatenaryElement(span - c.x1, c.y1, span - c.x0, c.y0);
            this.elements.push(e);
        }
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
        return this.elements
        .map(e => -(e.y0 + e.y1) / 2)
        .reduce((a, b) => a + b);
    }
}

class CatenaryElement {
    constructor(public x0: number, public y0: number, public x1: number, public y1: number) {
    }
}

class CatenaryView {
    private readonly ctx: CanvasRenderingContext2D;
    private readonly w: number;
    private readonly h: number;

    constructor(private model: Catenary) {
        const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;    
        canvas.width = this.w = window.innerWidth * 0.8;
        canvas.height = this.h = window.innerHeight * 0.8;

        this.ctx = canvas.getContext("2d")!;
        this.ctx.translate((this.w - model.span) / 2, 100);
    }

    draw() {
        const ctx = this.ctx;

        ctx.fillStyle = '#eee';
        ctx.fillRect(0, 0, this.w, this.h);

        ctx.beginPath();
        ctx.strokeStyle = '#222';
        ctx.moveTo(this.model.elements[0].x0, this.model.elements[0].y0);
        for (const e of this.model.elements) {
            ctx.lineTo(e.x1, e.y1);
        }
        ctx.stroke();

        this.drawCircle(ctx, this.model.elements[0].x0, this.model.elements[0].y0);
        for (const e of this.model.elements) {
            this.drawCircle(ctx, e.x1, e.y1);
        }
    }

    drawCircle(ctx: CanvasRenderingContext2D, x: number, y: number, fillStyle: string = '#111'): void {
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, 2 * Math.PI);
        ctx.fillStyle = fillStyle;
        ctx.fill();
        ctx.closePath();
    }
}

const c = new Catenary(4, 500, 200);
const v = new CatenaryView(c);
v.draw();

c.update();