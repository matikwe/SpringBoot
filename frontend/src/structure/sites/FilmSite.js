import React from 'react';
import Film1 from '../../assets/FilmsSite/film1.png'

const FilmSite = () => {
    return (
        <div className='films-container'>
            <h1>
                Filmy
            </h1>
            <div className="row">
                <div className="col-3" style={{backgroundImage: `url(${Film1})`}}>
                    <h3>Falling For Christmas</h3>
                </div>
                <div className="col-3" style={{backgroundImage: `url(${Film1})`}}>
                    <h3>Falling For Christmas</h3>
                </div>
                <div className="col-3" style={{backgroundImage: `url(${Film1})`}}>
                    <h3>Falling For Christmas</h3>
                </div>
                <div className="col-3" style={{backgroundImage: `url(${Film1})`}}>
                    <h3>Falling For Christmas</h3>
                </div>
            </div>
            <div className="row">
                <div className="col-3" style={{backgroundImage: `url(${Film1})`}}>
                    <h3>Falling For Christmas</h3>
                </div>
                <div className="col-3" style={{backgroundImage: `url(${Film1})`}}>
                    <h3>Falling For Christmas</h3>
                </div>
                <div className="col-3" style={{backgroundImage: `url(${Film1})`}}>
                    <h3>Falling For Christmas</h3>
                </div>
                <div className="col-3" style={{backgroundImage: `url(${Film1})`}}>
                    <h3>Falling For Christmas</h3>
                </div>
            </div>
        </div>
    );
};

export default FilmSite;