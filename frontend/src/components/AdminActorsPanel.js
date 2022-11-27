import React from 'react';
import {Table} from "react-bootstrap";
import {base64flag} from "../utils/utils";

const AdminActorsPanel = ({actors}) => {

    const actorsList = actors.map((actor, index) => (
        <tr>
            <td><img src={base64flag + actor.actorImage[0].picByte} alt="" className='w-100'/></td>
            <td>{actor.name}</td>
            <td>{actor.surname}</td>
            <td>
                <div className="btn btn-danger">Usuń</div>
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