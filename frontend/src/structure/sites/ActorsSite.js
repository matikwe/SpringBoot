import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import {ApplicationContext} from "../../context/ApplicationContext";
import {FILMS_PATH} from "../../utils/paths";
import LoadingSpinner from "../../utils/spinner";
import {base64flag} from "../../utils/utils";

const ActorsSite = () => {

    const applicationContext = useContext(ApplicationContext)


    const actors = applicationContext.actors.map((actor, index) => (
        <Link to={`${FILMS_PATH}?actid=${actor.id}`} className='actors-link col-4'>
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
                        {actors}
                    </>
                )}
            </div>
        </div>
    );
};

export default ActorsSite;