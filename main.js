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
loadSprite('wallBarrier', 'sprites/brick.png')
loadSprite('pBullet', 'sprites/playerBullet.png')
loadSprite('enemyLayer1', 'sprites/enLayer1.png')
loadSprite('Boss', 'sprites/mAlien.png')
loadSprite('bossBullet', 'sprites/bossBullet.png')
loadSprite('asteroid','sprites/asteroid.png')
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

function spawnbossBullet(p) {
    add([
        //rect(12, 20),
        sprite('bossBullet'),
        scale(.15),
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

// loop(4, () => {
//     every("boss", (e) => {
//       add([
//         pos(e.pos.add(50, 80)),
//         move(DOWN, speed),
//         rect(12, 48),
//         area(),
//         outline(4),
//         cleanup(),
//         origin("center"),
//         color(225, 127, 0),
//         "eBullet",
//       ]);
//     });
//   });

const spaceInvader = () => [
    sprite('space-invader'),
    layer('obj'),
    scale(0.15),
    pos(100, 0),
    'space-invaders',
    area(),
    spawnEnemyBullet(spaceInvader.pos.x)
]

const bossInvader = () => [
    sprite('Boss'),
    layer('obj'),
    scale(0.15),
    pos(100, 0),
    'boss',
    area(),
    spawnbossBullet(bossInvader.pos.x)
]




onKeyPress("space", () => {
    spawnBullet(spaceShip.pos.add(0, -25))
})


//enemy component
addLevel([
    ' !$$$$$$$$$$    &',
    ' !^^^^^^^^^^    &',
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
        scale(0.15),
        pos(0, 20),
        'space-invaders',
        area(),
    ],
    '$': () => [
        sprite('Boss'),scale(0.15),
                pos(0, 0),
                layer('obj'),
                'boss',
                area(),
                
    ],
      
    '!': () => [sprite('wall'), layer('obj'), scale(0.2), 'leftWall', area()],
    '&': () => [sprite('wall'), layer('obj'), scale(0.2), 'rightWall', area()],
    '*': () => [sprite('asteroid'), {width:1, height:30}, layer('obj'), scale(.4), 'barrier', area(), health(3)],
     
})
let count = 0
onCollide('bullet', 'barrier', (bu,ba) => {
    count++;
    destroy(bu)
    if(count ==5){
        destroy(ba)
        count = 0
    }
})

onCollide('enemyBullet', 'barrier', (bu,ba) => {
    count++;
    destroy(bu)
    if(count ===5){
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
//let bosslife = 0;
onCollide('bullet', 'boss', (b, bo) => {
    shake(6),
    destroy(b),
        destroy(bo),
        score.value++
        score.text = score.value;
})

onCollide('enemyBullet', 'player', (eB, p) => {
    destroy(p)
    go('lose_scene', { score: score.value })
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
        go('lose_scene', { score: score.value })
    }
})

const invaderSpeed = 400;
let currSpeed = invaderSpeed;
const moveDown = 400
action('space-invaders',  (s) => {
    s.move(currSpeed, 0)
})

action('boss', (s) => {
    s.move(currSpeed, 0)
})

action('space-invaders', (s) => {
    if(rand(100) > 99.85) spawnEnemyBullet(s.pos.add(0, 100))
})

action('boss', (s) => {
    if(rand(100) > 99.85) spawnbossBullet(s.pos.add(0, 100))
})

collides('space-invaders', 'rightWall', () => {
    currSpeed = -invaderSpeed;
    every('space-invaders', (s) => {
        s.move(0, moveDown)
    })
})

// collides('boss', 'rightWall', () => {
//     currSpeed = -invaderSpeed;
//     every('boss', (s) => {
//         s.move(0, moveDown)
//     })
// })

collides('space-invaders', 'leftWall', () => {
    currSpeed = invaderSpeed;
    every('space-invaders', (s) => {
        s.move(0, moveDown)
    })
})

// onCollide('boss', 'leftWall', () => {
//     currSpeed = invaderSpeed;
//     every('boss', (s) => {
//         s.move(0, moveDown)
//     })
// })

// spaceShip.overlaps('space-invaders', () => {
//     go('lose_scene', {score: score.value})
// })
onCollide("player", "space-invaders", (p) => {
    destroy(p)
    go('lose_scene', { score: score.value })
})
// action('space-invaders', (s) =>{
//     if(s.pos.y >= height()){
//         go('lose_scene', {score: score.value})
//     }
// })