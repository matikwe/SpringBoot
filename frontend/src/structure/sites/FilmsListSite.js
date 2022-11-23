import React, {useContext} from 'react';
import Film1 from '../../assets/FilmsSite/film1.png'
import {ApplicationContext} from "../../context/ApplicationContext";
import LoadingSpinner from "../../utils/spinner";
import {Link} from "react-router-dom";

const FilmsListSite = () => {

    const applicationContext = useContext(ApplicationContext)
    const films = applicationContext.films.map((film, index) => (
        <Link to={`/films/${film.id}`} className="col-3"  style={{backgroundImage: `url(${Film1})`}} key={index}>
            <h3>{film.title}</h3>
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