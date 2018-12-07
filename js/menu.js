/**
 * The banner menu on top of the game
 * @returns {Menu}
 */
function Menu() {
    this.menuBar;
    this.playMusicButton;
    this.pauseMusicButton;
    this.playButton;
    this.pauseButton;

    this.init = function () {
        this.menuBar = document.createElement("div");
        this.menuBar.style.position = "fixed";
        this.menuBar.style.left = "400px";
        this.menuBar.id = "BannerMenu"

        this.pauseButton = document.createElement("img");
        this.pauseButton.src = "./Images/pause.png";
        this.pauseButton.style.height = "70px";

        this.quitButton = document.createElement("img");
        this.quitButton.src = "./Images/quit.png";
        this.quitButton.style.height = "70px";

        this.pauseMusicButton = document.createElement("img");
        this.pauseMusicButton.src = "./Images/soundOff.png";
        this.pauseMusicButton.style.height = "70px";
        
        this.playMusicButton = document.createElement("img");
        this.playMusicButton.src = "./Images/soundOn.png";
        this.playMusicButton.style.height = "70px";

        this.quitButton.addEventListener("click", this.stopGame.bind(this));
        
        this.playMusicButton.addEventListener("click", this.stopMusic.bind(this))
        this.pauseMusicButton.addEventListener("click", this.restartMusic.bind(this))
        
        this.pauseButton.addEventListener("click", this.pauseGame.bind(this));

        this.display();
    }

    /*
    * Creates the banner menu
    */
    this.display = function () {
        this.menuBar.appendChild(this.pauseButton);
        this.menuBar.appendChild(this.quitButton);
        this.menuBar.appendChild(this.playMusicButton);
        document.getElementById("playground").appendChild(this.menuBar);
    }

    /**
    * Stops the music
    */
    this.stopMusic = function () {
        balAudio = document.getElementById("audio");
        balAudio.firstElementChild.pause();
        
        this.menuBar.removeChild(this.playMusicButton)
        this.menuBar.appendChild(this.pauseMusicButton);
    }

    /**
    * Restarts the music
    */
    this.restartMusic = function () {
        
        balAudio = document.getElementById("audio");
        balAudio.firstElementChild.play();

        this.menuBar.removeChild(this.pauseMusicButton)
        this.menuBar.appendChild(this.playMusicButton);
    }
    
    /**
    * Stops the game
    */
    this.stopGame = function () {
        this.resumeGame()
//        this.menuBar.innerHTML = "";
//        resetGame()
        player.hp = 0;
    }

    /*
    * Pauses the game
    */
    this.pauseGame = function () {
        document.getElementById("playground").style.opacity = 0.5;
        
        this.pauseButton.src = "./Images/restart.png";
                
        fps = 0;
        announcer.print("PAUSE");

        this.pauseButton.removeEventListener("click", this.pauseGame.bind(this));
        this.pauseButton.addEventListener("click", this.resumeGame.bind(this));
    }
    /*
    * Resumes the game
    */
    this.resumeGame = function () {
        document.getElementById("playground").style.opacity = 1.0;
        
        this.pauseButton.src = "./Images/pause.png";
                
        fps = 70;
        announcer.removeMessage();

        this.pauseButton.removeEventListener("click", this.resumeGame.bind(this));
        this.pauseButton.addEventListener("click", this.pauseGame.bind(this));
    }
    
    /**
    * Removes the banner
    */
    this.removeBanner = function () {
        this.menuBar.parentNode.removeChild(this.menuBar)
    }

}