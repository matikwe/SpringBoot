import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import {ApplicationContext} from "../../context/ApplicationContext";
import LoadingSpinner from "../../utils/spinner";
import {FILMS_PATH} from "../../utils/paths";
import {base64flag} from "../../utils/utils";

const DirectorsSite = () => {

    const applicationContext = useContext(ApplicationContext)

    const directors = applicationContext.directors.map((director, index) => (
        <Link to={`${FILMS_PATH}?actid=${director.id}`} className='actors-link col-4'>
            <img src={base64flag + director.directorImage[0].picByte} alt="" className='w-100 h-100'/>
            <h1 className='actor-title'>{director.name} {director.surname}</h1>
        </Link>
    ))

    return (
        <div className='actors-container'>
            <h1>
                Reżyserzy
            </h1>
            <div className="row">
                {applicationContext.isLoading && (
                    <LoadingSpinner />
                )}
                {!applicationContext.isLoading && (
                    <>
                        {directors}
                    </>
                )}
            </div>
        </div>
    );
};

export default DirectorsSite;