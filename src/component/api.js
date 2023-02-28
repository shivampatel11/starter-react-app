import react, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './api.css';

export default function Getdata() {
    const [state, setState] = useState([]);
    const [filterdata, setFilterdata] = useState([])
    const [value, setValue] = useState("");
    const [order, setOrder] = useState("ASC")

    useEffect(() => {
        getapidata()
    }, []);

    const getapidata = async () => {
        try {
            let res = await axios.get(`https://jsonplaceholder.typicode.com/posts`)
            setState(res.data)
            setFilterdata(res.data)

        } catch (err) {
            console.log(err)
        }
    }

    const handleSorting = async (col) => {

        let data = [...filterdata]
        if (order == "ASC") {
            if (data.length > 0) {
                if (col == "title" || col == "body") {
                    let result = data.sort((a, b) => {
                        return a[col].toLowerCase().localeCompare(b[col].toLowerCase())
                    })
                    setState(result)
                } else {
                    let result = data.sort((a, b) => {
                        return a[col] - b[col]
                    })
                    setState(result)
                }
                setOrder("DSC")
            }
        }

        if (order == "DSC") {
            if (data.length > 0) {
                if (col == "title" || col == "body") {
                    let result = data.sort((a, b) => {
                        return b[col].toLowerCase().localeCompare(a[col].toLowerCase())
                    })
                    setState(result)
                } else {
                    let result = data.sort((a, b) => {
                        return b[col] - a[col]
                    })
                    setState(result)
                }
                setOrder("ASC")
            }
        }
    }

    const searchItem = (e) => {
        const getsearch = e.target.value;
        setValue(getsearch)
        if (getsearch == "") {
            setState(filterdata)
        } else {
            const searchdata = filterdata.filter((item) => item.title.toLowerCase().includes(getsearch.toLowerCase()) ||
                item.body.toLowerCase().includes(getsearch.toLowerCase())
            )
            if (searchdata.length > 0) {
                setState(searchdata)
            } else {
                setState([{ id: "No data" }])
            }

        }
    }

    return (
        <>
            <div className="container">
                <div className="topcontainer">
                    <h1 className="heading">API App</h1>
                    <input className = "containerinput" type="search" placeholder="search" value={value} onChange={(e) => searchItem(e)} />
                </div>

                <table>
                    <thead>
                        <tr>
                            <th onClick={() => handleSorting("id")}>ID</th>
                            <th onClick={() => handleSorting("title")}>Title</th>
                            <th onClick={() => handleSorting("body")}>Body</th>
                            <th onClick={() => handleSorting("userId")}>USER ID</th>
                            <th></th>
                        </tr>
                    </thead>
                    {
                        state.map((data, ind) => {
                            return (
                                <tbody key={ind}>
                                    <tr>
                                        <td>{data.id}</td>
                                        <td>{data.title}</td>
                                        <td>{data.body}</td>
                                        <td>{data.userId}</td>
                                        <td><Link to={`/view/${data.id}`} ><button className="tbutton" >View more</button></Link></td>
                                    </tr>
                                </tbody>
                            )
                        })
                    }
                </table>
            </div>

        </>
    )
}