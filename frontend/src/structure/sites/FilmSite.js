import React from 'react';
import {useParams} from "react-router-dom";

const FilmSite = ({films}) => {

    const filmID = useParams().id
    const film = films.find(film => {
        return film.id === Number(filmID)
    })


    return (
        <div>
            <h1>Tytuł filmu {film.title} o id {film.id}</h1>
        </div>
    );
};

export default FilmSite;