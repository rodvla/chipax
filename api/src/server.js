const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const fetch = require("node-fetch");
const server = express();

server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // CORS
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

server.get("/challenge", async function (req, res) {
  let start = new Date().getTime();

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
    const getCharacters = await fetch(
      `${baseUrl}/character/${arrayCharacters}`
    );
    const getLocations = await fetch(`${baseUrl}/location/${arrayLocations}`);
    const getEpisodes = await fetch(`${baseUrl}/episode/${arrayEpisodes}`);
    const characters = await getCharacters.json();
    const locations = await getLocations.json();
    const episodes = await getEpisodes.json();

    return [characters, locations, episodes];
  };

  let matches = [];
  let originLocations = [];
  await getAllData("https://rickandmortyapi.com/api").then(
    ([characters, locations, episodes]) => {
      matches.push(
        counter(locations, "l"),
        counter(episodes, "e"),
        counter(characters, "c")
      );

      episodes.forEach((episode) => {
        const mySet = new Set();
        episode.characters.forEach((character) => {
          characterId = character.split("/").pop(); // extraigo id de la url del character
          characterOrigin = characters[characterId - 1].origin.name;
          mySet.add(characterOrigin); // para evitar repeticiones guardo en un set
        });
        originLocations.push({ id: episode.id, locations: [...mySet] });
      });
    }
  );
  let end = new Date().getTime();
  return res.status(200).json({ matches, originLocations, time: end - start });
});

server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = { server };
