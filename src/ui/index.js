import {Controller} from "./controller.js";
import {View} from "./view.js";
import {GameProxy} from "./game-proxy.js";
import {EventEmitter} from "../observer/observer.js";

const view = new View();
const eventEmitter = new EventEmitter();
const game = new GameProxy(eventEmitter);
const controller = new Controller(view, game)

const intervalId = setInterval(() => {
    if (game.initialized) {
        controller.init();
        clearInterval(intervalId);
    }
})