import {Position} from "./position.js";
import {Google} from "./google.js";
import {Player} from "./player.js";
import {GameStatuses} from "./game-statuses.js";
import {NumberUtils} from "./number-utils.js";

export class Game {
    #settings = {
        pointsToWin: 3,
        gridSize: {
            columns: 4,
            rows: 4,
        },
        googleJumpInterval: 2000
    };

    #score = {
        1: { points: 0 },
        2: { points: 0 },
    };

    #status = GameStatuses.SETTINGS;

    #player1
    #player2
    #google
    #googleSetIntervalId

    eventEmitter

    constructor(eventEmitter) {
        this.eventEmitter = eventEmitter;
    }


    set settings(settings) {
        this.#settings = { ...this.#settings, ...settings };

        this.#settings.gridSize = settings.gridSize
            ? { ...this.#settings.gridSize, ...settings.gridSize }
            : this.#settings.gridSize;
    }

    get settings() {
        return this.#settings;
    }

    get gridSize() {
        return this.#settings.gridSize;
    }

    get scores() {
        return this.#score;
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

    start() {
        if (this.#status === GameStatuses.SETTINGS) {
            this.#createUnits();
            this.#status = GameStatuses.IN_PROGRESS;

            this.#runGoogleJumpInterval()

            this.eventEmitter.emit('change');
        }
    }

    stop() {
        clearInterval(this.#googleSetIntervalId);
        this.#status = GameStatuses.STOPPED;
    }

    restart() {
        clearInterval(this.#googleSetIntervalId);

        this.#score = {
            1: { points: 0 },
            2: { points: 0 },
        };

        this.#status = GameStatuses.SETTINGS;

        this.#player1 = null;
        this.#player2 = null;
        this.#google = null;

        this.eventEmitter.emit('change');
    }


    #finishGame() {
        clearInterval(this.#googleSetIntervalId);

        this.#status = GameStatuses.FINISHED;

        this.#player1 = null;
        this.#player2 = null;
        this.#google = null;
    }

    #runGoogleJumpInterval() {
        this.#googleSetIntervalId = setInterval(() => {
            this.#moveGoogleToRandomPosition();
        }, this.#settings.googleJumpInterval);
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

        this.#moveGoogleToRandomPosition(true);
    }

    #moveGoogleToRandomPosition(excludeGoogle) {
        let notCrossedPosition = [this.#player1.position, this.#player2.position];

        if (!excludeGoogle) {
            notCrossedPosition.push(this.#google.position);
        }

        this.#google = new Google(this.#getRandomPosition(notCrossedPosition));
        this.eventEmitter.emit('change')
    }

    #checkBorders(player, delta) {
        const newPosition = player.position.clone();
        if (delta.x) newPosition.x += delta.x;
        if (delta.y) newPosition.y += delta.y;

        if (newPosition.x < 0 || newPosition.x >= this.#settings.gridSize.columns) {
            return true;
        }

        if (newPosition.y < 0 || newPosition.y >= this.#settings.gridSize.rows) {
            return true;
        }

        return false;
    }

    #checkOtherPlayer(movingPlayer, anotherPlayer, delta) {
        const newPosition = movingPlayer.position.clone();
        if (delta.x) newPosition.x += delta.x;
        if (delta.y) newPosition.y += delta.y;

        return anotherPlayer.position.equal(newPosition);
    }

    #checkGoogleCatching(player) {
        if (player.position.equal(this.#google.position)) {
            this.#score[player.id].points++;

            if (this.#score[player.id].points === this.#settings.pointsToWin) {
                this.#finishGame()
            } else {
                clearInterval(this.#googleSetIntervalId)
                this.#moveGoogleToRandomPosition()
                this.#runGoogleJumpInterval()
            }
        }
    }

    #movePlayer(movingPlayer, anotherPlayer, delta) {
        if (this.#status === GameStatuses.IN_PROGRESS) {
            const isBorder = this.#checkBorders(movingPlayer, delta);
            const isAnotherPlayer = this.#checkOtherPlayer(
                movingPlayer,
                anotherPlayer,
                delta
            );
            if (isBorder || isAnotherPlayer) {
                return;
            }

            if (delta.x) {
                movingPlayer.position = new Position(
                    movingPlayer.position.x + delta.x,
                    movingPlayer.position.y
                );
            } else {
                movingPlayer.position = new Position(
                    movingPlayer.position.x,
                    movingPlayer.position.y + delta.y,
                );
            }
            this.#checkGoogleCatching(movingPlayer);
            this.eventEmitter.emit('change');
        }
    }

    movePlayer1Right() {
        const delta = { x: 1 };
        this.#movePlayer(this.#player1, this.#player2, delta);
    }

    movePlayer1Left() {
        const delta = { x: -1 };
        this.#movePlayer(this.#player1, this.#player2, delta);
    }

    movePlayer1Up() {
        const delta = { y: -1 };
        this.#movePlayer(this.#player1, this.#player2, delta);
    }

    movePlayer1Down() {
        const delta = { y: 1 };
        this.#movePlayer(this.#player1, this.#player2, delta);
    }

    movePlayer2Right() {
        const delta = { x: 1 };
        this.#movePlayer(this.#player2, this.#player1, delta);
    }

    movePlayer2Left() {
        const delta = { x: -1 };
        this.#movePlayer(this.#player2, this.#player1, delta);
    }

    movePlayer2Up() {
        const delta = { y: -1 };
        this.#movePlayer(this.#player2, this.#player1, delta);
    }

    movePlayer2Down() {
        const delta = { y: 1 };
        this.#movePlayer(this.#player2, this.#player1, delta);
    }
}