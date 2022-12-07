import React, {useState} from 'react';
import {Container, Modal, Table} from "react-bootstrap";
import {base64flag} from "../utils/utils";
import {deleteFilm} from "../api/apiAdmin";
import {getFilms} from "../api/api";
import {MultiSelect} from "react-multi-select-component";

const AdminFilmsPanel = ({films, setFilms, categoriesOptions, actorsOptions, directorsOptions}) => {

    const [show, setShow] = useState(false)
    const [image, setImage] = useState(null)
    const [imageFile, setImageFile] = useState(null)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [categories, setCategories] = useState([])
    const [actors, setActors] = useState([])
    const [directors, setDirectors] = useState([])
    const [quantity, setQuantity] = useState(1)



    const getList = (arr) => {
        return arr.map((item, index) => {
            if (arr[arr.length - 1].id === item.id) {
                if (item.name)
                    return item.name + ' ' + item.surname
                if (item.category)
                    return item.category
            } else {
                if (item.name)
                    return item.name + ' ' + item.surname + ', '
                if (item.category)
                    return item.category + ', '
            }
        })
    }


    const handleEditFilm = () => {

    }

    const onImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file)
        setImage(URL.createObjectURL(file));
    };

    const handleOpenEditFilm = (id) => {
        setShow(true)
        const film = films.find(film => {
            return film.id === Number(id)
        })
        console.log(film.category)
        console.log(categories)
        setName(film.title)
        setDescription(film.description)
        setImage(base64flag + film.movieImage[0].picByte)
        setQuantity(film.quantity)
    }

    const handleCloseEditFilm = () => {
        setShow(false)
        setImage(null)
        setImageFile(null)
        setName('')
        setDescription('')
        setCategories([])
        setActors([])
        setDirectors([])
        setQuantity(1)
    }

    const handleDeleteFilm = (id) => {
        deleteFilm(id).then(response => {
            if (response.status === 500) {
                alert('Nie można usunąć zarezerwowanego/zamówionego filmu!')
            } else {
                getFilms().then((films) => {
                    if (films.length > 0) {
                        setFilms(films);
                        window.localStorage.setItem('FILMS_STATE', JSON.stringify(films))
                    } else {
                        setFilms([])
                    }
                })
            }
        })
    }




    const filmsList = films.sort(({ id: previousID }, { id: currentID }) => previousID - currentID).map((film) => (
        <tr key={film.id}>
            <td>{film.id}</td>
            <td><img src={base64flag + film.movieImage[0].picByte} alt=""/></td>
            <td>{film.title}</td>
            <td>{getList(film.category)}</td>
            <td>{getList(film.actor)}</td>
            <td>{getList(film.director)}</td>
            <td>{film.quantity}</td>
            <td>
                <div className="btn btn-info mx-5" onClick={() => handleOpenEditFilm(film.id)}>Edytuj</div>
                <div className="btn btn-danger" onClick={() => handleDeleteFilm(film.id)}>Usuń</div>
            </td>
        </tr>
    ))


    return (
        <>
            <div className='admin-films-table'>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Thumbnail</th>
                        <th>Film</th>
                        <th>Kategoria</th>
                        <th>Aktorzy</th>
                        <th>Reżyserzy</th>
                        <th>Ilość</th>
                        <th className='text-center'>Akcje</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filmsList}
                    </tbody>
                </Table>
            </div>
            <Modal show={show} onHide={handleCloseEditFilm} className='login-modal'>
                <Container className='modal-container'>
                    <h1>Edytowanie Filmu</h1>
                    <form onSubmit={handleEditFilm}>
                        <div className="row pt-4 px-4 admin-file-input">
                            <input type="file" onChange={onImageChange} accept='image/*'/>
                        </div>
                        <div className="row pt-4 px-4 admin-file-input">
                            <img src={image} alt="" />
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

    );
};

export default AdminFilmsPanel;