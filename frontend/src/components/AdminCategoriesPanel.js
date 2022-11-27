import React from 'react';
import {Table} from "react-bootstrap";
import {base64flag} from "../utils/utils";

const AdminCategoriesPanel = ({categories}) => {

    const categoriesList = categories.map((category, index) => (
        <tr>
            <td><img src={base64flag + category.categoryImage[0].picByte} alt="" className='w-100'/></td>
            <td>{category.category}</td>
            <td>
                <div className="btn btn-danger">Usuń</div>
            </td>
        </tr>
    ));


    return (
        <div className='admin-categories-table'>
            <Table striped bordered hover className='w-25'>
                <thead>
                <tr>
                    <th>Thumbnail</th>
                    <th>Kategoria</th>
                    <th className='text-center'>Akcje</th>
                </tr>
                </thead>
                <tbody>
                {categoriesList}
                </tbody>
            </Table>
        </div>
    );
};

export default AdminCategoriesPanel;