scene("win", ({score}) => {
    add([
        text(`CONGRATULATIONS, YOU WIN!\n\nYOUR FINAL SCORE WAS ${score}`, {
        size: 32,
        width: width(),
        font: "breakout"
        }),
        pos(width()/2, height()/2),
        ]);
    
    add([
        text(`PRESS SPACE TO RESTART`, {
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