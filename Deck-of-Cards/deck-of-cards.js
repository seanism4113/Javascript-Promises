const card = document.querySelector("#card");
const newDeckBtn = document.querySelector("#create-deck-btn");
const drawCardBtn = document.querySelector("#draw-card-btn");
const message = document.querySelector("#message-board");

const newDeckUrl = "https://deckofcardsapi.com/api/deck/new/shuffle";
const backImgUrl = "https://deckofcardsapi.com/static/img/back.png";

let deckId = "";
let cardsRemaining;

const getDeck = () => {
	return axios
		.get(`${newDeckUrl}?json`)
		.then((response) => {
			deckId = response.data.deck_id;
			cardsRemaining = 52;
			card.src = backImgUrl;
			return deckId;
		})
		.catch((err) => console.log(err));
};

const drawCard = () => {
	if (!deckId) {
		message.textContent = "No deck ID found. Please create a new deck first.";
		return;
	}

	return axios
		.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
		.then((response) => {
			const cardImg = response.data.cards[0].image;
			card.src = cardImg;
			cardsRemaining = response.data.remaining;
			message.textContent = `There are ${cardsRemaining} cards remaining`;
		})
		.catch((err) => console.log(err));
};

newDeckBtn.addEventListener("click", () => {
	getDeck();
	message.textContent = "";
});

drawCardBtn.addEventListener("click", () => {
	if (cardsRemaining === 0) {
		card.src = "";
		message.textContent = "Please create a new deck to draw a card";
	} else {
		drawCard();
	}
});
