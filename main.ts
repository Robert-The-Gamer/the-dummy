namespace SpriteKind {
    export const Tips = SpriteKind.create()
    export const Coin = SpriteKind.create()
    export const Heart = SpriteKind.create()
}
function StartLevel () {
    Mario = sprites.create(img`
        . . . . f f f f f f f f . . . . 
        . . . . f f 1 1 1 1 f f . . . . 
        . . . . f f f 1 1 f f f . . . . 
        . . . . f f 1 1 1 1 f f . . . . 
        . . . . f f 1 1 1 1 f f . . . . 
        . . f f f f f f f f f f f f . . 
        . . f f 1 1 1 1 1 1 1 1 f f . . 
        . . f f 1 1 1 1 1 1 1 1 f f . . 
        . . f f 1 1 1 1 1 1 1 1 f f . . 
        . . f f 1 1 1 1 1 1 1 1 f f . . 
        . . f f 1 1 1 1 1 1 1 1 f f . . 
        . f f f 1 f f f f f f 1 1 f f . 
        . f f f 1 f . . . . f 1 1 f f . 
        f f f 1 f f . . . . f f 1 f f f 
        f f 1 1 f . . . . . . f 1 1 f f 
        f f f f f . . . . . . f f f f f 
        `, SpriteKind.Player)
    controller.moveSprite(Mario, 100, 0)
    Mario.setPosition(10, 180)
    Mario.ay = 150
    scene.setBackgroundColor(9)
    if (Level == 1) {
        tiles.setCurrentTilemap(tilemap`level1`)
    } else if (false) {
    	
    }
    scene.cameraFollowSprite(Mario)
    for (let value of tiles.getTilesByType(assets.tile`myTile`)) {
        Coin = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . f f f f f f f . . . . . 
            . . . f 5 5 5 5 5 5 5 f . . . . 
            . . f 5 5 f 5 5 5 5 5 5 f . . . 
            . . f 5 f 5 5 5 f 5 5 5 f . . . 
            . . f 5 f 5 5 5 5 5 5 5 f . . . 
            . . f 5 f 5 5 5 5 5 5 5 f . . . 
            . . f 5 f 5 5 5 5 5 5 5 f . . . 
            . . f 5 f 5 5 5 f 5 5 5 f . . . 
            . . f 5 5 f 5 5 5 5 5 5 f . . . 
            . . . f 5 5 5 5 5 5 5 f . . . . 
            . . . . f f f f f f f . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Coin)
        tiles.placeOnTile(Coin, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile0`)) {
        Coin = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . f f f f f f . . . f f . . . 
            . f f 2 2 2 2 f f f f 2 f f . . 
            . f 2 2 2 2 2 f f 2 2 2 2 f . . 
            . f 2 2 2 2 2 2 2 2 2 2 2 f . . 
            f 2 2 2 2 2 2 2 2 2 2 2 2 f . . 
            . f 2 2 2 2 2 2 2 2 2 2 2 f . . 
            . f 2 2 2 2 2 2 2 2 2 2 2 f . . 
            . f f 2 2 2 2 2 2 2 2 2 2 f . . 
            . . f 2 2 2 2 2 2 2 2 2 2 f . . 
            . . . f 2 2 2 2 2 2 2 2 f f . . 
            . . . f f 2 2 2 2 2 2 2 f . . . 
            . . . . f 2 2 2 2 2 2 f . . . . 
            . . . . f f 2 2 2 2 f f . . . . 
            . . . . . f f 2 2 f f . . . . . 
            . . . . . . . f f f . . . . . . 
            `, SpriteKind.Heart)
        tiles.placeOnTile(Coin, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
    }
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`Spike`, function (sprite, location) {
    if (Level == 1) {
        if (info.life() > 0) {
            music.powerDown.play()
            Mario.setPosition(10, 180)
            info.changeLifeBy(-1)
        } else {
            music.powerDown.play()
            game.over(false, effects.slash)
        }
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Coin, function (sprite, otherSprite) {
    music.baDing.play()
    info.changeScoreBy(1)
    otherSprite.destroy()
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Mario.vy == 0) {
        Mario.vy += -100
        music.jumpUp.play()
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Heart, function (sprite, otherSprite) {
    music.magicWand.play()
    info.changeLifeBy(1)
    otherSprite.destroy()
})
controller.combos.attachCombo("lllluAuBrdrd", function () {
    info.setLife(10)
    music.magicWand.play()
    mySprite = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 1 f 1 1 1 1 1 f 1 1 1 1 1 1 1 
        1 1 f 1 1 1 f 1 1 1 1 f 1 1 1 1 
        1 1 f 1 1 1 1 1 1 1 1 f 1 1 1 1 
        1 1 f 1 1 1 1 1 1 1 1 f 1 1 1 1 
        1 1 f 1 1 1 1 1 1 1 1 f 1 1 1 1 
        1 1 f 1 1 1 1 1 1 1 1 f 1 1 1 1 
        1 1 f 1 1 1 1 1 1 1 1 1 f 1 1 1 
        1 1 f 1 1 1 1 1 1 1 1 1 f 1 1 1 
        1 1 f 1 1 1 1 1 1 1 1 1 f 1 1 1 
        1 1 f 1 1 1 1 1 1 1 1 1 f 1 1 1 
        1 1 f 1 1 1 1 1 1 1 1 f 1 1 1 1 
        1 1 f f f f f f f f f f 1 1 1 1 
        `, SpriteKind.Player)
    mySprite.setStayInScreen(true)
})
controller.combos.attachCombo("lABur", function () {
    info.setLife(1)
    music.siren.play()
})
let mySprite: Sprite = null
let Coin: Sprite = null
let Mario: Sprite = null
let Level = 0
info.setLife(3)
info.setScore(0)
Level = 1
StartLevel()
forever(function () {
    if (Level == 1) {
        music.playMelody("C E C D C G C5 B ", 300)
    } else if (false) {
    	
    }
})
