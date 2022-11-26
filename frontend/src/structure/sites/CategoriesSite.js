import React, {useContext, useEffect} from 'react';
import Category1 from "../../assets/CategoriesSite/category1.png";
import {Link, useLocation} from "react-router-dom";
import {ApplicationContext} from "../../context/ApplicationContext";
import {FILMS_PATH} from "../../utils/paths";
import LoadingSpinner from "../../utils/spinner";
import {ADMIN, USER} from "../../utils/utils";
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
                        {
                            user && user.role === ADMIN && <AdminCategoriesPanel categories={categories}/>
                        }
                        {(!user || user.role === USER) && categories}
                    </>
                )}
            </div>
        </div>
    );
};

export default CategoriesSite;