import React, { useEffect, useState } from 'react'
import {createCommentsController} from '../../middlewares/axios'

export default function ModalComment(props) {
    let blog = props.data
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [body, setBody] = useState("")
    const [output, setOutput] = useState("")

    async function formHandle(e) {
        e.preventDefault();        
        if(name === "" || email === "", body === ""){
            setOutput("Please, fill up all the fields")
            return;
        }
        let blogId = parseInt(blog.id);
        let id = parseInt("20"+Date.now());
        const data = {blogId, id, name, email, body};
        console.log(data)
        let response = await createCommentsController(data);
        if(response.status === 200){
            setOutput("Data inserted")
            setName(""); setEmail(""); setBody("");
        }
    }

    return (
        <div className='position-absolute top-0 end-0 start-0 bottom-0 background-dark d-flex justify-content-center align-items-center'>
            <div className="container input-card p-3 my-5">
                <h4>Add a comment to Blog</h4>
                <div className='light-border rounded p-2 my-2'>
                    <p className='light-text m-0 p-0'>Blog Id: <span className='text-primary'>{blog.id}</span></p>
                    <p className='light-text m-0 p-0'>User Id: <span className='text-primary'>{blog.userId}</span></p>
                    <p className='light-text m-0 p-0'>Blog Title: <span className='text-primary'>{blog.title}</span></p>
                    <p className='light-text m-0 p-0'>Blog Body: <span className='text-primary'>{blog.body}</span></p>
                </div>
                <div>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input type="text" className="input" onChange={(e) => { setName(e.target.value) }} value={name} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="input" onChange={(e) => { setEmail(e.target.value) }} value={email} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Body</label>
                        <textarea type="text" className="input text-area-input" onChange={(e) => { setBody(e.target.value) }} value={body} />
                    </div>
                    <div className='d-flex gap-2'>
                        <button onClick={(e) => formHandle(e)} type="submit" className="button button-dark">Submit</button>
                        <button onClick={(e) => props.modalStatus(false)} type="submit" className="button button-dark">Cancel</button>
                    </div>
                    <div className='mt-3'>
                        <p className='m-0'>{output}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}