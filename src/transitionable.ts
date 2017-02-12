type Params = {
    stiffness: number,
    damping: number
}

const DELTA_VALUE = 0.0001
const DEFAULT_PHYSICS: Params = { stiffness: 90, damping: 8 }

function createContext(value: number, p: Params) {
    return {
        target: value, // Target Value
        curr: value,   // Current Value
        p,             // Physics Params
        v: 0,          // Velocity
        a: 0,          // Acceleration
        m: 1,          // Mass
        t0: 0
    }
}

export function Transitionable(
    value: number = 0,
    params: Params = DEFAULT_PHYSICS,
) {

    // Variables

    let ctx = createContext(value, params || {
        stiffness: DEFAULT_PHYSICS.stiffness,
        damping: DEFAULT_PHYSICS.stiffness
    })

    let subscribers: any[] = []
    let animationFrame

    function notify() {
        // Call the subscribers
        subscribers.forEach(fn => fn(ctx.curr))
    }


    // Internal computation

    function applyPhysics() {
        let t1 = (new Date).getTime()
        let timeDelta = (t1 - ctx.t0) / 1000 // seconds

        const spring = -params.stiffness * (ctx.curr - ctx.target)
        const damper = -params.damping * ctx.v

        // update acceleration
        ctx.a = ( spring + damper ) / ctx.m
        // update velocity
        ctx.v += ctx.a * timeDelta
        // update position
        ctx.curr += ctx.v * timeDelta

        notify()

        ctx.t0 = t1
        animate() // IO
    }

    function animate() {
        if ( Math.abs(ctx.curr - ctx.target) <= DELTA_VALUE ) {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame)
                animationFrame = undefined
                ctx = createContext(ctx.target, ctx.p)
                notify()
            }

        } else {

            animationFrame = requestAnimationFrame(applyPhysics)
        }
    }


    animate() // IO

    // Transitionable public API

    class TransitionableValue {

        get value() {
            return ctx.target
        }

        set value(x: number) {
            if (!ctx.t0) ctx.t0 = (new Date).getTime()
            ctx.target = x
            animate()
        }

        setParams(p: Params) {
            ctx.p = p || DEFAULT_PHYSICS
        }

        map(fn: (x: number) => any) {
            subscribers.push(fn)
            notify()
            return this
        }


    }

    return new TransitionableValue()
}
