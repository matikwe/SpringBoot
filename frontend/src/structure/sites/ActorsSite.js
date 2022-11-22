import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import Actor1 from "../../assets/ActorsSite/actor1.png";
import {ApplicationContext} from "../../context/ApplicationContext";
import {FILMS_PATH} from "../../utils/paths";
import LoadingSpinner from "../../utils/spinner";

const ActorsSite = () => {

    const applicationContext = useContext(ApplicationContext)

    const actors = applicationContext.actors.map((actor, index) => (
        <div key={index} className="col-4" style={{
            backgroundImage: `url(${Actor1})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'contain'
        }}>
            <Link to={`${FILMS_PATH}?actid=${actor.id}`} className='actors-link'>
                <h1>{actor.name} {actor.surname}</h1>
            </Link>
        </div>
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