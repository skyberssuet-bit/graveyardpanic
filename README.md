# Graveyard Panic

hey! this is my halloween game for Ghost Ship by Hack Club. i made it with p5.js. it's a clicking game set in a creepy graveyard at night.

## how to play

- click anywhere to start
- click the **ghosts** before they teleport away (+1 point)
- click the **pumpkins** when they show up for bonus points (+3 points)
- DON'T click the **bats** (-2 points, ouch)
- you have **30 seconds**. get as many points as you can!

## stuff i added

the guide gave us the basic Ghost Hunt game, so i added some of my own things on top:

- **gets harder over time**: the ghost jumps around faster and faster the longer you play (i used `lerp()` for this)
- **pumpkin bonus**: sometimes a pumpkin pops up and is worth 3 points
- **bat that bounces**: it flies around the whole screen and you gotta avoid it
- **particle burst**: little dots fly out when you click something
- **fading ghost**: it fades in and out using `sin()` and wobbles a little like it's shivering
- **graveyard scene**: moon with craters, stars, tombstones, and some fog
- **ranks at the end**: your score gets a rank, and 30+ is "LEGENDARY GHOSTBUSTER"

## how to run it

**easy way:** go to [editor.p5js.org](https://editor.p5js.org/), paste everything from `sketch.js` into the editor, and hit the play button.

**other way:** put `index.html` and `sketch.js` in the same folder and open `index.html` in your browser.

## files

- `sketch.js`: all the game code
- `index.html`: loads p5.js and runs the game

## stuff i learned

- how `setup()` and `draw()` work (draw runs like 60 times a second which is crazy)
- using a `state` variable to switch between the start screen, the game, and game over
- making shapes into functions like `drawGhost(x, y)` so i can draw them anywhere
- how to use `splice()` to remove particles after they fade out

## things i might add later

- sound effects (a "boo!" would be funny)
- more levels that get harder
- more creatures like skeletons
