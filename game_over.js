
loadSprite("mark","stripes-CC/gameover2.png");
scene("lose", (args) => {
    //general background
    add([
            sprite('background'),
            pos(width()/2 , height()/2 ),
            origin("center"),
            layer('bg'),
            scale(1),
        ])
        const mark = add([
            sprite("mark"),
            pos(width() /2, height() /2),
            scale(10),
            rotate(0),
            origin("center"),
        ]);
        mark.action(() => {
            mark.scale = Math.sin(time()) ;
            mark.angle += dt();
        });
        const t = (n = 1) => time() * n
        const px = 160
        const py = 200
        const w = (a, b, n) => wave(a, b, t(n))
        onDraw(() => {

        const mx = (width() - px * 2) / 2
	    const my = (height() - py * 2) / 1
	    const p = (x, y) => vec2(x, y).scale(mx, my).add(px, py)

        
        // drawText({
        //     text: "GAME OVER",
        //     pos: p(1, 1.1),
        //     origin: "center",
        //     size: w(80, 120, 2),
        //     color: rgb(w(128, 255, 4), w(128, 255, 8), w(128, 255, 2)),
        // })
    })
    add([
        text(`Score: ${args.score}`),
        //origin('center'),
        scale(1),
        pos(90, 200)
    ])
    //adding press space 
     add([
        text(`PRESS ENTER TO RESTART`, {
        size: 32,
        width: width(),
    }),
        pos(width()-500, height()*(3/4)),
    ]);
 onKeyPress('enter',() => {
        go('game');
    })
    });

