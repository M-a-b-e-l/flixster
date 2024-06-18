import './MovieCard.css'

import PropTypes from 'prop-types';

const MovieCard = ({image, title, rating, onClick}) => {

    return (
        <>
            <div className='movie-card' onClick={onClick}>
                    <img src={`https://image.tmdb.org/t/p/w500/${image}`} alt={title} />
                    <h3>{title}</h3>
                    <p>Rating: {rating}</p>
            </div>
        </>
    )
}

MovieCard.propTypes = {
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired
};

export default MovieCard;
