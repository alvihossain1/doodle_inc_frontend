import React, { useEffect, useState } from 'react'
import Navbar from "./components/navbar";
import {createBlogsController} from '../middlewares/axios'

export default function CreateBlog() {

    const [userIdStr, setUserId] = useState("")
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [output, setOutput] = useState("")

    async function formHandle(e) {
        e.preventDefault()
        if(userIdStr === "" || title === "", body === ""){
            setOutput("Please, fill up all the fields")
            return;
        }
        let id = parseInt("10"+Date.now());
        let userId = parseInt(userIdStr)
        const data = {id, userId, title, body};

        let response = await createBlogsController(data);
        if(response.status === 200){
            setOutput("Data inserted")
            setUserId(""); setTitle(""); setBody("");
        }
    }
    return (
        <div className="main">
            <Navbar />
            <div className="container">
                <div className="input-card p-3 my-3">
                    <h4>Create A blog</h4>
                    <div>
                        <div className="mb-3">
                            <label className="form-label">User ID</label>
                            <input type="text" className="input" onChange={(e) => { setUserId(e.target.value) }} value={userIdStr} />
                        </div>                        
                        <div className="mb-3">
                            <label className="form-label">Title</label>
                            <input type="text" className="input" onChange={(e) => { setTitle(e.target.value) }} value={title} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Body</label>
                            <textarea type="text" className="input text-area-input" onChange={(e) => { setBody(e.target.value) }} value={body} />
                        </div>
                        <button onClick={(e) => formHandle(e)} type="submit" className="button button-dark">Submit</button>
                        <div className='mt-3'>
                            <p className='m-0'>{output}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}