const fetch = require("node-fetch");
console.time("timer");

const charCounter = (accum, current, char) => {
  let count = 0;
  position = current.name.toLowerCase().indexOf(char);
  while (position !== -1) {
    // tengo que contar cuantas veces se repite dentro del mismo name, indexOf devuelve índice primera ocurrencia
    count += 1;
    position = current.name.toLowerCase().indexOf(char, position + 1);
  }
  return accum + count;
};
const counter = (type, char) =>
  type.reduce((accum, current) => charCounter(accum, current, char), 0);

const auxArray = (size) =>
  Array(size)
    .fill()
    .map((_, index) => index + 1);

// arrays auxiliares con índices para hacer get múltiples debido a que la paginación no trae todos los resultados
const arrayCharacters = auxArray(671);
const arrayLocations = auxArray(108);
const arrayEpisodes = auxArray(41);

const getAllData = async (baseUrl) => {
  const getCharacters = await fetch(`${baseUrl}/character/${arrayCharacters}`);
  const getLocations = await fetch(`${baseUrl}/location/${arrayLocations}`);
  const getEpisodes = await fetch(`${baseUrl}/episode/${arrayEpisodes}`);
  const characters = await getCharacters.json();
  const locations = await getLocations.json();
  const episodes = await getEpisodes.json();

  return [characters, locations, episodes];
};

getAllData("https://rickandmortyapi.com/api").then(
  ([characters, locations, episodes]) => {
    console.log("\n\r");
    console.log(`Apariciones letra l en locations: ${counter(locations, "l")}`);
    console.log(`Apariciones Letra e en episodes: ${counter(episodes, "e")}`);
    console.log(
      `Apariciones letra c en characters: ${counter(characters, "c")}`
    );
    console.log("\n\r");

    episodes.forEach((episode) => {
      const mySet = new Set();
      console.log(`Episodio ${episode.id}`);
      console.log("==============");
      episode.characters.forEach((character) => {
        characterId = character.split("/").pop(); // extraigo id de la url del character
        characterOrigin = characters[characterId - 1].origin.name;
        mySet.add(characterOrigin); // para evitar repeticiones guardo en un set
      });
      console.log(`Locations(origin) distintas: ${mySet.size}`);
      console.log("Listado: ");
      for (let item of mySet) console.log("\t" + item);
      console.log("\n\r");
    });
    console.timeEnd("timer");
    console.log("I love Chipax");
  }
);
