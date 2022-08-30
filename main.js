// import kaboom lib
import K from './kaboom.js'

loadSprite('background', 'sprites/background1.png')
add([
    sprite('background'),
    pos(width()/2 , height()/2 ),
    origin("center"),
    scale(1)
])

loadSprite('spaceship', 'sprites/spaceship.png')
const spaceShip =  add([
    sprite('spaceship'),
    scale(0.25),
    pos(width()/2, height()-200)
])

const speed = 400;
keyDown('right', () =>{
    spaceShip.move(speed, 0)
})
keyDown('left', () =>{
    spaceShip.move(-speed, 0)
})
