import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectorFetchTransactionsLoading, selectorTransactions} from '../../store/transactionsSlice';
import {fetchTransactions} from '../../store/transactionsThunks';
import {fetchCategories} from '../../store/categoriesThunks';
import {selectorCategories} from '../../store/categoriesSlice';
import {Transactions} from '../../types';
import Spinner from '../../components/Spinner/Spinner';
import Transaction from '../../components/Transaction/Transaction';

const Home = () => {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector(selectorTransactions);
  const categories = useAppSelector(selectorCategories);
  const fetchTransactionsLoading = useAppSelector(selectorFetchTransactionsLoading);
  const fetchCategoriesLoading = useAppSelector(selectorCategories);

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

  return (
    <div className='mt-4'>
      {fetchCategoriesLoading && fetchTransactionsLoading && <div className='text-center'><Spinner /></div>}
      {combinedTransactions.map((transaction) => (
        <Transaction key={transaction.id} transaction={transaction} />
      ))}
    </div>
  );
};

export default Home;