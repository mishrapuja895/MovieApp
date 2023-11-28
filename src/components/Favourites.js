import React, { useState, useEffect } from "react";
import { movies } from "../moviesData";

const Favourites = () => {
  const [genres, setGenres] = useState([]);
  const [currgenre, setCurrgenre] = useState("All genres");
  const [moviesData, setMoviesData] = useState([]);
  const [currText, setCurrText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  let genreids = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Sci-Fi",
    10770: "TV",
    53: "Thriller",
    10752: "War",
    37: "Western",
  };

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("movies-app") || "[]");
    let tempArr = [];

    data.forEach((movieObj) => {
      if (!tempArr.includes(genreids[movieObj.genre_ids[0]])) {
        tempArr.push(genreids[movieObj.genre_ids[0]]);
      }
    });

    tempArr.unshift("All genres");

    setMoviesData([...data]);
    setGenres([...tempArr]);
  }, []);

  const handleGenreChange = (genre) => {
    setCurrgenre(genre);
    setCurrentPage(1); // Reset current page when genre changes
  };

  const sortPopularityDesc = () => {
    let temp = [...moviesData];
    temp.sort((objA, objB) => objB.popularity - objA.popularity);
    setMoviesData([...temp]);
  };

  const sortPopularityAsc = () => {
    let temp = [...moviesData];
    temp.sort((objA, objB) => objA.popularity - objB.popularity);
    setMoviesData([...temp]);
  };

  const sortRatingAsc = () => {
    let temp = [...moviesData];
    temp.sort((objA, objB) => objA.vote_average - objB.vote_average);
    setMoviesData([...temp]);
  };

  const sortRatingDesc = () => {
    let temp = [...moviesData];
    temp.sort((objA, objB) => objB.vote_average - objA.vote_average);
    setMoviesData([...temp]);
  };

  const handleDelete = (movieId) => {
    const updatedMovies = moviesData.filter((movie) => movie.id !== movieId);
    setMoviesData([...updatedMovies]);
    // Update localStorage if needed
    localStorage.setItem("movies-app", JSON.stringify(updatedMovies));
  };

  const filterArr =
    currText
      ? moviesData.filter((movieObj) =>
          movieObj.original_title
            .toLowerCase()
            .includes(currText.toLowerCase().trim())
        )
      : currgenre !== "All genres"
      ? moviesData.filter(
          (movieObj) => genreids[movieObj.genre_ids[0]] === currgenre
        )
      : moviesData;

  const totalPages = Math.ceil(filterArr.length / 4);
  const startIndex = (currentPage - 1) * 4;
  const endIndex = startIndex + 4;
  const moviesToDisplay = filterArr.slice(startIndex, endIndex);

  return (
    <div className="main">
      <div className="row">
        <div className="col-3">
          <ul className="list-group genre-selector">
            {genres.map((genre) => (
              <li
                key={genre}
                className={`list-group-item ${
                  currgenre === genre ? "selected-genre" : ""
                }`}
                onClick={() => handleGenreChange(genre)}
              >
                {genre}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-9 favourites-table">
          <div className="row">
            <input
              placeholder="Search"
              type="text"
              className="input-group-text col"
              value={currText}
              onChange={(e) => setCurrText(e.target.value)}
            />
            <input type="number" className="input-group-text col" />
          </div>

          <div className="row">
            <table className="table">
              <thead>
                <tr>
                  <th></th>
                  <th scope="col">Title</th>
                  <th scope="col">Genre</th>
                  <th scope="col">
                    <i
                      className="fa-solid fa-sort-up"
                      onClick={sortPopularityDesc}
                    ></i>
                    Popularity
                    <i
                      className="fa-solid fa-sort-down"
                      onClick={sortPopularityAsc}
                    ></i>
                  </th>
                  <th scope="col">
                    <i
                      className="fa-solid fa-sort-up"
                      onClick={sortRatingDesc}
                    ></i>
                    Ratings
                    <i
                      className="fa-solid fa-sort-down"
                      onClick={sortRatingAsc}
                    ></i>
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {moviesToDisplay.map((movieElem) => (
                  <tr key={movieElem.title}>
                    <td>
                      <img
                        style={{ width: "6rem" }}
                        src={`https://image.tmdb.org/t/p/original${movieElem.backdrop_path}`}
                        alt={movieElem.title}
                      />
                    </td>
                    <td>{movieElem.title}</td>
                    <td>{genreids[movieElem.genre_ids[0]]}</td>
                    <td>{movieElem.popularity}</td>
                    <td>{movieElem.vote_average}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => handleDelete(movieElem.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li
                className={`page-item ${
                  currentPage === 1 ? "disabled" : ""
                }`}
              >
                <a
                  className="page-link"
                  onClick={() =>
                    setCurrentPage((prevPage) => prevPage - 1)
                  }
                >
                  Previous
                </a>
              </li>
              {Array.from({ length: totalPages }, (_, index) => (
                <li
                  key={index + 1}
                  className={`page-item ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                >
                  <a
                    className="page-link"
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </a>
                </li>
              ))}
              <li
                className={`page-item ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
              >
                <a
                  className="page-link"
                  onClick={() =>
                    setCurrentPage((prevPage) => prevPage + 1)
                  }
                >
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Favourites;