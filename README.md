# Dim Light 🔥
> _"Kill bugs. Survive the night."_

**Dim light** is a survival game made on **HTML5 Canvas**. 
The player goal is to kill as many bugs as possible and remaining alive.

![dim-light-character clone](https://user-images.githubusercontent.com/13164624/55621288-648db000-579d-11e9-9932-04f770a289c8.gif)

# Controls and game mechanics
Player moves with keys A, W, S, D and points its gun by moving the mouse and shoots by clicking on canvas.

The goal of the player is to survive multiple enemies attacking from outside of the canvas by keeping its torch lighted up, enemies may drop little flames that can be picked up by the player to bright up the scene. 

When enemies attack the player, screen gets darker so enemies are also harder to see.

![dim-lights-blackout-scren](https://user-images.githubusercontent.com/13164624/55622569-dd423b80-57a0-11e9-8d28-97ec5ab22ec0.gif)


Game ends when player's torch dies or player kills all enemies.

![dim-lights-game-over-screen](https://user-images.githubusercontent.com/13164624/55621960-3f9a3c80-579f-11e9-80fc-bbc308a57802.png)

# Cool bits of the code
The game uses **vectors** to rotate the player to mouse position in canvas and get the next position of enemies and bullets.

![dim-lights-vector-code](https://user-images.githubusercontent.com/13164624/55620373-0d86db80-579b-11e9-806c-e16198a96acc.png)

In order to make the enemies move towards the player, player's position is passed to enemies in every frame.

![dim-lights-enemy-update-player-pos-code](https://user-images.githubusercontent.com/13164624/55620521-60609300-579b-11e9-823e-fc96739d6e0d.png)

Bullets move uniformly to mouse position 🔫

![dim-lights-shooting-screen](https://user-images.githubusercontent.com/13164624/55620833-39ef2780-579c-11e9-9bd6-cf9b1ae7ad47.png)


# What's next?
**Cool retro games need bosses**, it would be nice if player had to fight a big fat bug at the end of the game.
Also could be more interesting if the player could **move relative to the mouse position** instead of moving relative to the canvas.

Another cool possible feature could be **power ups** or **new guns**.


# Play the game
[Go!](https://fcovacarh.github.io/dim-light-canvas-game/)
