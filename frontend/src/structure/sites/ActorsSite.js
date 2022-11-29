import React, {useContext, useEffect} from 'react';
import {Link, useLocation} from "react-router-dom";
import {ApplicationContext} from "../../context/ApplicationContext";
import {FILMS_PATH} from "../../utils/paths";
import LoadingSpinner from "../../utils/spinner";
import {ADMIN, base64flag, USER} from "../../utils/utils";
import AdminDirectorsPanel from "../../components/AdminDirectorsPanel";
import AdminActorsPanel from "../../components/AdminActorsPanel";

const ActorsSite = ({searchbox, setSearchbox, setActors}) => {

    const location = useLocation();

    useEffect(() => {
        setSearchbox('')
    }, [location])

    const applicationContext = useContext(ApplicationContext)

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

    return (
        <div className='actors-container'>
            {(user === null || user.role === USER) && <h1>Aktorzy</h1>}
            {user && user.role === ADMIN && (
                <div className="row mb-0">
                    <div className="col-2">
                        <h1>Aktorzy</h1>
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