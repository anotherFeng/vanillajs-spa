import MovieListEntry from './MovieListEntry.js';

const MovieList = {
  render: async (data, favorites) => {
    let view = '';
    const movieEntries = data.map((movie) => {
      return MovieListEntry.render(movie, favorites)
    })
    view = `
      <div>
        ${favorites ? `<h3>Favorites: </h3>` : `<h3>Search Result: </h3>`} 
        ${movieEntries}
      </div>
    `
    return view;
  },
}



export default MovieList