import React, {useContext} from 'react';
import Category1 from "../../assets/CategoriesSite/category1.png";
import {Link} from "react-router-dom";
import {ApplicationContext} from "../../context/ApplicationContext";
import LoadingSpinner from "../../utils/spinner";
import {FILMS_PATH} from "../../utils/paths";

const CategoriesSite = () => {

    const applicationContext = useContext(ApplicationContext)

    const categories = applicationContext.categories.map((category, index) => (
        <div className="col-4">
            <Link to={`${FILMS_PATH}?catid=${category.id}`} className='categories-link'>
                <img src={Category1} alt=""/>
                <h1>{category.category}</h1>
            </Link>
        </div>
    ))

    return (
        <div className='categories-container'>
            <h1>
                Kategorie
            </h1>
            <div className="row">
                {applicationContext.isLoading && (
                    <LoadingSpinner />
                )}
                {!applicationContext.isLoading && (
                    <>
                        {categories}
                    </>
                )}
            </div>
        </div>
    );
};

export default CategoriesSite;