const MovieListEntry = {

  /**
   * Delete from favorites doesn't actually work, its just a placeholder
   */
  render: (movie, favorites) =>{
    let view = `
      <div class="movie-entry" style="border: black 1px solid;">
        <div>${movie.Title}</div>
        <button route="/search/${movie.imdbID}">DETAILS</button>
        ${favorites ? `<button>DELETE FROM FAVORITES</button>` : `<button route="/favorites/${movie.imdbID}/${movie.Title}">FAVORITE</button>`}
      </div>
    `
    return view;
  }
}

export default MovieListEntry