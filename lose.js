scene('lose_scene', (args) =>{
    add([
        text(args.score),
        origin('center'),
        scale(1),
        pos(width()/2, height()/2)
    ])
})