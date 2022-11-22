import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import Direcor1 from "../../assets/DirectorsSite/director1.png";
import {ApplicationContext} from "../../context/ApplicationContext";
import LoadingSpinner from "../../utils/spinner";
import {FILMS_PATH} from "../../utils/paths";

const DirectorsSite = () => {

    const applicationContext = useContext(ApplicationContext)

    const directors = applicationContext.directors.map((director, index) => (
        <div key={index} className="col-4" style={{
            backgroundImage: `url(${Direcor1})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'contain'
        }}>
            <Link to={`${FILMS_PATH}?dirid=${director.id}`} className='actors-link'>
                <h1>{director.name} {director.surname}</h1>
            </Link>
        </div>
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