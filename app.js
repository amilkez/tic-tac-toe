const GameBoard = (() => {
	const gameBoard = ["x", "o", "x", "x", "x", "o", "x", "o", "x"];
	const markFields = Array.from(document.querySelectorAll("[data-field]"));

	return { gameBoard, markFields };
})();

const DisplayController = (() => {
	const markFields = GameBoard.markFields;
	const displayMarks = () => {
		markFields.forEach((markField, i) => {
			markField.textContent = GameBoard.gameBoard[i];
		});
	};

	return { displayMarks };
})();

const Player = (name, mark) => {
	const getName = () => name;
	const getMark = () => mark;
	return { getName, getMark };
};

const player1 = Player("Player1", "x");
const player2 = Player("Player2", "o");

const Game = (() => {
	const currentPlayer = player1.getName();
	const currentMark = player1.getMark();
	return { currentPlayer, currentMark };
})();
