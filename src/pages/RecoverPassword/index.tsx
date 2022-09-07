import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { database } from '../../database';
import './styles.css'

function RecoverPassword() {
  const [errorMessages, setErrorMessages] = useState({ name: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState<string>();

  const navigate = useNavigate();

  const error = {
    email: "Email não encontrado",
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    const inputValue = document.querySelector<HTMLInputElement>('.forgot-password-input')!.value;
    const userData = database.find((user) => user.email === inputValue);

    if (userData) {
      setIsSubmitted(true);
      setEmail(userData.email);
    } else {
      setErrorMessages({ name: "email", message: error.email });
    }
  }

  if (isSubmitted) {
    const modalContainer = document.querySelector<HTMLElement>('.modal-container')!;
    modalContainer.style.opacity = "1";
    modalContainer.style.visibility = 'visible';
    const blurBackground = document.querySelector<HTMLDivElement>('.forgot-password-container')!;
    blurBackground.classList.add('blur-background')
  }

  const renderErrorMessage = (name: any) => {
    if (name === errorMessages.name) {
      return <div className="error">{errorMessages.message}</div>
    }
  }

  return (
    <>
      <div className="forgot-password-container">
        <h1 className="forgot-password-title">Recuperar senha</h1>
        <span className="forgot-password-description">Insira o endereço de e-mail associado à sua conta.</span>
        <form className="forgot-password-form" onSubmit={handleSubmit}>
          <input type="email" className="forgot-password-input" placeholder="Email" />
          {renderErrorMessage("email")}
          <span className="forgot-password"><Link to={'/'}>Voltar para página de login?</Link></span>
          <Button buttonText="Enviar" />
        </form >
      </div >
      <div className="modal-container">
        <div className="modal-card">
          <p className="modal-description">Enviamos a redefinição de senha para o email:</p>
          <p className="modal-email">{email}</p>
          <Link to={'/'} className="modal-back-to-login">
            <Button buttonText="Voltar para página de login" />
          </Link>
        </div>
      </div>
    </>
  )
}

export default RecoverPassword;