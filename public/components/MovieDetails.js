const MovieDetails = {
  render: async (movie) => {
    const view = `
      <div>
        <h3>Title: ${movie.Title}</h3>
        <div>Director: ${movie.Director}</div>
        <div>Actors: ${movie.Actors}</div>
        <div>Year: ${movie.Year}</div>
      </div>
    `;
    return view;
  },
}

export default MovieDetails