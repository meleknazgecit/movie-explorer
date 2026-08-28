import { useEffect, useState } from "react";
import api from "../services/tmdbApi";
import MovieCard from "./MovieCard";

function MovieList({ searchText }) {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function fetchMovies() {
        try {
            setLoading(true);
            setError("");

            let response;

            if (searchText.trim() === "") {
                response = await api.get("/movie/popular");
            } else {
                response = await api.get("/search/movie", {
                    params: {
                        query: searchText
                    }
                });
            }

            setMovies(response.data.results);
        } catch (error) {
            console.error(error);
            setError("Filmler alınırken bir hata oluştu.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchMovies();
    }, [searchText]);

    return (
        <div className="movie-list">

            {loading && <p>Filmler yükleniyor...</p>}

            {error && <p>{error}</p>}

            {!loading && !error && movies.length === 0 && (
                <p>Film bulunamadı.</p>
            )}

            {!loading && !error && movies.length > 0 && (
                movies.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        id={movie.id}
                        title={movie.title}
                        year={movie.release_date?.split("-")[0]}
                        rating={movie.vote_average?.toFixed(1)}
                        poster={movie.poster_path}
                    />
                ))
            )}

        </div>
    );
}

export default MovieList;