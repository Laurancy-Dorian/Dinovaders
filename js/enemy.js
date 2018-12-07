/**
 * An Ennemy
 * @param {type} x the Coordinate X
 * @param {type} y the coordinate Y
 * @param {type} hp the health of the enemy
 * @param {type} speed its velocity
 * @param {type} w the width
 * @param {type} h the height
 * @param {type} cadency the pace it will shoot
 * @param {type} pts the points it will give to the player if killed
 * @param {type} div the parent div where it's image has to be inserted
 * @param {type} imgsrc the src of its image
 * @returns {Enemy}
 */
function Enemy(x, y, hp, speed, w, h, cadency, pts, div, imgsrc) {
    this.coordX;
    this.coordY;
    this.health;
    this.speed;
    this.width;
    this.height;
    this.pace;
    this.points;
    this.image;
    this.lastShot = 0;
    this.disappear = 20;



    this.init = function () {
        this.coordX = x;
        this.coordY = y;
        this.health = hp;
        this.speed = speed;
        this.width = w;
        this.height = h;
        this.pace = cadency;
        this.points = pts;
        this.image = document.createElement("img");
        this.image.style.top = this.coordX + "px";
        this.image.style.left = this.coordY + "px";

        this.image.style.position = "fixed";
        if (!imgsrc) {
            this.image.src = "./Images/DroneType3.gif";
        } else
            this.image.src = this.imagesrc;
        this.image.style.position = "fixed";
        this.image.style.width = this.width + "px";
        this.spawn();
    }

    /**
     * Place the enemy on the screen
     * @returns {undefined}
     */
    this.spawn = function () {
        if (!div) {
            document.getElementById("enemy").appendChild(this.image)
        } else
            div.appendChild(this.image);
    }

    /**
     * Update the position and kills the enemy if it is outscreen
     * @returns {undefined}
     */
    this.updatePosition = function () {
        if (!this.removed) {
            if (this.coordX < -this.width) {
                this.death();
            } else {
                if (!div) {
                    document.getElementById("enemy").removeChild(this.image)
                } else {
                    div.removeChild(this.image);
                    this.image.style.top = this.coordY + "px";
                    this.image.style.left = this.coordX + "px";
                    this.spawn();
                }
            }
        } else {
            // When it dies, it explodes and takes a little time to disappear
            this.disappear--;
            if (this.disappear == 0 && this.audio) {
                div.removeChild(this.image);
                document.getElementById("audio").removeChild(this.audio)
            }
        }
    }
    /**
     * Moves the enemy
     * @param entier entre 0 et 7 indiquant la direction a
     */
    this.move = function (a) {
        switch (a) {
            case 0 :
                this.moveLeft();
                this.updatePosition();
                break;
            case 1 :
                this.moveLeft();
                this.moveUp();
                this.updatePosition();
                break;
            case 2 :
                this.moveUp();
                this.updatePosition();
                break;
            case 3 :
                this.moveUp();
                this.moveRight();
                this.updatePosition();
                break;
            case 4 :
                this.moveRight();
                this.updatePosition();
                break;
            case 5 :
                this.moveRight();
                this.moveDown();
                this.updatePosition();
                break;
            case 6 :
                this.MoveDown();
                this.updatePosition();
                break;
            case 7 :
                this.moveDown();
                this.moveLeft();
                this.updatePosition();
                break;
        }
    }

    this.moveUp = function () {
        this.coordY += this.speed;
    }

    this.moveDown = function () {
        this.coordY -= this.speed;
    }

    this.moveLeft = function () {
        this.coordX -= this.speed;
    }

    this.moveRight = function () {
        this.coordX += this.speed;
    }


    /**
     * Manages the collision with the player : If the enemy collides with the player, it is destroyed, and damages the player
     * @returns {Boolean}
     */
    this.collisionPlayer = function () {
        if ((this.coordX >= player.coordX && this.coordX <= player.coordX + player.width) || (this.coordX + this.width >= player.coordX && this.coordX + this.width <= player.coordX + player.width)) {
            if ((this.coordY >= player.coordY && this.coordY <= player.coordY + player.height) || (this.coordY + this.height >= player.coordY && this.coordY + this.height <= player.coordY + player.height)) {
                player.hit();
                this.death();
                // We place the enemy out of the map to avoid an infinite loop : The enemy has already collided with the player, we make sure it will not happen again
                this.coordY = -100;
            }
        }
    }

    /**
     * Called when the enemy is hit : remove1 hp and call death if the enemy has 0 hp
     * @returns {undefined}
     */
    this.hit = function () {
        this.health--;
        if (this.health === 0) {
            this.death();
        }
    }

    /**
     * When the enemy reach 0 hp, it explode then dies
     * It doesn't explode when it reach the border of the map, but stil dies
     * @returns {undefined}
     */
    this.death = function () {
        if (!this.removed) {
            this.health = 0;
            this.removed = 1;
            div.removeChild(this.image);

            if (this.coordX > 0) {
                this.image.src = "./Images/explode.gif";
                div.appendChild(this.image)


                let audio = document.getElementById("audio");
                this.audio = document.createElement("audio");
                this.audio.src = "./son/atari_boom.wav";
                audio.appendChild(this.audio);
                this.audio.play();
            }



        }
    }

    /**
     * Make the enemy shoot
     * @returns {undefined}
     */
    this.shoot = function () {
        if (this.coordX < window.innerWidth && this.coordY < window.innerHeight && this.coordX > 0 && this.coordY > 0) {
            if (this.pace != -1) {
                t = timestamp();
                if (t > this.lastShot + this.pace * 1000) {
                    this.lastShot = t;
                    shot = new Shot(this, this.speed);
                    shot.init();
                    shot.left();
                    shotArray.push(shot);
                }
            }
        }
    }

    /**
     * Add the score to the player total score
     * @returns {undefined}
     */
    this.addScore = function () {
        player.score += this.points;
    }

// Fonction utilisee ???
    this.willBeDead = function () {
        return this.health === 1;
    }
}