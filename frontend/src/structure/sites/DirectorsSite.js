import React, {useContext, useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import {ApplicationContext} from "../../context/ApplicationContext";
import LoadingSpinner from "../../utils/spinner";
import {FILMS_PATH} from "../../utils/paths";
import {ADMIN, base64flag, USER} from "../../utils/utils";
import AdminFilmsPanel from "../../components/AdminFilmsPanel";
import AdminDirectorsPanel from "../../components/AdminDirectorsPanel";
import {Container, Modal} from "react-bootstrap";
import {postDirector} from "../../api/apiAdmin";
import {getActors, getDirectors} from "../../api/api";

const DirectorsSite = ({searchbox, setSearchbox, setDirectors}) => {

    const location = useLocation();

    useEffect(() => {
        setSearchbox('')
    }, [location, setSearchbox])

    const user = JSON.parse(window.localStorage.getItem(USER))

    const [show, setShow] = useState(false)
    const [image, setImage] = useState(null)
    const [imageFile, setImageFile] = useState(null)
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')


    const applicationContext = useContext(ApplicationContext)

    const directors = applicationContext.directors.filter((director) => {
        if(searchbox === '') {
            return director
        }
        else if (director.name.toLowerCase().includes(searchbox.toLowerCase())) {
            return director
        }
        else if (director.surname.toLowerCase().includes(searchbox.toLowerCase())) {
            return director
        }
    }).map((director) => (
        <Link to={`${FILMS_PATH}?dirid=${director.id}`} className='actors-link col-4' key={director.id}>
            <img src={base64flag + director.directorImage[0].picByte} alt="" className='w-100 h-100'/>
            <h1 className='actor-title'>{director.name} {director.surname}</h1>
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

            const director = {
                name: name,
                surname: surname
            }

            const formData = new FormData();
            formData.append('director', JSON.stringify(director))
            formData.append('imageFile', imageFile);

            postDirector(formData).then(response => {
                if (response.status === 500) {
                    alert('Reżyser już istnieje!')
                } else {
                    getDirectors().then((directors) => {
                        if (directors.length > 0) {
                            setDirectors(directors);
                            handleModalClose()
                            alert('Reżyser został pomyślnie dodany.')
                        } else {
                            setDirectors([])
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
            {(user === null || user.role === USER) && <h1>Reżyserzy</h1>}
            {user && user.role === ADMIN && (
                <>
                    <div className="row mb-0">
                        <div className="col-2">
                            <h1>Reżyserzy</h1>
                        </div>
                        <div className="col-10  justify-content-end align-content-end">
                            <button className='btn btn-success mx-5 mt-2 py-2 px-4' onClick={() => setShow(true)}>Dodaj</button>
                        </div>
                    </div>
                    <Modal show={show} onHide={handleModalClose} className='login-modal'>
                        <Container className='modal-container'>
                            <h1>Dodawanie Reżysera</h1>
                            <form onSubmit={handleAddSubmit}>
                                <div className="row pt-4 px-4 admin-file-input">
                                    <input type="file" onChange={onImageChange} accept='image/*'/>
                                </div>
                                <div className="row pt-4 px-4 admin-file-input">
                                    <img src={image} alt="" />
                                </div>
                                <div className="row pt-4 px-4">
                                    <input placeholder='Imię Reżysera' type="text" value={name} onChange={e => setName(e.target.value)} className='p-2 w-auto ms-2'/>
                                </div>
                                <div className="row pt-4 px-4">
                                    <input placeholder='Nazwisko Reżysera' type="text" value={surname} onChange={e => setSurname(e.target.value)} className='p-2 w-auto ms-2'/>
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
                            user && user.role === ADMIN && <AdminDirectorsPanel directors={applicationContext.directors || []} setDirectors={setDirectors}/>
                        }
                        {(!user || user.role === USER) && directors}
                    </>
                )}
            </div>
        </div>
    );
};

export default DirectorsSite;