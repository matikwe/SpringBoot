import React from 'react';
import {Link} from "react-router-dom";
import Direcor1 from "../../assets/DirectorsSite/director1.png";

const DirectorsSite = () => {
    return (
        <div className='actors-container'>
            <h1>
                Reżyserzy
            </h1>
            <div className="row">
                <div className="col-4" style={{
                    backgroundImage: `url(${Direcor1})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'contain'
                }}>
                    <Link to='/films?dirid=1' className='actors-link'>
                        <h1>Quentin Tarantino</h1>
                    </Link>
                </div>
                <div className="col-4" style={{
                    backgroundImage: `url(${Direcor1})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'contain'
                }}>
                    <Link to='/films?dirid=1' className='actors-link'>
                        <h1>Quentin Tarantino</h1>
                    </Link>
                </div>
                <div className="col-4" style={{
                    backgroundImage: `url(${Direcor1})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'contain'
                }}>
                    <Link to='/films?dirid=1' className='actors-link'>
                        <h1>Quentin Tarantino</h1>
                    </Link>
                </div>
            </div>
            <div className="row">
                <div className="col-4" style={{
                    backgroundImage: `url(${Direcor1})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'contain'
                }}>
                    <Link to='/films?dirid=1' className='actors-link'>
                        <h1>Quentin Tarantino</h1>
                    </Link>
                </div>
                <div className="col-4" style={{
                    backgroundImage: `url(${Direcor1})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'contain'
                }}>
                    <Link to='/films?dirid=1' className='actors-link'>
                        <h1>Quentin Tarantino</h1>
                    </Link>
                </div>
                <div className="col-4" style={{
                    backgroundImage: `url(${Direcor1})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'contain'
                }}>
                    <Link to='/films?dirid=1' className='actors-link'>
                        <h1>Quentin Tarantino</h1>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default DirectorsSite;