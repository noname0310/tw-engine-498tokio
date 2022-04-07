import { Game } from "the-world-engine";
import { Bootstrapper } from "./asset/Bootstrapper";

const game = new Game(document.getElementById("game_view")!, true);
game.run(Bootstrapper);
game.inputHandler.startHandleEvents();
