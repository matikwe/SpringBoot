import React, {useContext, useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import {ApplicationContext} from "../../context/ApplicationContext";
import {FILMS_PATH} from "../../utils/paths";
import LoadingSpinner from "../../utils/spinner";
import {ADMIN, base64flag, USER} from "../../utils/utils";
import AdminActorsPanel from "../../components/AdminActorsPanel";
import {Container, Modal} from "react-bootstrap";
import {postActor} from "../../api/apiAdmin";
import {getActors, getCategories} from "../../api/api";

const ActorsSite = ({searchbox, setSearchbox, setActors}) => {

    const location = useLocation();

    useEffect(() => {
        setSearchbox('')
    }, [location, setSearchbox])

    const applicationContext = useContext(ApplicationContext)

    const [show, setShow] = useState(false)
    const [image, setImage] = useState(null)
    const [imageFile, setImageFile] = useState(null)
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')

    const user = JSON.parse(window.localStorage.getItem(USER))

    const actors = applicationContext.actors.filter((actor) => {
        if(searchbox === '') {
            return actor
        }
        else if (actor.name.toLowerCase().includes(searchbox.toLowerCase())) {
            return actor
        }
        else if (actor.surname.toLowerCase().includes(searchbox.toLowerCase())) {
            return actor
        }
    }).map((actor) => (
        <Link to={`${FILMS_PATH}?actid=${actor.id}`} className='actors-link col-4' key={actor.id}>
            <img src={base64flag + actor.actorImage[0].picByte} alt="" className='w-100 h-100'/>
            <h1 className='actor-title'>{actor.name} {actor.surname}</h1>
        </Link>
    ))

    const onImageChange = (e) => {
        const [file] = e.target.files;
        setImageFile(file)
        setImage(URL.createObjectURL(file));
    };

    const handleAddSubmit = (e) => {
        e.preventDefault()
        if (imageFile && name && surname) {

            const actor = {
                name: name,
                surname: surname
            }

            const formData = new FormData();
            formData.append('actor', JSON.stringify(actor))
            formData.append('imageFile', imageFile);

            postActor(formData).then(response => {
                if (response.status === 500) {
                    alert('Aktor już istnieje!')
                } else {
                    getActors().then((actors) => {
                        if (actors.length > 0) {
                            setActors(actors);
                            handleModalClose()
                            alert('Aktor został pomyślnie dodany.')
                        } else {
                            setActors([])
                        }
                    })
                }
            })

        } else {
            alert('Proszę uzupełnić formularz')
        }
    }

    const handleModalClose = () => {
        setShow(false)
        setImage(null)
        setImageFile(null)
        setName('')
        setSurname('')
    }

    return (
        <div className='actors-container'>
            {(user === null || user.role === USER) && <h1>Aktorzy</h1>}
            {user && user.role === ADMIN && (
                <>
                    <div className="row mb-0">
                        <div className="col-2">
                            <h1>Aktorzy</h1>
                        </div>
                        <div className="col-10  justify-content-end align-content-end">
                            <button className='btn btn-success mx-5 mt-2 py-2 px-4' onClick={() => setShow(true)}>Dodaj</button>
                        </div>
                    </div>
                    <Modal show={show} onHide={handleModalClose} className='login-modal'>
                        <Container className='modal-container'>
                            <h1>Dodawanie Aktora</h1>
                            <form onSubmit={handleAddSubmit}>
                                <div className="row pt-4 px-4 admin-file-input">
                                    <input type="file" onChange={onImageChange} accept='image/*'/>
                                </div>
                                <div className="row pt-4 px-4 admin-file-input">
                                    <img src={image} alt="" />
                                </div>
                                <div className="row pt-4 px-4">
                                    <input placeholder='Imię Aktora' type="text" value={name} onChange={e => setName(e.target.value)} className='p-2 w-auto ms-2'/>
                                </div>
                                <div className="row pt-4 px-4">
                                    <input placeholder='Nazwisko Aktora' type="text" value={surname} onChange={e => setSurname(e.target.value)} className='p-2 w-auto ms-2'/>
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
                {!applicationContext.isLoading && (
                    <>
                        {
                            user && user.role === ADMIN && <AdminActorsPanel actors={applicationContext.actors || []} setActors={setActors}/>
                        }
                        {(!user || user.role === USER) && actors}
                    </>
                )}
            </div>
        </div>
    );
};

export default ActorsSite;