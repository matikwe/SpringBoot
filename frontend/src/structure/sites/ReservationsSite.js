import React from 'react';
import {USER} from "../../utils/utils";
import {Table} from "react-bootstrap";
import {deleteReservation, getOrders, getUserReservations, postOrder} from "../../api/api";
import {useNavigate} from "react-router-dom";
import {ORDERS_PATH} from "../../utils/paths";

const ReservationsSite = ({setReservations}) => {

    const user = JSON.parse(window.localStorage.getItem(USER))
    const reservations = JSON.parse(window.localStorage.getItem('RESERVATIONS_STATE'))
    const navigate = useNavigate();

    const handleOrder = (id) => {
        postOrder(id).then((response) => {
            if (response.status === 500) {
                alert('Nie można zamówić, ponieważ film został już zarezerwowany na tę datę!')
            } else {
                getUserReservations(user).then(reservations => {
                    if (reservations.status === 500) {
                        alert('Nie można znaleźć rezerwacji dla obecnego użytkownika')
                        setReservations([])
                    } else {
                        alert('Zamówiono film zgodnie z rezerwacją.')
                        setReservations(reservations)
                        window.localStorage.setItem('RESERVATIONS_STATE', JSON.stringify(reservations))
                        getOrders().then(orders => {
                            const sortedOrdersByUser = orders.filter(order => order.reservation.user[0].id === JSON.parse(window.localStorage.getItem(USER)).id)
                            window.localStorage.setItem('SORTED_ORDERS_STATE', JSON.stringify(sortedOrdersByUser))
                            navigate(ORDERS_PATH)
                        })
                    }
                })
            }
        })
    }

    const handleDeleteReservation = (id, user) => {
        deleteReservation(id).then((response) => {
            if (response.status === 500) {
                alert('Nie można usunąć rezerwacji!')
            } else {
                getUserReservations(user).then(reservations => {
                    if (reservations.status === 500) {
                        alert('Nie można znaleźć rezerwacji dla obecnego użytkownika')
                        setReservations([])
                    } else {
                        setReservations(reservations)
                        window.localStorage.setItem('RESERVATIONS_STATE', JSON.stringify(reservations))
                    }
                })
            }
        })
    }

    const reservationsList = reservations.map((reservation, index) => (
        <tr key={reservation.id}>
            <td>{reservation.id}</td>
            <td>{reservation.movie[0].title}</td>
            <td>{reservation.bookingDate}</td>
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