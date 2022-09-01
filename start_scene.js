
loadSprite('page1background', 'stripes-CC/spaceinvaders.png')
loadSprite('background', 'sprites/background1.png')
loadSound('song','stripes-CC/song.mp3')
scene('start_page', () => {
    //adding music 
    let music = play('song',{
        volume: 1,
        loop: true 
    })
    add([
        sprite('background'),
        pos(width()/2 , height()/2 ),
        origin("center"),

        layer('bg'),
        scale(1),
    ])
    add([
        sprite('page1background'),
        pos(width()/2, height()/2),
        origin("center"),
        scale(1.12),
        fixed()
    ])
    add([
        text(`WELCOME TO RETURN OF THE SPACE INVADERS: press space to play`, {
        size: 42,
        width: width(),
        }),
         pos(100),
    ]) 
    onKeyPress('space',() => {
        // go('game')
        go('lose')
    })
})
    
go('start_page')
 

