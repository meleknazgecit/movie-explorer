import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";    
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import Favorites from "./pages/Favorites";
import { FavoritesProvider } from "./context/FavoritesContext";
import NotFound from "./pages/NotFound";

function App() {
    return (
        <FavoritesProvider>

            <BrowserRouter>

                <Header />

                <Routes>

                    <Route
                        path="/"
                        element={<Home />}
                    />

                    <Route
                        path="/movie/:id"
                        element={<MovieDetail />}
                    />

                    <Route
                        path="/favorites"
                        element={<Favorites />}
                    />

                    <Route
                        path="*"
                        element={<NotFound />}
                    />

                </Routes>

            </BrowserRouter>

        </FavoritesProvider>
    );
}

export default App;