export class GameProxy {
    #wsChannel = null;
    #stateCache = null;

    constructor(eventEmitter) {
        this.eventEmitter = eventEmitter;

        this.#wsChannel = new WebSocket('ws://localhost:3001');

        this.#wsChannel.addEventListener('message', (event) => {
            this.#stateCache = JSON.parse(event.data);
            this.eventEmitter.emit('change');
        })
    }

    get initialized() {
        return this.#stateCache !== null;
    }

    get gridSize() {
        return this.#stateCache.gridSize;
    }

    get scores() {
        return {1: { points: this.#stateCache.player1Points}, 2: { points: this.#stateCache.player2Points }}
    }

    get status() {
        return this.#stateCache.status
    }

    get player1() {
        return { position: this.#stateCache.player1Position };
    }

    get player2() {
        return { position: this.#stateCache.player2Position };
    }

    get google() {
        return { position: this.#stateCache.googlePosition };
    }

    start() {
        const action = {type: 'start'};
        this.#wsChannel.send(JSON.stringify(action))
    }

    stop() {
        const action = { type: 'stop' };
        this.#wsChannel.send(JSON.stringify(action));
    }

    restart() {
        this.#wsChannel.send(JSON.stringify({ type: 'restart' }));
    }


    movePlayer1Up() {
        this.#wsChannel.send(JSON.stringify({ type: 'movePlayer1Up' }));
    }

    movePlayer1Down() {
        this.#wsChannel.send(JSON.stringify({ type: 'movePlayer1Down' }));
    }

    movePlayer1Left() {
        this.#wsChannel.send(JSON.stringify({ type: 'movePlayer1Left' }));
    }

    movePlayer1Right() {
        this.#wsChannel.send(JSON.stringify({ type: 'movePlayer1Right' }));
    }

    movePlayer2Up() {
        this.#wsChannel.send(JSON.stringify({ type: 'movePlayer2Up' }));
    }

    movePlayer2Down() {
        this.#wsChannel.send(JSON.stringify({ type: 'movePlayer2Down' }));
    }

    movePlayer2Left() {
        this.#wsChannel.send(JSON.stringify({ type: 'movePlayer2Left' }));
    }

    movePlayer2Right() {
        this.#wsChannel.send(JSON.stringify({ type: 'movePlayer2Right' }));
    }
}