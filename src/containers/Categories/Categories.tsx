import {useEffect, useState} from 'react';
import Modal from '../../components/Modal/Modal';
import CategoriesForm from '../../components/Forms/CategoriesForm';
import {CategoryMutation} from '../../types';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {createCategories, fetchCategories} from '../../store/categoriesThunks';
import {toast} from 'react-toastify';
import {selectorCategories, selectorCreateLoading, selectorFetchCategoriesLoading} from '../../store/categoriesSlice';
import Spinner from '../../components/Spinner/Spinner';
import Category from '../../components/Category/Category';


const Categories = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();
  const createLoading = useAppSelector(selectorCreateLoading);
  const categories = useAppSelector(selectorCategories);
  const fetchLoading = useAppSelector(selectorFetchCategoriesLoading);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const onSubmit = async (category: CategoryMutation) => {
    try {
      await dispatch(createCategories(category)).unwrap();
      setShowModal(false);
      toast.success('Категоря успешно отправлена');
    } catch (e) {
      toast.error('Произошла ошибка отправки категории');
    }
  };


  return (
    <>
      <div className='mt-5'>
        <div className='mt-5'>
          <div className='d-flex align-items-center justify-content-between mb-3'>
            <h1>Categories</h1>
            <button className='btn btn-success' onClick={() => setShowModal(true)}>Add</button>
          </div>
          {fetchLoading ? (<div className='text-center'><Spinner /></div>
          ) : (
            categories.map((category) => (
              <Category key={category.id} category={category} />
            ))
          )}
        </div>
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <div className='modal-body'>
          <CategoriesForm onSubmit={onSubmit} closeModal={() => setShowModal(false)} isLoading={createLoading}/>
        </div>
      </Modal>
    </>
  );
};

export default Categories;