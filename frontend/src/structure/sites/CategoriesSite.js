import React, {useContext, useEffect, useState} from 'react';
import {json, Link, useLocation} from "react-router-dom";
import {ApplicationContext} from "../../context/ApplicationContext";
import {FILMS_PATH} from "../../utils/paths";
import LoadingSpinner from "../../utils/spinner";
import {ADMIN, base64flag, USER} from "../../utils/utils";
import AdminCategoriesPanel from "../../components/AdminCategoriesPanel";
import {Container, Modal} from "react-bootstrap";
import {postCategory} from "../../api/apiAdmin";

const CategoriesSite = ({searchbox, setSearchbox, setCategories}) => {

    const location = useLocation();

    const [show, setShow] = useState(false)
    const [image, setImage] = useState(null)
    const [imageFile, setImageFile] = useState(null)
    const [name, setName] = useState('')

    useEffect(() => {
        setSearchbox('')
    }, [location, setSearchbox])

    const applicationContext = useContext(ApplicationContext)

    const user = JSON.parse(window.localStorage.getItem(USER))

    const categories = applicationContext.categories.filter((category) => {
        if(searchbox === '') {
            return category
        }
        else if (category.category.toLowerCase().includes(searchbox.toLowerCase())) {
            return category
        }
    }).map((category) => (
        <div key={category.id} className="col-4">
            <Link to={`${FILMS_PATH}?catid=${category.id}`} className='categories-link'>
                <img src={base64flag + category.categoryImage[0].picByte} alt="" className="w-100 h-75"/>
                <h1>{category.category}</h1>
            </Link>
        </div>
    ))

    const onImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file)
        setImage(URL.createObjectURL(file));
    };

    const handleAddSubmit = (e) => {
        e.preventDefault()
        if (imageFile && name) {

            const category = {
                category: name,
            }

            const formData = new FormData();
            formData.append('category', JSON.stringify(category))
            formData.append('imageFile', imageFile);

            postCategory(formData).then(res => {
                alert(res)
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
    }

    return (
        <div className='categories-container'>
            {(user === null || user.role === USER) && <h1>Kategorie</h1>}
            {user && user.role === ADMIN && (
                <>
                    <div className="row mb-0">
                        <div className="col-2">
                            <h1>Kategorie</h1>
                        </div>
                        <div className="col-10  justify-content-end align-content-end">
                            <button className='btn btn-success mx-5 mt-2 py-2 px-4' onClick={() => setShow(true)}>Dodaj</button>
                        </div>
                    </div>
                    <Modal show={show} onHide={handleModalClose} className='login-modal'>
                        <Container className='modal-container'>
                            <h1>Dodawanie Kategorii</h1>
                            <form onSubmit={handleAddSubmit}>
                                <div className="row pt-4 px-4 admin-file-input">
                                    <input type="file" onChange={onImageChange} accept='image/*'/>
                                </div>
                                <div className="row pt-4 px-4 admin-file-input">
                                    <img src={image} alt="" />
                                </div>
                                <div className="row pt-4 px-4">
                                    <input placeholder='Nazwa kategorii' type="text" value={name} onChange={e => setName(e.target.value)} className='p-2 w-auto ms-2'/>
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
                            user && user.role === ADMIN && <AdminCategoriesPanel categories={applicationContext.categories || []} setCategories={setCategories}/>
                        }
                        {(!user || user.role === USER) && categories}
                    </>
                )}
            </div>
        </div>
    );
};

export default CategoriesSite;