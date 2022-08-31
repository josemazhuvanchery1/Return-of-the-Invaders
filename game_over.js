
scene("lose", ({score}) => {
    add([
        text(`GAME OVER\n\nYOUR FINAL SCORE WAS ${score}`, {
        size: 32,
        width: width(),
        font: "breakout"
    }),
     pos(12),
    ]);
    12
     add([
        text(`PRESS ANY SPACE TO RESTART`, {
        size: 16,
        width: width(),
        font: "breakout"
    }),
        pos(width()/2, height()*(3/4)),
    ]);
    onKeyPress('space',() => {
        go('game')
    })
    });

