import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./style.css";

const Movie = () => {
    const [search, setSearch] = useState(""); 
    const [data, setData] = useState([]); 

    const fetchLatest = async () => {
        if (!search.trim()) return;  
        try {
            const fetchMovie = await fetch(`http://www.omdbapi.com/?s=${search}&apikey=5825e9f5`);
            const fetchData = await fetchMovie.json();
            console.log(fetchData.Search);
            setData(fetchData.Search || []); 
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchLatest();
    }, []); 

    return (
        <>
            <div className="header">
                <div className="logo">
                    <h3>MovieRoom</h3>
                </div>
                <div className="search">
                    <input 
                        type="text" 
                        placeholder="Search..." 
                        value={search} 
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button onClick={fetchLatest}> <FaSearch /> </button>
                </div>
            </div>
            <div className="movie">
                <h3>Movies</h3>
                <div className="container">
                    {data.length > 0 ? (
                        data.map((curElm) => (
                            <div className="box" key={curElm.imdbID}>
                                <div className="img_box">
                                    <img src={curElm.Poster} alt={curElm.Title} />
                                </div>
                                <div className="detail">
                                <h3>{curElm.Title}</h3>
                                <h4>Release date:- {curElm.Year}</h4>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No movies found</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default Movie;
