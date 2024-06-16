import { useState, useEffect } from 'react'
import './MovieList.css'
import MovieCard from '../MovieCard/MovieCard'

const MovieList = () => {
    //UseState variable for movies 
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        //Fetch movies from the API
        const apiKey = import.meta.env.VITE_API_KEY;
        let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`; 

        async function fetchMovies() {
            const response = await fetch(url);
            const data = await response.json();

            //Set the movies to the data from the API
            setMovies(data.results);
        }

        fetchMovies();

    }, []);

    console.log("movies are:", movies);

    return (
        <div className='card-grid'>
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id} 
                    title={movie.title}
                    rating={movie.vote_average}
                    image={movie.poster_path}
                />
            ))}
            
        </div>
    )
}

export default MovieList;
