import { useState, useEffect } from 'react'
import './MovieList.css'
import MovieCard from '../MovieCard/MovieCard'
import Modal from '../Modal/Modal'

const MovieList = () => {
    //UseState variables for movies and page 
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [isSearching, setIsSearching] = useState(false);

    //Search variables 
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedMovie, setSelectedMovie] = useState(null);
    const apiKey = import.meta.env.VITE_API_KEY;

    useEffect(() => {
        //Fetch movies 
        let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${page}`; 
        // const apiKey = import.meta.env.VITE_API_KEY;

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

    }, [page, isSearching]);

    //Search fetch
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

    // const set

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

                        if(e.target.value === "") {
                            setIsSearching(false);
                        } else { 
                            setIsSearching(true);
                        }
                    }}
                    className="searchBar" 
                />

                <button className="searchButton" onClick={handleSearch}>
                    <span className="material-symbols-outlined" >Search</span>
                </button>
            </div>

            

            <div className='card-grid'>
                {filteredMovies.map((movie, index) => (
                    <MovieCard
                        key={index} 
                        title={movie.title}
                        rating={movie.vote_average}
                        image={movie.poster_path}
                        onClick={() => setSelectedMovie(movie)}
                    />
                ))}
            </div>

            <a>
                <button className="load-more-button" onClick={loadMoreFunction}>Load More</button>
            </a>

                
            {selectedMovie && (
                <Modal 
                    show={selectedMovie !== null}
                    onClose={() => setSelectedMovie(null)}
                >
                    <h2>{selectedMovie.title}</h2>
                    <img 
                        src={`https://image.tmdb.org/t/p/w500/${selectedMovie.backdrop_path}`}
                        alt={selectedMovie.title}
                        style={{width: "100%"}}
                    />
                    <p>{selectedMovie.release_date}</p>
                    {/* <p>{`https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=${apiKey}`}</p> */}
                    <p>{selectedMovie.overview}</p>
                </Modal>
            )}
        </> 
    );
}

export default MovieList;
