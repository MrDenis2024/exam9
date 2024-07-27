import CategoriesForm from '../../components/Forms/CategoriesForm';
import {useNavigate, useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectorCategory, selectorFetchOneCategory, selectorUpdateCategory} from '../../store/categoriesSlice';
import {useEffect} from 'react';
import {fetchOneCategory, updateCategory} from '../../store/categoriesThunks';
import {CategoryMutation} from '../../types';
import {toast} from 'react-toastify';
import Spinner from '../../components/Spinner/Spinner';

const EditCategory = () => {
  const {id} = useParams() as {id: string};
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isFetching = useAppSelector(selectorFetchOneCategory);
  const category = useAppSelector(selectorCategory);
  const isUpdating = useAppSelector(selectorUpdateCategory);

  useEffect(() => {
    dispatch(fetchOneCategory(id));
  }, [dispatch, id]);

  const onSubmit = async (category: CategoryMutation) => {
    try {
      await dispatch(updateCategory({id, category})).unwrap();
      navigate('/categories');
      toast.success('Категория успешно обновлена');
    } catch (e) {
      toast.success('Ну удалось обновить категорию');
    }
  };

  return (
    <div>
      {isFetching && <div className='text-center'><Spinner /></div>}
      {category && (
        <CategoriesForm onSubmit={onSubmit} isLoading={isUpdating} existingCategory={category}/>
      )}
    </div>
  );
};

export default EditCategory;