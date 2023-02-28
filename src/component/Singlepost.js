import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import'./singlepost.css';

export default function Singlepost() {
    const [data, setData] = useState({
        title: "",
        body: "",
    })

    const { id } = useParams();

    useEffect(() => {
        loaduser()
    }, [])

    const loaduser = async () => {
        try {
            let res = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
            setData(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="singlecontainer">
            <h1 className="scontainer"> View Single Post</h1>
            
            <div className="viewcontainer">
                <h2> Title : </h2>
                <span className="title">{data.title}</span>
            </div>

            <div className="viewcontainer">
                <h2>Body :</h2>
                <span className="body"> {data.body}</span>
            </div>

        </div>
    )
}