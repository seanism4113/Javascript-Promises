// 1.
// const getAllPokemon = async () => {
// 	try {
// 		const response = await axios.get("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1302'");
// 		const data = await response.data;
// 		console.log(data);
// 	} catch (err) {
// 		console.log("Error fetching Pokémon data:", err);
// 	}
// };

// 2.
// const getPokemon = async () => {
// 	try {
// 		const response = await axios.get("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1302'");
// 		p1Data = await axios.get(response.data.results[5].url);
// 		p2Data = await axios.get(response.data.results[105].url);
// 		p3Data = await axios.get(response.data.results[205].url);
// 		console.log([p1Data, p2Data, p3Data]);
// 	} catch (err) {
// 		console.error("Error fetching Pokémon data:", err);
// 	}
// };

// 3.
// const getPokemon = async () => {
// 	try {
// 		const response = await axios.get("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1302'");
// 		const p1Data = await axios.get(response.data.results[5].url);
// 		const p1SpeciesData = await axios.get(p1Data.data.species.url);
// 		const pokemon1 = { name: p1Data.data.species.name, text: p1SpeciesData.data.flavor_text_entries[0].flavor_text };

// 		const p2Data = await axios.get(response.data.results[105].url);
// 		const p2SpeciesData = await axios.get(p2Data.data.species.url);
// 		const pokemon2 = { name: p2Data.data.species.name, text: p2SpeciesData.data.flavor_text_entries[0].flavor_text };

// 		const p3Data = await axios.get(response.data.results[205].url);
// 		const p3SpeciesData = await axios.get(p3Data.data.species.url);
// 		const pokemon3 = { name: p3Data.data.species.name, text: p3SpeciesData.data.flavor_text_entries[0].flavor_text };

// 		console.log([pokemon1, pokemon2, pokemon3]);
// 	} catch (err) {
// 		console.error("Error fetching Pokémon data:", err);
// 	}
// };

const API_URL = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1500";

const getRandomNumber = (max) => Math.floor(Math.random() * max);

const getPokemonData = async (url) => {
	const response = await axios.get(url);
	return response.data;
};

const getRandomPokemon = async () => {
	const { results } = await getPokemonData(API_URL);
	const randomIndex = getRandomNumber(results.length);
	const pokemonData = await getPokemonData(results[randomIndex].url);
	const speciesData = await getPokemonData(pokemonData.species.url);

	return {
		name: pokemonData.species.name.charAt(0).toUpperCase() + pokemonData.species.name.slice(1),
		image: pokemonData.sprites.front_default,
		text: getFlavorText(speciesData),
	};
};

const getFlavorText = (speciesData) => {
	const entry = speciesData.flavor_text_entries.find((entry) => entry.language.name === "en");
	return entry.flavor_text;
};

const getPokemon = async (qty) => {
	const promises = Array.from({ length: qty }, getRandomPokemon);
	return await Promise.all(promises);
};

const generateHtml = (pokemon) => {
	const html = pokemon
		.map(
			(p, index) => `
        <div class="card mx-2 my-2" style="width: 18rem">
            <h5 class="card-header text-center">${p.name}</h5>
            <div class="d-flex justify-content-center align-items-center" style="height: 200px">
                <img src="${p.image}" class="card-img-top" />
            </div>
            <div class="card-body">
                <p class="card-text">${p.text}</p>
            </div>
        </div>
    `
		)
		.join("");

	$("#pokemon-section").html(html);
};

$("button").on("click", async () => {
	if (!$("#pokemon-section").hasClass("d-none")) {
		$("#pokemon-section").addClass("d-none");
	}
	setTimeout(async () => {
		const pokemon = await getPokemon(3);
		generateHtml(pokemon);
		$("#pokemon-section").removeClass("d-none");
	}, 500);
});
