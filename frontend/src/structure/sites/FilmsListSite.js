import React, {useContext, useEffect} from 'react';
import {ApplicationContext} from "../../context/ApplicationContext";
import LoadingSpinner from "../../utils/spinner";
import {Link, useLocation} from "react-router-dom";
import {forEach} from "react-bootstrap/ElementChildren";

const FilmsListSite = ({searchbox, setSearchbox}) => {

    const location = useLocation();

    useEffect(() => {
        setSearchbox('')
    }, [location])

    const applicationContext = useContext(ApplicationContext)
    const base64flag = 'data:image/png;base64,'
    const categoryURLParam = new URLSearchParams(location.search).get('catid')
    const actorURLParam = new URLSearchParams(location.search).get('actid')
    const directorURLParam = new URLSearchParams(location.search).get('dirid')

    const categoryFilteredFilms = applicationContext.films.map((film, index) => {
        return film
    }).filter((category) => category.id === Number(categoryURLParam))

    const actorFilteredFilms = applicationContext.films.map((film, index) => {
        return film
    }).filter((actor) => actor.id === Number(actorURLParam))

    const directorFilteredFilms = applicationContext.films.map((film, index) => {
        return film
    }).filter((director) => director.id === Number(directorURLParam))

    const films = applicationContext.films.filter((film) => {
        if(searchbox === '') {
            return film
        }
        else if (film.title.toLowerCase().includes(searchbox.toLowerCase())) {
            return film
        }
    }).map((film, index) => (
            <Link to={`/films/${film.id}`} className="col-3" key={index}>
                <img src={base64flag + film.movieImage[0].picByte} className='w-100' alt=''/>
                <h3 className='film-title'>{film.title}</h3>
            </Link>
    ))

    const categoryFilms = categoryFilteredFilms.map((film, index) => (
        <Link to={`/films/${film.id}`} className="col-3" key={index}>
            <img src={base64flag + film.movieImage[0].picByte} className='w-100' alt=''/>
            <h3 className='film-title'>{film.title}</h3>
        </Link>
    ))

    const actorFilms = actorFilteredFilms.map((film, index) => (
        <Link to={`/films/${film.id}`} className="col-3" key={index}>
            <img src={base64flag + film.movieImage[0].picByte} className='w-100' alt=''/>
            <h3 className='film-title'>{film.title}</h3>
        </Link>
    ))

    const directorFilms = directorFilteredFilms.map((film, index) => (
        <Link to={`/films/${film.id}`} className="col-3" key={index}>
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
                {!applicationContext.isLoading && !categoryURLParam && !actorURLParam && !directorURLParam && films}
                {!applicationContext.isLoading && !categoryURLParam && !directorURLParam && actorFilteredFilms && actorFilms}
                {!applicationContext.isLoading && !categoryURLParam && !actorURLParam && directorFilteredFilms && directorFilms}
                {!applicationContext.isLoading && !actorURLParam && !directorURLParam && categoryFilteredFilms && categoryFilms}
            </div>
        </div>
    );
};

export default FilmsListSite;