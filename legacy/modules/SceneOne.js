class SceneOne {
    constructor({
        sceneOneWindow,
        sceneOneMusic,
        sceneOneDialogue,
        blipSound,
        sceneOneTextContainer,
    }) {

        this.sceneOneWindow = sceneOneWindow;
        this.sceneOneMusic = sceneOneMusic;
        this.sceneOneDialogue = sceneOneDialogue;
        this.blipSound = blipSound;
        this.sceneOneTextContainer = sceneOneTextContainer;
        this.timeouts = [];
    }

    clearTimeouts() {
        for (let timeout of this.timeouts) {
            clearInterval(timeout);
        }
    }

    showMenu() {
        const flame = this.sceneOneWindow.querySelector(".scene-one__flame");
        this.sceneOneMusic.play();
        this.sceneOneWindow.style.display = "block";
        setTimeout(() => {
            this.sceneOneWindow.classList.add("show-window");
            flame.classList.add("fade-in");
        }, 1);

    }

    typeWriter(line) {
        // Clear previous setTimeout if user clicks before text is done loading
        this.clearTimeouts();
        this.sceneOneTextContainer.innerHTML = "";

        // Array of individual characters from line
        let arr = line.split("");

        // Loops through each character and plays blip sound
        for (let i = 0; i < line.length; i++) {
            let char = arr[i];
            this.timeouts.push(setTimeout(() => {
                const span = document.createElement("span");
                span.innerHTML = char;
                this.sceneOneTextContainer.appendChild(span);
                // this.blipSound.pause();
                this.blipSound.currentTime = 0;
                this.blipSound.play();
            }, i * 20));
            // this.timeouts[i];
        }
    }


    playDialogue() {
        let counter = 1;
        if (counter === 1) { this.typeWriter(this.sceneOneDialogue["line1"]) }
        const keyLength = Object.keys(this.sceneOneDialogue).length;
        this.sceneOneWindow.addEventListener("click", () => {
            if (counter < keyLength) {
                const key = Object.keys(this.sceneOneDialogue)[counter];
                this.typeWriter(this.sceneOneDialogue[key]);
                counter++
            } else {
                this.sceneOneWindow.removeEventListener("click", () => "");
                this.sceneOneWindow.style.transition = "opacity 2s";
                this.sceneOneWindow.style.opacity = "0";
                this.sceneOneWindow.style.position = "absolute";
                for (let i = 0; i < this.sceneOneMusic.volume / .1; i++) {
                    setTimeout(() => {
                        this.sceneOneMusic.volume -= .1;
                    }, i * 500);
                }
                setTimeout(() => {
                    this.sceneOneWindow.remove();
                }, 5000);
            }

        })
    }

    playScene() {
        this.showMenu();
        this.playDialogue();
    }


}

module.exports = SceneOne;