import { createContext, useContext, useEffect, useState } from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState(() => {
        const savedFavorites = localStorage.getItem("favorites");

        return savedFavorites
            ? JSON.parse(savedFavorites)
            : [];
    });

    useEffect(() => {
        localStorage.setItem(
            "favorites",
            JSON.stringify(favorites)
        );
    }, [favorites]);

    function toggleFavorite(movie) {
        setFavorites((currentFavorites) => {
            const isFavorite = currentFavorites.some(
                (favorite) => favorite.id === movie.id
            );

            if (isFavorite) {
                return currentFavorites.filter(
                    (favorite) => favorite.id !== movie.id
                );
            }

            return [...currentFavorites, movie];
        });
    }

    function isFavorite(movieId) {
        return favorites.some(
            (favorite) => favorite.id === movieId
        );
    }

    return (
        <FavoritesContext.Provider
            value={{
                favorites,
                toggleFavorite,
                isFavorite
            }}
        >
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    return useContext(FavoritesContext);
}