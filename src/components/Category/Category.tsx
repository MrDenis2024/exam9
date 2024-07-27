import React from 'react';
import {ICategory} from '../../types';
import ButtonSpinner from '../Spinner/ButtonSpinner';
import {Link} from 'react-router-dom';

interface Props {
  category: ICategory;
  onDelete: VoidFunction;
  deleteLoading: string | false;
}

const Category: React.FC<Props> = ({category, onDelete, deleteLoading,}) => {
  return (
    <div className='d-flex align-items-center border rounded p-4 mb-3'>
      <div className='d-flex col-9 justify-content-between'>
        <p className='mb-0'>{category.name}</p>
        <span className={'me-4' + (category.type === 'income' ? (' text-success') : (' text-danger'))}>{category.type.charAt(0).toUpperCase() + category.type.slice(1)}</span>
      </div>
      <div className='col-3 d-flex justify-content-around'>
        <Link className={`btn btn-success ` + (deleteLoading === category.id ? (' disabled') : (''))} to={`/edit-category/${category.id}`}>Edit category</Link>
        <button className='btn btn-danger' onClick={onDelete}  disabled={deleteLoading ? deleteLoading === category.id : false}> {deleteLoading && deleteLoading === category.id && (<ButtonSpinner />)}Delete</button>
      </div>
    </div>
  );
};

export default Category;