const baseUrl = "https://deckofcardsapi.com/api/deck";
const backImgUrl = "https://deckofcardsapi.com/static/img/back.png";

let deckId = "";
let cardsRemaining;

const updateUI = (message, cardImage = backImgUrl) => {
	$("#message-board").text(message);
	$("#card").attr("src", cardImage);
};

const getDeck = async () => {
	try {
		const response = await axios.get(`${baseUrl}/new/shuffle`);
		deckId = response.data.deck_id;
		cardsRemaining = response.data.remaining;
		updateUI(`There are ${cardsRemaining} cards remaining`);
		$("#create-deck-btn").addClass("d-none");
		$("#reshuffle-deck-btn").removeClass("d-none");

		return response.data;
	} catch (err) {
		console.log("Error trying to get new deck", err);
	}
};

const drawCard = async () => {
	if (!deckId) {
		updateUI("No deck ID found. Please create a new deck first.", "");
		return;
	}
	if (cardsRemaining === 0) {
		updateUI("No cards left. Please reshuffle to draw a card", $("#card").attr("src"));
		return;
	}

	try {
		const response = await axios.get(`${baseUrl}/${deckId}/draw/?count=1`);
		cardsRemaining = response.data.remaining;
		updateUI(`There are ${cardsRemaining} cards remaining`, response.data.cards[0].image);
	} catch (err) {
		console.log("Error when attempting to draw card", err);
	}
};

const reshuffleDeck = async () => {
	try {
		const response = await axios.get(`${baseUrl}/${deckId}/shuffle/`);
		cardsRemaining = response.data.remaining;
		updateUI(`There are ${cardsRemaining} cards remaining`);
		return response;
	} catch (err) {
		console.log("Error trying to reshuffle", err);
	}
};

$("#create-deck-btn").on("click", async () => {
	getDeck();
});

$("#draw-card-btn").on("click", async () => {
	drawCard();
});

$("#reshuffle-deck-btn").on("click", async () => {
	reshuffleDeck();
});
