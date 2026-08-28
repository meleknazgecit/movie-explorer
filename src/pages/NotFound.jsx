import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div className="not-found">

            <h1>404</h1>

            <h2>Sayfa bulunamadı</h2>

            <p>
                Aradığın sayfa mevcut değil.
            </p>

            <Link to="/">
                Ana Sayfaya Dön
            </Link>

        </div>
    );
}

export default NotFound;