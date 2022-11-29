import React from 'react';
import {Table} from "react-bootstrap";
import {base64flag} from "../utils/utils";
import {deleteActor} from "../api/apiAdmin";
import {getCategories} from "../api/api";

const AdminActorsPanel = ({actors, setActors}) => {

    const handleDeleteActor = (id) => {
        deleteActor(id).then(response => {
            if (response.status === 500) {
                alert('Nie można usunąć zarezerwowanego/zamówionego filmu!')
            } else {
                getCategories().then((actors) => {
                    if (actors.length > 0) {
                        setActors(actors);
                    } else {
                        alert('Error ' + actors.status + ': ' + actors.message)
                    }
                })
            }
        })
    }

    const actorsList = actors.map((actor, index) => (
        <tr key={actor.id}>
            <td><img src={base64flag + actor.actorImage[0].picByte} alt="" className='w-100'/></td>
            <td>{actor.name}</td>
            <td>{actor.surname}</td>
            <td>
                <div className="btn btn-danger" onClick={() => handleDeleteActor(actor.id)}>Usuń</div>
            </td>
        </tr>
    ));

    return (
        <div className='admin-actors-table w-25'>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Thumbnail</th>
                    <th>Imię</th>
                    <th>Nazwisko</th>
                    <th className='text-center'>Akcje</th>
                </tr>
                </thead>
                <tbody>
                {actorsList}
                </tbody>
            </Table>
        </div>
    );
};

export default AdminActorsPanel;