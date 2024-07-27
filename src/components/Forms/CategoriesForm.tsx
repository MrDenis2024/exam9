import React, {useState} from 'react';
import {CategoryMutation} from '../../types';
import ButtonSpinner from '../Spinner/ButtonSpinner';

interface Props {
  onSubmit: (category: CategoryMutation) => void;
  isLoading: boolean;
  existingCategory?: CategoryMutation;
}

const emptyState: CategoryMutation  = {
  name: '',
  type: '',
};

const CategoriesForm: React.FC<Props> = ({onSubmit, isLoading, existingCategory}) => {
  const initialState : CategoryMutation = existingCategory ? existingCategory : emptyState;
  const [categories, setCategories] = useState<CategoryMutation>(initialState);


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
  };

  return (
    <form className='border rounded mt-5 border-black p-4' onSubmit={onFormSubmit}>
      <h4>New dish</h4>
      <div className='form-group mb-3'>
        <label htmlFor='name'>Category name</label>
        <input type="text" name="name" id="name" className='form-control' onChange={changeCategories}
               value={categories.name} required/>
      </div>
      <div className='form-group mb-3'>
        <label htmlFor='type'>Category type</label>
        <select id="type" className="form-control" name="type" value={categories.type} onChange={changeCategories}
                required>
          <option value="">Select a category type</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>
      <button type='submit' className='btn btn-primary' disabled={isLoading}>{isLoading && <ButtonSpinner/>}Save</button>
    </form>
  );
};

export default CategoriesForm;