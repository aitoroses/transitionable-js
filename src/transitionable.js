"use strict";
var DELTA_VALUE = 0.0001;
var DEFAULT_PHYSICS = { stiffness: 90, damping: 8 };
function createContext(value, p) {
    return {
        target: value,
        curr: value,
        p: p,
        v: 0,
        a: 0,
        m: 1,
        t0: null
    };
}
function Transitionable(value, params) {
    if (value === void 0) { value = 0; }
    if (params === void 0) { params = DEFAULT_PHYSICS; }
    var ctx = createContext(value, params || {
        stiffness: DEFAULT_PHYSICS.stiffness,
        damping: DEFAULT_PHYSICS.stiffness
    });
    var subscribers = [];
    var animationFrame;
    function notify() {
        subscribers.forEach(function (fn) { return fn(ctx.curr); });
    }
    function applyPhysics() {
        var t1 = (new Date).getTime();
        var timeDelta = (t1 - ctx.t0) / 1000;
        var spring = -params.stiffness * (ctx.curr - ctx.target);
        var damper = -params.damping * ctx.v;
        ctx.a = (spring + damper) / ctx.m;
        ctx.v += ctx.a * timeDelta;
        ctx.curr += ctx.v * timeDelta;
        notify();
        ctx.t0 = t1;
        animate();
    }
    function animate() {
        if (Math.abs(ctx.curr - ctx.target) <= DELTA_VALUE) {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
                animationFrame = undefined;
                ctx = createContext(ctx.target, ctx.p);
                notify();
            }
        }
        else {
            if (!animationFrame) {
                ctx.t0 = (new Date).getTime();
            }
            animationFrame = requestAnimationFrame(applyPhysics);
        }
    }
    animate();
    var TransitionableValue = (function () {
        function TransitionableValue() {
        }
        Object.defineProperty(TransitionableValue.prototype, "value", {
            get: function () {
                return ctx.target;
            },
            set: function (x) {
                ctx.target = x;
                if (!animationFrame)
                    animate();
            },
            enumerable: true,
            configurable: true
        });
        TransitionableValue.prototype.setParams = function (p) {
            ctx.p = p || DEFAULT_PHYSICS;
        };
        TransitionableValue.prototype.map = function (fn) {
            subscribers.push(fn);
            notify();
            return this;
        };
        return TransitionableValue;
    }());
    return new TransitionableValue();
}
exports.Transitionable = Transitionable;
