import React from 'react';
import {Table} from "react-bootstrap";
import {base64flag} from "../utils/utils";

const AdminDirectorsPanel = ({directors}) => {
    const directorsList = directors.map((director, index) => (
        <tr>
            <td><img src={base64flag + director.directorImage[0].picByte} alt="" className='w-100'/></td>
            <td>{director.name}</td>
            <td>{director.surname}</td>
            <td>
                <div className="btn btn-danger">Usuń</div>
            </td>
        </tr>
    ));

    return (
        <div className='admin-directors-table w-25'>
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
                {directorsList}
                </tbody>
            </Table>
        </div>
    );
};

export default AdminDirectorsPanel;