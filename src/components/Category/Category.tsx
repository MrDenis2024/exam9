import React from 'react';
import {CategoryMutation} from '../../types';

interface Props {
  category: CategoryMutation;
}

const Category: React.FC<Props> = ({category}) => {
  return (
    <div className='d-flex align-items-center border rounded p-4 mb-3'>
      <div className='d-flex col-9 justify-content-between'>
        <p className='mb-0'>{category.name}</p>
        <span className={'me-4' + (category.type === 'income' ? (' text-success') : (' text-danger'))}>{category.type.charAt(0).toUpperCase() + category.type.slice(1)}</span>
      </div>
      <div className='col-3 d-flex justify-content-between'>
        <button className='btn btn-success'>Change category</button>
        <button className='btn btn-danger'>Delete</button>
      </div>
    </div>
  );
};

export default Category;