// import kaboom lib
import K from './kaboom.js'

//background 
layers(['bg','obj','ui'], 'obj');
loadSprite('background', 'sprites/background1.png')
add([
    sprite('background'),
    pos(width()/2 , height()/2 ),
    origin("center"),
    layer('bg'),
    scale(1),
    {
        width:width(),
        height: height()
    }
])

//spaceship sprite
loadSprite('spaceship', 'sprites/spaceship.png')
const spaceShip =  add([
    sprite('spaceship'),
    scale(0.25),
    pos(width()/2, height()-150),
    layer('obj'),
    origin('center')
])


//spaceship movements
const speed = 400;
keyDown('right', () =>{
    
    if(spaceShip.pos.x < width()-140){
        // spaceShip.pos.x = width()-30;
        spaceShip.move(speed, 0)
    }
})

keyDown('left', () =>{
    spaceShip.move(-speed, 0)
    if(spaceShip.pos.x<0){
        spaceShip.pos.x =0;
    }
})

const BULLET_SPEED = 1200
function spawnBullet(p) {
    add([
        rect(12, 38),
        area(),
        pos(p),
        origin("center"),
        color(127, 127, 255),
        outline(4),
        move(UP, BULLET_SPEED),
        cleanup(),
        layer('obj'),
        // strings here means a tag
        "bullet",
    ])
}

onKeyPress("space", () => {
    spawnBullet(spaceShip.pos.sub(0,50))
})






