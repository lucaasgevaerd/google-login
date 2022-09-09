import './styles.css';
import { Link } from 'react-router-dom'
import Button from '../Button';
import { AuthenticationContext } from '../../App';
import { useContext } from 'react';

function NotFound() {

  const { isAuthenticated } = useContext(AuthenticationContext)
  return (
    <>
      <div className="not-found-container">
        <h1 className='not-found-description'>Página não encontrada</h1>
        {isAuthenticated.value ? (
          <Link to={'/home'} className="not-found-link">
            <Button buttonText="Voltar" />
          </Link>
        ) : (
          <Link to={'/'} className="not-found-link">
            <Button buttonText="Voltar" />
          </Link>
        )}
      </div>
    </>
  )
}

export default NotFound