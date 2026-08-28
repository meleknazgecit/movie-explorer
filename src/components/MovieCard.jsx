import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

function MovieCard({ id, title, year, rating, poster }) {
    const { toggleFavorite, isFavorite } = useFavorites();

    const movie = {
        id,
        title,
        release_date: year,
        vote_average: rating,
        poster_path: poster
    };

    function handleFavorite(event) {
        event.preventDefault();
        event.stopPropagation();

        toggleFavorite(movie);
    }

    return (
        <Link
            to={`/movie/${id}`}
            className="movie-card"
        >

            <div className="movie-poster">

                {poster ? (
                    <img
                        src={`https://image.tmdb.org/t/p/w500${poster}`}
                        alt={title}
                    />
                ) : (
                    <span>🎬</span>
                )}

                <button
                    className="favorite-button"
                    onClick={handleFavorite}
                >
                    {isFavorite(id) ? "❤️" : "🤍"}
                </button>

            </div>

            <div className="movie-info">

                <h2>{title}</h2>

                <p>{year}</p>

                <p>⭐ {rating}</p>

            </div>

        </Link>
    );
}

export default MovieCard;