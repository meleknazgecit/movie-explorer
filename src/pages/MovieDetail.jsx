import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFavorites } from "../context/FavoritesContext";
import api from "../services/tmdbApi";

function MovieDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { toggleFavorite, isFavorite } = useFavorites();

    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function fetchMovie() {
        try {
            setLoading(true);
            setError("");
            
            const response = await api.get(`/movie/${id}`);
            setMovie(response.data);
        } catch (error) {
            console.error(error);
            setError("Film detayları alınırken bir hata oluştu.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchMovie();
    }, [id]);
    
    if (loading) {
        return <p>Film detayları yükleniyor...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

function formatRuntime(minutes) {
    if (!minutes) {
        return "Bilinmiyor";
    }

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours === 0) {
        return `${remainingMinutes} dakika`;
    }

    if (remainingMinutes === 0) {
        return `${hours} saat`;
    }

    return `${hours} saat ${remainingMinutes} dakika`;
}

    return (
    <div className="movie-detail">

        <button
            className="back-button"
            onClick={() => navigate(-1)}
        >
            ← Geri
        </button>

        <div className="movie-detail-content">

            <div className="movie-detail-poster">

                {movie.poster_path ? (
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                    />
                ) : (
                    <span>🎬</span>
                )}

            </div>

            <div className="movie-detail-info">

                <h1>{movie.title}</h1>

                {movie.original_title !== movie.title && (
                    <p className="original-title">
                        Orijinal adı: {movie.original_title}
                    </p>
                )}

                <div className="movie-meta">

                    <span>
                        📅 {movie.release_date || "Tarih yok"}
                    </span>

                    <span>
                        ⭐ {movie.vote_average?.toFixed(1) || "N/A"} / 10
                    </span>

                    <span>
                        ⏱️ {formatRuntime(movie.runtime)}
                    </span>

                </div>

                <div className="movie-language">
                    Dil: {movie.original_language?.toUpperCase()}
                </div>

                <h2>Film Hakkında</h2>

                <p className="movie-overview">
                    {movie.overview || "Bu film için açıklama bulunamadı."}
                </p>

                <div className="movie-genres">

                    <strong>Türler:</strong>

                    {movie.genres?.map((genre) => (
                        <span key={genre.id}>
                            {genre.name}
                        </span>
                    ))}

                </div>

            </div>

            <button
    className="detail-favorite-button"
    onClick={() => toggleFavorite(movie)}
>
    {isFavorite(movie.id)
        ? "❤️ Favorilerden Çıkar"
        : "🤍 Favorilere Ekle"}
</button>

        </div>

    </div>
);    

}

export default MovieDetail;