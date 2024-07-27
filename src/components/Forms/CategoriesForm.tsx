import React, {MouseEventHandler, useState} from 'react';
import {Category} from '../../types';
import ButtonSpinner from '../Spinner/ButtonSpinner';

interface Props {
  onSubmit: (category: Category) => void;
  closeModal: MouseEventHandler
  isLoading: boolean;
}

const emptyState: Category  = {
  name: '',
  type: '',
};

const CategoriesForm: React.FC<Props> = ({onSubmit, closeModal, isLoading}) => {
  const [categories, setCategories] = useState(emptyState);

  const changeCategories = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = event.target;
    setCategories((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(categories);
    setCategories(emptyState);
  };

  return (
    <form className='p-2' onSubmit={onFormSubmit}>
      <h4>New dish</h4>
      <div className='form-group mb-3'>
        <label htmlFor='naem'>Category name</label>
        <input type="text" name="name" id="name" className='form-control' onChange={changeCategories}
               value={categories.name} required/>
      </div>
      <div className='form-group mb-3'>
        <label htmlFor='type'>Category type</label>
        <select id="type"  className="form-control" name="type" value={categories.type} onChange={changeCategories}
                required>
          <option value="">Select a category type</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>
      <div className='d-flex justify-content-between'>
        <button type='submit' className='btn btn-primary col-5' disabled={isLoading}>{isLoading && <ButtonSpinner />}Save</button>
        <button type='button' className='btn btn-success col-5' onClick={closeModal} disabled={isLoading}>{isLoading && <ButtonSpinner />}Cancel</button>
      </div>
    </form>
  );
};

export default CategoriesForm;