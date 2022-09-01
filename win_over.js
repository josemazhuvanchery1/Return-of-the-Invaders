loadSprite('background', 'sprites/background1.png')
loadSprite("winner","stripes-CC/highscore2.png");
scene("win", () => {
    add([
        sprite('background'),
        pos(width()/2 , height()/2 ),
        origin("center"),
        layer('bg'),
        scale(1),
    ])
    const winner = add([
		sprite("winner"),
		pos(width() /2, height() /2),
		scale(10),
		rotate(0),
		origin("center"),
	]);
    winner.action(() => {
		winner.scale = Math.sin(time()) * 3;
		winner.angle += dt();
	});
    const t = (n = 1) => time() * n
    const px = 160
    const py = 200

    const w = (a, b, n) => wave(a, b, t(n))
    onDraw(() => {

    const mx = (width() - px * 2) / 2
    const my = (height() - py * 2) / 1
    const p = (x, y) => vec2(x, y).scale(mx, my).add(px, py)

    
    drawText({
        text: "YOU WON!",
        pos: p(1, 1.2),
        origin: "center",
        size: w(80, 120, 2),
        color: rgb(w(128, 255, 4), w(128, 255, 8), w(128, 255, 2)),
    })
})

    add([
        text(`CONGRATULATIONS!!!, YOU WIN!\n\n   YOUR FINAL SCORE WAS 40!`, {
        size: 64,
        width: width(),
        }),
        pos(12),
        ]);
    
    add([
        text(`PRESS ENTER TO RESTART`, {
        size: 32,
        width: width(),
        }),
    pos(width()/2, height()*(3/4)),
    ]);
    
    onKeyPress('enter',() => {
        go('game')
    })
    });