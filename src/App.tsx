import './App.css';
import Layout from './components/Layout/Layout';
import {Route, Routes} from 'react-router-dom';
import Home from './containers/Home/Home';
import Categories from './containers/Categories/Categories';
import NewCategory from './containers/NewCategory/NewCategory';
import EditCategory from './containers/EditCategory/EditCategory';
import NewTransaction from './containers/NewTransaction/NewTransaction';
import EditTransaction from './containers/EditTransaction/EditTransaction';

const App = () => {

  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/category-add' element={<NewCategory />} />
        <Route path='/edit-category/:id' element={<EditCategory />} />
        <Route path='/add-transaction' element={<NewTransaction />} />
        <Route path='/edit-transaction/:id' element={<EditTransaction />} />
        <Route path='*' element={<div className="text-center mt-5"><strong>Данной страницы не найдено вернитесь
          пожалуйста обратно!</strong></div>} />
      </Routes>
    </Layout>
  );
};

export default App;
