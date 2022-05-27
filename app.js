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
	const endGameScreen = document.querySelector(".end-game-screen");
	const restartBtn = document.querySelector(".restart-btn");
	return { gameBoard, markFields, restartBtn, endGameScreen };
})();

const Game = (() => {
	const { gameBoard, markFields, restartBtn, endGameScreen } = GameBoard;

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
		if (!field.textContent) {
			field.textContent = currentPlayer.playersMark;
		}
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
			endGameScreen.style.display = "flex";
			isGameActive = false;
			return;
		}

		if (!gameBoard.includes("")) {
			endGameScreen.style.display = "flex";
		}
	};

	const handleClick = (e) => {
		const field = e.target;
		const index = field.dataset.field;
		if (isGameActive) {
			updateBoard(index);
			fillField(field);
			handleResultValidation();
			changeTurn();
		}
	};

	const restartGame = () => {
		isGameActive = true;
		currentPlayer = player1;
		playerTurn = currentPlayer.isPlayersTurn;
		isGameActive = true;
		GameBoard.gameBoard = ["", "", "", "", "", "", "", "", ""];

		markFields.forEach((field) => {
			field.textContent = "";
			field.removeEventListener("click", handleClick);
		});
		endGameScreen.style.display = "none";
	};

	const startGame = () => {
		playerTurn = currentPlayer.isPlayersTurn;
		markFields.forEach((field) => {
			field.addEventListener("click", handleClick, { once: true });
		});
	};

	restartBtn.addEventListener("click", restartGame);

	return { startGame };
})();

Game.startGame();
