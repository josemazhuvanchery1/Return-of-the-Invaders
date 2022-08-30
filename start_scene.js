
loadSprite('page1background', 'sprites/space-invaders-feature.png')
scene('start_page', () => {
    add([
        sprite('page1background'),
        pos(width()/2, height()/2 ),
        origin("center"),
        scale(1),
        fixed()
    ])
    onKeyPress('space',() => {
        go('game')
    })
})
go('start_page')


