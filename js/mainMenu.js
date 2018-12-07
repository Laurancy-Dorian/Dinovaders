/**
 * Init the main Menu
 * @returns {undefined}
 */
function initMainMenu() {
    mainMenuDiv = document.createElement("div")
    mainMenuDiv.id = "mainMenu"
    mainMenuDiv.style.position = "fixed"
    
    gameTitle = document.createElement("img")
    gameTitle.src = "./Images/LogoPlanete.png"
    
    mainMenuStartButton = document.createElement("img")
    mainMenuStartButton.src = "./Images/start.png"
    mainMenuStartButton.addEventListener("click", launch);
    mainMenuStartButton.className = "mainMenuButton"
    
    displayMainMenu()
}

/**
 * Displays the main menu
 * @returns {undefined}
 */
function displayMainMenu() {
    document.getElementById("playground").appendChild(mainMenuDiv)
    mainMenuDiv.appendChild(gameTitle)
    mainMenuDiv.appendChild(mainMenuStartButton)
    
}

/**
 * Removes the main menu and start the game
 * @returns {undefined}
 */
function launch() {
    mainMenuDiv.innerHTML = "";
    mainMenuDiv.parentNode.removeChild(mainMenuDiv)
    initGame()
}