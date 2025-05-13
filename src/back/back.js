import {WebSocketServer} from 'ws'
import {Game} from "../core/game.js";
import {EventEmitter} from "../observer/observer.js";

const eventEmitter = new EventEmitter()
const game = new Game(eventEmitter)

function createDTO() {
    return {
        status: game.status,
        gridSize: game.settings.gridSize,
        googlePosition: game.google ? game.google.position : null,

        player1Position: game.player1 ? game.player1.position : null,
        player2Position: game.player2 ? game.player2.position : null,

        player1Points: game.scores[1] ? game.scores[1].points : null,
        player2Points: game.scores[2] ? game.scores[2].points : null,
    };
}

const wss = new WebSocketServer({ port: 3001 })

wss.on('connection', (channel) => {
    game.eventEmitter.subscribe('change', () => {
        channel.send(JSON.stringify(createDTO()))
    });

    channel.on('message', (msg) => {
        const action = JSON.parse(msg.toString());

        switch (action.type) {
            case 'start':
                game.start();
                break;
            case 'movePlayer1Up':
                game.movePlayer1Up();
                break;
            case 'movePlayer1Down':
                game.movePlayer1Down();
                break;
            case 'movePlayer1Left':
                game.movePlayer1Left();
                break;
            case 'movePlayer1Right':
                game.movePlayer1Right();
                break;

            case 'movePlayer2Up':
                game.movePlayer2Up();
                break;
            case 'movePlayer2Down':
                game.movePlayer2Down();
                break;
            case 'movePlayer2Left':
                game.movePlayer2Left();
                break;
            case 'movePlayer2Right':
                game.movePlayer2Right();
                break;

            case 'stop':
                game.stop();
                break;

            case 'restart':
                game.restart();
                break;
        }
    })

    channel.send(JSON.stringify(createDTO()))
})