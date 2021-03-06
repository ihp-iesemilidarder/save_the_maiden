export var HERO={
    name:null,
    magic:[],
    weapons:[],
    gems:[],
    skills:{
        attack:0,
        defenser:0,
        speed:0
    }
}
export const ELEMENTSPOINTS={
    magic:{ // +
        lightning:{
            attack:10
        },
        ice:{
            attack:4,
            defenser:3
        },
        fire:{
            attack:8
        },
        wind:{
            defenser:2
        }
    },
    weapons:{
        sword:{
            attack:5,
            speed:1 // the speed substraction in the operation
        },
        shield:{
            defenser:10,
            speed:5
        },
        hatchet:{
            attack:10,
            speed:4
        },
        crossbow:{
            attack:7,
            speed:3
        }
    },
    gems:{ // +
        diamond:{
            lightning:2,
            ice:3,
            fire:5,
            wind:4
        },
        esmerald:{
            lightning:2,
            ice:3,
            fire:5,
            wind:4
        },
        ruby:{
            lightning:3,
            ice:2,
            fire:3,
            wind:2
        },
        sapphire:{
            lightning:2,
            ice:2,
            fire:3,
            wind:4
        }
    }
}