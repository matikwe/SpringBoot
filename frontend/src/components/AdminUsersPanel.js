import React, {useEffect, useState} from 'react';
import {Table} from "react-bootstrap";
import {getUsers} from "../api/api";
import {base64flag} from "../utils/utils";

const AdminUsersPanel = () => {

    const [users, setUsers] = useState([])

    useEffect(() => {
        getUsers().then((users) => setUsers(users))
    })

    const usersList = users.map((user, index) => (
        <tr>
            <td>{user.email}</td>
            <td>{user.login}</td>
            <td>{user.name}</td>
            <td>{user.surname}</td>
            <td>
                <div className="btn btn-info  mx-5">Edytuj</div>
                <div className="btn btn-danger">Usuń</div>
            </td>
        </tr>
    ));

    return (
        <div className='actors-container'>

            <div className="row mb-0">
                <div className="col-10">
                    <h1>Użytkownicy</h1>
                </div>
                <div className="col-2  justify-content-end align-content-end">
                    <button className='btn btn-success w-100 mt-2 py-2 px-3'>Dodaj</button>
                </div>
            </div>

            <div className='admin-users-table w-100'>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>E-mail</th>
                        <th>Login</th>
                        <th>Imię</th>
                        <th>Nazwisko</th>
                        <th className='text-center actions'>Akcje</th>
                    </tr>
                    </thead>
                    <tbody>
                    {usersList}
                    </tbody>
                </Table>
            </div>
        </div>

    );
};

export default AdminUsersPanel;