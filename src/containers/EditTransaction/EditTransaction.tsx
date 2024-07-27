import {useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {ApiTransaction} from '../../types';
import {toast} from 'react-toastify';
import {
  selectorFetchOneTransaction,
  selectorTransaction,
  selectorUpdateTransactionLoading
} from '../../store/transactionsSlice';
import {fetchOneTransaction, updateTransaction} from '../../store/transactionsThunks';
import TransactionFrom from '../../components/Forms/TransactionFrom';
import Spinner from '../../components/Spinner/Spinner';

const EditTransaction = () => {
  const {id} = useParams() as {id: string};
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isFetching = useAppSelector(selectorFetchOneTransaction);
  const transaction = useAppSelector(selectorTransaction);
  const isUpdating = useAppSelector(selectorUpdateTransactionLoading);

  useEffect(() => {
    dispatch(fetchOneTransaction(id));
  }, [dispatch, id]);

  const onSubmit = async (transaction: ApiTransaction) => {
    try {
      await dispatch(updateTransaction({id, transaction})).unwrap();
      navigate('/');
      toast.success('Транзакция успешно обновлена');
    } catch (e) {
      toast.success('Не удалось обновить тразакцию');
    }
  };

  return (
    <div>
      {isFetching && <div className='text-center'><Spinner /></div>}
      {transaction && (
        <TransactionFrom onSubmit={onSubmit} isLoading={isUpdating} existingTransaction={transaction}/>
      )}
    </div>
  );
};

export default EditTransaction;