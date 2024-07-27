import {useState} from 'react';
import Modal from '../../components/Modal/Modal';
import CategoriesForm from '../../components/Forms/CategoriesForm';
import {Category} from '../../types';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {createCategories} from '../../store/categoriesThunks';
import {toast} from 'react-toastify';
import {selectorCreateLoading} from '../../store/categoriesSlice';


const Categories = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();
  const createLoading = useAppSelector(selectorCreateLoading);

  const onSubmit = async (category: Category) => {
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
          <div className='d-flex align-items-center justify-content-between'>
            <h1>Categories</h1>
            <button className='btn btn-success' onClick={() => setShowModal(true)}>Add</button>
          </div>
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