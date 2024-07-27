import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectorCategories} from '../../store/categoriesSlice';
import {fetchCategories} from '../../store/categoriesThunks';
import {ApiTransaction, TransactionMutation} from '../../types';
import ButtonSpinner from '../Spinner/ButtonSpinner';

interface Props {
  onSubmit: (transaction: ApiTransaction) => void
  isLoading: boolean;
  existingTransaction? : ApiTransaction;
}

const emptyState: TransactionMutation = {
  category: '',
  categoryName: '',
  amount: '',
  createdAt: '',
} ;

const TransactionFrom: React.FC<Props> = ({onSubmit, isLoading, existingTransaction}) => {
  const categories = useAppSelector(selectorCategories);
  const category =  existingTransaction && categories.filter(category => category.id === existingTransaction.category);
  const initialState: TransactionMutation = existingTransaction && category ? {...existingTransaction, category: category[0].type, categoryName: category[0].name, amount: existingTransaction.amount.toString() } : emptyState;
  const dispatch = useAppDispatch();
  const [transaction, setTransaction] = useState(initialState);
  const incomeCategories = categories.filter(category => category.type === 'income');
  const expenseCategories =   categories.filter(category => category.type === 'expense');

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const changeTransaction = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = event.target;

    setTransaction((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const transactionCategory = categories.find(category => category.name === transaction.categoryName);
    if(transactionCategory) {
      const now = new Date();
      const updatedTransaction: ApiTransaction = {
        amount: parseFloat(transaction.amount),
        category: transactionCategory.id,
        createdAt: transaction.createdAt || now.toISOString(),
      };
      onSubmit(updatedTransaction);
    }

  };

  return (
    <form className='border rounded mt-5 border-black p-4' onSubmit={onFormSubmit}>
      <h4>{existingTransaction ? ('Edit transaction') : ('New transaction')}</h4>
      <div className="form-group mb-3">
        <label htmlFor="category">Category</label>
        <select id="category" className="form-control" name="category" value={transaction.category}
                onChange={changeTransaction} required>
          <option value="">Select a category</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>
      <div className="form-group mb-3">
        <label htmlFor="categoryName">Select a category</label>
        <select id="categoryName" className="form-control" name="categoryName" value={transaction.categoryName}
                onChange={changeTransaction}
                required>
          <option value="">{transaction.category === '' ? ('Select a category type') : ('Select a category')}</option>
          {transaction.category === 'income' && (
            incomeCategories.map((category) => (
              <option key={category.id} value={category.name}>{category.name}</option>
            ))
          )}
          {transaction.category === 'expense' && (
            expenseCategories.map((category) => (
              <option key={category.id} value={category.name}>{category.name}</option>
            ))
          )}
        </select>
      </div>
      <div className="form-group mb-3">
        <label htmlFor="amount">Amount</label>
        <div className='d-flex align-items-center'>
          <input type="number" name="amount" id="amount" className="form-control" onChange={changeTransaction}
                 value={transaction.amount} required/>
          <span><strong>KGS</strong></span>
        </div>
      </div>
      <button type='submit' className='btn btn-primary' disabled={isLoading}>{isLoading && <ButtonSpinner />}Save
      </button>
    </form>
  );
};

export default TransactionFrom;