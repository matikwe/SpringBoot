import React from 'react';
import {Table} from "react-bootstrap";
import {base64flag} from "../utils/utils";
import {deleteCategory} from "../api/apiAdmin";
import {getCategories} from "../api/api";

const AdminCategoriesPanel = ({categories, setCategories}) => {

    const handleDeleteCategory = (id) => {
        deleteCategory(id).then(response => {
            if (response.status === 500) {
                alert('Nie można usunąć kategorii, gdyż jest ona przypisana do filmu!')
            } else {
                getCategories().then((categories) => {
                    if (categories.length > 0) {
                        setCategories(categories);
                    } else {
                        setCategories([])
                    }
                })
            }
        })
    }

    const categoriesList = categories.sort(({ id: previousID }, { id: currentID }) => previousID - currentID).map((category, index) => (
        <tr key={category.id}>
            <td>{category.id}</td>
            <td><img src={base64flag + category.categoryImage[0].picByte} alt="" className='w-100'/></td>
            <td>{category.category}</td>
            <td>
                <div className="btn btn-danger" onClick={() => handleDeleteCategory(category.id)}>Usuń</div>
            </td>
        </tr>
    ));

    return (
        <div className='admin-categories-table'>
            <Table striped bordered hover className='w-25'>
                <thead>
                <tr>
                    <th>ID</th>
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