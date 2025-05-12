export class Controller {
    #view;
    #game;

    constructor (view, game) {
        this.#view = view;
        this.#game = game


        this.#game.eventEmitter.subscribe('change', () => {
            this.#render();
        });

        this.#view.onstart = () => {
            this.#game.start();
            this.#render()
        }

        this.#view.onplayermove = {
            movePlayer1Up: () => this.#game.movePlayer1Up(),
            movePlayer1Down: () => this.#game.movePlayer1Down(),
            movePlayer1Left: () => this.#game.movePlayer1Left(),
            movePlayer1Right: () => this.#game.movePlayer1Right(),

            movePlayer2Up: () => this.#game.movePlayer2Up(),
            movePlayer2Down: () => this.#game.movePlayer2Down(),
            movePlayer2Left: () => this.#game.movePlayer2Left(),
            movePlayer2Right: () => this.#game.movePlayer2Right(),

        };

    }
    init () {
        this.#render()
    }

    #render() {
        const settings = this.#game.settings;
        const dto = {
            status: this.#game.status,
            gridSize: settings.gridSize,
            googlePosition: this.#game.google ? this.#game.google.position : null,

            player1Position: this.#game.player1 ? this.#game.player1.position : null,
            player2Position: this.#game.player2 ? this.#game.player2.position : null,

            player1Points: this.#game.score[1] ? this.#game.score[1].points : null,
            player2Points: this.#game.score[2] ? this.#game.score[2].points : null,
        }
        this.#view.render(dto);
    }
}