import Navbar from "./components/navbar";

export default function Home() {
    return (
        <div className="main">
            <Navbar />
            <div className="container">                
                <div className="input-card p-3 my-3">
                    <h4>Sign Up</h4>
                    <div>
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">User ID</label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control" />
                        </div>
                        <button type="submit" className="btn btn-dark">Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    )
}