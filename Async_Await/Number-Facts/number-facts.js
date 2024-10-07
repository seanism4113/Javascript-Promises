const baseUrl = "http://numbersapi.com";

const getNumberFacts = async (number, qty) => {
	try {
		const requests = Array.from({ length: qty }, () => axios.get(`${baseUrl}/${number}`));
		const responses = await Promise.all(requests);
		return responses.map((response) => response.data);
	} catch (err) {
		console.log("Error trying to get a number fact", err);
		throw err;
	}
};

const validateInput = (input) => {
	if (input === "" || isNaN(input)) {
		$("#fav-num-error").text("Please enter a valid whole number");
		return false;
	}
	$("#fav-num-error").text("");
	return true;
};

const appendFactsToList = (facts, listElement) => {
	$("#fav-facts-list").html("");
	$("#rand-facts-list").html("");
	facts.forEach((fact) => {
		const newFactLi = $("<li></li>").text(fact);
		listElement.append(newFactLi);
	});
};

const handleFactsRequest = async (number, qty, listElement) => {
	if (number !== "random" && !validateInput(number)) {
		return;
	}
	const facts = await getNumberFacts(number, qty);
	appendFactsToList(facts, listElement);
};

$("#fav-1fact-btn").on("click", async () => {
	let input = $("#fav-num-input").val();
	handleFactsRequest(input, 1, $("#fav-facts-list"));
});

$("#fav-4facts-btn").on("click", async () => {
	let input = $("#fav-num-input").val();
	handleFactsRequest(input, 4, $("#fav-facts-list"));
});

$("#rand-facts-btn").on("click", async () => {
	handleFactsRequest("random", 4, $("#rand-facts-list"));
});
