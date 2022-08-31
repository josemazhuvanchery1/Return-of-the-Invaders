// import kaboom lib
import K from './kaboom.js'

onKeyPress("f", (c) => {
    fullscreen(!isFullscreen())
})

//Sprites
loadSprite('space-invader', 'sprites/space-invader.png')
loadSprite('background', 'sprites/background1.png')
loadSprite('spaceship', 'sprites/spaceship.png')
loadSprite('wall', 'sprites/wall.png')

//background 
layers(['bg','obj','ui'], 'obj');

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
const spaceShip =  add([
    {
        width:30,
        height:30
    },
    sprite('spaceship'),
    scale(.25),
    pos(width()/2, height()-150),
    layer('obj'),
    origin('center'),
    area(),
    solid(),
    'player'
])

//spaceship movements
const speed = 600;
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

//bullet component
const bulletSpeed = 1200
function spawnBullet(p) {
    add([
        rect(12, 28),
        area(),
        pos(p),
        origin("center"),
        color(255,55, 6),
        outline(4),
        move(UP, bulletSpeed),
        cleanup(),
        layer('obj'),
        // strings here means a tag
        "bullet",
    ])
}

//shooting for player at player x,y
onKeyPress("space", () => {
    spawnBullet(spaceShip.pos.add(0,-25))
})

//enemy component
addLevel([
    ' !^^^^^^^^^^     &',
    ' !^^^^^^^^^^     &',
    ' !^^^^^^^^^^     &',
    ' !               &',
    ' !               &',
    ' !               &',
    ' !               &',
    ' !               &',
    ' !               &',
    ' !               &',
    ' !               &',
   
], {
    width: 80,
    height: 50,
    '^': () => [
        sprite('space-invader'),
        layer('obj'),
        scale(0.15),
        pos(0,50),
        'space-invaders',
        area()
    ],
    // '!': () => [{width:10, height:1},'leftWall', area()],  //might need to add a sprite for the walls to adjust for differnt scren sizes for collision
    // '&': () => [{width:10, height:1},'rightWall', area()]
    '!': () => [sprite('wall'), layer('obj'), scale(0.2), 'leftWall', area()],
    '&': () => [sprite('wall'), layer('obj'), scale(0.2), 'rightWall', area()]
})



onCollide('bullet','space-invaders', (b,s) =>{
    shake(6),
    destroy(b),
    destroy(s),
    score.value++
    score.text = score.value;
})

const score = add([
    text('0'),
    pos(50,10),
    layer('ui'),
    {
        value: 0,
    }
])

const timeLeft = 25
const timer = add([
    text('0'),
    pos(width()-300,10),
    layer('ui'),
    {
        time: timeLeft
    },
])

timer.action(() => {
    timer.time -= dt(),
    timer.text = timer.time.toFixed(2)
    if(timer.time <= 0){
        go('lose_scene', {score:score.value})
    }
})

const invaderSpeed = 400;
let currSpeed = invaderSpeed;
const moveDown = 900
action('space-invaders', (s) => {
    s.move(currSpeed, 0)
    
})

collides('space-invaders', 'rightWall', () =>{
    currSpeed = -invaderSpeed;
    every('space-invaders', (s) =>{
        s.move(0,moveDown)
    })
})

collides('space-invaders', 'leftWall', () =>{
    currSpeed = invaderSpeed;
    every('space-invaders', (s) =>{
        s.move(0,moveDown)
    })
})

// spaceShip.overlaps('space-invaders', () => {
//     go('lose_scene', {score: score.value})
// })
onCollide("player", "space-invaders", (p) => {
    destroy(p)
    go('lose_scene', {score: score.value})
})
// action('space-invaders', (s) =>{
//     if(s.pos.y >= height()){
//         go('lose_scene', {score: score.value})
//     }
// })