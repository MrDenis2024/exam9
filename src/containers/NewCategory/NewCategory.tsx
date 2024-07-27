import CategoriesForm from '../../components/Forms/CategoriesForm';
import {CategoryMutation} from '../../types';
import {createCategories} from '../../store/categoriesThunks';
import {toast} from 'react-toastify';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {useNavigate} from 'react-router-dom';
import {selectorCreateLoading} from '../../store/categoriesSlice';

const NewCategory = () => {
  const dispatch = useAppDispatch();
  const createLoading = useAppSelector(selectorCreateLoading);
  const navigate = useNavigate();

  const onSubmit = async (category: CategoryMutation) => {
    try {
      await dispatch(createCategories(category)).unwrap();
      navigate('/categories');
      toast.success('Категоря успешно отправлена');
    } catch (e) {
      toast.error('Произошла ошибка отправки категории');
    }
  };

  return (
    <div>
      <CategoriesForm onSubmit={onSubmit} isLoading={createLoading}/>
    </div>
  );
};

export default NewCategory;