
loadSprite('page1background', 'sprites/space-invaders-feature.png')
scene('start_page', () => {
    add([
        sprite('page1background'),
        pos(width()/2, height()/2),
        origin("center"),
        scale(1.2),
        fixed(),
    ]) 
})
    // onKeyPress('space',() => {
    //     go('game')
    // })
//  add([
//         text(`WELCOME TO RETURN OF SPACE INVADERS: press space to continue`, {
//         size: 42,
//         width: width(),
//     }),
//      pos(30),
//     ]);
//     onKeyPress('space',() => {
//         go('game')
//     })


