import { Game } from "the-world-engine";

import TestAudio from "./asset/audio/audioTest.mp3";
import { Bootstrapper } from "./asset/Bootstrapper";

function startGame(): void {
    const game = new Game(document.getElementById("game_view")!, true);
    game.run(Bootstrapper);
    game.inputHandler.startHandleEvents();
}

let audioTest: HTMLAudioElement|null = new Audio(TestAudio);
audioTest.play()
    .then(_ => {
        audioTest!.pause();
        audioTest!.remove();
        audioTest = null;
        startGame();
    })
    .catch(e => {
        if (e instanceof DOMException && e.name === "NotAllowedError") {
            audioTest!.remove();
            audioTest = null;
            const button = document.createElement("button");
            button.style.position = "absolute";
            button.style.left = "0";
            button.style.top = "0";
            button.style.width = "100%";
            button.style.height = "100%";
            button.style.border = "none";
            button.style.fontSize = "32px";
            button.innerText = "Play";
            button.onclick = (): void => {
                button.parentElement!.removeChild(button);
                startGame();
            };
            document.body.appendChild(button);
        } else {
            throw e;
        }
    });
