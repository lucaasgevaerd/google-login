import './styles.css';
import GoogleLoginButton from '../GoogleLoginButton';
import { useContext, useEffect, useState } from 'react';
import { gapi } from 'gapi-script';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../Button';
import { database } from '../../database';
import { ProfileContext } from '../../App';
import { profile } from '../../types/profile';

const clientId =
  "431878615978-1r72grr7ci8dfvev34o186efqo35h4bk.apps.googleusercontent.com";

function LoginCard() {

  const [errorMessages, setErrorMessages] = useState({ name: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [user, setUser] = useState<profile>();
  const { setState } = useContext(ProfileContext)

  const navigate = useNavigate();

  const errors = {
    email: "Email incorreto",
    password: "Senha incorreta"
  };

  const handleSubmit = (event: any) => {
    const { email, password } = document.forms[0];
    //Prevent page reload
    event.preventDefault();


    // Find user login info
    const userData = database.find((user) => user.email === email.value);
    if (userData) {
      setUser({
        email: userData.email,
        familyName: userData.familyName,
        givenName: userData.givenName,
        googleId: userData.googleId,
        imageUrl: userData.imageUrl,
        name: userData.name
      })
    }

    // Compare user info
    if (userData) {
      if (userData.password !== password.value) {
        // Invalid password
        setErrorMessages({ name: "password", message: errors.password });
      } else {
        setIsSubmitted(true);
      }
    } else {
      // Username not found
      setErrorMessages({ name: "email", message: errors.email });
    }
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name: any) => {
    if (name === errorMessages.name) {
      return <div className="error">{errorMessages.message}</div>
    }
  }

  useEffect(() => {
    function start() {
      gapi.auth2.init({
        client_id: clientId,
        scope: ""
      })
    }
    gapi.load("client:auth2", start)
  });

  useEffect(() => {
    if (isSubmitted === true) {
      if (user) {
        setState({ email: user.email, familyName: user.familyName, givenName: user.givenName, googleId: "", imageUrl: user.imageUrl, name: user.name })
      }
      navigate('/home')
    }
  })

  return (
    <div className="login-card-container">
      <h1 className="login-card-title">Login</h1>
      {(isSubmitted === false) && (
        <form className="login-card-form" onSubmit={handleSubmit}>
          <>
            <input type="email" name="email" className="login-card-inputs" placeholder="Email" />
            {renderErrorMessage("email")}
            <input type="password" name="password" className="login-card-inputs" placeholder="Senha" />
            {renderErrorMessage("password")}
            <Button buttonText="Entrar" />
          </>
        </form>
      )}
      <span className="forgot-password"><Link to={'/recover-password'}>Esqueceu a senha?</Link></span>
      <div className="logins-separator">OU</div>
      <GoogleLoginButton />

    </div >
  )
}

export default LoginCard