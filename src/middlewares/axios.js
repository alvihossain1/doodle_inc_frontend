import axios from "axios";
let baseUrl = "http://localhost:4000";

export default function apiUrl(){
    return baseUrl;
}

export async function createBlogsController(data){
    return await axios({
        method: 'post',
        url: `${baseUrl}/getblogs`,
        data: data,
    }).then((response) => {
        return response.data
    })
    .catch((err) => {
        return {status: 400, err}
    })
}

export async function getBlogsController(){
    return await axios({
        method: 'get',
        url: `${baseUrl}/getblogs`,
    }).then((response) => {
        return response.data
    })
    .catch((err) => {
        return {status: 400, err}
    })
}

export async function updateBlogsController(data){
    return await axios({
        method: 'put',
        url: `${baseUrl}/getblogs`,
        data: data,
    }).then((response) => {
        return response.data
    })
    .catch((err) => {
        return {status: 400, err}
    })
}

export async function deleteBlogsController(id){
    return await axios({
        method: 'delete',
        url: `${baseUrl}/getblogs:${id}`,
    }).then((response) => {
        return response.data
    })
    .catch((err) => {
        return {status: 400, err}
    })
}

export async function createCommentsController(data){
    return await axios({
        method: 'post',
        url: `${baseUrl}/getblogsComments`,
        data: data,
    }).then((response) => {
        return response.data
    })
    .catch((err) => {
        return {status: 400, err}
    })
}

export async function getCommentsController(id){
    return await axios({
        method: 'get',
        url: `${baseUrl}/getblogsComments:${id}`,
        data: id,
    }).then((response) => {
        return response.data
    })
    .catch((err) => {
        return {status: 400, err}
    })
}


export async function updateCommentsController(data){
    return await axios({
        method: 'put',
        url: `${baseUrl}/getblogsComments`,
        data: data,
    }).then((response) => {
        return response.data
    })
    .catch((err) => {
        return {status: 400, err}
    })
}

export async function deleteCommentsController(id){
    return await axios({
        method: 'delete',
        url: `${baseUrl}/getblogsComments:${id}`,
    }).then((response) => {
        return response.data
    })
    .catch((err) => {
        return {status: 400, err}
    })
}