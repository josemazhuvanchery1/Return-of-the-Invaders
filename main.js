// import kaboom lib
import K from './kaboom.js'

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
loadSprite('asteroid', 'sprites/asteroid.png')
loadSprite('reuben', 'sprites/r.png')
loadSprite('maya', 'sprites/m.png')
loadSprite('caston', 'sprites/c.png')
loadSprite('ann', 'sprites/ann.png')
loadSprite('ana', 'sprites/ana.png')
loadSprite('jowel', 'sprites/jow.png')
loadSprite('laura', 'sprites/laura.png')
loadSprite('motun', 'sprites/motun.png')
loadSprite('ben', 'sprites/ben.png')
loadSprite('gon', 'sprites/gon.png')
loadSound('shooting', 'stripes-CC/shootingSound.wav')

scene('game', () => {

    //JS Variables
    const invaderSpeed = 400;
    const moveDown = 450
    const speed = 600;
    const timeLeft = 25
    const bulletSpeed = 1200
    let currSpeed = invaderSpeed;
    let count = 0
    let lives = 1

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
            height: 20,
            can_shoot: true,
            laser_delay: 0.2
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

    //Kaboom JS keyPress
    onKeyPress("f", (c) => {
        fullscreen(!isFullscreen())
    })

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

    onKeyPress("space", () => {
        if (spaceShip.can_shoot) {
            spawnBullet(spaceShip.pos.sub(0, 50))
            let music1 = play('shooting', {
                volume: 5,
            })

            spaceShip.can_shoot = false;

            wait(spaceShip.laser_delay, () => {
                spaceShip.can_shoot = true;
            })
        }
    })

    //Kaboom JS Functions
    function spawnBullet(p) {
        add([
            sprite('pBullet'),
            area(),
            pos(p),
            origin("center"),
            scale(.3),
            move(UP, bulletSpeed),
            cleanup(),
            layer('obj'),
            "bullet",
        ])
    }

    function spawnEnemyBullet(p) {
        add([
            sprite('enemyLayer1'),
            scale(.4),
            area(),
            pos(p),
            origin("center"),
            move(DOWN, 500),
            cleanup(),
            layer('obj'),
            "enemyBullet",
        ])
    }

    function spawnbossBullet(p) {
        add([
            sprite('bossBullet'),
            scale(.15),
            area(),
            pos(p),
            origin("center"),
            move(DOWN, 500),
            cleanup(),
            layer('obj'),
            "enemyBullet",
        ])
    }

    const bossInvader = () => [
        sprite('Boss'),
        layer('obj'),
        scale(0.15),
        pos(100, 0),
        'boss',
        area(),
        spawnbossBullet(bossInvader.pos.x)
    ]

    //Kaboom JS Game Map
    addLevel([
        ' !gljArmcaMb    &',
        ' !^^^^^^^^^^    &',
        ' !^^^^^^^^^^    &',
        ' !^^^^^^^^^^    &',
        ' !              &',
        ' !              &',
        ' !              &',
        ' !              &',
        ' !              &',
        ' !              &',
        ' !  **      **  &',
        ' ! ** **  ** ** &',
        ' !              &',

    ], {
        width: 90,
        height: 40,
        '^': () => [
            sprite('space-invader'),
            layer('obj'),
            scale(0.15),
            pos(0, 0),
            'space-invaders',
            area(),
        ],
        'r': () => [
            sprite('reuben'),
            layer('obj'),
            scale(0.5),
            pos(0, 0),
            'boss',
            area(),
        ],
        'm': () => [
            sprite('maya'),
            layer('obj'),
            scale(0.34),
            pos(0, 0),
            'boss',
            area(),
        ],
        'c': () => [
            sprite('caston'),
            layer('obj'),
            scale(0.22),
            pos(0, 0),
            'boss',
            area(),
        ],
        'A': () => [
            sprite('ann'),
            layer('obj'),
            scale(0.35),
            pos(0, 0),
            'boss',
            area(),
        ],
        'a': () => [
            sprite('ana'),
            layer('obj'),
            scale(0.60),
            pos(0, 0),
            'boss',
            area(),
        ],
        'j': () => [
            sprite('jowel'),
            layer('obj'),
            scale(0.60),
            pos(0, 0),
            'boss',
            area(),
        ],
        'l': () => [
            sprite('laura'),
            layer('obj'),
            scale(0.30),
            pos(0, 0),
            'boss',
            area(),
        ],
        'M': () => [
            sprite('motun'),
            layer('obj'),
            scale(0.80),
            pos(0, 0),
            'boss',
            area(),
        ],
        'b': () => [
            sprite('ben'),
            layer('obj'),
            scale(0.3),
            pos(0, 0),
            'boss',
            area(),
        ],
        'g': () => [
            sprite('gon'), scale(0.30),
            pos(0, 0),
            layer('obj'),
            'boss',
            area(),

        ],
        '!': () => [sprite('wall'), layer('obj'), scale(0.2), 'leftWall', area()],
        '&': () => [sprite('wall'), layer('obj'), scale(0.2), 'rightWall', area()],
        '*': () => [sprite('asteroid'), { width: 1, height: 30 }, layer('obj'), scale(.4), 'barrier', area(), health(3)],


    })

    //Kaboom JS add() for Text to Game Screen
    const score = add([
        text('0'),
        pos(50, 10),
        layer('ui'),
        {
            value: 0,
        }
    ])

    const timer = add([
        text('0'),
        pos(width() - 300, 10),
        layer('ui'),
        {
            time: timeLeft
        },
    ])

    add([
        text(lives),
        pos(1500, 100),
        { update() { this.text = `lives: ${lives}` } },
        onCollide('enemyBullet', 'player', (eB, p) => {
            shake(6),
                lives--
            if (lives === 0) {
                destroy(p)
                go('lose', { score: score.value })
            }
        })
    ])

    //Kaboom JS sprite action()
    timer.action(() => {
        timer.time -= dt(),
            timer.text = timer.time.toFixed(2)
        if (timer.time <= 0) {
            go('lose', { score: score.value })
        }
    })

    action('space-invaders', (s) => {
        s.move(currSpeed, 0)
    })

    action('boss', (s) => {
        s.move(currSpeed, 0);
    })

    action('space-invaders', (s) => {
        if (rand(100) > 99.85) spawnEnemyBullet(s.pos.add(0, 100))
    })

    action('boss', (s) => {
        if (rand(100) > 99.85) spawnbossBullet(s.pos.add(0, 100))
    })

    //Kaboom JS "collides" "onCollides" for sprite and player collisions
    collides('player', 'leftWall', (p) => {
        shake(1);
        p.move(speed, 0)
    })

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

    collides('boss', 'rightWall', () => {
        currSpeed = -invaderSpeed;
    })

    collides('boss', 'leftWall', () => {
        currSpeed = invaderSpeed;
    })

    onCollide("player", "space-invaders", (p) => {
        destroy(p)
        go('lose', { score: score.value })
    })

    onCollide('bullet', 'barrier', (bu, ba) => {
        count++;
        destroy(bu)
        if (count == 4) {
            destroy(ba)
            count = 0
        }
    })

    onCollide('enemyBullet', 'barrier', (bu, ba) => {
        count++;
        destroy(bu)
        if (count === 4) {
            destroy(ba)
            count = 0
        }
    })

    onCollide('bullet', 'space-invaders', (b, s) => {
        shake(5),
            destroy(b),
            destroy(s),
            score.value++
        score.text = score.value;
    })

    onCollide('bullet', 'boss', (b, bo) => {
        shake(5),
            destroy(b),
            destroy(bo),
            score.value++
        score.text = score.value;
    })

    onCollide('enemyBullet', 'player', (eB, p) => {
        destroy(p),
            destroy(eB),
            go('lose', { score: score.value })
    })
})
