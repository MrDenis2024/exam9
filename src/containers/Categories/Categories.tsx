import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {deleteCategory, fetchCategories} from '../../store/categoriesThunks';
import {toast} from 'react-toastify';
import {
  selectorCategories,
  selectorDeleteCategoryLoading,
  selectorFetchCategoriesLoading
} from '../../store/categoriesSlice';
import Spinner from '../../components/Spinner/Spinner';
import Category from '../../components/Category/Category';
import {Link} from 'react-router-dom';


const Categories = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectorCategories);
  const fetchLoading = useAppSelector(selectorFetchCategoriesLoading);
  const deleteLoading = useAppSelector(selectorDeleteCategoryLoading);


  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const removeCategory = async (categoryId: string) => {
    try {
      if(window.confirm('Вы точно хотите удалить данную категорию?')) {
        await dispatch(deleteCategory(categoryId));
        await dispatch(fetchCategories());
        toast.success('Вы успешно удалили категорию');
      }
    } catch (e) {
      toast.error('Произошла ошибка удаления категории');
    }
  };

  return (
    <>
      <div className='mt-5'>
        <div className='mt-5'>
          <div className='d-flex align-items-center justify-content-between mb-3'>
            <h1>Categories</h1>
            <Link className='btn btn-success' to={'/category-add'}>Add</Link>
          </div>
          {fetchLoading ? (<div className='text-center'><Spinner /></div>
          ) : (
            categories.map((category) => (
              <Category key={category.id} category={category} onDelete={() => removeCategory(category.id)} deleteLoading={deleteLoading} />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Categories;