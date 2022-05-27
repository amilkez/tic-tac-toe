const Player = (name, mark) => {
	let playersName = name;
	let playersMark = mark;
	let isPlayersTurn = false;

	return { playersName, playersMark, isPlayersTurn };
};

const player1 = Player("Player1", "x");
const player2 = Player("Player2", "o");

const GameBoard = (() => {
	const gameBoard = ["", "", "", "", "", "", "", "", ""];
	const markFields = Array.from(document.querySelectorAll("[data-field]"));

	return { gameBoard, markFields };
})();

const Game = (() => {
	const { gameBoard, markFields } = GameBoard;
	const X_CLASS = "x";
	const CIRCLE_CLASS = "o";

	let isGameActive = true;
	let currentPlayer = player1;
	let playerTurn;

	const isValidAction = (tile) => {
		if (!tile.textContent) {
			return false;
		}
		return true;
	};

	const updateBoard = (index) => {
		gameBoard[index] = currentPlayer.playersMark;
	};

	const fillField = (field) => {
		field.textContent = currentPlayer.playersMark;
	};

	const handleClick = (e) => {
		console.log(currentPlayer);
		const field = e.target;
		const index = field.dataset.field;
		updateBoard(index);
		fillField(field);
		changeTurn();
	};

	const changeTurn = () => {
		if (currentPlayer === player1) {
			currentPlayer = player2;
		} else if (currentPlayer === player2) {
			currentPlayer = player1;
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
