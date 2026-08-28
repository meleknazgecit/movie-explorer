import { useState } from "react";
import SearchBar from "../components/SearchBar";
import MovieList from "../components/MovieList";

function Home() {
    const [searchText, setSearchText] = useState("");

    function handleSearch(text) {
        setSearchText(text);
    }

    return (
        <div className="app">

            <SearchBar onSearch={handleSearch} />

            <MovieList searchText={searchText} />

        </div>
    );
}

export default Home;