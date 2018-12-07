//////////////////////////////////////////////////////
//                  Dinovaders                      //
//               Javascript Project                 //
// Dorian Laurancy - Arnaud Ducret - Weslie Rabeson //
//////////////////////////////////////////////////////

/**
 * This game is an adaptation of Space Invaders.
 * The player has to  repel waves of enemies, who will be more and more numerous
 * The objective is to make the best score possible before dying.
 * The player has 5 hp, and makes points killing enemies.
 * Succesfully completing a wave gives an extra 100 points
 * 
 * Controls :
 *      - The player can move UP and DOWN using the arrows keys or "Z" and "S"
 *      - The player can shoot with the space bar
 */

/**
 * Called when the page loads. It will initiates all the elements, then launch the game
 */
function initGame() {
    announcer = new Announcer();
    announcer.init();

    init_wave()
    init_menu()
    init_player()
    init_shots()
    init_Enemies()
    init_mainMusic()
    init_playerControll()
    init_mainLoopManagement()
    updateHealthBar(player);

    announcer.setMessage("WAVE 1")

    requestAnimationFrame(mainLoop);
}

/**
 * Creates and inits the player
 */
function init_player() {
    player = new Player();
    player.init();
}

/**
 * Generates the enemies, if no parameters are specified, then it will follow the classical pattern :
 * - Generate between wave*3 and wave*10 enemies, with a random pattern
 * @param {type} nbEnemies
 * @param {type} nbgroups
 */
function init_Enemies(nbEnemies, nbgroups) {
    document.getElementById('enemy').innerHTML = "";
    enemiesArray = new Array();
    if (nbgroups && nbEnemies) {
        for (i = 0; i < nbgroups; i++)
            enemiesArray.push(new EnemyGroup(nbEnemies, Math.floor(Math.random() * 1)));
    } else {
        r = Math.floor(Math.random() * wave * 10)
        if (r < wave * 3)
            enemiesArray.push(new EnemyGroup(wave * 3, Math.floor(Math.random() * 1)));
        else
            enemiesArray.push(new EnemyGroup(r, Math.floor(Math.random() * 1)));
        enemiesArray[0].init();
    }
}

/**
 * Creates the array that will contain all the shots (bullets)
 * @returns {undefined}
 */
function init_shots() {
    shotArray = new Array();
}

/**
 * The game will be playing a music that is initialised and played here
 */
function init_mainMusic() {
    balAudio = document.getElementById("audio");
    mainMusic = document.createElement("audio");
    mainMusic.src = "./son/bensound-summer.mp3"
    balAudio.appendChild(mainMusic);
    mainMusic.loop = "true"
    mainMusic.volume = 0.15
    mainMusic.play();
}

function init_menu() {
    bannerMenu = new Menu();
    bannerMenu.init()
}

/**
 * Ininialise the listeners for the controls of the player
 */
function init_playerControll() {
    document.body.addEventListener("keydown", playerAction);
    document.body.addEventListener("keyup", playerActionEnd);
    lastPressedKey = 0;
    lastShot = 0;
    playerActionCheck = 0;
}

/**
 * Init the main Loop by defining the fps
 */
function init_mainLoopManagement() {
    fps = 60;
    lastTimeStampUpdate = 0;
}


/**
 * init the first wave
 */
function init_wave() {
    wave = 1;
}

/**
 * Init the health bar depending of the player's hp
 * @param Player p
 */
function updateHealthBar(p) {
    healthBar = document.getElementById("hp");
    healthBar.innerHTML = "";
    for (i = 0; i < p.hp; i++) {
        let h = document.createElement("img");
        h.src = "./Images/life.png";
        h.style.height = "100%"
        healthBar.appendChild(h);

    }

}

/**
 * Returns the running time of the application
 * @returns {Number}
 */
function timestamp() {
    return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
}

/**
 * Record the last key pressed by the player to makt its action
 * @param {type} event
 */
function playerAction(event) {
    let k = event.keyCode;
    if (k == 32)
        lastShot = 1;
    else
        lastPressedKey = event.keyCode;
}

/**
 * Reset the control when the player release a key
 * @param {type} event
 */
function playerActionEnd(event) {
    if (event.keyCode == lastPressedKey)
        lastPressedKey = 0;
    else if (event.keyCode == 32)
        lastShot = 0;
}


