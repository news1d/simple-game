export class SettingsComponent {
    #props;

    constructor(props) {
        this.#props = props;
    }

    render() {
        const container = document.createElement('div');
        container.classList.add('container');

        const button = document.createElement('button');

        button.append('START GAME')
        button.classList.add('btn', 'btn-primary');
        button.onclick = () => {
            this.#props?.onstart?.();
        }

        container.append(button)
        return container;
    }
}