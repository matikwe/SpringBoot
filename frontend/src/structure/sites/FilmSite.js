import React, {useContext} from 'react';
import Film1 from '../../assets/FilmsSite/film1.png'
import {ApplicationContext} from "../../context/ApplicationContext";
import LoadingSpinner from "../../utils/spinner";

const FilmSite = () => {

    const applicationContext = useContext(ApplicationContext)
    const films = applicationContext.films.map((film, index) => (
        <div className="col-3" style={{backgroundImage: `url(${Film1})`}}>
            <h3>{film.title}</h3>
        </div>
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
                {!applicationContext.isLoading && (
                    <>
                        {films}
                    </>
                )}
            </div>
        </div>
    );
};

export default FilmSite;