import React, {useContext, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import ArrowLeft from '../../assets/utils/arrow-left.svg'
import {ADMIN, base64flag, changeFormatToDDMMYYYY, USER} from "../../utils/utils";
import {ApplicationContext} from "../../context/ApplicationContext";
import {MAIN_PATH} from "../../utils/paths";
import DatePicker from 'react-date-picker';
import {getUserReservations, postReservation} from "../../api/api";



const FilmSite = ({setLoginShow}) => {

    const navigate = useNavigate();
    const applicationContext = useContext(ApplicationContext)
    const films = JSON.parse(window.localStorage.getItem('FILMS_STATE')) || applicationContext.films
    const user = JSON.parse(window.localStorage.getItem('USER'))
    const filmID = useParams().id
    const film = films.find(film => {
        return film.id === Number(filmID)
    })

    const [date, setDate] = useState(new Date())

    useEffect(() => {
        if (user && user.role === ADMIN) {
            navigate(MAIN_PATH)
            alert('Administrator nie może dokonywać rezerwacji!')
        }
    })

    const actors = film.actor.map((actor, index) => {
        if (film.actor[film.actor.length - 1].id === actor.id) {
            return actor.name + ' ' + actor.surname
        } else {
            return actor.name + ' ' + actor.surname + ', '
        }
    })

    const directors = film.director.map((director, index) => {
        if (film.director[film.director.length - 1].id === director.id) {
            return director.name + ' ' + director.surname
        } else {
            return director.name + ' ' + director.surname + ', '
        }
    })

    const handleReserve = () => {
        if (!date) {
            alert('Należy podać datę rezerwacji')
        } else {
            if (user && user.role === USER) {
                const formatedDate = changeFormatToDDMMYYYY(date)
                postReservation(film, user, formatedDate).then(response => {
                    if (!response.status === 500) {
                        getUserReservations(user).then(reservations => {
                            console.log(reservations)
                            window.localStorage.setItem('RESERVATIONS_STATE', JSON.stringify(reservations))
                        })
                    } else {
                        alert('Nie możesz zarezerwować jednego filmu dwa razy!')
                    }
                })
            } else if (!user) {
                setLoginShow(true)
            }
        }
    }

    return (
        <div className='film-container'>
            <div className="row title-row">
                <div className="col-3">
                    <img src={ArrowLeft} alt="" onClick={() => navigate(-1)}/>
                </div>
                <div className="col-9 mt-2">
                    <h1>{film.title}</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-6 film-description-image">
                    <img src={base64flag + film.movieImage[0].picByte} alt=""/>
                    <DatePicker onChange={setDate} value={date} minDate={new Date()} format='dd/MM/y' className='reservation-date-picker'/>
                    <div className="reserve-button" onClick={handleReserve}>
                        <h1>Rezerwuj</h1>
                    </div>
                </div>
                <div className="col-6 film-description-text">
                    <h1>Opis</h1>
                    <p className='text-start'>{film.description}</p>
                    <h1 className='mt-5'>Aktorzy</h1>
                    <h4>{actors}</h4>
                    <h1 className='mt-5'>Reżyserzy</h1>
                    <h4>{directors}</h4>
                </div>
            </div>
        </div>
    );
};

export default FilmSite;