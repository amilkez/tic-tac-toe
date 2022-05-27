const Player = (name, mark) => {
	let playersName = name;
	let playersMark = mark;
	let isPlayersTurn = false;

	return { playersName, playersMark, isPlayersTurn };
};

const player1 = Player("Player1", "x");
const player2 = Player("Player2", "o");

const GameBoard = (() => {
	let gameBoard = ["", "", "", "", "", "", "", "", ""];
	const markFields = Array.from(document.querySelectorAll("[data-field]"));

	return { gameBoard, markFields };
})();

const Game = (() => {
	const { gameBoard, markFields } = GameBoard;

	let isGameActive = true;
	let currentPlayer = player1;
	let playerTurn;

	const WINNING_COMBINATIONS = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	const updateBoard = (index) => {
		gameBoard[index] = currentPlayer.playersMark;
	};

	const fillField = (field) => {
		field.textContent = currentPlayer.playersMark;
	};

	const changeTurn = () => {
		if (currentPlayer === player1) {
			currentPlayer = player2;
		} else if (currentPlayer === player2) {
			currentPlayer = player1;
		}
	};

	const handleResultValidation = () => {
		let roundWon = false;
		for (let i = 0; i <= 7; i++) {
			const winCon = WINNING_COMBINATIONS[i];
			const a = gameBoard[winCon[0]];
			const b = gameBoard[winCon[1]];
			const c = gameBoard[winCon[2]];
			if (a === "" || b === "" || c === "") {
				continue;
			}
			if ((a === b) & (b === c)) {
				roundWon = true;
				break;
			}
		}

		if (roundWon) {
			console.log("playerwon");
			isGameActive = false;
			return;
		}

		if (!gameBoard.includes("")) {
			console.log("tie");
		}
	};

	const handleClick = (e) => {
		const currentClass = playerTurn ? player2.playersMark : player1.playersMark;
		const field = e.target;
		const index = field.dataset.field;
		if (isGameActive) {
			updateBoard(index);
			fillField(field);
			handleResultValidation();
			changeTurn();
		}
	};

	const startGame = () => {
		playerTurn = currentPlayer.isPlayersTurn;
		markFields.forEach((field) => {
			field.addEventListener("click", handleClick, { once: true });
		});
	};

	return { startGame };
})();

Game.startGame();
