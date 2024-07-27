import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {
  selectorDeleteTransactionLoading,
  selectorFetchTransactionsLoading,
  selectorTransactions
} from '../../store/transactionsSlice';
import {deleteTransaction, fetchTransactions} from '../../store/transactionsThunks';
import {fetchCategories} from '../../store/categoriesThunks';
import {selectorCategories} from '../../store/categoriesSlice';
import {Transactions} from '../../types';
import Spinner from '../../components/Spinner/Spinner';
import Transaction from '../../components/Transaction/Transaction';
import {toast} from 'react-toastify';

const Home = () => {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector(selectorTransactions);
  const categories = useAppSelector(selectorCategories);
  const fetchTransactionsLoading = useAppSelector(selectorFetchTransactionsLoading);
  const fetchCategoriesLoading = useAppSelector(selectorCategories);
  const deleteTransactionLoading = useAppSelector(selectorDeleteTransactionLoading);

  useEffect(() => {
    dispatch(fetchTransactions());
    dispatch(fetchCategories());
  }, [dispatch]);

  const combinedTransactions: Transactions[] = transactions.reduce<Transactions[]>((acc, transaction) => {
    const category = categories.find(cat => cat.id === transaction.category);

    if (category) {
      acc.push({
        id: transaction.id,
        amount: transaction.amount,
        createdAt: transaction.createdAt,
        category: category,
      });
    }

    return acc;
  }, []);

  const removeTransaction = async (transactionId: string) => {
    try {
      if(window.confirm('Вы точно хотите удалить данную транзакцию?')) {
        await dispatch(deleteTransaction(transactionId));
        dispatch(fetchTransactions());
        toast.success('Вы успешно удалили транзакцию');
      }
    } catch (e) {
      toast.error('Произошла ошибка удаления транзакции');
    }
  };

  const total = transactions.reduce((acc, transaction) => {
    const category = categories.find(cat => cat.id === transaction.category);

    if (category) {
      if (category.type === 'income') {
        acc.income += transaction.amount;
      } else if (category.type === 'expense') {
        acc.expense += transaction.amount;
      }
    }

    return acc;
  }, { income: 0, expense: 0 });

  const finalTotal = total.income - total.expense;

  return (
    <div className='mt-4'>
      <div className='d-flex col-3 align-items-center mb-4 p-2 justify-content-around border border-black rounded'>
        <p className='fs-2 mb-0'>Total:</p>
        <span className={'fs-2' +  (finalTotal > 0 ? (' text-success') : (' text-danger'))}>{finalTotal} KGS</span>
      </div>
      {fetchCategoriesLoading && fetchTransactionsLoading && <div className='text-center'><Spinner /></div>}
      {combinedTransactions.map((transaction) => (
        <Transaction key={transaction.id} transaction={transaction} onDelete={() => removeTransaction(transaction.id)} deleteLoading={deleteTransactionLoading}/>
      ))}
    </div>
  );
};

export default Home;