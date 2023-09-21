var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Model = /** @class */ (function () {
    function Model() {
    }
    return Model;
}());
var Pendulum = /** @class */ (function (_super) {
    __extends(Pendulum, _super);
    function Pendulum(length, angle) {
        if (angle === void 0) { angle = 0; }
        var _this = _super.call(this) || this;
        _this.length = length;
        _this.angle_ = angle;
        return _this;
    }
    Pendulum.prototype.update = function () {
        var pe0 = this.energy();
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
    };
    Pendulum.prototype.energy = function () {
        //return this.elements
        //.map(e => -(e.y0 + e.y1) / 2)
        //.reduce((a, b) => a + b);
    };
    return Pendulum;
}(Model));
var PendulumView = /** @class */ (function () {
    function PendulumView(model) {
        this.model = model;
        var canvas = document.getElementById("myCanvas");
        canvas.width = this.w = window.innerWidth * 0.8;
        canvas.height = this.h = window.innerHeight * 0.8;
        this.ctx = canvas.getContext("2d");
    }
    PendulumView.prototype.draw = function () {
        this.ctx.fillStyle = '#e0e0e0';
        this.ctx.fillRect(0, 0, this.w, this.h);
        this.ctx.strokeStyle = '#303030';
        this.ctx.moveTo(this.w / 2, 0);
        this.ctx.lineTo(this.w / 2, this.model.length);
    };
    return PendulumView;
}());
var c = new Pendulum(100);
var v = new PendulumView(c);
v.draw();
//c.update();
