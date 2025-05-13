export class RestartComponent {
    #props;

    constructor(props) {
        this.#props = props;
    }

    render() {
        const container = document.createElement('div');
        container.classList.add('container');

        const button = document.createElement('button');

        button.append('RESTART GAME');
        button.classList.add('btn', 'btn-warning');

        button.onclick = () => {
            this.#props?.onrestart?.();
        }

        container.append(button);
        return container;
    }
}
