import {Position} from "./position.js";
import {GameStatuses} from "../utils/game-statuses.js";
import {Google} from "./google.js";
import {NumberUtils} from "../utils/number-utils.js";
import {Player} from "./player.js";

export class Game {
    #settings = {
        gridSize: {
            columns: 4,
            rows: 4,
        },
    };

    #status = GameStatuses.SETTINGS;

    #player1
    #player2
    #google;

    constructor() {}

    set settings(settings) {
        this.#settings = settings;
    }

    get settings() {
        return this.#settings;
    }

    get status() {
        return this.#status;
    }

    get player1() {
        return this.#player1;
    }

    get player2() {
        return this.#player2;
    }

    get google() {
        return this.#google;
    }

    async start() {
        if (this.#status === GameStatuses.SETTINGS) {
            this.#createUnits();
            this.#status = GameStatuses.IN_PROGRESS;
        }
    }

    #getRandomPosition(coordinates) {
        let newX, newY;


        do {
            newX = NumberUtils.getRandomNumber(this.#settings.gridSize.columns);
            newY = NumberUtils.getRandomNumber(this.#settings.gridSize.rows);
        } while (coordinates.some((el) => el.x === newX && el.y === newY));


        return new Position(newX, newY);
    }

    #createUnits() {
        const player1Position = this.#getRandomPosition([]);
        this.#player1 = new Player(1, player1Position);


        const player2Position = this.#getRandomPosition([player1Position]);
        this.#player2 = new Player(2, player2Position);


        const googlePosition = this.#getRandomPosition([
            player1Position,
            player2Position,
        ]);
        this.#google = new Google(googlePosition);
    }
}