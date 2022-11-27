import React, {useContext} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import ArrowLeft from '../../assets/utils/arrow-left.svg'
import {base64flag} from "../../utils/utils";
import {ApplicationContext} from "../../context/ApplicationContext";

const FilmSite = () => {

    const navigate = useNavigate();
    const applicationContext = useContext(ApplicationContext)
    const films = JSON.parse(window.localStorage.getItem('FILMS_STATE')) || applicationContext.films
    const filmID = useParams().id
    const film = films.find(film => {
        return film.id === Number(filmID)
    })


    const actors = film.actor.map((actor, index) => {
        if (film.actor[film.actor.length - 1].id === actor.id) {
            return actor.name + ' ' + actor.surname
        } else {
            return actor.name + ' ' + actor.surname + ', '
        }
    })

    const directors = film.director.map((director, index) => {
        if (film.director[film.director.length - 1].id === director.id) {
            return director.name + ' ' + director.surname
        } else {
            return director.name + ' ' + director.surname + ', '
        }
    })

    return (
        <div className='film-container'>
            <div className="row title-row">
                <div className="col-3">
                    <img src={ArrowLeft} alt="" onClick={() => navigate(-1)}/>
                </div>
                <div className="col-9 mt-2">
                    <h1>{film.title}</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-6 film-description-image">
                    <img src={base64flag + film.movieImage[0].picByte} alt=""/>
                    <div className="reserve-button">
                        <h1>Rezerwuj</h1>
                    </div>
                </div>
                <div className="col-6 film-description-text">
                    <h1>Opis</h1>
                    <p className='text-start'>{film.description}</p>
                    <h1 className='mt-5'>Aktorzy</h1>
                    <h4>{actors}</h4>
                    <h1 className='mt-5'>Reżyserzy</h1>
                    <h4>{directors}</h4>
                </div>
            </div>
        </div>
    );
};

export default FilmSite;