import React, { useState, useEffect } from "react";
import PokeCart from "./components/PokeCart";

const App = () => {
  const [refreshData, setRefreshData] = useState();

  const [allPokemons, setAllPokemons] = useState([]);
  const [loadMore, setLoadMore] = useState([
    "https://pokeapi.co/api/v2/pokemon?limit=10",
  ]);

  //! Click button for

  const click = () => {
    setRefreshData(!refreshData);
  };

  //! Api Connect

  const getAllPokemons = async () => {
    const res = await fetch(loadMore);
    const data = await res.json();

    setLoadMore(data.next);

    // ! Poke Objects

    function createPokemonObject(results) {
      results.forEach(async (pokemon) => {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        const data = await res.json();
        setAllPokemons((currentList) => [...currentList, data]);
      });
    }
    createPokemonObject(data.results);
  };

  const spaceInput = () => {};

  // ! Project start Call Api
  useEffect(() => {
    getAllPokemons();
    spaceInput();
  }, [refreshData]);

  return (
    <div className="app-container">
      <h1>Pokemon</h1>
      <div className="pokemon-container">
        <div className="all-container">
          {allPokemons.map((pokemon, index) => (
            <PokeCart
              id={pokemon.id}
              name={pokemon.name}
              image={pokemon.sprites.other.dream_world.front_default}
              type={pokemon.types[0].type.name}
              key={index}
            />
          ))}
        </div>
      </div>

      <button className="btn" onClick={click}>
        Add Pokemon
      </button>
    </div>
  );
};

export default App;
