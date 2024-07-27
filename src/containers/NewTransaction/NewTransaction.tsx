import TransactionFrom from '../../components/Forms/TransactionFrom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectorCreateTransactionsLoading} from '../../store/transactionsSlice';
import {ApiTransaction} from '../../types';
import {createTransaction} from '../../store/transactionsThunks';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';

const NewTransaction = () => {
  const dispatch = useAppDispatch();
  const isFetching = useAppSelector(selectorCreateTransactionsLoading);
  const navigate = useNavigate();

  const onFormSubmit = async (transaction: ApiTransaction) => {
    try {
      await dispatch(createTransaction(transaction)).unwrap();
      navigate('/');
      toast.success('Транзакция успешно создана');
    } catch (e) {
      toast.success('Не удалось создать транзакцию');
    }
  };

  return (
    <div>
      <TransactionFrom onSubmit={onFormSubmit} isLoading={isFetching}/>
    </div>
  );
};

export default NewTransaction;