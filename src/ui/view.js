import {GameStatuses} from "../core/game-statuses.js";
import {GridComponent} from "./components/grid/grid.component.js";
import {SettingsComponent} from "./components/settings/settings.component.js";
import {RestartComponent} from "./components/restart/restart.component.js";

export class View {
    onstart = null;
    onplayermove = null;
    onrestart = null;

    constructor() {
        document.addEventListener('keydown', (e) => {
            switch (e.code) {
                case 'ArrowUp':
                    this.onplayermove?.movePlayer1Up();
                    break;
                case 'ArrowDown':
                    this.onplayermove?.movePlayer1Down();
                    break;
                case 'ArrowLeft':
                    this.onplayermove?.movePlayer1Left();
                    break;
                case 'ArrowRight':
                    this.onplayermove?.movePlayer1Right();
                    break;
                case 'KeyW':
                    this.onplayermove?.movePlayer2Up();
                    break;
                case 'KeyS':
                    this.onplayermove?.movePlayer2Down();
                    break;
                case 'KeyA':
                    this.onplayermove?.movePlayer2Left();
                    break;
                case 'KeyD':
                    this.onplayermove?.movePlayer2Right();
                    break;
            }
        })
    }

    render(dto) {
        const rootElement = document.getElementById('root')
        const tableElement = document.querySelector('#grid-game');
        const scoreElement = document.querySelector('#score');

        rootElement.innerHTML = ''
        tableElement.innerHTML = ''
        scoreElement.innerHTML = '';

        scoreElement.textContent = `Player1: ${dto.player1Points} - Player2: ${dto.player2Points}`;

        rootElement.append('Game Status: ' + dto.status)

        if (dto.status === GameStatuses.SETTINGS) {
            const settingsComponent = new SettingsComponent({onstart: this.onstart});
            const settingsElement = settingsComponent.render();
            rootElement.append(settingsElement)
        } else if (dto.status === GameStatuses.IN_PROGRESS) {
            const gridComponent = new GridComponent();
            const gridElement = gridComponent.render(dto);
            rootElement.append(gridElement)
        } else if (dto.status === GameStatuses.FINISHED) {
            const restartComponent = new RestartComponent({onrestart: this.onrestart});
            const restartElement = restartComponent.render(dto);
            rootElement.append(restartElement)
        }
    }
}

