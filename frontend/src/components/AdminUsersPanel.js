import React, {useEffect, useState} from 'react';
import {Table} from "react-bootstrap";
import {getUsers} from "../api/api";
import {USER} from "../utils/utils";
import {deleteUser} from "../api/apiAdmin";

const AdminUsersPanel = () => {

    const [users, setUsers] = useState([])
    const userLogged = JSON.parse(window.localStorage.getItem(USER))

    useEffect(() => {
        getUsers().then((users) => setUsers(users))
    }, [])

    const handleDeleteUser = (id) => {
        if (userLogged.id !== id) {
            deleteUser(id).then(response => {
                if (response.status === 500) {
                    alert('Nie można usunąć użytkownika!')
                } else {
                    getUsers().then((users) => {
                        if (users.length > 0) {
                            setUsers(users);
                        } else {
                            alert('Error ' + users.status + ': ' + users.message)
                        }
                    })
                }
            })
        } else {
            alert('Nie można usunąć obecnego użytkownika!')
        }

    }

    const usersList = users.map((user) => (
        <tr key={user.id}>
            <td>{user.email}</td>
            <td>{user.login}</td>
            <td>{user.name}</td>
            <td>{user.surname}</td>
            <td>
                <div className="btn btn-info  mx-5">Edytuj</div>
                <div className="btn btn-danger" onClick={() => handleDeleteUser(user.id)}>Usuń</div>
            </td>
        </tr>
    ))

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