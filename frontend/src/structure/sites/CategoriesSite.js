import React from 'react';
import Category1 from "../../assets/CategoriesSite/category1.png";
import {Link} from "react-router-dom";

const CategoriesSite = () => {
    return (
        <div className='categories-container'>
            <h1>
                Kategorie
            </h1>
            <div className="row">
                <div className="col-4">
                    <Link to='/films?actid=1' className='categories-link'>
                        <img src={Category1} alt=""/>
                        <h1>Komedie</h1>
                    </Link>
                </div>
                <div className="col-4">
                    <Link to='/films?actid=1' className='categories-link'>
                        <img src={Category1} alt=""/>
                        <h1>Komedie</h1>
                    </Link>
                </div>
                <div className="col-4">
                    <Link to='/films?actid=1' className='categories-link'>
                        <img src={Category1} alt=""/>
                        <h1>Komedie</h1>
                    </Link>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <Link to='/films?actid=1' className='categories-link'>
                        <img src={Category1} alt=""/>
                        <h1>Komedie</h1>
                    </Link>
                </div>
                <div className="col-4">
                    <Link to='/films?actid=1' className='categories-link'>
                        <img src={Category1} alt=""/>
                        <h1>Komedie</h1>
                    </Link>
                </div>
                <div className="col-4">
                    <Link to='/films?actid=1' className='categories-link'>
                        <img src={Category1} alt=""/>
                        <h1>Komedie</h1>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CategoriesSite;