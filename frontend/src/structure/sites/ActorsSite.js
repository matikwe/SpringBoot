import React from 'react';
import {Link} from "react-router-dom";
import Actor1 from "../../assets/ActorsSite/actor1.png";

const ActorsSite = () => {
    return (
        <div className='actors-container'>
            <h1>
                Aktorzy
            </h1>
            <div className="row">
                <div className="col-4" style={{
                    backgroundImage: `url(${Actor1})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'contain'
                }}>
                    <Link to='/films?actid=1' className='actors-link'>
                        <h1>Daniel Craig</h1>
                    </Link>
                </div>
                <div className="col-4" style={{
                    backgroundImage: `url(${Actor1})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'contain'
                }}>
                    <Link to='/films?actid=1' className='actors-link'>
                        <h1>Daniel Craig</h1>
                    </Link>
                </div>
                <div className="col-4" style={{
                    backgroundImage: `url(${Actor1})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'contain'
                }}>
                    <Link to='/films?actid=1' className='actors-link'>
                        <h1>Daniel Craig</h1>
                    </Link>
                </div>
            </div>
            <div className="row">
                <div className="col-4" style={{
                    backgroundImage: `url(${Actor1})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'contain'
                }}>
                    <Link to='/films?actid=1' className='actors-link'>
                        <h1>Daniel Craig</h1>
                    </Link>
                </div>
                <div className="col-4" style={{
                    backgroundImage: `url(${Actor1})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'contain'
                }}>
                    <Link to='/films?actid=1' className='actors-link'>
                        <h1>Daniel Craig</h1>
                    </Link>
                </div>
                <div className="col-4" style={{
                    backgroundImage: `url(${Actor1})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'contain'
                }}>
                    <Link to='/films?actid=1' className='actors-link'>
                        <h1>Daniel Craig</h1>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ActorsSite;