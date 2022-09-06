import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import './styles.css'

function RecoverPassword() {
  const [seconds, setSeconds] = useState(5000);

  const navigate = useNavigate();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setTimeout(() => {
      navigate('/')
    }, seconds);
  }

  return (
    <div className="forgot-password-container">
      <h1 className="forgot-password-title">Recuperar senha</h1>
      <span className="forgot-password-description">Insira o endereço de e-mail ou o número do telefone celular associado à sua conta.</span>
      <form className="forgot-password-form" onSubmit={handleSubmit}>
        <input type="email" className="forgot-password-input" placeholder="Email" />
        <span className="forgot-password"><Link to={'/'}>Voltar para página de login?</Link></span>
        <Button buttonText="Enviar" />
        <div id="modal-container" className="modal-container"></div>
      </form>
    </div>
  )
}

export default RecoverPassword;