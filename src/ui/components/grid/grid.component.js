export class GridComponent {
    render(dto) {
        const container = document.createElement("table");

        for (let y = 0; y < dto.gridSize.rows; y++) {
            const row = document.createElement("tr");

            for (let x = 0; x < dto.gridSize.columns; x++) {
                const cell = document.createElement("td");

                // Google
                if (dto.googlePosition.x === x && dto.googlePosition.y === y) {
                    const googleImg = document.createElement('img');
                    googleImg.src = './assets/google.png';
                    cell.appendChild(googleImg);
                }

                // Player 1
                if (dto.player1Position.x === x && dto.player1Position.y === y) {
                    const p1 = document.createElement('img');
                    p1.src = './assets/player1.png';
                    cell.appendChild(p1);
                }

                // Player 2
                if (dto.player2Position.x === x && dto.player2Position.y === y) {
                    const p2 = document.createElement('img');
                    p2.src = './assets/player2.png';
                    cell.appendChild(p2);
                }

                row.append(cell);
            }

            container.append(row);
        }

        return container;
    }
}