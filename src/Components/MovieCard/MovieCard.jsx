import './MovieCard.css'

import PropTypes from 'prop-types';

const MovieCard = (props) => {

    return (
        <>
            <div className='movie-card'>
                    <img src={`https://image.tmdb.org/t/p/w500/${props.image}`} alt={props.title} />
                    <h3>{props.title}</h3>
                    <p>Rating: {props.rating}</p>
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
