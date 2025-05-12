import {Controller} from "./controller.js";
import {View} from "./view.js";
import {Game} from "../core/game.js";
import {EventEmitter} from "../observer/observer.js";

const view = new View();
const eventEmitter = new EventEmitter();
const game = new Game(eventEmitter);
const controller = new Controller(view, game);
controller.init()
