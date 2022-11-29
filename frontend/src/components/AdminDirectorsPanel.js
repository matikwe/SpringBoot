import React from 'react';
import {Table} from "react-bootstrap";
import {base64flag} from "../utils/utils";
import {deleteDirector} from "../api/apiAdmin";
import {getDirectors} from "../api/api";

const AdminDirectorsPanel = ({directors, setCategories}) => {


    const handleDeleteDirector = (id) => {
        deleteDirector(id).then(response => {
            if (response.status === 500) {
                alert('Nie można usunąć zarezerwowanego/zamówionego filmu!')
            } else {
                getDirectors().then((directors) => {
                    if (directors.length > 0) {
                        setCategories(directors);
                    } else {
                        alert('Error ' + directors.status + ': ' + directors.message)
                    }
                })
            }
        })
    }

    const directorsList = directors.map((director, index) => (
        <tr key={director.id}>
            <td><img src={base64flag + director.directorImage[0].picByte} alt="" className='w-100'/></td>
            <td>{director.name}</td>
            <td>{director.surname}</td>
            <td>
                <div className="btn btn-danger" onClick={() => handleDeleteDirector(director.id)}>Usuń</div>
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