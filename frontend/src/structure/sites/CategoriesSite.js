import React, {useContext, useEffect} from 'react';
import Category1 from "../../assets/CategoriesSite/category1.png";
import {Link, useLocation} from "react-router-dom";
import {ApplicationContext} from "../../context/ApplicationContext";
import {FILMS_PATH} from "../../utils/paths";
import LoadingSpinner from "../../utils/spinner";
import {ADMIN, base64flag, USER} from "../../utils/utils";
import AdminDirectorsPanel from "../../components/AdminDirectorsPanel";
import AdminCategoriesPanel from "../../components/AdminCategoriesPanel";

const CategoriesSite = ({searchbox, setSearchbox}) => {

    const location = useLocation();

    useEffect(() => {
        setSearchbox('')
    }, [location])

    const applicationContext = useContext(ApplicationContext)

    const user = JSON.parse(window.localStorage.getItem(USER))

    const categories = applicationContext.categories.filter((category) => {
        if(searchbox === '') {
            return category
        }
        else if (category.category.toLowerCase().includes(searchbox.toLowerCase())) {
            return category
        }
    }).map((category, index) => (
        <div key={index} className="col-4">
            <Link to={`${FILMS_PATH}?catid=${category.id}`} className='categories-link'>
                <img src={base64flag + category.categoryImage[0].picByte} alt="" className="w-100"/>
                <h1>{category.category}</h1>
            </Link>
        </div>
    ))

    return (
        <div className='categories-container'>
            {(user === null || user.role === USER) && <h1>Kategorie</h1>}
            {user && user.role === ADMIN && (
                <div className="row mb-0">
                    <div className="col-2">
                        <h1>Kategorie</h1>
                    </div>
                    <div className="col-10  justify-content-end align-content-end">
                        <button className='btn btn-success mx-5 mt-2 py-2 px-4'>Dodaj</button>
                    </div>
                </div>
            )}
            <div className="row">
                {applicationContext.isLoading && (
                    <LoadingSpinner />
                )}
                {!applicationContext.isLoading && (
                    <>
                        {
                            user && user.role === ADMIN && <AdminCategoriesPanel categories={applicationContext.categories}/>
                        }
                        {(!user || user.role === USER) && categories}
                    </>
                )}
            </div>
        </div>
    );
};

export default CategoriesSite;