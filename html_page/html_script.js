//RUN USING LIVE SERVER EXTENSION
//PREFERENCE : BACKEND

const API_KEY = "3fc0082b43af4ffbad6216c418d66dfe"
const MOVIE_API = "https://api.themoviedb.org/3"
const IMAGE_LINK = "https://image.tmdb.org/t/p/original"

const MOVIE_ARRAY = [];
class Movie {
    constructor(name, rating, release_date, image_src) {
        this.name = name;
        this.rating = rating;
        this.release_date = release_date;
        this.image_src = image_src;
    }
}

function getMovieApi() {
    fetch(`${MOVIE_API}/movie/popular/?api_key=${API_KEY}`)
    .then((res) => res.json())
    .then((data) => {
        data.results.forEach(movie => {
            const {title,vote_average,release_date,poster_path} = movie;

            let d = new Date(release_date);
            let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
            let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
            let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
            let release_date_long = `${mo} ${da},${ye}`;

            MOVIE_ARRAY.push(new Movie(title, vote_average, release_date_long, IMAGE_LINK+poster_path))
        });
        console.log(...MOVIE_ARRAY)
        sortMovieList();
    })
    .catch((err) => console.log(err));
}

getMovieApi();

function renderMovieList() {
    let moviesContainer = document.getElementById("moviesContainer");

    //Delete element to re-render when sorted
    while(moviesContainer.firstChild) {
        moviesContainer.removeChild(moviesContainer.lastChild)
    }

    for(let i=0; i < MOVIE_ARRAY.length; i++) {
        //Creating HTML Elements
        let movieCard = document.createElement("div");
        let movieDetailContainer = document.createElement("div");
        let movieRating = document.createElement("div");
        let movieReleaseDate = document.createElement("h3");
        let movieTitle = document.createElement("h2");
        let movieImageContainer = document.createElement("div");
        let movieImage = document.createElement("img");

        //Giving classnames to elements
        movieCard.className = "movieCard";
        movieDetailContainer.className = "movieDetailContainer";
        movieRating.className = "movieRatingContainer";    
        movieImageContainer.className = "movieImageContainer";
        movieImage.className = "movieImage";

        //Inserting text to respective elements
        movieTitle.innerHTML = `<b>${MOVIE_ARRAY[i].name}</b>`;
        movieRating.innerHTML = MOVIE_ARRAY[i].rating *10;
        movieReleaseDate.innerHTML = MOVIE_ARRAY[i].release_date;
        movieImage.src = MOVIE_ARRAY[i].image_src;
        movieImage.height = 300;
        movieImage.width = 200;

        //Appending elements
        movieImageContainer.appendChild(movieImage);
        movieImageContainer.appendChild(movieRating);
        movieCard.appendChild(movieImageContainer);
        movieCard.appendChild(movieTitle);
        movieCard.appendChild(movieReleaseDate);
       

        moviesContainer.appendChild(movieCard);
    }
}



function sortMovieList() {
    var sortOption = document.getElementById("sortMovie")
    var sortValue = sortOption.value;

    console.log(sortValue);

    if(sortValue === "popularAscending") {
        MOVIE_ARRAY.sort((a,b) => a.rating - b.rating);
    }
    else {
        MOVIE_ARRAY.sort((a,b) => b.rating - a.rating);
    }

    renderMovieList();
}

function openSortMenu() {
    var collapseContent = document.getElementById("sortButtonContainer")
    console.log(collapseContent)
    if(collapseContent.style.display == "block") {
        collapseContent.style.display = "none"
    }
    else {
        collapseContent.style.display = "block";
    }

}