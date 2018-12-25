import keys from './config/keys.js';
import MovieList from './components/MovieList.js';
import MovieDetails from './components/MovieDetails.js';

/**
 * get what is currently being displayed
 */
const view = document.getElementById('body-container');

/**
 * Get all routes available from our index.html
 */
let activeRoutes = Array.from(document.querySelectorAll('[route]'));

/**
 * We assign an event listener to every active route.
 */
activeRoutes.forEach(function(route) {
  route.addEventListener('click', navigate, false);
})

/**
 * navigate function that will re-render the view for us depends on which route we go to
 */
function navigate(){
  // get the value of route path
  const route = event.target.attributes.route.value;

  // this to handle wildcard value
  const routeFragments = route.split('/');

  if (route === "/" || route === "/home") {
    view.innerHTML = "Home Page";
    appendRoutePath("home");
    document.getElementById("fav-btn").classList.remove("active");
    document.getElementById("home-btn").classList.add("active");
  } 
  else if (route === "/search") {
    utils.handleSearch();
    appendRoutePath(route);
  } 
  else if (route === "/favorites") {
    utils.handleFetchFavorites();
    appendRoutePath(route);
    document.getElementById("fav-btn").classList.add("active");
    document.getElementById("home-btn").classList.remove("active");
  }
  else if (routeFragments[2] && routeFragments[1] === 'search') {
    utils.handleMovieSelect(routeFragments[2]);
    appendRoutePath(route);
  } 
  else if (routeFragments[1] === 'favorites') {
    utils.handleSaveToFavorite(routeFragments[2], routeFragments[3]);
    appendRoutePath(route);
  }
  else {
    view.innerHTML = "Page not found";
    appendRoutePath(route);
  }
}

// a helper function to append route path.
const appendRoutePath = (path) => {
  window.history.pushState({}, '', path);
}


const urlPrefix = "http://www.omdbapi.com/";

// util and request functions
export const utils = {

  handleSearch: () => {
    const searchParam = document.getElementById('term').value;
    const url = `${urlPrefix}?s=${searchParam}&${keys.omdb}`;

    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then(({ Search }) => {
        return MovieList.render(Search, false);
      })
      .then((movieList) => {
        view.innerHTML = movieList;
        activeRoutes = Array.from(document.querySelectorAll('[route]'));
        activeRoutes.forEach(function(route) {
          route.addEventListener('click', navigate, false);
        })
      })
  },

  handleMovieSelect: (id) => {
    const url = `${urlPrefix}?i=${id}&${keys.omdb}`;

    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return MovieDetails.render(data);
      })
      .then((movieDetails) => {
        view.innerHTML = movieDetails;
      })
  },

  handleSaveToFavorite: (imdbID, Title) => {
    const movieInfo = {
      imdbID,
      Title
    }
    
    fetch(`/api/favorites/`, {
      method: 'post',
      body: JSON.stringify(movieInfo),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => {
      return response.json();
    }).then((data) => {
      console.log(data);
    })
  },

  handleFetchFavorites: () => {
    fetch(`/api/favorites/`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data)
        return MovieList.render(data, true);
      })
      .then((favorites) => {
        view.innerHTML = favorites;
        activeRoutes = Array.from(document.querySelectorAll('[route]'));
        activeRoutes.forEach(function(route) {
          route.addEventListener('click', navigate, false);
        })
      })
  }
}

