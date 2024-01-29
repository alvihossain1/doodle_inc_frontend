import { useLocation, useParams } from "react-router-dom";
import Navbar from "./components/navbar";
import { useEffect, useState } from "react";
import { getCommentsController, deleteCommentsController, updateCommentsController } from '../middlewares/axios'

export default function ViewComments(props) {
    const location = useLocation()
    const blog = location.state;
    console.log(location)

    const [comments, setComments] = useState([])
    const [status, setStatus] = useState(-1)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [body, setBody] = useState("")
    const [editID, setEditID] = useState("")

    const [cacheComments, setCacheComments] = useState(JSON.parse(localStorage.getItem("comments") || "[]"));

    useEffect(() => {
        fetchComments()
    }, [])

    async function fetchComments() {
        let response = await getCommentsController(blog.id);
        console.log(response)
        setStatus(response.status)
        console.log("DATA: ", comments)
        let blogid = localStorage.getItem("commentBlogId")
        if (blogid !== blog.id) {
            localStorage.setItem("commentBlogId", blog.id)
            localStorage.setItem("comments", JSON.stringify(response.data))
            setComments(response.data)
        }
        else {
            setComments(cacheComments)
        }
    }

    async function deleteComment(id) {
        let response = await deleteCommentsController(id);
        console.log(response)
        if (response.status === 200) {
            fetchComments();
        }

    }

    async function updateComment(comment) {
        setEditID(comment.id);
        setName(comment.name);
        setEmail(comment.email);
        setBody(comment.body);
    }

    async function updateCommentDone(comment, blog) {
        let data = { id: comment.id, blogId: blog.id, email: email, name: name, body: body }
        let response = await updateCommentsController(data);
        console.log(response)
        if (response.status === 200) {
            fetchComments();
            setEditID(-1);
        }
    }

    let output;
    if (status === 200) {
        if (comments.length !== 0) {
            output = (
                <>
                    <h4 className="m-0 p-0">Comments on this blog</h4>
                    {
                        comments.map((comment, index) => (
                            editID !== comment.id ?
                                <div className="row m-0 p-0">
                                    <div className="col-1 p-0 m-0 d-flex justify-content-center py-3">
                                        <div className="bg-color-1 h-100 text-white p-1 rounded">

                                        </div>
                                    </div>
                                    <div className="col-11 p-0 m-0">
                                        <div className="w-100 ml-auto blog-card p-3 my-2">
                                            <p className="m-0">Id: {comment.id}</p>
                                            <p className="m-0">BlogId: {comment.blogId}</p>
                                            <p className="m-0">Name: {comment.name}</p>
                                            <p className="m-0">Email: {comment.email}</p>
                                            <p className="m-0">Body: {comment.body}</p>
                                            <div className="my-1 w-100 d-flex flex-wrap gap-2">
                                                <button className="button" onClick={() => updateComment(comment)}>Update Comment</button>
                                                <button className="button" onClick={() => deleteComment(comment.id)}>Delete Comment</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                :
                                <div className="row m-0 p-0">
                                    <div className="col-1 p-0 m-0 d-flex justify-content-center py-3">
                                        <div className="bg-danger h-100 text-white p-1 rounded">

                                        </div>
                                    </div>
                                    <div className="col-11 p-0 m-0">
                                        <div className="w-100 ml-auto blog-card p-3 my-2">
                                            <p className="m-0">Id: {comment.id}</p>
                                            <p className="m-0">BlogId: {comment.blogId}</p>
                                            <div className='d-flex flex-column mb-1'>
                                                <p className="m-0">Name: </p>
                                                <input type="text" className="edit-input" onChange={(e) => { setName(e.target.value) }} value={name} />
                                            </div>
                                            <div className='d-flex flex-column mb-1'>
                                                <p className="m-0">Email: </p>
                                                <input type="text" className="edit-input" onChange={(e) => { setEmail(e.target.value) }} value={email} />
                                            </div>
                                            <div className='d-flex flex-column mb-1'>
                                                <p className="m-0">Body: </p>
                                                <textarea type="text" className="edit-input text-area-input" onChange={(e) => { setBody(e.target.value) }} value={body} />
                                            </div>
                                            <div className="my-1 w-100 d-flex flex-wrap gap-2">
                                                <button className="button" onClick={() => updateCommentDone(comment, blog)}>Okay</button>
                                                <button className="button" onClick={() => setEditID(-1)}>Cancel</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        ))
                    }
                </>
            )
        }
        else {
            output = (
                <h3 className='my-1 light-text fw-bolder'>No comments on this blog yet.</h3>
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
            <div className="container">
                <div className="blog-content">
                    <div className="blog-card p-3 my-2">
                        <p className="m-0">Id: {blog.id}</p>
                        <p className="m-0">UserId: {blog.userId}</p>
                        <p className="m-0">Title: {blog.title}</p>
                        <p className="m-0">Body: {blog.body}</p>
                    </div>
                </div>
                <div className="comment-content">
                    {output}
                </div>
            </div>
        </div>
    )

    
    
}