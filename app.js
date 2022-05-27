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
	const CIRCLE_CLASS = "circle";

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

	const handleClick = (e) => {
		const field = e.target;
		const index = field.dataset.field;
		const currentTurn = playerTurn ? CIRCLE_CLASS : X_CLASS;
		updateBoard(index);
		console.log(currentTurn, field, index);
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
