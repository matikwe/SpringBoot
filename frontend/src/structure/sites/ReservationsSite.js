import React from 'react';
import {base64flag} from "../../utils/utils";
import {Table} from "react-bootstrap";

const ReservationsSite = () => {

    const reservations = JSON.parse(window.localStorage.getItem('RESERVATIONS')) || []

    const reservationsList = reservations.map((reservation, index) => (
        <tr>
            <td>{reservation.id}</td>
            <td>{reservation.movie[0].title}</td>
            <td>{reservation.bookingDate}</td>
            <td>{reservation.reserved ? 'Tak' : 'Nie'}</td>
            <td>
                {reservation.reserved ? <div className="btn btn-danger">Anuluj</div> : <div className="btn btn-info">Zamów</div>}
            </td>
        </tr>
    ));

    return (
        <div className='actors-container'>
            <h1>Rezerwacje</h1>
            <div className='reservations-table w-25'>
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