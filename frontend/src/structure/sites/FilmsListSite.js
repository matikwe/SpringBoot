import React, {useContext, useEffect} from 'react';
import {ApplicationContext} from "../../context/ApplicationContext";
import LoadingSpinner from "../../utils/spinner";
import {Link, useLocation} from "react-router-dom";

const FilmsListSite = ({searchbox, setSearchbox}) => {

    const location = useLocation();

    useEffect(() => {
        setSearchbox('')
    }, [location])

    const applicationContext = useContext(ApplicationContext)
    const base64flag = 'data:image/png;base64,'
    const films = applicationContext.films.filter((film) => {
        if(searchbox === '') {
            return film
        }
        else if (film.title.toLowerCase().includes(searchbox.toLowerCase())) {
            return film
        }
    }).map((film, index) => (
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