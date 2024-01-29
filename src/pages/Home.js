import React, { useEffect, useState } from 'react'
import Navbar from "./components/navbar";
import { getBlogsController, updateBlogsController, deleteBlogsController } from '../middlewares/axios'
import ModalComment from './components/modalComment';
import { Link, useNavigate } from "react-router-dom";

export default function Home() {

    const [blogs, setBlogs] = useState([])
    const [status, setStatus] = useState(1)

    const [editID, setEditID] = useState(-1)
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")

    const[commentModal, setCommentModal] = useState(false)
    const[blogData, setBlogData] = useState({})

    const navigate = useNavigate()

    useEffect(() => {
        fetchBlogs();
    }, [])

    async function fetchBlogs() {
        let response = await getBlogsController();
        console.log(response)
        setStatus(response.status)
        setBlogs(response.data)
        console.log(blogs)
        console.log(status)
    }

    function updateBlogStart(blog){
        setEditID(blog.id);
        setTitle(blog.title); setBody(blog.body);
    }

    async function updateBlog(id) {
        let data = {id, title, body}
        let response = await updateBlogsController(data);
        console.log(response)
        if(response.status === 200){
            fetchBlogs();
            setEditID(-1);
            setTitle(""); setBody("");
        }
        
    }

    async function deleteBlog(id) {
        let response = await deleteBlogsController(id);
        console.log(response)
        if(response.status === 200){
            fetchBlogs();
        }
        
    }

    function openCommentModal(blog){
        console.log(blog)
        setCommentModal(true)
        setBlogData(blog)
    }

    function addFavorites(blog){
        let favs = JSON.parse(localStorage.getItem("favorites") || "[]")
        favs.push(blog)
        localStorage.setItem("favorites", JSON.stringify(favs))
        console.log(favs)
    }

    let output;
    if (status === 200) {
        if(blogs.length !== 0){
            output = (
                blogs.map((blog, index) => (
                    blog.id === editID ?                 
                        <div key={index} className="blog-card p-3 my-2">
                            <p className="m-0">Id: {blog.id}</p>
                            <p className="m-0">UserId: {blog.userId}</p>
                            <div className='mt-2 mb-1'>
                            <div className='d-flex flex-column mb-1'>
                                <p className="m-0">Title: </p>
                                <input type="text" className="edit-input" onChange={(e) => { setTitle(e.target.value) }} value={title} />
                            </div>
                            <div className='d-flex flex-column mb-2'>
                                <p className="m-0">Body:</p>
                                <textarea type="text" className="edit-input text-area-input" onChange={(e) => { setBody(e.target.value) }} value={body} />
                            </div>
                            </div>
                            <div className="my-1 w-100 d-flex flex-wrap gap-2">
                                <button className="button"  onClick={() => updateBlog(blog.id)}>Done</button>
                                <button className="button"  onClick={() => setEditID(-1)}>Cancel</button>
                            </div>
                        </div>
                    : 
                    <div key={index} className="blog-card p-3 my-2">
                            <p className="m-0">Id: {blog.id}</p>
                            <p className="m-0">UserId: {blog.userId}</p>
                            <div className='mt-2 mb-1'>
                                <p className="m-0">Title: {blog.title}</p>
                                <p className="m-0">Body: {blog.body}</p>
                            </div>
                            <div className="my-1 w-100 d-flex flex-wrap gap-2">
                                <button className="button" onClick={() => updateBlogStart(blog)}>Update Blog</button>
                                <button className="button" onClick={() => deleteBlog(blog.id)}>Delete Blog</button>
                                <button className="button" onClick={() => openCommentModal(blog)}>Add Comments</button>
                                <button className="button" onClick={() => navigate("/viewComments", {replace: false, state: blog})}>View Comments</button>
                                <button className="button" onClick={() => addFavorites(blog)}>Add to Favorites</button>                                
                            </div>
                        </div>
                ))
            )
        } 
        else{
            output = (
                <h3 className='my-1 light-text fw-bolder'>No Blogs</h3>
            )
        } 
        
    }
    else if (status === 400) {
        output = (
            <h3 className='my-1 light-text fw-bolder'>Network Error...</h3>
        )
    }
    else if (status === 500) {
        output = (
            <h3 className='my-1 light-text fw-bolder'>Server Error....</h3>
        )
    }
    else {
        output = (
            <h3 className='my-1 light-text fw-bolder'>Loading....</h3>
        )
    }

    return (
        <div className="main">
            <Navbar />
            {commentModal ? <ModalComment data={blogData} modalStatus={setCommentModal}/> : <></>}
            <div className="container d-flex flex-column">
                {output}
            </div>
        </div>
    )
}