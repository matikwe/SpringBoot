import React, {useEffect, useState} from 'react';
import {USER} from "../../utils/utils";
import {Table} from "react-bootstrap";
import {deleteReservation, getUserReservations, postOrder} from "../../api/api";

const ReservationsSite = () => {

    const user = JSON.parse(window.localStorage.getItem(USER))
    const [reservations, setReservations] = useState([])

    const handleOrder = (id) => {
        postOrder(id).then((response) => {
            if (response.status === 500) {
                alert(response.message)
            } else {
                alert(response)
            }
        })
    }

    useEffect(() => {
        getUserReservations(user).then(reservations => {
            setReservations(reservations)
            window.localStorage.setItem('RESERVATIONS_STATE', JSON.stringify(reservations))
        })
    }, [reservations])

    const handleDeleteReservation = (id, user) => {
        deleteReservation(id).then((response) => {
            alert(response)
        })
    }

    const reservationsList = reservations.map((reservation, index) => (
        <tr key={reservation.id}>
            <td>{reservation.id}</td>
            <td>{reservation.movie[0].title}</td>
            <td>{reservation.bookingDate}</td>
            <td>{reservation.reserved ? 'Tak' : 'Nie'}</td>
            <td>
                <div className="btn btn-info mx-5" onClick={() => handleOrder(reservation.id)}>Zamów</div>
                <div className="btn btn-danger" onClick={() => handleDeleteReservation(reservation.id, user)}>Anuluj</div>
            </td>
        </tr>
    ));

    return (
        <div className='actors-container'>
            <h1>Rezerwacje</h1>
            <div className='reservations-table w-50'>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Identyfikator</th>
                        <th>Film</th>
                        <th>Data</th>
                        <th>Zamówiony</th>
                        <th className='text-center'>Akcje</th>
                    </tr>
                    </thead>
                    <tbody>
                    {reservationsList}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default ReservationsSite;