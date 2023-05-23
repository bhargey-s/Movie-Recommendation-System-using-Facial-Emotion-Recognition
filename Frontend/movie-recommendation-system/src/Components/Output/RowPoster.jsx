import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

function RowPoster({ movie }) {
    const navigate = useNavigate();
    const [isHover, setIsHover] = useState(true);
    const base_Url = "https://agoodmovietowatch.com";

    return (
        <div className={isHover ? "row-poster active-row-poster" : "row-poster"}>
            <img
                className="row-poster-img"
                onClick={() => { window.open(movie.link, '_blank') }}
                src={base_Url + movie.posterPath}
                alt={movie.title} />
            <p>{movie.title}</p>
        </div>
    )
}

export default RowPoster