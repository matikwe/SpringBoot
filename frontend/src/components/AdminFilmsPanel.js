import React from 'react';
import {Table} from "react-bootstrap";
import {base64flag} from "../utils/utils";

const AdminFilmsPanel = ({films}) => {

    const getList = (arr) => {
        return arr.map((item, index) => {
            if (arr[arr.length - 1].id === item.id) {
                if (item.name)
                    return item.name + ' ' + item.surname
                if (item.category)
                    return item.category
            } else {
                if (item.name)
                    return item.name + ' ' + item.surname + ', '
                if (item.category)
                    return item.category + ', '
            }
        })
    }

    const filmsList = films.map((film, index) => (
        <tr>
            <td><img src={base64flag + film.movieImage[0].picByte} alt=""/></td>
            <td>{film.title}</td>
            <td>{getList(film.category)}</td>
            <td>{getList(film.actor)}</td>
            <td>{getList(film.director)}</td>
            <td>{film.quantity}</td>
            <td>
                <div className="btn btn-info mx-5">Edytuj</div>
                <div className="btn btn-danger">Usuń</div>
            </td>
        </tr>
    ))




    return (
        <div className='admin-films-table'>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Thumbnail</th>
                    <th>Film</th>
                    <th>Kategoria</th>
                    <th>Aktorzy</th>
                    <th>Reżyserzy</th>
                    <th>Ilość</th>
                    <th className='text-center'>Akcje</th>
                </tr>
                </thead>
                <tbody>
                {filmsList}
                </tbody>
            </Table>
        </div>
    );
};

export default AdminFilmsPanel;