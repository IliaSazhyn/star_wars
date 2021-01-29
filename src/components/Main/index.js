import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";

const Main = () => {

const [movies, setMovies] = useState([]);
const [loading, setLoading] = useState(false);
const [filterText, setFilterText] = useState("");

const getMovies = async () => {
    setLoading(true);

    try {
      const response = await axios.get('https://swapi.dev/api/films/')
      let sortFilms = response.data.results.map(i  => ({ ...i }));
      sortFilms.sort((a, b) =>
      a.title.localeCompare(b.title)
      );

      setMovies(sortFilms);
      setLoading(false);

      return response.data.results;
    } catch (error) {
      alert(`Throwing ${error}`);
      throw error;
    }
  };

useEffect(() => {
    getMovies();

  }, []);


const filteredItems = movies.filter(
    item => item.title.toLocaleLowerCase().includes(filterText)
);

const itemsShow = filterText ? filteredItems : movies;

console.log(movies);

    return (
        <section id="app">
{loading && <div>Loading</div> }

<input type="text" placeholder="Enter keyword to filter" value={filterText} onChange={e => setFilterText(e.target.value.toLocaleLowerCase())} />

{itemsShow.map((movie, index) => (
    <Link key={movie.episode_id}  to={`films/${movie.episode_id}`}>
<div key={index}>
    <h3>{movie.title}</h3>
    <p>{movie.opening_crawl}</p>
    </div>
    </Link>
))}
        </section>
    )
}

export default Main;