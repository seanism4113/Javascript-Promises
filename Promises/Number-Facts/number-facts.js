const favNumberInput = document.querySelector("#fav-num-input");
const favNumError = document.querySelector("#fav-num-error");
const favOneFactBtn = document.querySelector("#fav-1fact-btn");
const favFourFactsBtn = document.querySelector("#fav-4facts-btn");
const favFactsList = document.querySelector("#fav-facts-list");
const randomFactsBtn = document.querySelector("#rand-facts-btn");
const randFactsList = document.querySelector("#rand-facts-list");

const baseUrl = "http://numbersapi.com";

const getNumberFact = (number) => {
	return axios
		.get(`${baseUrl}/${number}?json`)
		.then((response) => response.data.text)
		.catch((err) => {
			console.log("Error trying to get a number fact", err);
			throw err;
		});
};

const validateInput = (input) => {
	if (input === "" || isNaN(input)) {
		favNumError.textContent = "Please enter a valid whole number";
		return false;
	}
	favNumError.textContent = "";
	return true;
};

const appendFactToList = (fact, listElement) => {
	const newFactLi = document.createElement("li");
	newFactLi.textContent = fact;
	listElement.appendChild(newFactLi);
};

favOneFactBtn.addEventListener("click", () => {
	if (validateInput(favNumberInput.value)) {
		favFactsList.innerHTML = "";
		getNumberFact(favNumberInput.value)
			.then((fact) => {
				appendFactToList(fact, favFactsList);
				favNumberInput.value = "";
			})
			.catch((err) => console.log("Error", err));
	}
});

favFourFactsBtn.addEventListener("click", () => {
	if (validateInput(favNumberInput.value)) {
		favFactsList.innerHTML = "";
		Promise.all([getNumberFact(favNumberInput.value), getNumberFact(favNumberInput.value), getNumberFact(favNumberInput.value), getNumberFact(favNumberInput.value)])
			.then((facts) => {
				facts.forEach((fact) => {
					appendFactToList(fact, favFactsList);
					favNumberInput.value = "";
				});
			})
			.catch((err) => console.log("Error", err));
	}
});

randomFactsBtn.addEventListener("click", () => {
	randFactsList.innerHTML = "";
	Promise.all([getNumberFact("random"), getNumberFact("random"), getNumberFact("random"), getNumberFact("random")])
		.then((facts) => {
			facts.forEach((fact) => {
				appendFactToList(fact, randFactsList);
			});
		})
		.catch((err) => console.log("Error", err));
});
