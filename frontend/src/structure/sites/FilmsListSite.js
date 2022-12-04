import React, {useContext, useEffect, useState} from 'react';
import {ApplicationContext} from "../../context/ApplicationContext";
import LoadingSpinner from "../../utils/spinner";
import {Link, useLocation} from "react-router-dom";
import {ADMIN, b64toBlob, USER} from "../../utils/utils";
import AdminFilmsPanel from "../../components/AdminFilmsPanel";
import {Container, Modal} from "react-bootstrap";
import { MultiSelect } from "react-multi-select-component";
import FileBase64 from 'react-file-base64';
import {postFilm} from "../../api/apiAdmin";

const FilmsListSite = ({searchbox, setSearchbox, setFilms}) => {

    const location = useLocation();

    useEffect(() => {
        setSearchbox('')
    }, [location])

    const applicationContext = useContext(ApplicationContext)
    const base64flag = 'data:image/png;base64,'
    const categoryURLParam = new URLSearchParams(location.search).get('catid')
    const actorURLParam = new URLSearchParams(location.search).get('actid')
    const directorURLParam = new URLSearchParams(location.search).get('dirid')
    const user = JSON.parse(window.localStorage.getItem(USER))

    const [show, setShow] = useState(false)
    const [image, setImage] = useState(null)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [categories, setCategories] = useState([])
    const [actors, setActors] = useState([])
    const [directors, setDirectors] = useState([])
    const [quantity, setQuantity] = useState(1)

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

    const categoryFilms = categoryFilteredFilms.filter((film) => {
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

    const actorFilms = actorFilteredFilms.filter((film) => {
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

    const directorFilms = directorFilteredFilms.filter((film) => {
        if(searchbox === '') {
            return film
        }
        else if (film.title.toLowerCase().includes(searchbox.toLowerCase())) {
            return film
        }
    }).map((film) => (
        <Link to={`/films/${film.id}`} className="col-3" key={film.id}>
            <img src={base64flag + film.movieImage[0].picByte} className='w-100' alt=''/>
            <h3 className='film-title'>{film.title}</h3>
        </Link>
    ))


    const categoriesOptions = applicationContext.categories.map((category) => {
        return {label: category.category, value: category}
    })

    const actorsOptions = applicationContext.actors.map((actor) => {
        return {label: actor.name + ' ' + actor.surname, value: actor}
    })

    const directorsOptions = applicationContext.directors.map((director) => {
        return {label: director.name + ' ' + director.surname, value: director}
    })


    const handleAddSubmit = (e) => {
        e.preventDefault()
        if (image && name && categories && actors && directors && quantity) {

            const movie = {
                title: name,
                quantity: Number(quantity),
                description: description,
                director: directors.map(director => director.value),
                category: categories.map(category => category.value),
                actor: actors.map(actor => actor.value)
            }

            const formData = new FormData();
            formData.append('movie', movie)
            formData.append(
                'imageFile',
                new File([b64toBlob(image.base64.split(',')[1], image.base64.split(',')[0].split(':')[1].split(';')[0])], name + '-' + Date.now() + 'png'),
            );

            postFilm(formData).then(res => {
                alert(res)
            })

        } else {
            alert('Proszę uzupełnić formularz')
        }
    }

    const handleModalClose = () => {
        setShow(false)
    }

    return (
        <div className='films-container'>
            {(user === null || user.role === USER) && <h1>Filmy</h1>}
            {user && user.role === ADMIN && (
                <>
                    <div className="row mb-0">
                        <div className="col-10">
                            <h1>Filmy</h1>
                        </div>
                        <div className="col-2  justify-content-end align-content-end">
                            <button className='btn btn-success w-100 mt-2 py-2 px-3' onClick={() => setShow(true)}>Dodaj</button>
                        </div>
                    </div>
                    <Modal show={show} onHide={handleModalClose} className='login-modal'>
                        <Container className='modal-container'>
                            <h1>Dodawanie Filmu</h1>
                            <form onSubmit={handleAddSubmit}>
                                <div className="row pt-4 px-4 admin-file-input">
                                    <FileBase64 onDone={setImage}/>
                                </div>
                                <div className="row pt-4 px-4">
                                    <input placeholder='Nazwa filmu' type="text" value={name} onChange={e => setName(e.target.value)} className='p-2 w-auto ms-2'/>
                                </div>
                                <div className="row pt-4 px-4">
                                    <h4>Opis filmu</h4>
                                    <textarea placeholder='Opis filmu' value={description} onChange={e => setDescription(e.target.value)} className='p-2 w-auto ms-2'/>
                                </div>
                                <div className="row mt-2 pt-4 px-4">
                                    <h4>Wybierz kategorie</h4>
                                    <MultiSelect options={categoriesOptions} value={categories} onChange={setCategories} className='multiselect text-black' labelledBy='Wybierz kategorie...'/>
                                </div>
                                <div className="row pt-4 px-4">
                                    <h4>Wybierz aktorów</h4>
                                    <MultiSelect options={actorsOptions} value={actors} onChange={setActors} className='multiselect text-black' labelledBy='Wybierz aktorów...'/>
                                </div>
                                <div className="row pt-4 px-4">
                                    <h4>Wybierz reżyserów</h4>
                                    <MultiSelect options={directorsOptions} value={directors} onChange={setDirectors} className='multiselect text-black' labelledBy='Wybierz reżyserów...'/>
                                </div>
                                <div className="row pt-4 px-4">
                                    <h4>Wybierz ilość</h4>
                                    <input type="number" min='1' value={quantity} onChange={e => setQuantity(e.target.value)}/>
                                </div>
                                <button type='submit' className='login-form-submit'>Potwierdź</button>
                            </form>
                        </Container>
                    </Modal>
                </>
            )}
            <div className="row">
                {applicationContext.isLoading && (
                    <LoadingSpinner />
                )}
                {
                    user && user.role === ADMIN && <AdminFilmsPanel films={applicationContext.films || []} setFilms={setFilms}/>
                }
                {(user === null || user.role === USER) && !applicationContext.isLoading && !categoryURLParam && !actorURLParam && !directorURLParam && films}
                {(user === null || user.role === USER) && !applicationContext.isLoading && !categoryURLParam && !directorURLParam && actorFilteredFilms && actorFilms}
                {(user === null || user.role === USER) && !applicationContext.isLoading && !categoryURLParam && !actorURLParam && directorFilteredFilms && directorFilms}
                {(user === null || user.role === USER) && !applicationContext.isLoading && !actorURLParam && !directorURLParam && categoryFilteredFilms && categoryFilms}

            </div>

        </div>
    );
};

export default FilmsListSite;