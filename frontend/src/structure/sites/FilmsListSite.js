import React, {useContext} from 'react';
import Film1 from '../../assets/FilmsSite/film1.png'
import {ApplicationContext} from "../../context/ApplicationContext";
import LoadingSpinner from "../../utils/spinner";
import {Link} from "react-router-dom";

const FilmsListSite = () => {

    const applicationContext = useContext(ApplicationContext)
    const base64flag = 'data:image/png;base64,'
    const films = applicationContext.films.map((film, index) => (
        <Link to={`/films/${film.id}`} className="col-3" key={film.id}>
            <img src={base64flag + film.movieImage[0].picByte} className='w-100' alt=''/>
            <h3 className='film-title'>{film.title}</h3>
        </Link>
    ))

    return (
        <div className='films-container'>
            <h1>
                Filmy
            </h1>
            <div className="row">
                {applicationContext.isLoading && (
                    <LoadingSpinner />
                )}
                {!applicationContext.isLoading && films}
            </div>
        </div>
    );
};

export default FilmsListSite;