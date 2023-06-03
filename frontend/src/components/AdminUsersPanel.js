import React, {useEffect, useState} from 'react';
import {Table} from "react-bootstrap";
import {getUsers} from "../api/api";
import {USER} from "../utils/utils";
import {deleteUser, putChangeRole} from "../api/apiAdmin";

const AdminUsersPanel = () => {

    const [users, setUsers] = useState([])
    const userLogged = JSON.parse(window.localStorage.getItem(USER))

    useEffect(() => {
        getUsers().then((users) => setUsers(users))
    }, [])

    const handleDeleteUser = (id) => {
        if (userLogged.id !== id) {
            deleteUser(id, userLogged.id).then(response => {
                if (response.status === 500) {
                    alert('Nie można usunąć tego użytkownika!')
                } else {
                    getUsers().then((users) => {
                        if (users.length > 0) {
                            setUsers(users);
                        } else {
                            setUsers([])
                        }
                    })
                    alert('Usunięto użytkownika.')
                }
            })
        } else {
            alert('Nie można usunąć obecnego użytkownika!')
        }

    }

    const handleChangeRole = (id, role) => {
        if (userLogged.id !== id) {
            if(role === 'ADMIN') {
                putChangeRole(id, userLogged.id, 'USER').then((response) => {
                    if (response.status === 500) {
                        alert('Nie można zmienić roli użytkownika!')
                    } else {
                        getUsers().then((users) => {
                            if (users.length > 0) {
                                setUsers(users);
                            } else {
                                setUsers([])
                            }
                        })
                        alert('Zmieniono rolę użytkownika.')
                    }
                })
            } else {
                putChangeRole(id, userLogged.id, 'ADMIN').then((response) => {
                    if (response.status === 500) {
                        alert('Nie można zmienić roli użytkownika!')
                    } else {
                        getUsers().then((users) => {
                            if (users.length > 0) {
                                setUsers(users);
                            } else {
                                setUsers([])
                            }
                        })
                        alert('Zmieniono rolę użytkownika.')
                    }
                })
            }
        } else {
            alert('Nie można zmienić roli obecnego użytkownika!')
        }

    }

    const usersList = users.sort(({ id: previousID }, { id: currentID }) => previousID - currentID).map((user) => (
        <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.email}</td>
            <td>{user.login}</td>
            <td>{user.name}</td>
            <td>{user.surname}</td>
            <td>{user.role}</td>
            <td>
                <div className="btn btn-info  mx-5" onClick={() => handleChangeRole(user.id, user.role)}>Zmień rolę</div>
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
            </div>

            <div className='admin-users-table w-100'>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>E-mail</th>
                        <th>Login</th>
                        <th>Imię</th>
                        <th>Nazwisko</th>
                        <th>Rola</th>
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