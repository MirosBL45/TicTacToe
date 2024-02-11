let board;
let playerO = 'O';
let playerX = 'X';
let currPlayer = playerO;
let gameOver = false;


window.onload = function () {
    setGame();
}


function setGame() {
    board = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ];

    for (let m = 0; m < 3; m++) {
        for (let n = 0; n < 3; n++) {
            let tile = document.createElement('div');
            tile.id = `${m.toString()}-${n.toString()}`;
            tile.classList.add('tile');

            if (m == 0 || m == 1) {
                tile.classList.add('horizontal_line');
            }

            if (n == 0 || n == 1) {
                tile.classList.add('vertical_line');
            }

            tile.addEventListener('click', setTile);

            document.querySelector('#board').append(tile);
        }
    }
}


function setTile() {
    if (gameOver) {
        alert('Game is over, start another one!!!');
        return;
    }

    let coords = this.id.split('-'); //"1-1" -> ["1", "1"]
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    if (board[r][c] != ' ') {
        let usedFieldEl = document.querySelector('.usedField');
        usedFieldEl.style.display = 'block';
        const zatvoriEl3 = document.querySelector('#closeModal3');

        zatvoriEl3.addEventListener('click', () => {
            usedFieldEl.style.display = 'none'
        });

        return;
    }

    board[r][c] = currPlayer;
    this.innerText = currPlayer;
    this.classList.add(currPlayer);

    if (currPlayer == playerO) {
        currPlayer = playerX;
    } else {
        currPlayer = playerO;
    }

    checkWinner();
}


function checkWinner() {
    //horizontally
    for (let r = 0; r < 3; r++) {
        if (board[r][0] == board[r][1] && board[r][1] == board[r][2] && board[r][0] != ' ') {
            for (let i = 0; i < 3; i++) {
                let tile = document.getElementById(`${r.toString()}-${i.toString()}`);
                tile.classList.add('winner');
            }
            setTimeout(endGame, 300);
        }
    }

    //vertically
    for (let c = 0; c < 3; c++) {
        if (board[0][c] == board[1][c] && board[1][c] == board[2][c] && board[0][c] != ' ') {
            for (let i = 0; i < 3; i++) {
                let tile = document.getElementById(`${i.toString()}-${c.toString()}`);
                tile.classList.add('winner');
            }
            setTimeout(endGame, 300);
        }
    }

    //diagonally
    if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != ' ') {
        for (let i = 0; i < 3; i++) {
            let tile = document.getElementById(`${i.toString()}-${i.toString()}`);
            tile.classList.add('winner');
        }
        setTimeout(endGame, 300);
    }

    //anti-diagonally
    if (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] != ' ') {
        document.getElementById('0-2').classList.add('winner');
        document.getElementById('1-1').classList.add('winner');
        document.getElementById('2-0').classList.add('winner');

        setTimeout(endGame, 300);
    }

    checkTie();
}


function checkTie() {
    let niz = [];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            niz.push(board[i][j]);
        }
    }

    let prvi = 0;
    let drugi = 0;
    niz.forEach(slovo => {
        switch (slovo) {
            case 'X':
                prvi++;
                break;
            case 'O':
                drugi++;
                break;
        }
    });

    let divovi = document.querySelectorAll('div');
    let victory = 0;
    divovi.forEach(div => {
        if (div.classList.contains('winner')) {
            victory++;
        }
    });

    if (((prvi == 4 && drugi == 5) || (prvi == 5 && drugi == 4)) && (victory === 0)) {
        let tieGameEl = document.querySelector('.tieGame');
        tieGameEl.style.display = 'block';
        const zatvoriEl2 = document.querySelector('#closeModal2');

        zatvoriEl2.addEventListener('click', () => {
            tieGameEl.style.display = 'none';
        });

        setTimeout(endGame, 300);
    }
}


function endGame() {
    let reload = document.querySelector('#reload');
    reload.style.display = 'inline-block';
    gameOver = true;
    return;
}


const rulesEl = document.querySelector('.rules_modal');
const zatvoriEl = document.querySelector('#closeModal');
const prikaziEl = document.querySelector('#rules');

zatvoriEl.addEventListener('click', () => {
    rulesEl.style.display = 'none'
})


prikaziEl.addEventListener('click', () => {
    rulesEl.style.display = 'block'
})