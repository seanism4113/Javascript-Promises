// 1.
// const getAllPokemon = () => {
// 	$.getJSON("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1302'")
// 		.then((response) => {
// 			console.log(response.results);
// 		})
// 		.catch((err) => console.error("Error fetching Pokémon data:", err));
//   };

// 2.
// const getPokemon = () => {
// 	$.getJSON("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1302'")
// 		.then((response) => {
// 			$.getJSON(response.results[5].url).then((response) => console.log(response));
// 			$.getJSON(response.results[105].url).then((response) => console.log(response));
// 			$.getJSON(response.results[205].url).then((response) => console.log(response));
// 		})
// 		.catch((err) => console.error("Error fetching Pokémon data:", err));
// };

// 3.
// let pokemon1;
// let pokemon2;
// let pokemon3;

// const getPokemon = () => {
// 	$.getJSON("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1302'")
// 		.then((response) => {
// 			$.getJSON(response.results[5].url).then((response) => {
// 				console.log(response);
// 				pokemon1 = response.species.name;
// 				$.getJSON(response.species.url).then((response) => {
// 					console.log({ pokemon1: response.flavor_text_entries[0].flavor_text });
// 				});
// 			});
// 			$.getJSON(response.results[105].url).then((response) => {
// 				pokemon2 = response.species.name;
// 				console.log(pokemon2);
// 			});
// 			$.getJSON(response.results[205].url).then((response) => {
// 				pokemon3 = response.species.name;
// 				console.log(pokemon3);
// 			});
// 		})
// 		.catch((err) => console.error("Error fetching Pokémon data:", err));
// };

let pokemon1 = {};
let pokemon2 = {};
let pokemon3 = {};

const getRandomNumber = () => Math.floor(Math.random() * 1302);

const getPokemon = (pokeObject) => {
	$.getJSON("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1302'")
		.then((response) => {
			$.getJSON(response.results[getRandomNumber()].url).then((response) => {
				pokeObject.name = response.species.name.charAt(0).toUpperCase() + response.species.name.slice(1);
				pokeObject.image = response.sprites.front_default;
				$.getJSON(response.species.url).then((response) => {
					console.log(response);
					let i = 0;
					while (response.flavor_text_entries[i].language.name !== "en") {
						i++;
					}
					pokeObject.text = response.flavor_text_entries[i].flavor_text;
				});
			});
		})
		.catch((err) => console.error("Error fetching Pokémon data:", err));
};

$("button").on("click", () => {
	if (!$("#pokemon-section").hasClass("d-none")) {
		$("#pokemon-section").addClass("d-none");
	}
	const promises = [getPokemon(pokemon1), getPokemon(pokemon2), getPokemon(pokemon3)];

	Promise.all(promises).then(() => {
		setTimeout(() => {
			$("#pokemon-section").removeClass("d-none");
			$("#title1").text(pokemon1.name);
			$("#title2").text(pokemon2.name);
			$("#title3").text(pokemon3.name);

			$("#img1").attr("src", pokemon1.image);
			$("#img2").attr("src", pokemon2.image);
			$("#img3").attr("src", pokemon3.image);

			$("#text1").text(pokemon1.text);
			$("#text2").text(pokemon2.text);
			$("#text3").text(pokemon3.text);
		}, 500);
	});
});
