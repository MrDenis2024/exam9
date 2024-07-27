import {NavLink} from 'react-router-dom';

const Toolbar = () => {

  return (
    <nav className='navbar navbar-dark bg-success'>
      <div className='container'>
        <NavLink to='/' className='navbar-brand'>Finance Tracker</NavLink>
        <ul className='navbar-nav d-flex flex-row gap-3 flex-nowrap'>
          <li className='nav-item'>
            <NavLink to="/categories" className='nav-link'>Categories</NavLink>
          </li>
          <li className='nav-item'>
            <NavLink to="/add-transaction" className='nav-link'>Add</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Toolbar;