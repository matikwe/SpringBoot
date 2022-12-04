import React from 'react';
import {USER} from "../../utils/utils";
import {Table} from "react-bootstrap";

const OrdersSite = () => {


    const orders = JSON.parse(window.localStorage.getItem('SORTED_ORDERS_STATE'))
    console.log(orders)

    const ordersList = orders.sort(({ id: previousID }, { id: currentID }) => previousID - currentID).map((order, index) => (
        <tr key={order.id}>
            <td>{order.id}</td>
            <td>{order.reservation.movie[0].title}</td>
            <td>{order.bookingDate}</td>
        </tr>
    ));

    return (
        <div className='actors-container'>
            <h1>Zamówienia</h1>
            <div className='reservations-table w-50'>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Identyfikator</th>
                        <th>Film</th>
                        <th>Data</th>
                    </tr>
                    </thead>
                    <tbody>
                    {ordersList}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default OrdersSite;