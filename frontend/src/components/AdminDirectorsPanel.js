import React from 'react';
import {Table} from "react-bootstrap";
import {base64flag} from "../utils/utils";
import {deleteDirector} from "../api/apiAdmin";
import {getDirectors} from "../api/api";

const AdminDirectorsPanel = ({directors, setDirectors}) => {


    const handleDeleteDirector = (id) => {
        deleteDirector(id).then(response => {
            if (response.status === 500) {
                alert('Nie można usunąć reżysera przypisanego do filmu!')
            } else {
                getDirectors().then((directors) => {
                    if (directors.length > 0) {
                        setDirectors(directors);
                    } else {
                        setDirectors([])
                    }
                })
            }
        })
    }

    const directorsList = directors.sort(({ id: previousID }, { id: currentID }) => previousID - currentID).map((director, index) => (
        <tr key={director.id}>
            <td>{director.id}</td>
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
                    <th>ID</th>
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