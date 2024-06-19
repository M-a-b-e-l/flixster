import { useState, useEffect } from 'react'
import './MovieList.css'
import MovieCard from '../MovieCard/MovieCard'
import Modal from '../Modal/Modal'

const MovieList = () => {
    //UseState variables for movies and page 
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [sorting, setSorting] = useState('false');

    //Search variables 
    const [searchTerm, setSearchTerm] = useState("");
    
    const [selectedMovie, setSelectedMovie] = useState(null);
    const apiKey = import.meta.env.VITE_API_KEY;

    useEffect(() => {
        //Fetch movies 
        let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${page}`; 
        // const apiKey = import.meta.env.VITE_API_KEY;

        if(searchTerm.trim() !== "") {
            url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&page=${page}&query=${searchTerm}`;
        }

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

    }, [page, apiKey, searchTerm]);

    //Search fetch
    let SearchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&page=${page}&query=${searchTerm}`;

    async function fetchSearch () {
        if(searchTerm.trim() === "") {
            SearchUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${page}`;
        }
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

    let SortUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}`;
    async function fetchSort () {
        if(sorting === true) {
            
            const response = await fetch(SortUrl);
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

        if(sorting == false) {
            SearchUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${page}`;
        }
    }
    

    //Load more 
    const loadMoreFunction = () => {
        setPage(page => page + 1);
        
    };


    const handleSortByName = () => {
        setSorting('true');
        fetchSort();
        const sortedMovies = [...movies].sort((a, b) => a.title.localeCompare(b.title));
        console.log(sortedMovies);
        setMovies(sortedMovies);
    };

    const handleSortByDate = () => {
        setSorting('true');
        fetchSort();
        const sortedMovies = [...movies].sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
        setMovies(sortedMovies);
    };

    const handleSortByRating = () => {
        setSorting('true');
        fetchSort();
        const sortedMovies = [...movies].sort((a, b) => b.vote_average - a.vote_average);
        setMovies(sortedMovies);
    };

    const handleSearch = () => {
        setPage(1); 
        console.log("in handle search");
        fetchSearch(); 
        
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Filtering Movies
    const filteredMovies = movies.filter((movie) => 
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <>
            <div className='searchContainer'>
                <div className="dropdown">
                    <button className="dropbtn">Sort By</button>
                    <div className="dropdown-content">
                        <a href="#" onClick={handleSortByName}>A-Z</a>
                        <a href="#" onClick={handleSortByDate}>Release Date</a>
                        <a href="#"onClick={handleSortByRating}>Rating</a>
                    </div>
                </div>

                <div className='search-elements'>
                    <input 
                        type="text"
                        placeholder='Search'
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="searchBar" 
                    />

                    <div>
                        <button className="searchButton" onClick={handleSearch}>
                            <span className="material-symbols-outlined">Search</span>
                        </button>
                    </div>
                    
                </div>
                
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
                    <p><strong>Release Date:</strong> {selectedMovie.release_date}</p>
                    <p><strong>Overview</strong><br></br>{selectedMovie.overview}</p>

                </Modal>
            )}
        </> 
    );
}

export default MovieList;
