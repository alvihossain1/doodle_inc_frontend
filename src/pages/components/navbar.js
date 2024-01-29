import { Link } from "react-router-dom";
export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark py-2">
            <div className="container">
                <Link to="/">
                    <div className="py-2">
                        <h4 className="m-0 a-link">Blogs & Comments</h4>
                    </div>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav d-flex justify-content-end w-100">
                        <Link to="/">
                            <p className="a-link mb-0 para-font">Home</p>
                        </Link>
                        <Link to="/CreateBlog">
                            <p className="a-link mb-0 para-font">Create Blog</p>
                        </Link>
                        <Link to="/Favorites">
                            <p className="a-link mb-0 para-font">Favorites</p>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

