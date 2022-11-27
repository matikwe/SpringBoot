import React, {useContext, useEffect} from 'react';
import {Link, useLocation} from "react-router-dom";
import {ApplicationContext} from "../../context/ApplicationContext";
import LoadingSpinner from "../../utils/spinner";
import {FILMS_PATH} from "../../utils/paths";
import {ADMIN, base64flag, USER} from "../../utils/utils";
import AdminFilmsPanel from "../../components/AdminFilmsPanel";
import AdminDirectorsPanel from "../../components/AdminDirectorsPanel";

const DirectorsSite = ({searchbox, setSearchbox}) => {

    const location = useLocation();

    useEffect(() => {
        setSearchbox('')
    }, [location])

    const user = JSON.parse(window.localStorage.getItem(USER))

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
    }).map((director, index) => (
        <Link to={`${FILMS_PATH}?actid=${director.id}`} className='actors-link col-4'>
            <img src={base64flag + director.directorImage[0].picByte} alt="" className='w-100 h-100'/>
            <h1 className='actor-title'>{director.name} {director.surname}</h1>
        </Link>
    ))

    return (
        <div className='actors-container'>
            {(user === null || user.role === USER) && <h1>Reżyserzy</h1>}
            {user && user.role === ADMIN && (
                <div className="row mb-0">
                    <div className="col-10">
                        <h1>Reżyserzy</h1>
                    </div>
                    <div className="col-2  justify-content-end align-content-end">
                        <button className='btn btn-success w-100 mt-2 py-2 px-3'>Dodaj</button>
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
                            user && user.role === ADMIN && <AdminDirectorsPanel directors={directors}/>
                        }
                        {(!user || user.role === USER) && directors}
                    </>
                )}
            </div>
        </div>
    );
};

export default DirectorsSite;