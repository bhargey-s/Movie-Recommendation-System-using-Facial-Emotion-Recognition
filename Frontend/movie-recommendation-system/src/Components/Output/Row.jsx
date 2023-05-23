import React, { useState, useEffect } from 'react'
import axios from 'axios'
import RowPoster from './RowPoster'
import GenreObj from './GenreObj';

function Row({ title, description }) {
    const [movies, setMovies] = useState([]);
    let detailsObj = {};

    useEffect(() => {
        console.log(title, GenreObj[title])
        setMovies(GenreObj[title])
    }, [])

    return (
        <div className="row">
            <p style={{ textAlign: "left" }}><span style={{ fontFamily: 'Netflix Sans Medium', fontSize: "32px" }}>{title}</span> - {description}</p>
            <div className="rowPosters">
                {movies.length !== 0 ? movies.map((movie) => {
                    detailsObj = { posterPath: movie.thumbnail, title: movie.title, link: movie.meta.imdb };
                    return (
                        <RowPoster movie={detailsObj} key={movie.id}></RowPoster>
                    )
                }) : <p>No results found</p>}
            </div>
        </div>
    )
}

export default Row