import { Game } from "the-world-engine";
import { Scene498Bootstrapper } from "./asset/Scene498Bootstrapper";

const game = new Game(document.body);
game.run(Scene498Bootstrapper);
game.inputHandler.startHandleEvents();
