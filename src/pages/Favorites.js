import React, { useEffect, useState } from 'react'
import Navbar from "./components/navbar";

export default function Favorites() {


    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem("favorites") || "[]"));

    function removeFavorite(blog){
        console.log(favorites)
        let favs = favorites.filter(function(fav) {
            return blog.id !== fav.id 
        })
        setFavorites(favs);
        localStorage.setItem("favorites", JSON.stringify(favs));
    }

    let output;
    if (favorites.length !== 0) {
        output = (
            favorites.map((blog, index) => (
                <div key={index} className="blog-card p-3 my-2">
                    <p className="m-0">Id: {blog.id}</p>
                    <p className="m-0">UserId: {blog.userId}</p>
                    <p className="m-0">Title: {blog.title}</p>
                    <p className="m-0">Body:  {blog.body}</p>
                    <div className="my-1 w-100 d-flex flex-wrap gap-2">
                        <button className="button" onClick={() => removeFavorite(blog)}>Remove Favorite</button>                        
                    </div>                    
                </div>
            ))
        )

    }
    else {
        output = (
            <h3 className='my-1 light-text fw-bolder'>No Favorite Blogs To show</h3>
        )
    }


    return (
        <div className="main">
            <Navbar />
            <div className="container">
                {output}
            </div>
        </div>
    )
}