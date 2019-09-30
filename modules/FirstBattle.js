class FirstBattle {
    constructor({ mainWindow, firstBattleData, mainTextContainer, blipSound, battleMusic }) {
        this.mainWindow = mainWindow;
        this.part1Dialogue = firstBattleData.part1;
        this.mainTextContainer = mainTextContainer;
        this.blipSound = blipSound;
        this.timeouts = [];
        this.part1Buttons = firstBattleData.part1Buttons;
        this.buttonContainer = mainWindow.querySelector(".main-screen__button-container");
        this.battleMusic = battleMusic;
    }

    init() {
        this.playDialogue(this.mainWindow, this.part1Dialogue, this.mainTextContainer, this.blipSound);
        this.battleMusic.play();
    }

    buttons() {
        for (let i = 0; i < this.part1Buttons.length; i++) {
            const button = document.createElement("button");
            button.innerHTML = this.part1Buttons[i];
            button.setAttribute("id", `option-${i}`);
            this.buttonContainer.appendChild(button);
        }
    }

    typeWriter(line, textContainer, blipSound) {
        // Clear previous setTimeout if user clicks before text is done loading
        for (let timeout of this.timeouts) {
            clearInterval(timeout);
        }
        textContainer.innerHTML = "";

        // Array of individual characters from line
        let arr = line.split("");

        // Loops through each character and plays blip sound
        for (let i = 0; i < line.length; i++) {
            let char = arr[i];
            this.timeouts.push(setTimeout(() => {
                const span = document.createElement("span");
                span.innerHTML = char;
                textContainer.appendChild(span);
                blipSound.pause();
                blipSound.currentTime = 0;
                blipSound.play();
            }, i * 20));
            this.timeouts[i];
        }
    }


    playDialogue(mainWindow, dialogue, textContainer, blipSound) {
        let counter = 1;
        if (counter === 1) { this.typeWriter(dialogue["line1"], textContainer, blipSound) }
        const keyLength = Object.keys(dialogue).length;
        mainWindow.addEventListener("click", () => {
            if (counter < keyLength) {
                const key = Object.keys(dialogue)[counter];
                this.typeWriter(dialogue[key], textContainer, blipSound);
                if (counter === keyLength - 1) { this.buttons() };
                counter++
            }
        });
    }


}

module.exports = FirstBattle;