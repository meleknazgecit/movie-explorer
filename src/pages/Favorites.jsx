import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

function Favorites() {
    const { favorites } = useFavorites();

    return (
        <div className="favorites-page">

            <div className="page-header">

                <Link to="/" className="back-link">
                    ← Ana Sayfa
                </Link>

                <h1>❤️ Favorilerim</h1>

            </div>

            {favorites.length === 0 ? (
                <div className="empty-favorites">
                    <h2>Henüz favori filmin yok.</h2>

                    <p>
                        Beğendiğin filmleri favorilerine ekleyebilirsin.
                    </p>

                    <Link to="/">
                        Film keşfet
                    </Link>
                </div>
            ) : (
                <div className="movie-list">

                    {favorites.map((movie) => (
                        <Link
                            key={movie.id}
                            to={`/movie/${movie.id}`}
                            className="movie-card"
                        >

                            <div className="movie-poster">

                                {movie.poster_path ? (
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt={movie.title}
                                    />
                                ) : (
                                    <span>🎬</span>
                                )}

                            </div>

                            <div className="movie-info">

                                <h2>{movie.title}</h2>

                                <p>{movie.release_date}</p>

                                <p>
                                    ⭐ {movie.vote_average}
                                </p>

                            </div>

                        </Link>
                    ))}

                </div>
            )}

        </div>
    );
}

export default Favorites;