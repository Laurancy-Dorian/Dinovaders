function Announcer() {
    this.showMessage = 60; // Number of frames the message will be shown
    this.div;

    
    this.init = function () {
        this.div = document.getElementById("announcer")
    }

    /**
     * Write the message on the screen
     * @param {String} s The message to be printed
     * @returns {undefined}
     */
    this.setMessage = function (s) {
        this.print(s);
        this.showMessage = 60;
    }

    this.setLongMessage = function (s) {
        this.print(s);
        this.showMessage = 300;
    }

    this.print = function (s) {
        this.div.innerHTML = "";
        let h = document.createElement("h1");
        h.innerHTML = s;
        this.div.appendChild(h);
    }

    this.removeMessage = function () {
        this.div.innerHTML = "";
    }

}

