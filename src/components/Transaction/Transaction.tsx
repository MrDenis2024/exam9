import React from 'react';
import {Transactions} from '../../types';
import dayjs from 'dayjs';
import {Link} from 'react-router-dom';
import ButtonSpinner from '../Spinner/ButtonSpinner';

interface Props {
  transaction: Transactions;
  onDelete: VoidFunction;
  deleteLoading: string | false;
}

const Transaction: React.FC<Props> = ({transaction, onDelete, deleteLoading}) => {

  return (
    <div className='border rounded border-black p-3 mb-3'>
      <div className='d-flex'>
        <div className='d-flex align-items-center col-9'>
          <span className='col-2'>{dayjs(transaction.createdAt).format('DD.MM.YYYY HH:mm')}</span>
          <p className='mb-0 col-8'>{transaction.category.name}</p>
          <p className={'mb-0 col-2 text-end' + (transaction.category.type === 'income' ? (' text-success') : (' text-danger'))}>{transaction.category.type === 'income' ? (`+${transaction.amount}`) : (`-${transaction.amount}`)} KGS</p>
        </div>
        <div className='d-flex col-3 justify-content-center gap-5'>
          <Link className={`btn btn-success ` + (deleteLoading === transaction.id ? (' disabled') : (''))} to={`/edit-transaction/${transaction.id}`}>Edit</Link>
          <button className='btn btn-danger' onClick={onDelete} disabled={deleteLoading ? deleteLoading === transaction.id : false}>{deleteLoading && deleteLoading === transaction.id && (<ButtonSpinner />)}Delete</button>
        </div>
      </div>
    </div>
  );
};

export default Transaction;