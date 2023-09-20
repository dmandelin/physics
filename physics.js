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
var Catenary = /** @class */ (function (_super) {
    __extends(Catenary, _super);
    function Catenary(elements, span, elementLength) {
        var _this = _super.call(this) || this;
        _this.span = span;
        _this.elements = [];
        if (elements % 2 == 1)
            throw new Error('ni odd elements');
        if (elements * elementLength < span)
            throw new Error('too short to span');
        var midpoint = span / 2;
        var halfLength = elements * elementLength / 2;
        var dxElement = span / elements;
        var dyElement = Math.sqrt(halfLength * halfLength - midpoint * midpoint) / elements;
        var x0 = 0;
        var y0 = 0;
        for (var i = 0; i < elements / 2; ++i) {
            var x1 = x0 + dxElement;
            var y1 = y0 + dyElement;
            var e = new CatenaryElement(x0, y0, x1, y1);
            _this.elements.push(e);
            x0 = x1;
            y0 = y1;
        }
        for (var i = elements / 2 - 1; i >= 0; --i) {
            var c_1 = _this.elements[i];
            var e = new CatenaryElement(span - c_1.x1, c_1.y1, span - c_1.x0, c_1.y0);
            _this.elements.push(e);
        }
        console.log(_this.elements);
        return _this;
    }
    return Catenary;
}(Model));
var CatenaryElement = /** @class */ (function () {
    function CatenaryElement(x0, y0, x1, y1) {
        this.x0 = x0;
        this.y0 = y0;
        this.x1 = x1;
        this.y1 = y1;
    }
    return CatenaryElement;
}());
var CatenaryView = /** @class */ (function () {
    function CatenaryView(model) {
        this.model = model;
        var canvas = document.getElementById("myCanvas");
        canvas.width = this.w = window.innerWidth * 0.8;
        canvas.height = this.h = window.innerHeight * 0.8;
        this.ctx = canvas.getContext("2d");
        this.ctx.translate((this.w - model.span) / 2, 100);
    }
    CatenaryView.prototype.draw = function () {
        var ctx = this.ctx;
        ctx.fillStyle = '#eee';
        ctx.fillRect(0, 0, this.w, this.h);
        ctx.beginPath();
        ctx.strokeStyle = '#222';
        ctx.moveTo(this.model.elements[0].x0, this.model.elements[0].y0);
        for (var _i = 0, _a = this.model.elements; _i < _a.length; _i++) {
            var e = _a[_i];
            ctx.lineTo(e.x1, e.y1);
        }
        ctx.stroke();
    };
    return CatenaryView;
}());
var c = new Catenary(10, 500, 100);
var v = new CatenaryView(c);
v.draw();