/**
 * Manages the player Actions
 */
function makePlayerAction() {
    // 'Up' or 'Z'
    if (lastPressedKey == 38 || lastPressedKey == 90)
        player.up();
    // 'Down' or 'S' 
    else if (lastPressedKey == 40 || lastPressedKey == 83)
        player.down();
    // If the window is resized, the dino may be out of the map, this function prevents it
    player.checkOutMap();

    // 'Space'
    if (lastShot == 1)
        player.shoot();
}

/**
 * Manages the movement and the collision of the shots
 * @returns {undefined}
 */
function manageShot() {
    for (i = 0; i < shotArray.length; i++) {
        enemiesArray.forEach(function () {
            shotArray[i].hit(this);
        })
        shotArray[i].hit(player);
        shotArray[i].move();
    }
}

/**
 * Manages the movement and collision of the shots
 */
function manageShot() {
    for (i = 0; i < shotArray.length; i++) {
        for (j = 0; j < enemiesArray.length; j++) {
            for (k = 0; k < enemiesArray[j].arrayEnemies.length; k++) {
                if (shotArray[i]) {
                    shotArray[i].hit(enemiesArray[j].arrayEnemies[k]);
                }
            }
        }
        if (shotArray[i]) {
            shotArray[i].hit(player);
        }
        if (shotArray[i]) {
            shotArray[i].move();
        }
    }
}

/**
 * Maage the creation enemies waves creation
 * @returns {undefined}
 */
function manageEnemies() {
    if (enemiesArray.length == 0) {
        wave++;
        announcer.setMessage("WAVE " + wave)
        player.score += 100
        init_Enemies()
    } else {
        for (i = 0; i < enemiesArray.length; i++) {
            enemiesArray[i].manage();
        }
    }
}


/**
 * Updates the printing of the score on the screen
 */
function maj_score(p) {
    if (typeof sc === "undefined")
        sc = 0;
    if (sc != player.score) {
        balscore = document.getElementById("score");
        balscore.innerHTML = "";
        textScore = document.createElement("p");
        textScore.innerHTML = "";
        textScore.innerHTML = "Score : " + p.score + " ";
        balscore.appendChild(textScore);
        sc = player.score;
    }
}

/**
 * Manages the annoucer. EAch frame, the annoucer showMessage attribute will decrease by 1
 * When it reach 0, the message will be removed
 * @returns {undefined}
 */
function manageAnnouncer() {
    if (announcer.showMessage > 0)
        announcer.showMessage--;
    else if (announcer.showMessage == 0) {
        announcer.removeMessage()
        announcer.showMessage--;
    }
}


/**
 * Update the game, player and enemy position
 */
function update() {
    makePlayerAction()
    manageShot()
    manageEnemies()
    maj_score(player)
    manageAnnouncer()
}

/**
 * Main Loop of the Game
 * Calls the update method 'fps' times a second
 * If the player reach 0 hp, the game is over
 */
function mainLoop() {
    if (timestamp() > lastTimeStampUpdate + (1000 / fps)) {
        update();
        lastTimeStampUpdate = timestamp();
    }

    if (player.hp == 0) {
        t = timestamp()
        announcer.setLongMessage("GAME OVER")
        document.getElementById('audio').removeChild(mainMusic)
        gameOver()
    } else
        requestAnimationFrame(mainLoop);
}


/**
 * The game Over screen: print "game over" then "your score"
 * @returns {undefined}
 */
function gameOver() {
    if (timestamp() > t + 2000)
        announcer.setLongMessage("YOUR SCORE : " + player.score)
    if (timestamp() > (t + 5000)) {
        resetGame()
    } else
        requestAnimationFrame(gameOver);
}

/**
 * Reset the game and go back to the main menu
 * @returns {undefined}
 */
function resetGame(displayMM) {
    if (typeof bannerMenu !== "undefined")
        bannerMenu.removeBanner()
    document.getElementById("announcer").innerHTML = "";
    document.getElementById('score').innerHTML = "";
    document.getElementById('enemy').innerHTML = "";
    document.getElementById('hp').innerHTML = "";
    document.getElementById('player').innerHTML = "";
    document.getElementById('shot').innerHTML = "";
    document.getElementById('audio').innerHTML = "";
    
    displayMainMenu()
}