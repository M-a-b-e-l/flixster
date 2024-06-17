import { useState, useEffect } from 'react'
import './MovieList.css'
import MovieCard from '../MovieCard/MovieCard'

const MovieList = () => {
    //UseState variables for movies and page 
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);

    //Search variables 
    const [searchTerm, setSearchTerm] = useState("");
    // const [selectedMovie, setSelectedMovie] = useState(null);
    const apiKey = import.meta.env.VITE_API_KEY;

    useEffect(() => {
        //Fetch movies 
        let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${page}`; 
        

        //Set the movies to the data from the API
        async function fetchMovies() {
            const response = await fetch(url);
            const data = await response.json();

            if(data.results && data.results.length > 0) {
                setMovies(prevMovies => (
                page === 1 ? data.results : [...prevMovies, ...data.results]));
            } else { 
                if (page === 1) {
                    setMovies([]);
                }
            }  
        }

        fetchMovies();

    }, [page]);


    let SearchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&page=${page}&query=${searchTerm}`;

    async function fetchSearch () {

        const response = await fetch(SearchUrl);
        const data = await response.json();

        console.log(data.results);

        if(data.results && data.results.length > 0) {
            setMovies(prevMovies => (
            page === 1 ? data.results : [...prevMovies, ...data.results]));
        } else { 
            if (page === 1) {
                setMovies([]);
            }
        }
    }

    //Load more 
    const loadMoreFunction = () => {
        setPage(page => page + 1);
        
    };

    const handleSearch = () => {
        setPage(1); 
        console.log("in handle search");
        fetchSearch(); 
    };

    // Filtering Movies
    const filteredMovies = movies.filter((movie) => 
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <>
            <div className='searchContainer'>
                <input 
                    type="text"
                    placeholder='Search'
                    value={searchTerm}
                    onChange={(e) => {setSearchTerm(e.target.value)
                        handleSearch();
                    }}
                    className="searchBar" 
                />
                <button className="searchButton" onClick={handleSearch}>Search</button>
            </div>

            

            <div className='card-grid'>
                {filteredMovies.map((movie, index) => (
                    <MovieCard
                        key={index} 
                        title={movie.title}
                        rating={movie.vote_average}
                        image={movie.poster_path}
                    />
                ))}
            </div>

            <a>
                <button className="load-more-button" onClick={loadMoreFunction}>Load More</button>
            </a>
        
        </> 
    );
}

export default MovieList;
