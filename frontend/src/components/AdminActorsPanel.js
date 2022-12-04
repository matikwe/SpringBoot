import React from 'react';
import {Table} from "react-bootstrap";
import {base64flag} from "../utils/utils";
import {deleteActor} from "../api/apiAdmin";
import {getActors} from "../api/api";

const AdminActorsPanel = ({actors, setActors}) => {

    const handleDeleteActor = (id) => {
        deleteActor(id).then(response => {
            if (response.status === 500) {
                alert('Nie można usunąć aktora przypisanego do filmu!')
            } else {
                getActors().then((actors) => {
                    if (actors.length > 0) {
                        setActors(actors);
                    } else {
                        setActors([])
                    }
                })
            }
        })
    }

    const actorsList = actors.sort(({ id: previousID }, { id: currentID }) => previousID - currentID).map((actor, index) => (
        <tr key={actor.id}>
            <td>{actor.id}</td>
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
                    <th>ID</th>
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