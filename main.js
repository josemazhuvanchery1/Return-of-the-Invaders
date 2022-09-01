// import kaboom lib
import K from './kaboom.js'

//Sprites
loadSprite('space-invader', 'sprites/space-invader.png')
loadSprite('red-space-invader', 'sprites/red-space-invader.png')
loadSprite('background', 'sprites/background1.png')
loadSprite('spaceship', 'sprites/spaceship.png')
loadSprite('wall', 'sprites/wall.png')
loadSprite('wallBarrier', 'sprites/brick.png')
loadSprite('pBullet', 'sprites/playerBullet.png')
loadSprite('enemyLayer1', 'sprites/enLayer1.png')
loadSprite('red-laser-fixed', 'sprites/red-laser-fixed.png')

loadSound('shooting','stripes-CC/shootingSound.wav')

scene('game', () =>{

onKeyPress("f", (c) => {
    fullscreen(!isFullscreen())
})


//background 
layers(['bg', 'obj', 'ui'], 'obj');


add([
    sprite('background'),
    pos(width() / 2, height() / 2),
    origin("center"),
    layer('bg'),
    scale(1),
    {
        width: width(),
        height: height()
    }
])

//spaceship sprite

const spaceShip = add([
    {
        width: 20,
        height: 20
    },
    sprite('spaceship'),
    scale(.20),
    pos(width() / 2, height() - 80),
    layer('obj'),
    origin('center'),
    area(),
    solid(),
    'player'
])


//spaceship movements
const speed = 600;
keyDown('right', () => {

    if (spaceShip.pos.x < width() - 140) {
        // spaceShip.pos.x = width()-30;
        spaceShip.move(speed, 0)
    }
})

keyDown('left', () => {
    spaceShip.move(-speed, 0)
    if (spaceShip.pos.x < 0) {
        spaceShip.pos.x = 0;
    }
})

//bullet component
const bulletSpeed = 1200
function spawnBullet(p) {
    add([
        //rect(12, 28),
        sprite('pBullet'),
        area(),
        pos(p),
        origin("center"),
        //color(221, 160, 221),
        //outline(4),
        scale(.3),
        move(UP, bulletSpeed),
        cleanup(),
        layer('obj'),
        // strings here means a tag
        "bullet",
    ])
}

function spawnEnemyBullet(p) {
    add([
        //rect(12, 20),
        sprite('enemyLayer1'),
        scale(.4),
        area(),
        pos(p),
        origin("center"),
        //color(255, 55, 6),
        //outline(4),
        move(DOWN, 500),
        cleanup(),
        layer('obj'),
        // strings here means a tag
        "enemyBullet",
    ])
}

function spawnRedEnemyBullet(p) {
    add([
        //rect(12, 20),
        sprite('red-laser-fixed'),
        scale(.4),
        area(),
        pos(p),
        origin("center"),
        //color(255, 55, 6),
        //outline(4),
        move(DOWN, 500),
        cleanup(),
        layer('obj'),
        // strings here means a tag
        "enemyBullet",
    ])
}

//shooting for player at player x,y
// onKeyPress('k', (s) => {
//     spawnEnemyBullet(s.pos.add(s.pos.x, s.pos.y))
// })



onKeyPress("space", () => {

    spawnBullet(spaceShip.pos.sub(0,50))
    let music1 = play('shooting', {
        volume: 5, 
    })
    spawnBullet(spaceShip.pos.add(0, -25))
})

   



//enemy component
addLevel([
    ' !$$$$$$$$$$    &',
    ' !rrrrrrrrrr    &',
    ' !^^^^^^^^^^    &',
    ' !^^^^^^^^^^    &',
    ' !              &',
    ' !              &',
    ' !              &',
    ' !              &',
    ' !              &',
    ' !              &',
    ' !  ***    ***  &',
    ' ! ** **  ** ** &',
    ' !              &',

], {
    width: 90,
    height: 40,
    '^': () => [
        sprite('space-invader'),
        layer('obj'),
        scale(0.10),
        pos(0, 0),
        'space-invaders',
        area(),
    ],
    'r': () => [
        sprite('red-space-invader'),
        layer('obj'),
        scale(0.1),
        pos(0, 0),
        'red-space-invaders',
        area(),
    ],
    // '!': () => [{width:10, height:1},'leftWall', area()],  //might need to add a sprite for the walls to adjust for differnt scren sizes for collision
    // '&': () => [{width:10, height:1},'rightWall', area()]
    '!': () => [sprite('wall'), layer('obj'), scale(0.2), 'leftWall', area()],
    '&': () => [sprite('wall'), layer('obj'), scale(0.2), 'rightWall', area()],
    '*': () => [sprite('wallBarrier'), { width: 1, height: 30 }, layer('obj'), scale(2), 'barrier', area(), health(3)]

})
let count = 0
onCollide('bullet', 'barrier', (bu, ba) => {
    count++;
    destroy(bu)
    if (count == 5) {
        destroy(ba)
        count = 0
    }
})

onCollide('enemyBullet', 'barrier', (bu, ba) => {
    count++;
    destroy(bu)
    if (count === 5) {
        destroy(ba)
        count = 0
    }
})


onCollide('bullet', 'space-invaders', (b, s) => {
    shake(6),
        destroy(b),
        destroy(s),
        score.value++
    score.text = score.value;
})

onCollide('bullet', 'red-space-invaders', (b, r) => {
    shake(6),
        destroy(b),
        destroy(r),
        score.value++
    score.text = score.value;
})

onCollide('enemyBullet', 'player', (eB, p) => {
    destroy(p)
    go('lose', { score: score.value })
})

const score = add([
    text('0'),
    pos(50, 10),
    layer('ui'),
    {
    value: 0,
    }
])

const timeLeft = 25
const timer = add([
    text('0'),
    pos(width() - 300, 10),
    layer('ui'),
    {
        time: timeLeft
    },
])

timer.action(() => {
    timer.time -= dt(),
        timer.text = timer.time.toFixed(2)
    if (timer.time <= 0) {
        go('lose', { score: score.value })
    }
})

const invaderSpeed = 400;
let currSpeed = invaderSpeed;
const moveDown = 450

let curRedSpeed = 400;
let redCount = 1;

action('space-invaders', (s) => {
    s.move(currSpeed, 0)
})


action('red-space-invaders', (r) => {
    r.move(curRedSpeed, 0)
})

collides('red-space-invaders', 'rightWall', () => {
    if (redCount === 1) {
        curRedSpeed *= -1;
        every('red-space-invaders', (r) => {
            r.move(0, 1400)
        })
        redCount = 2;
    }
})

collides('red-space-invaders', 'leftWall', () => {
    if (redCount === 2) {
        curRedSpeed *= -1;
        every('red-space-invaders', (r) => {
            r.move(0, 1400)
        })
        redCount = 1;
    }
})


action('space-invaders', (s) => {
    if (rand(100) > 99.85) spawnEnemyBullet(s.pos.add(0, 100))
})

action('red-space-invaders', (r) => {
    if (rand(100) > 99.85) spawnRedEnemyBullet(r.pos.add(0, 30))
})

// Player and left wall collision 
collides('player', 'leftWall', (p) => {
    shake(1);
    p.move(speed, 0)
})

// Player and right wall collison
collides('player', 'rightWall', (p) => {
    shake(1);
    p.move(-speed, 0)
})

collides('space-invaders', 'rightWall', () => {
    currSpeed = -invaderSpeed;
    every('space-invaders', (s) => {
        s.move(0, moveDown)
    })
})

collides('space-invaders', 'leftWall', () => {
    currSpeed = invaderSpeed;
    every('space-invaders', (s) => {
        s.move(0, moveDown)
    })
})

onCollide("player", "space-invaders", (p) => {
    destroy(p)
    go('lose_scene', { score: score.value })
})
})
