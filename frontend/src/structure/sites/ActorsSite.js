import React, {useContext, useEffect} from 'react';
import {Link, useLocation} from "react-router-dom";
import {ApplicationContext} from "../../context/ApplicationContext";
import {FILMS_PATH} from "../../utils/paths";
import LoadingSpinner from "../../utils/spinner";
import {ADMIN, base64flag, USER} from "../../utils/utils";
import AdminDirectorsPanel from "../../components/AdminDirectorsPanel";
import AdminActorsPanel from "../../components/AdminActorsPanel";

const ActorsSite = ({searchbox, setSearchbox}) => {

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
    }).map((actor, index) => (
        <Link to={`${FILMS_PATH}?actid=${actor.id}`} className='actors-link col-4' key={index}>
            <img src={base64flag + actor.actorImage[0].picByte} alt="" className='w-100 h-100'/>
            <h1 className='actor-title'>{actor.name} {actor.surname}</h1>
        </Link>
    ))

    return (
        <div className='actors-container'>
            <h1>
                Aktorzy
            </h1>
            <div className="row">
                {applicationContext.isLoading && (
                    <LoadingSpinner />
                )}
                {!applicationContext.isLoading && (
                    <>
                        {
                            user && user.role === ADMIN && <AdminActorsPanel actors={actors}/>
                        }
                        {(!user || user.role === USER) && actors}
                    </>
                )}
            </div>
        </div>
    );
};

export default ActorsSite;