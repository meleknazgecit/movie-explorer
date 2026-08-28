import { useState } from "react";

function SearchBar({ onSearch }) {
    const [input, setInput] = useState("");

    function handleSubmit(event) {
        event.preventDefault();

        onSearch(input);
    }

    return (
        <form className="search-bar" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Film ara..."
                value={input}
                onChange={(event) => setInput(event.target.value)}
            />

            <button type="submit">
                Ara
            </button>
        </form>
    );
}

export default SearchBar;